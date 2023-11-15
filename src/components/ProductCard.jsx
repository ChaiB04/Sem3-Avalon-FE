import React, { useEffect, useState } from "react"
import styles from './ProductCard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";


function ProductCard({ product }) {

    const link = "/product/" + product.id;
    const [picture, setPicture] = useState();

    useEffect(() => {
      // Assuming product.picture is a base64-encoded string
      setPicture("data:image/png;base64," + product.picture);
  }, [product.picture]);

    return (
      <>
        <div className={styles.card} key={product.id}>
          <div className={styles.cardpicture}>
           {product.picture !== null ? (
             <img src={picture} alt="ProductPicture" />
           ) : (
            <p></p>
           )
          }
          </div>
          <div className={styles.cardcontainer}>
            <Link className={styles.cardTitle} to={link} product={product}>{product.name}</Link>
            <p>{product.price}</p>
          </div>
        </div>
      </>
    );
  }
  
  export default ProductCard;
  