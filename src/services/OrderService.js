import axios from "axios";
const hostname = 'http://localhost:8080';

function createOrder(data, userToken) {
    return new Promise((resolve, reject) => {
      axios.post(`${hostname}/orders`, data, {
        headers: { Authorization: `Bearer ${userToken}` }
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

const OrderService = {
    createOrder
}

export default OrderService;