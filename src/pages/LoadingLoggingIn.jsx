import React, { useEffect, useState } from "react";
import OAuthService from "../services/OAuthService";
import ReactLoading from "react-loading";
import TokenService, { userData } from "../services/TokenService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserToken } from "../redux/features/userSlice";


function LoadingLoggingIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [googleAccessToken, setGoogleAccessToken] = useState();

  async function loginOAuth() {
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const code = params.get("code");
    let googleAccessToken = "";
    const login = true;


    // console.log("google code:", code);
    const data = {
      code: code,
      login: login
    }

    await OAuthService.postGoogleCodeReceiveAccessToken(data)
      .then(response => {
        googleAccessToken = response.data;
      }).catch(error => {
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

    const logindata = {
      code: googleAccessToken,
      login: login
    }

    await OAuthService.postLoginWithOAuth(logindata)
      .then(response => {
        const accesstoken = response.data.accessToken
        // setToken(accesstoken);
        dispatch(setUserToken(accesstoken));
        console.log("This is the accesstoken: " + response.data.accessToken);
        navigate("/");
      }
      ).catch(error => {
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



  useEffect(() => {
    loginOAuth();
  })


  return (
    <>
    <div className="column d-flex flex-column align-items-center">
      <h3 style={{ color: "#5D3F58" }}>Logging in with Gmail...</h3>
      <div className="mx-auto">
        <ReactLoading type="spin" color="#5D3F58" height={100} width={50} />
      </div>
    </div>
  </>
  )
}

export default LoadingLoggingIn;