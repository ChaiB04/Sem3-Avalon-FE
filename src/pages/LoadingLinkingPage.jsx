import React, { useEffect, useState } from "react";
import OAuthService from "../services/OAuthService";
import ReactLoading from "react-loading";
import TokenService, { userData } from "../services/TokenService";
import { useSelector } from "react-redux";

function LoadingLinkingPage(){
    const userToken = useSelector((state) => state.token);
    // const [googleAccessToken, setGoogleAccessToken] = useState();

    async function loginAccount(){
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const code = params.get("code");
    let googleAccessToken;

    // console.log("google code:", code);
    const data = {
        code: code
    }

    await OAuthService.postGoogleCodeReceiveAccessToken(data, userToken)
    .then(response => {
        googleAccessToken = response.data;
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
    })

    }



    useEffect(() => {
        loginAccount();
    })


    return (
        <>
         <ReactLoading type="spin" color="#0000FF"
                height={100} width={50} />
        </>        
    )
}

export default LoadingLinkingPage;