// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';// Import AuthProvider
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Navbar from './components/NavBar';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar /> 
        
         <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductListing />} />
          <Route path='/products/:productId' element={<ProductDetails />} />
          <Route  path='/products/create'  element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
