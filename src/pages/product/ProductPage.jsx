import React, { useEffect, useState } from "react";
import styles from './ProductPage.module.css';
import productService from '../../services/ProductService.js';
import ProductCard from "/Users/cbaha/individual-project-fe-sem3/src/components/ProductCard.jsx";

function ProductPage() {
  const [productList, setProductList] = useState([]);
  const [initialFilterState, setinitialFilterState] = useState({
    name: "",
    price: 0,
    color: ""
  });
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [initialFilterState, Price]);

  async function fetchProducts() {
    const data = {
      name: initialFilterState.name === "" ? null : initialFilterState.name,
      price: initialFilterState.price,
      color: initialFilterState.color === "" ? null : initialFilterState.color,
    };
    await productService.getAllProducts({ params: data }).then((response) => {
      setProductList(response);
    }).catch(error => {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors) {
          toast.error("Could not find products.");
        }
      }
    });
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

      <div className={styles.filterandproductcontainer}>
        <form onSubmit={fetchProducts}>
          <div className={styles.filterbox}>
                    <div className={styles.range__slider}>
                         <label htmlFor="price">Maximum Price:</label>
                         <input type="range" id="price" name="price" min="0" max="100" value={Price} onChange={handlePriceChange} />
                         <div className="price-labels">
                              <div className="price-max">$0 - ${Price}</div>
                         </div>
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
