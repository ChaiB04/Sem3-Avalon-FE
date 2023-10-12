import React from "react";
import { useState, useEffect } from "react";
import styles from './RegisterPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from "../services/UserService";

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

  const [errorCreatingAccount, setErrorCreatingAccount] = useState(false)

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
      //const response = await axios.post("http://localhost:8080/users", formData);
      await userService.createUser(formData)
      .catch(axiosResponse => {
        const errors = axiosResponse.response.data.errors
        if(errors.find(error => error.error === 'Logging in went wrong.')){
          setErrorCreatingAccount(true)
        }
        
      }
      )
      .finally(
        
      );

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
        <p className={'error-message' + (errorCreatingAccount ? ' show' : '')}>Error making account</p>
          
        <button type="submit" className={` ${styles.buttonLogin}`} >Register</button>
    </form>
  </>

)
}

export default RegisterPage;