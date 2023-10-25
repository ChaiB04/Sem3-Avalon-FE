import React from "react";
import styles from './HomePage.module.css';
import NavBar from '../components/NavBar';
import ShopNowButton from '../components/ButtonShop';
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
          </div>
     </>
)
}

export default HomePage;