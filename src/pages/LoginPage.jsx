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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend API 
      //const response = await axios.post("http://localhost:8080/users", formData);
      await userService.loginWithEmailAndPassword(formData)
      .then(data => setUserData(data));
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };


return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit} >
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} />
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password} onChange={handleInputChange}/>
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
    </form>
  </>

)
}

export default LoginPage;