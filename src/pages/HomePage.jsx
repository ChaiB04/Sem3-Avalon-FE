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


function HomePage(){
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


                         <div className={styles.socialmediaholder}>
                              <h4 className={styles.socialmediatext}>Follow us on Social Media!</h4>
                              <div classname={styles.socialmedias}>
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