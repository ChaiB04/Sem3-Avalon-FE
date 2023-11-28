import React from "react"
import styles from './ButtonShop.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";

function ButtonShop(){

    const navigate = useNavigate();

    const redirect = () => {
        navigate("/productpage");
    }


    return(
        <>
        <button className={styles.button}>
            <p onClick={redirect} className={styles.text}>Shop now!</p>
        </button>
        </>
    )
}

export default ButtonShop;