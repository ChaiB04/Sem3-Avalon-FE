import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './RegisterPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from "../../services/UserService";
import { useNavigate } from "react-router";

function RegisterPage(){
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    street: "",
    city: "",
    housenumber: "",
    zipcode: "",
    country: "",
    picture: [],
  });

  const [picture, setPicture] = useState();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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
  
          setFormData({ ...formData, picture: base64String });
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
    await userService
      .createUser(formData)
      .then(() => navigate("/login"))
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
  };

return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit}>
      <label className={styles.loginTitle}>Register</label>
        <div className={styles.divsOnRow}>
          <div className={styles.textBoxesColumn}>
            <input className={styles.textBoxes} type="text" name="firstname"  placeholder="Firstname" value={formData.firstname}  onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="lastname"  placeholder="Lastname" value={formData.lastname} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} required/>
        
            <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="phonenumber"  placeholder="Phonenumber" value={formData.phonenumber} onChange={handleInputChange} required/>
          </div>
          <div className={styles.textBoxesColumn}>
            <input className={styles.textBoxes} type="text" name="street"  placeholder="Street" value={formData.street} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="city"  placeholder="City" value={formData.city} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="housenumber"  placeholder="Housenumber"value={formData.housenumber} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="zipcode"  placeholder="Zipcode"  value={formData.zipcode} onChange={handleInputChange} required/>

            <input className={styles.textBoxes} type="text" name="country"  placeholder="Country" value={formData.country} onChange={handleInputChange} required/>
          </div>  
          <div className={styles.textBoxesColumn}>
              <div className={styles.pictureContainerStyle}>
                {formData.picture !== null ? (
                  <img
                    id='picture'
                    className="profile_picture"
                    src={picture}
                    alt="picture"
                    key={formData.picture}
                  />
                ) : (
                  <p>No picture selected.</p>
                )}
              </div>
              <button type="button" onClick={openFileExplorer}>
                Change Avatar
              </button>
            </div> 
        </div>

        <br/>
        <button type="submit" className={` ${styles.buttonLogin}`} >Register</button>
    </form>
     </>

)
}

export default RegisterPage;