import axios from "axios";
import host from "./BELink"

const hostname = host.hostname();

function getAllProducts(data){
    return new Promise((resolve, reject) => {
        axios.get(`${hostname}/products`, data)
        .then(response => {
            const productList = response.data.allProducts;
            resolve(productList);
        })
        .catch(error => {
           
            reject(error);
          });
    })
}

function getProduct(id){
    return new Promise((resolve, reject) => {
        axios.get(`${hostname}/products/${id}`)
        .then(response =>{
            resolve(response);
        })
        .catch(error => {
            reject(error);
        })
    })
}

function createProduct(data, userToken) {
  return new Promise((resolve, reject) => {
    axios.post(`${hostname}/products`, data, {
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

function deleteProduct(id, userToken) {
    return new Promise((resolve, reject) => {
        axios.delete(`${hostname}/products/${id}`,
        {
            headers: { Authorization: `Bearer ${userToken}` }
          })
            .catch(error => {
                reject(error);
            });
    });
}



const ProductService = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct
}

export default ProductService;