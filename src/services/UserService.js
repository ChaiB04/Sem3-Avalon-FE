import axios from "axios";

const hostname = 'http://localhost:8080'

function getUserById(userId){
  return axios.get(`${hostname}/users`, userId)
              .then(response => response.data)
}

function createUser(user){
  return axios.post(`${hostname}/users`, user)
              .then(response => response.data)
}

function loginWithEmailAndPassword(data){
  return axios.post(`${hostname}/users/login`, data)
              .then(response => response.data)
}


const UserService = {
    createUser,
    getUserById,
    loginWithEmailAndPassword
}

export default UserService;