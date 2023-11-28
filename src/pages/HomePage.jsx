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

import ImageCarousel from '../components/ImageCarousel.jsx';
import bouquet from '../images/bouquetHomePage.jpg'
import flowerfield from '../images/FlowerFieldHomePages.jpeg'
import roses from '../images/roses.jpeg'
import ProductCard from "../components/ProductCard.jsx";

function HomePage(){
     const [productList, setProductList] = useState([]);
     const initialFilterState = {
          name: null,
          price: 0,
          color: null
     }

          const images = [
               flowerfield,
               bouquet
          ];


     useEffect(() => {
          fetchProducts(); 
          //console.log("Products: " + productList)
        },[]);

          async function fetchProducts() {
               await productService.getAllProducts({params: initialFilterState}).then((response) =>{
                    setProductList(response);
               })
               .catch(error => {
                    const errors = error.response.data.properties.errors
                    if (error.response.data.status === 400) {
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
                     {/* <ImageCarousel images={images} />  */}
               </div>

               {/* <div className={styles.info_pictures}>
                    <div className={styles.carouselcontainer}>
                         <div className={styles.carousel}>
                              <img src={flowerfield} className={styles.slide}/>
                              <img src={bouquet} className={styles.slide}/>
                              <img src={roses} className={styles.slide}/>
                         </div>
                    </div>
               </div> */}

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
               <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />
          </div>
     </>
)
}

export default HomePage;