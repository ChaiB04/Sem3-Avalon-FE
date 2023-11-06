import React from "react";
import styles from './LoginPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { setUserToken } from "../redux/features/userSlice"; 
import userService from "../services/UserService";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function LoginPage(){
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorLoggingIn, setErrorLoggingIn] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();



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
        .then((response) => {
          if (response != undefined) {
            const token = response.accessToken;
            dispatch(setUserToken(token));
            navigate("/");
          } else {
            toast.error("Token not found in response:", response.data);
          }
        })
      .catch(error => {
        if (error.response) {
          const errors = error.response.data.errors;
          if (errors) {
            // Handle errors here
            toast.error("Could not find user.");
          } else {
            // Handle other cases when there are no errors
          }
        } else {
          toast.error("Response object is undefined:", error);
        }
      })
    }
  };

  // function YourComponent() {
  //   // Access the token from Redux store
  //   const userToken = useSelector((state) => state.user.token);
  
  //   if (userToken) {
  //     // Token is present in Redux store
  //     console.log('Access Token in Redux:', userToken);
  //   } else {
  //     // Token is not present or is falsy
  //     console.log('No Access Token in Redux store.');
  //   }
  
  //   // Your component code here
  // }




return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit} >
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} required/>
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password} onChange={handleInputChange} required/>
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
    </form>

    <ToastContainer toastStyle={{ backgroundColor: "#333333" }}/>

  </>

)
}

export default LoginPage;