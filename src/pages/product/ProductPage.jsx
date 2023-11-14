import React, { useEffect, useState } from "react";

import styles from './ProductPage.module.css';
import productService from '../../services/ProductService.js'
import ProductCard from "/Users/cbaha/individual-project-fe-sem3/src/components/ProductCard.jsx"

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
                    <div className={styles.cardsHolder}>
                    {productList.length > 0 ? (
                         productList.map((product) => (
                              <ProductCard key={product.id} product={product} />
                         ))
                         ) : (
                         <p>No products available.</p>
                         )}
                         </div>
                              {/* {
                                   productList.length > 0 ? (
                                        productList.map(key => {
                                             <ProductCard productKey = {key}/>
                                        })
                                   ) :
                                   (
                                        <p>No products available.</p>
                                        )
                              } */}
                         </div>
                    </div>

                </div>
        </div>
                
    
    )


}

export default ProductPage;