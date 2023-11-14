import axios from "axios";

const hostname = 'http://localhost:8080';

function getAllProducts(){
    return new Promise((resolve, reject) => {
        axios.get(`${hostname}/products`)
        .then(response => {
            const productList = response.data.allProducts;
            resolve(productList);
        })
        .catch(error => {
            console.error(error);
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

const ProductService = {
    getAllProducts,
    getProduct
}

export default ProductService;