import React, { useEffect, useState } from "react";
import orderService from '/Users/cbaha/individual-project-fe-sem3/src/services/OrderService'
import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from './CartPage.module.css'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import tokenService, { userData } from '../../services/TokenService';
import buttonstyle from "../../components/ButtonShop.module.css"

function CartPage(){
    const [productList, setProductList] = useState([])
    const [orderHistory, setOrderHistory] = useState([]);
    const userToken = useSelector((state) => state.token);
    const [formData, setFormData] = useState({
        userId: setUserIdFromToken(),
        products: [],
        name: "default",
        bundle_or_not: false,
        date_of_purchase: new Date().toISOString().split('T')[0]
    })
 
    const navigate = useNavigate();


    useEffect(() => { 
        getCartProducts(); 
        getOrderHistory();
    }, [userToken])


    function setUserIdFromToken(){
      tokenService.setAccessToken(userToken)
      return userData.claims.userId;
    }

    async function getOrderHistory(){
      
      await orderService.getOrderHistory(setUserIdFromToken(), userToken)
              .then(response => {
                setOrderHistory(response.data.allOrders.reverse());
                // console.log(responseOrders.reverse());
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
        else{
          return null;

    }
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
        //console.log(formData)
       if(productList.length > 0){
        await orderService.createOrder(formData, userToken)
        .then(()=>{
          localStorage.removeItem('cart');
          navigate("/");
        }
        )
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
            });
          }
        })
       }
       else toast.info("Cannot create an order with an empty cart.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        draggable: false,
        className: styles.toastNotification
       })
      }

      const getTotalPriceHistory = (order) => {
        return order.products.reduce((total, product) => total + product.price, 0);
      };

      function getTotalPrice() {
        return productList.reduce((total, product) => total + product.price, 0);
      }
      
      function formatDate(orderdate){
        const purchaseDate = new Date(orderdate);
        return`${purchaseDate.toLocaleDateString()}`;
      }

    return(
        <>
        <div className={styles.page}>
        <div className={styles.container}>
                <h3>Your products</h3>
                <div className={styles.OrderContainer}>
                {productList.length > 0 ? (
                    productList.map((product, index) => (
                      <div>
                        <div key={index}  className={styles.productcontainer}>
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
                        <div className={styles.line}></div>
                       </div>
                    ))
                    ) : (
                    <p>No products in cart.</p>
                    )}

                    </div>
                    <div className={styles.line}></div>
                   <label className=" d-flex align-items-center justify-content-center">
                    <input
                         type="checkbox"
                         checked={formData.bundle_or_not}
                         onChange={handleCheckboxChange}
                        className={`${styles.customcheckbox}`}
          
                    /> <p className="mt-3 ms-2">Do you want it to be bundled?</p>
                </label>
                    <p className={styles.totalprice}> Total: ${getTotalPrice()}</p>
                    <button className={styles.paynowbutton} onClick={CreateOrder}>Pay now</button>
            </div>

             
            <h4 className={styles.previousOrdersTitle}>Previous orders</h4>
            <div className={styles.line}></div>
            {orderHistory.length > 0 ? (
              orderHistory.map((order, index) => (
                <>
                <div className={styles.orderPreview} key={index}>
                  <h4 onClick={() => navigate("/PreviousOrderPage", {state: {Order: order}})}>{formatDate(order.dateOfPurchase)}</h4>
                  <p>Total Price: {getTotalPriceHistory(order)}</p>
                  <p>amount of items: {order.products.length}</p>
                </div>
                <div className={styles.line}></div> 
                </>
              ))
            ) : (
              <p>No Previous order's available.</p>
            )}
        </div>
        </>
    )
}

export default CartPage;