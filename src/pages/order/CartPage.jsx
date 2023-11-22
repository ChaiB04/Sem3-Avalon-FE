import React, { useEffect, useState } from "react";
import productService from '/Users/cbaha/individual-project-fe-sem3/src/services/ProductService'
import { useSelector } from "react-redux/es/hooks/useSelector";
import styles from './CartPage.module.css'

function CartPage(){
    const [productList, setProductList] = useState([])
    const userToken = useSelector((state) => state.token);

    useEffect(() => {
        const getCartProducts = () => {
            try {
                const cartString = localStorage.getItem("cart");
                if (cartString) {
                    const cart = JSON.parse(cartString);
                    return Array.isArray(cart) ? cart : [];
                } else {
                    return [];
                }
            } catch (error) {
                console.error("Error while retrieving cart from local storage:", error);
                return [];
            }
        };

        const cartProducts = getCartProducts();
        setProductList(cartProducts);
        console.log(productList)
    }, [userToken]);


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
          // Get the current cart from local storage
          const cartString = localStorage.getItem("cart");
          
          if (cartString) {
            // Parse the cart string into an array
            const cart = JSON.parse(cartString);
            
            // Find the index of the item to be removed
            const indexToRemove = cart.findIndex(item => item.id === productId);
            
            // If the item is found, remove it from the array
            if (indexToRemove !== -1) {
              cart.splice(indexToRemove, 1);
              
              // Save the updated cart back to local storage
              localStorage.setItem("cart", JSON.stringify(cart));
            }
           handleRefresh()
          }
        } catch (error) {
          console.error("Error while removing item from cart:", error);
        }
      };

    return(
        <>
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
                    <p> Total: ${getTotalPrice()}</p>
            </div>

        </>
    )
}

export default CartPage;