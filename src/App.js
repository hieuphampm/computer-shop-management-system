import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from "./components/AddProduct";
import { ProductsContextProvider } from "./global/ProductsContext";
import ProductDetails from "./components/ProductDetails"; 

export class App extends Component {
  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='/addproducts' element={<AddProduct />} />
            <Route path='/product/:id' element={<ProductDetails />} /> 
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
