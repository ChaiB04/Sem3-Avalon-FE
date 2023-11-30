import React from "react";
import { useNavigate } from "react-router";
import styles from './CustomerServiceButton.module.css'


function CustomerServiceButton(){

    const navigate = useNavigate();


    return (
        <>
        <button className={styles.button} onClick={() => navigate("/chat", {state: {chatTo: "customerservice@gmail.com"}})}></button>
        </>
    )
}

export default CustomerServiceButton;