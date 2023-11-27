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

const UserService = {
  createUser,
  getUserById,
  loginWithEmailAndPassword,
  editAccount
};

export default UserService;
