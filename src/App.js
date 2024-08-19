import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import Signup from './components/Signup';  
import Login from './components/Login';   
import { ProductsContextProvider } from "./global/ProductsContext";

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/addproducts' element={<AddProduct />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
