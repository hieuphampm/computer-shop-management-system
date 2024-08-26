import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';
import Cashout from './components/Cashout';
import NotFound from './components/NotFound';
import ProductDetails from './components/ProductDetails'; // Ensure this import is added
import { ProductsContextProvider } from './global/ProductsContext';
import CartContextProvider from './global/CartContext';
import ManageProducts from './components/AdminPanel/ManageProducts';
import Dashboard from './components/AdminPanel/Dashboard';


export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Admin/Dashboard" element={<Dashboard/>} />
            <Route path="/employee/manageproducts" element={<ManageProducts />} />
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
