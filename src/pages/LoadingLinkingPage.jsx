import React, { useEffect, useState } from "react";
import OAuthService from "../services/OAuthService";
import ReactLoading from "react-loading";
import TokenService, { userData } from "../services/TokenService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function LoadingLinkingPage(){
    const userToken = useSelector((state) => state.token);
    // const [googleAccessToken, setGoogleAccessToken] = useState();
    const navigate = useNavigate();

    async function loginAccount(){
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const code = params.get("code");
    let googleAccessToken;
    const login = false;

    // console.log("google code:", code);
    const data = {
        code: code,
        login: login
    }

    await OAuthService.postGoogleCodeReceiveAccessToken(data, userToken)
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
    console.log(googleAccessToken)
    TokenService.setAccessToken(userToken);
    
    const linkData = {
        user_id: userData.claims.userId,
        accessToken: googleAccessToken
    }

    await OAuthService.postLinkAccounts(linkData, userToken)
    .then(response => {
        console.log(response.data)
        toast.done("Profile linked to Gmail!");
        navigate("/profilepage")
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

    }



    useEffect(() => {
        loginAccount();
    })


    return (
      <>
      <div className="column d-flex flex-column align-items-center">
        <h3 style={{ color: "#5D3F58" }}>Linking account to Gmail...</h3>
        <div className="mx-auto">
          <ReactLoading type="spin" color="#5D3F58" height={100} width={50} />
        </div>
      </div>
    </>     
    )
}

export default LoadingLinkingPage;