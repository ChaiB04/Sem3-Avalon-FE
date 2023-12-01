import React, { useEffect, useState } from "react";
import orderService from '/Users/cbaha/individual-project-fe-sem3/src/services/OrderService'
import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from './CartPage.module.css'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import tokenService, { userData } from '../../services/TokenService';

function CartPage(){
    const [productList, setProductList] = useState([])
    const [orderHistory, setOrderHistory] = useState([]);
    const userToken = useSelector((state) => state.token);
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({
        userId: userId,
        products: [],
        name: "default",
        bundle_or_not: false,
        date_of_purchase: new Date().toISOString().split('T')[0]
    })
 
    const navigate = useNavigate();

    useEffect(() => {
        setUserIdFromToken();  
        getCartProducts(); 
        getOrderHistory();
    }, [userId])


    function setUserIdFromToken(){
      tokenService.setAccessToken(userToken)
      setUserId(userData.claims.userId);
    }

    async function getOrderHistory(){
      await orderService.getOrderHistory(userId, userToken)
              .then(response => {
                const responseOrders = response.data.allOrders;
                setOrderHistory(response.data.allOrders);
                console.log(responseOrders);
              })
              .catch(error => {
                if (error.response.data.status === 400) {
                  const errors = error.response.data.properties.errors
                  errors.forEach((error, index) => {
                    toast.error(error.error, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                    draggable: false,
                    className: styles.toastNotification,
                    toastId: index.toString()
                    })
                  })
                    
                  ;
                }
              })
              
    }

    const getCartProducts = () => {

        try {
            const cartString = localStorage.getItem("cart");
            if (cartString) {
                const cart = JSON.parse(cartString);
                setProductList(Array.isArray(cart) ? cart : []);
                setFormData({...formData, products: Array.isArray(cart) ? cart : []});
            } else {
                return [];
            }
        } catch (error) {
            if (error.response.data.status === 400) {
              const errors = error.response.data.properties.errors
              errors.forEach((error, index) => {
                toast.error(error.error, {
                  position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
                className: styles.toastNotification,
                toastId: index.toString()
                })
              })
                
              ;
            }
       
        }
    };

    function setPicture(product){
        if (product && product.base64picture) {
            return "data:image/png;base64," + product.base64picture;
        }
    }

    function getTotalPrice() {
        return productList.reduce((total, product) => total + product.price, 0);
    }

    const handleRefresh = () => {
        window.location.reload();
      };

    function removeItemFromCart(productId){
        try {
          const cartString = localStorage.getItem("cart");
        
          if (cartString) {
            const cart = JSON.parse(cartString);
    
            const indexToRemove = cart.findIndex(item => item.id === productId);
            if (indexToRemove !== -1) {
              cart.splice(indexToRemove, 1);
              localStorage.setItem("cart", JSON.stringify(cart));
            }
           handleRefresh()
          }
        } catch (error) {
          toast.error("Error while removing item from cart:", error);
        }
      };

      const handleCheckboxChange = (event) => {
        setFormData({...formData, bundle_or_not: event.target.checked});
      };

      async function CreateOrder(){
        console.log(formData)
        
        await orderService.createOrder(formData, userToken)
        .then(navigate("/"))
        .catch(error => {
          if (error.response.data.status === 400) {
            const errors = error.response.data.properties.errors
            errors.forEach((error, index) => {
              toast.error(error.error, {
                position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 5000,
              draggable: false,
              className: styles.toastNotification,
              toastId: index.toString()
              })
            })
              
            ;
          }
        })
      }

      const getTotalItems = (order) => {
        return order.products.reduce((total, product) => total + product.quantity, 0);
      };
      
      // Calculate and print total items for each order
     


      function formatDate(orderdate){
        const purchaseDate = new Date(orderdate);
        return`${purchaseDate.toLocaleDateString()}`;
      }

    return(
        <>
        <div className={styles.page}>
        <div className={styles.container}>
                <h3>Your products</h3>
                {productList.length > 0 ? (
                    productList.map((product) => (
                        <div key={product.id} className={styles.productcontainer}>
                            <div className={styles.picturecontainer}>
                            {product.base64picture !== null ? (
                                <img src={setPicture(product)} alt="ProductPicture" />
                            ) : (
                                <p></p>
                            )
                            }
                            </div>
                           
                                <div  className={styles.infocontainer}>
                                    <div className={styles.parentcontainer }>
                                        <h4>{product.name}</h4>
                                        <p>{product.price}</p>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                                <div className={styles.buttoncontainer}>
                                    <button onClick={() => removeItemFromCart(product.id)}>X</button>
                                </div>
                            
                        </div>
                    ))
                    ) : (
                    <p>No products in cart.</p>
                    )}

                    <div className={styles.line}></div>
                    <input
                    type="checkbox"
                    checked={formData.bundle_or_not}
                    onChange={handleCheckboxChange}
                    />
                    <p> Total: ${getTotalPrice()}</p>
                    <button onClick={CreateOrder}>Pay now</button>
            </div>

             
            <h4 className={styles.previousOrdersTitle}>Previous orders</h4>
            <div className={styles.line}></div>
            {orderHistory.length > 0 ? (
              orderHistory.map(order => (
                <>
                <div className={styles.orderPreview} key={order.id}>
                  <h4>{formatDate(order.dateOfPurchase)}</h4>
                  <p>Total Price:</p>
                  <p>amount of items: {getTotalItems(order)}</p>
                </div>
                <div className={styles.line}></div> 
                </>
              ))
            ) : (
              <p>No Order's available.</p>
            )}
        </div>
            <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />
        </>
    )
}

export default CartPage;