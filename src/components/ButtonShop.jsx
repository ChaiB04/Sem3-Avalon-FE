import React from "react"
import styles from './ButtonShop.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonShop(){
    return(
        <>
        <button className={styles.button}>
            <p className={styles.text}>Shop now!</p>
        </button>
        </>
    )
}

export default ButtonShop;