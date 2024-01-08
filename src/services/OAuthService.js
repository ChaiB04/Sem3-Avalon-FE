import axios from "axios";

const hostname = 'http://localhost:8080';

function postGoogleCodeReceiveAccessToken(data, userToken){
    return axios.post(`${hostname}/oauth2`,data)
}

function loginWithOAuth2(){
    return axios.get(`${hostname}/oauth2`);
  }

  function linkWithOAuth2(userToken){
    return axios.get(`${hostname}/oauth2/link`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
  }

  function postLinkAccounts(data, userToken){
    return axios.post(`${hostname}/oauth2/linkGoogle`,data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
}

function postLoginWithOAuth(data){
  return axios.post(`${hostname}/oauth2/loginGoogle`, data);
}


const OAuthService = {
    postGoogleCodeReceiveAccessToken,
    loginWithOAuth2,
    linkWithOAuth2,
    postLinkAccounts,
    postLoginWithOAuth
}

export default OAuthService;