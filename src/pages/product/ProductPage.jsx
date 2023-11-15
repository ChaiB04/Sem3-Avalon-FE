import React, { useEffect, useState } from "react";

import styles from './ProductPage.module.css';
import productService from '../../services/ProductService.js'
import ProductCard from "/Users/cbaha/individual-project-fe-sem3/src/components/ProductCard.jsx"

function ProductPage(){
    const [productList, setProductList] = useState([]);
    
    const [initialFilterState, setinitialFilterState] = useState({
          name: "",
          price: 0,
          color: ""
     })


    useEffect(() => {
         fetchProducts(); 
         //console.log("Products: " + productList)
       },[initialFilterState]);

     
     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setinitialFilterState({
          ...initialFilterState,
          [name]: value,
          });
     };

         async function fetchProducts() {
               console.log(initialFilterState.name)
               const data = {
                    name: initialFilterState.name === "" ? null : initialFilterState.name,
                    price: initialFilterState.price,
                    color: initialFilterState.color === "" ? null : initialFilterState.color,
               }
              await productService.getAllProducts({params: data}).then((response) =>{
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
                    <form onSubmit={fetchProducts}>
                         <input className={styles.textBoxes} type="text" name="name" value={initialFilterState.name} onChange={handleInputChange} placeholder="Search" />
                         <button type="submit" className={` ${styles.button}`} >Get All Products</button>
                    </form>
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