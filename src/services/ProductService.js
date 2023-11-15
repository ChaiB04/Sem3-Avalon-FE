import axios from "axios";

const hostname = 'http://localhost:8080';

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

function createProduct(data){
    return new Promise((resolve, reject) => {
        axios.post(`${hostname}/products`, data)
        .then(response =>{
            resolve(response);
        })
        .catch(error =>{
            reject(error);
        })
    })
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${hostname}/products/${id}`)
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