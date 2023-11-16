import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import styles from "../product/ProductDetailPage.module.css";
import productService from '../../services/ProductService.js';

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState();
    const [picture, setPicture] = useState();
    
  const navigate = useNavigate();

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
        await productService.deleteProduct(product.id)
        .then(navigate("/productpage"))
        .catch(error => {
            if (error.response) {
                 const errors = error.response.data.errors;
                 if (errors) {
                 toast.error("Could not find products.");
                 }
            }
  })
}

    return (
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
                                <button type="button">buy now</button>
                                <button onClick={deleteProduct}>Delete</button>
                            </div>
                        </div>
                        
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetailPage;
