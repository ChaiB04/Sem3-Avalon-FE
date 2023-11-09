import React, { useEffect, useState } from "react";

import styles from './ProductPage.module.css';
import productService from '../services/ProductService.js'

function ProductPage(){
    const [productList, setProductList] = useState([]);

    useEffect(() => {
         fetchProducts(); 
         //console.log("Products: " + productList)
       },[]);

         async function fetchProducts() {
              await productService.getAllProducts().then((response) =>{
                   setProductList(response);
              }).catch(error => {
                        if (error.response) {
                             const errors = error.response.data.errors;
                             if (errors) {
                             toast.error("Could not find products.");
                             }
                        }
              })
         }


    return(  
 
        <div className={styles.container}>
           
                <div>
                    <input className={styles.textBoxes} type="text" name="searchinpit"  placeholder="Search" />
                    <button type="submit" className={` ${styles.button}`}>Search</button>
          
                </div>
                <div className={styles.filterandproductcontainer}>
                    <div className= {styles.filterbox}>
                    
                    </div>

                    <div className={styles.productbox}>
                    <div className = {styles.cardsHolder} >
                         {Object.keys(productList).length > 0 ? (
                              Object.keys(productList).map(key => (
                                   <div className={styles.card} key={key}>
                                        <div className={styles.cardpicture}><img src={productList[key].picture} alt="ProductPicture"></img></div>
                                   <div className={styles.cardcontainer}>
                                        {/* //<img src={productList[key].picture} alt="ProductPicture" className="cardpicture" /> */}
                                        <h4 className={styles.cardTitle}>{productList[key].name}</h4>
                                        <p>{productList[key].price}</p>
                                   </div>
                                   </div>
                              ))
                              ) : (
                              <p>No products available.</p>
                              )}
                         </div>
                    </div>

                </div>
        </div>
                
    
    )


}

export default ProductPage;