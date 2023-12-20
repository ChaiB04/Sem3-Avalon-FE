import React, { useEffect, useState } from "react";
import styles from './ProductPage.module.css';
import productService from '../../services/ProductService.js';
import ProductCard from "../../components/ProductCard.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import tokenService, { userData } from '../../services/TokenService'
import { useSelector } from "react-redux";

function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [initialFilterState, setinitialFilterState] = useState({
    name: "",
    price: 0,
    color: ""
  });
  const [Price, setPrice] = useState(0);
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const userToken = useSelector((state) => state.token);

  useEffect(() => {
    fetchProducts();
  }, [initialFilterState, Price]);

  function CheckRole(){
    tokenService.setAccessToken(userToken);
    if(userData.claims.roles === "ADMINISTRATOR"){
      setIsAdmin(true);
    }
  }

  async function fetchProducts() {
    const data = {
      name: initialFilterState.name === "" ? null : initialFilterState.name,
      price: initialFilterState.price,
      color: initialFilterState.color === "" ? null : initialFilterState.color,
    };
    await productService.getAllProducts({ params: data }).then((response) => {
      setProductList(response);
      CheckRole();
    })
    .catch(error => {
      const errors = error.response.data.properties.errors
      if (error.response.data.status === 400) {
        errors.forEach((error, index) => {
          toast.error(error.error, {
            position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          draggable: false,
          className: styles.toastNotification,
          toastId: index.toString()
          })
        })
          
        ;
      }
    })
  }

  const handleInputChange = (e) => {
     const { name, value } = e.target;
     setinitialFilterState({
       ...initialFilterState,
       [name]: value,
     });
   };
 

   const handlePriceChange = (e) => {
     const newPrice = parseInt(e.target.value);
     setPrice(newPrice);
     setinitialFilterState({ ...initialFilterState, price: newPrice });
   };
   
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={fetchProducts}>
          <input className={styles.textBoxes} type="text" name="name" value={initialFilterState.name} onChange={handleInputChange} placeholder="Search" />
          <button type="submit" className={` ${styles.button}`} >Get All Products</button>
          </form>
      </div>
      {isAdmin ? (
         <button className={`${styles.button}`} onClick={() => navigate("/newproductpage")}>Create new product</button>
      ) : (
        <></>
      )}
      <div className={styles.filterandproductcontainer}>
        <form onSubmit={fetchProducts}>
          <div className={styles.filterbox}>
                    <div className={styles.range__slider}>
                      <p>Filter</p>
                         <label htmlFor="price">Maximum Price:</label>
                         <input type="range" id="price" name="price" min="0" max="100" value={Price} onChange={handlePriceChange} />
                         <div className="price-labels">
                              <div className="price-max">$0 - ${Price}</div>
                         </div>
                    </div>
                    
                    <div className={styles.colorDropdown}>
                      <label htmlFor="colorDropdown" >color:</label>
                      <select type="text" id="colorDropdown" name="color" placeholder="Color" value={initialFilterState.color} onChange={handleInputChange} required>
                        <option value="">All</option>
                        <option value="pink">Pink</option>
                        <option value="blue">Blue</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="purple">Purple</option>
                      </select>
                    </div>

          </div>
        </form>

        <div className={styles.productbox}>
          <div className={styles.cardsHolder}>
            {productList.length > 0 ? (
              productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </div>
       </div>
  );
}

export default ProductPage;
