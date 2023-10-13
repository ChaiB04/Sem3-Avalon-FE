import axios from "axios";

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
    axios.post(`${hostname}/users/login`, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

const UserService = {
  createUser,
  getUserById,
  loginWithEmailAndPassword
};

export default UserService;
