import React from "react";
import styles from './HomePage.module.css';
import ShopNowButton from '../components/ButtonShop.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage(){
return (
    <>
   {/* <div className="container"> */}
        {/* <p className={styles.companyName}>Avalon</p>
        <img className={styles.backgroundImage} src="src/images/backgroundhomepage2.jpg"/> */}
        {/* <ShopNowButton className={styles.buttonShow}/> src="src/images/wp4488485.jpg"*/}
   {/* // </div> */}
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
                    <div></div>
               </div>
          </div>
     </>
)
}

export default HomePage;