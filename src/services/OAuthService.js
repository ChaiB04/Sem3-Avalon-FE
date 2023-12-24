import axios from "axios";

const hostname = 'http://localhost:8080';

function postGoogleCodeReceiveAccessToken(data, userToken){
    return axios.post(`${hostname}/oauth2`,data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
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


const OAuthService = {
    postGoogleCodeReceiveAccessToken,
    loginWithOAuth2,
    linkWithOAuth2,
    postLinkAccounts
}

export default OAuthService;