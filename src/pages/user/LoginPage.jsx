import React from "react";
import styles from './LoginPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { setUserToken } from "../../redux/features/userSlice"; 
import userService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
function LoginPage(){
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        
    }


return(
  <>
    <form className= {styles.loginForm} onSubmit={handleSubmit} >
    <label className={styles.loginTitle}>Login</label>
         <input className={styles.textBoxes} type="text" name="email"  placeholder="Email" value={formData.email} onChange={handleInputChange} required/>
   
         <input className={styles.textBoxes} type="password" name="password"  placeholder="Password" value={formData.password} onChange={handleInputChange} required/>
         <br/>
         <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
    </form>

    <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />

  </>

)
}

export default LoginPage;