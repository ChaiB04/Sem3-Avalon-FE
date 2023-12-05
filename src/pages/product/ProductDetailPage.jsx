import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import styles from "../product/ProductDetailPage.module.css";
import productService from '../../services/ProductService.js';
import tokenService, { userData } from '../../services/TokenService'
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState();
    const [picture, setPicture] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const userToken = useSelector((state) => state.token);

    function CheckRole(){
      tokenService.setAccessToken(userToken);
      if(userData.claims.roles === "ADMINISTRATOR"){
        setIsAdmin(true);
      }
    }

    const navigate = useNavigate();

    function addToCart(){
        if(userToken != null){
            const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = [...existingCart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success("Added to your cart!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
                className: styles.toastNotification
            })
        }
        else{
            toast.info("Please log in to buy the product!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
            });
        }
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    useEffect(() => {
        if (product && product.base64picture) {
            setPicture("data:image/png;base64," + product.base64picture);
        }
    }, [product]);

    async function getProduct() {
        try {
            const response = await productService.getProduct(id);
            setProduct(response.data);
            CheckRole();
            // setPicture("data:image/png;base64," + response.base64picture);
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors) {
                    toast.error("Could not find products.");
                }
            }
        }
    }

    async function deleteProduct(){
        await productService.deleteProduct(product.id, userToken)
        .then(navigate("/productpage"))
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
        <div className={styles.container}>
            <div className="wrapper">
                {product ? (
                    <>
                        <div className={styles.productImage}>
                            {picture !== undefined ? (
                                <img src={picture} alt="ProductPicture" />
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.productText}>
                                <h1>{product.name}</h1>
                                <p>{product.description}</p>
                            </div>
                            <div className={styles.productpricebtn}>
                                <p>{product.price}$</p>
                                <br />
                                <button type="button" onClick={() => addToCart()}>buy now</button>
                                {isAdmin ? (
                                    <button onClick={deleteProduct}>Delete</button>
                                ): (
                                    <>
                                    </>
                                )}
                            </div>
                        </div>
                        
                    </>
                ) : (
                    <p>Not getting the product, sorry! 😢</p>
                )}
            </div>
           
        </div>
         <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />
    </>
        );
}

export default ProductDetailPage;
