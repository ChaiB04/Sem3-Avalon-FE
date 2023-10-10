import React from "react";
import styles from './LoginPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useState } from "react";

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
      const response = await axios.post("http://localhost:8080/users", formData);
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };


return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit} onChange={handleInputChange}>
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} />
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password}/>
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
    </form>
  </>

)
}

export default LoginPage;