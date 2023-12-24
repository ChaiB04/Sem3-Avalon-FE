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
import OAuthService from "../../services/OAuthService";
function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirectLink, setRedirectLink] = useState();



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
          });
        }
      })

  }

  const loginOAuth2 = async () =>{
    await OAuthService.loginWithOAuth2()
    .then(response => {
      const link =response.data.link;
      console.log("response: ", response)
      console.log("Redirect link:", link);
      window.location.href = link;

    })
    // .then(
    //   getGoogleCode
    // )
    .catch(error => {
      console.error("Error during OAuth2 login:", error);
    });

  }


  const getGoogleCode = async () =>{
    await userService.getGoogleAuthCode()
    .then(response => {
      console.log("link google code:", response);
      window.location.href=response.data
    })
  }



  return (
    <>
      <div>
        <form className={styles.loginForm} onSubmit={handleSubmit} >
          <label className={styles.loginTitle}>Login</label>
          <input className={styles.textBoxes} type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />

          <input className={styles.textBoxes} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          <br />
          <button type="submit" className={` ${styles.buttonLogin}`}>Login</button>
        </form>

        <button onClick={loginOAuth2} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4285F4', color: '#ffffff', textDecoration: 'none', borderRadius: '5px' }}>Login with Gmail</button>

      </div>
    </>

  )
}

export default LoginPage;