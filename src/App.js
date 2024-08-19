import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddProduct from "./components/AddProduct";
import { ProductsContextProvider } from "./global/ProductsContext";
import Signup from './components/Signup'; // Assuming Signup is exported as default
import Login from './components/Login';   // Assuming Login is exported as default
import { auth, db } from './config/Config';

class App extends Component {

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
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    );
  }
}

export default App;
