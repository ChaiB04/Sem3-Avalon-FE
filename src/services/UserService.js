import axios from "axios";
import tokenService from '../services/TokenService'

const hostname = 'http://localhost:8080';

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    axios.get(`${hostname}/users/${userId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    axios.post(`${hostname}/users`, user)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function loginWithEmailAndPassword(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${hostname}/login`, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//add usertoken to set
function editAccount(id, data, userToken) {
  return new Promise((resolve, reject) => {
    axios.put(`${hostname}/users/${id}`, data)
      .catch(error => {
        reject(error);
      });
  });
}

function loginWithOAuth2(){
  return axios.get(`${hostname}/oauth2login`);
}

function getGoogleAuthCode(){
  return axios.get(`${hostname}/oauth2/code/google`)
}

const UserService = {
  createUser,
  getUserById,
  loginWithEmailAndPassword,
  editAccount,
  loginWithOAuth2,
  getGoogleAuthCode
};

export default UserService;
