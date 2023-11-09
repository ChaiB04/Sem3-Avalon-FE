import React from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage.jsx'

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
        </Routes>
      </Router>
    </>
  )
}

export default App
