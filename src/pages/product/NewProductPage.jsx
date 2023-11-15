import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../product/NewProductPage.module.css"
import { ToastContainer, toast } from "react-toastify";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router";

function NewProductPage(){

    const [productData, setProductData] = useState({
        name: "",
        price: 0,
        description: "",
        color: "",
        picture: [],
    })
    const [picture, setPicture] = useState();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
          ...productData,
          [name]: value,
        });
      };
    

    const openFileExplorer = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".jpg,.jpeg";
        input.onchange = handleFileSelect;
        input.click();
      };
    
      const handleFileSelect = async (event) => {
        event.preventDefault();
      
        const file = event.target.files[0];
        if (file) {
          if (file.type === "image/jpeg" || file.type === "image/jpg") {
            const reader = new FileReader();
            reader.onload = (e) => {
              const arrayBuffer = e.target.result;
              const byteArray = new Uint8Array(arrayBuffer);
              const base64String = btoa(String.fromCharCode.apply(null, byteArray));
      
              setProductData({ ...productData, picture: base64String });
              setPicture(URL.createObjectURL(file));
            };
            reader.readAsArrayBuffer(file);
          } else {
            alert("Please select a file of type JPG or JPEG.");
          }
        }
      };
      
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Send a POST request to your backend API
        await ProductService.createProduct(productData)
          .then(() => navigate("/productpage"))
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error("Please fill in the field correctly.", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                draggable: false,
                className: styles.toastNotification,
              });
            } else if (error.response && error.response.data) {
              if (error.response.data.message.includes("JSON parse error:")) {
                toast.error("Could not create user.");
              }
            } else {
              toast.error("An unknown error occurred.");
            }
          });
      };

    return(
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Create Product</label>
                <div className={styles.divsOnRow}>
                <div className={styles.textBoxesColumn}>
                    <div className={styles.pictureContainerStyle}>
                        {productData.picture !== null ? (
                        <img
                            id='picture'
                            className="profile_picture"
                            src={picture}
                            alt="picture"
                            key={productData.picture}
                        />
                        ) : (
                        <p>No picture selected.</p>
                        )}
                    </div>
                    <button type="button" onClick={openFileExplorer}>
                        Change Avatar
                    </button>
                    </div> 
                    <div className={styles.textBoxesColumn}>
                        <input className={styles.textBoxes} type="text" name="name"  placeholder="Name" value={productData.name}  onChange={handleInputChange} required/>

                        <input className={styles.textBoxes} type="text" name="price"  placeholder="Price" value={productData.price} onChange={handleInputChange} required/>

                        <input className={styles.textBoxes} type="text" name="color"  placeholder="Color" value={productData.color} onChange={handleInputChange} required/>
                    
                        <input className={styles.textBoxes} type="text" name="description"  placeholder="Description" value={productData.description} onChange={handleInputChange} required/>
                    </div>
                    <button type="submit" className={` ${styles.buttonCreate}`} >Create</button>
                </div>
            </form>
        </>
    )

}

export default NewProductPage;