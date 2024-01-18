import React from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/user/LoginPage.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterPage from './pages/user/RegisterPage.jsx';
import ProductPage from './pages/product/ProductPage.jsx'
import ProductDetailPage from './pages/product/ProductDetailPage.jsx'
import ProfilePage from './pages/user/ProfilePage.jsx'
import NewProductPage from './pages/product/NewProductPage.jsx'
import CartPage from './pages/order/CartPage.jsx';
import ChatPage from './pages/ChatPage.jsx'
import CustomerServiceButton from './components/chatting/CustomerServiceButton.jsx';
import PreviousOrderPage from './pages/order/PreviousOrderPage.jsx';
import { ToastContainer,toast } from 'react-toastify';
import LoadingPage from './pages/LoadingLinkingPage.jsx';
import LoadingLoggingIn from './pages/LoadingLoggingIn.jsx';

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
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/PreviousOrderPage" element={<PreviousOrderPage/>}/>
          <Route path="/loadingLinking" element={<LoadingPage/>}/>
          <Route path="/loadingLoggingIn" element={<LoadingLoggingIn/>}/>
        </Routes>
        <CustomerServiceButton/>
        <ToastContainer toastStyle={{ position: toast.POSITION.BOTTOM_CENTER, backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"  }} />
      </Router>
    </>
  )
}

export default App
