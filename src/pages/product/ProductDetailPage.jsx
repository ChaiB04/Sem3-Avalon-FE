import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import styles from "../product/ProductDetailPage.module.css"
import productService from '../../services/ProductService.js';

function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState();

    useEffect(() => {
        getProduct();
    }, [id]);

    async function getProduct() {
        try {
            const response = await productService.getProduct(id);
            setProduct(response.data);
            console.log(response);
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;
                if (errors) {
                    toast.error("Could not find products.");
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className="wrapper">
            {product ? (
                <>
                    <div className={styles.productImage}>
                        <img src="http://bit.ly/2tMBBTd" height="420" width="327" alt="Product" />
                    </div>
                    <div className={styles.productInfo}>
                        <div className={styles.productText}>
                            <h1>{product.name}</h1>
                            <p>{product.description}</p>
                        </div>
                        <div className={styles.productpricebtn}>
                            <p>{product.price}$</p>
                            <br/>
                            <button type="button">buy now</button>
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
