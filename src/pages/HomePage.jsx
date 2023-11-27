import React, { useEffect, useState } from "react";

import styles from './HomePage.module.css';
import ShopNowButton from '../components/ButtonShop.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import productService from '../services/ProductService.js'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import twitterLogo from '../images/twitterLogo.png'
import instagramLogo from '../images/instagramLogo.png'
import snapchatLogo from '../images/snapchatLogo.png'

import flower from '../images/logo.jpg'
import ProductCard from "../components/ProductCard.jsx";
function HomePage(){
     const [productList, setProductList] = useState([]);
     const initialFilterState = {
          name: null,
          price: 0,
          color: null
     }

     useEffect(() => {
          fetchProducts(); 
          //console.log("Products: " + productList)
        },[]);

          async function fetchProducts() {
               await productService.getAllProducts({params: initialFilterState}).then((response) =>{
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

return (
    <>
          <div>
          <section className={styles.indexBanner}>
               <div className={styles.titleCenter}>
                    <p className={styles.title}>Avalon</p>
               </div>
               <div className={styles.buttonContainer}>
                    <ShopNowButton/>
               </div>
          </section>
         
               <p className={styles.info_titles}>Flowers</p>
               <div className={styles.line}></div>
               <p className={styles.info_details}>Buy a variety of beautiful house planted flowers.</p>
               <div className={styles.info_pictures}>
               </div>

               <div className={styles.popular_items_container}>
                    <p className={styles.popular_title}>Popular</p>
                    <div className={styles.popular_line}></div> 
                         <div className = {styles.cardsHolder} >
                         {productList.length > 0 ? (
                         productList.map((product) => (
                              <ProductCard key={product.id} product={product} />
                         ))
                         ) : (
                         <p>No products available.</p>
                         )}
                         </div>




                         <div className={styles.socialmediaholder}>
                              <h4 className={styles.socialmediatext}>Follow us on Social Media!</h4>
                              <div className={styles.socialmedias}>
                                   <img src={twitterLogo} className={styles.socialmedialogo}/>
                                   <img src={instagramLogo} className={styles.socialmedialogo}/>
                                   <img src={snapchatLogo} className={styles.socialmedialogo}/>
                              </div>
                         </div>
               </div>
          </div>
     </>
)
}

export default HomePage;