import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from "./components/ProductDetails";
import { ProductsContextProvider } from "./global/ProductsContext";
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';

// Import các component liên quan đến AdminPanel
import AdminDashboard from './components/AdminPanel/Dashboard';
import ManageProducts from './components/AdminPanel/ManageProducts';
import ManageEmployees from './components/AdminPanel/ManageEmployees';

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cartproducts" element={<Cart />} />
            
            {/* Các route cho AdminPanel */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/employee/manageproducts" element={<ManageProducts />} />
            <Route path="/admin/manage-employees" element={<ManageEmployees />} />
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
