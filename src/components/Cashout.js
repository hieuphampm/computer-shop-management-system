import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/Config';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory

export const Cashout = (props) => {
  const navigate = useNavigate();

  const { totalPrice, totalQty, dispatch } = useContext(CartContext);

  // Defining state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [address, setAddress] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Effect code here
  }, []);

  // Define the form submit handler
  const casuthoSubmit = (e) => {
    e.preventDefault();
    // Your submit logic here
  };

  return (
    <>
      <Navbar user={props.user} />
      <div className="container">
        <h2>Cashout Details</h2>
        <form autoComplete="off" className="form-group" onSubmit={casuthoSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" required disabled />

          <br />

          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" required disabled />

          <br />

          <label htmlFor="Cell No">Cell No</label>
          <input type="number" className="form-control" required placeholder="eg 03123456789" />

          <br />

          <label htmlFor="Delivery Address">Delivery Address</label>
          <input type="text" className="form-control" required />

          <br />

          <label htmlFor="Price to Pay">Price to Pay</label>
          <input type="number" className="form-control" required disabled />

          <br />

          <label htmlFor="Total No of Products">Total No of Products</label>
          <input type="number" className="form-control" required disabled />

          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Cashout;
