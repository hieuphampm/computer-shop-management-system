import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

// Adjust the path if `AddProducts.js` is in a different directory
import AddProducts from './components/AddProducts'; 

import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';
import Cashout from './components/Cashout';

// Use the correct import statement depending on whether `NotFound` is a default or named export
import NotFound from './components/NotFound'; // Default export
// OR
// import { NotFound } from './components/NotFound'; // Named export

import { ProductsContextProvider } from './global/ProductsContext';
import CartContextProvider from './global/CartContext';

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartproducts" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
