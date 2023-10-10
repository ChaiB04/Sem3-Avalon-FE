import http from "../http-common";
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


const get = id => {
    return http.get(`/users/${id}`);
  };
  
const create = data => {
    return http.post("/users", data);
  };
  
const update = (id, data) => {
    return http.put(`/users/${id}`, data);
  };
  
const remove = id => {
    return http.delete(`/users/${id}`);
  };

const UserService = {
    get,
    create,
    update,
    remove,
}

export default UserService;