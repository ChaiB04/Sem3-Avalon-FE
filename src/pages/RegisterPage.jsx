import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './RegisterPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from "../services/UserService";
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
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your backend API
      await userService.createUser(formData).then(navigate("/"))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          toast.error("Please fill in the field correctly.", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            draggable: false,
            className: styles.toastNotification
          });
        }
        else if (error.response && error.response.data) {
          // Check if error message is related to JSON parsing error
          if (error.response.data.message.includes("JSON parse error:")) {
            toast.error("Could not create user.");
          }
        } else {
          toast.error("An unknown error occurred.");
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
        </div>

        <br/>
        <button type="submit" className={` ${styles.buttonLogin}`} >Register</button>
    </form>
    <ToastContainer toastStyle={{ backgroundColor: "#333333" }}/>
  </>

)
}

export default RegisterPage;