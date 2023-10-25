import React from "react";
import styles from './LoginPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

import userService from "../services/UserService";

function LoginPage(){
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorLoggingIn, setErrorLoggingIn] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your backend API 
    if (!isEmailValid(formData.email)) {
      setErrorLoggingIn(true)
      return; 
    }
    else{
      await userService.loginWithEmailAndPassword(formData)
      .catch(axiosResponse => {
        const errors = axiosResponse.response.data
        if(errors){
          //it's aready going wrong with int's with the dto so it's sending this
          if(errors.message.includes("JSON parse error:")){
            console.log("Could not login user.");
          }
        }
        // if(errors.find(error => error.error === 'Logging in went wrong.')){
        //   setErrorCreatingAccount(true)
        // }
      }
      )
    }
  };


return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit} >
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} required/>
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password} onChange={handleInputChange} required/>
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
         <div>
         {errorLoggingIn && <h1 className="errorMessage">Please fill in a proper email.</h1>}
          </div>
    </form>
  </>

)
}

export default LoginPage;