import React, { useEffect, useState } from "react";
import styles from './CartPage.module.css'
import { useLocation } from "react-router";

function PreviousOrderPage(){

    const location = useLocation();
    const [Order, setOrder] =  useState(location.state?.Order || ""); 

    function getTotalPrice() {
        return Order.products.reduce((total, product) => total + product.price, 0);
      }

    function setPicture(product){
        if (product && product.picture) {
            return "data:image/png;base64," + product.picture;
        }
        else{
          return null;
        }
    }

    function formatDate(orderdate){
        const purchaseDate = new Date(orderdate);
        return`${purchaseDate.toLocaleDateString()}`;
      }

    return(
        <>
     <div className={styles.container}>
                <h3>Your products</h3>
                <h4>{formatDate(Order.dateOfPurchase)}</h4>
                <div className={styles.OrderContainer}>
                {Order.products.length > 0 ? (
                    Order.products.map((product, index) => (
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
                        </div>
                        <div className={styles.line}></div>
                       </div>
                    ))
                    ) : (
                    <p>No products in cart.</p>
                    )}

                    </div>

                    <div className={styles.line}></div>
                    <input
                        type="checkbox"
                        checked={Order.bundled}
                        disabled
                        /><p>Do you want it to be bundled?</p>
                    <p> Total: ${getTotalPrice()}</p>
            </div>
        </>
    )
}

export default  PreviousOrderPage;