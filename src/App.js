import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import Home from './components/Home';
import Login from './components/Login';
import { ProductsContextProvider } from "./global/ProductsContext";
import { auth, db } from './config/Config';

export class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
          this.setState({
            user: snapshot.data().Name
          });
        });
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  render() {
    return (
      <ProductsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home user={this.state.user} />} />
            <Route path='/addproducts' element={<AddProduct />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
