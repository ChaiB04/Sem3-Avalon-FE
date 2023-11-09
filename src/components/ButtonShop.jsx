import React from "react"
import styles from './ButtonShop.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

function ButtonShop(){
    const userToken = useSelector((state) => state.token);



    return(
        <>
        <button className={styles.button}>
            <p className={styles.text}>Shop now!</p>
        </button>
        </>
    )
}

export default ButtonShop;