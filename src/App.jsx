import React from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/user/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterPage from './pages/user/RegisterPage.jsx';
import ProductPage from './pages/product/ProductPage.jsx'
import ProductDetailPage from './pages/product/ProductDetailPage.jsx'
import ProfilePage from './pages/user/ProfilePage.jsx'
import NewProductPage from './pages/product/NewProductPage.jsx'
import CartPage from './pages/order/CartPage.jsx';

function App() {
  return (    
    <>
     
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productpage" element={<ProductPage/>} />
          <Route path="/product/:id" element={<ProductDetailPage/>}/>
          <Route path="/profilepage" element={<ProfilePage/>}/>
          <Route path="/newproductpage" element={<NewProductPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
