import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/Config';
import { CartContext } from '../global/CartContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

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
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
          setName(snapshot.data().Name);
          setEmail(snapshot.data().Email);
        });
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  const cashoutSubmit = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(user => {
      if (user) {
        const date = new Date();
        const time = date.getTime();
        db.collection('Buyer-info ' + user.uid).doc('_' + time).set({
          BuyerName: name,
          BuyerEmail: email,
          BuyerCell: cell,
          BuyerAddress: address,
          BuyerPayment: totalPrice,
          BuyerQuantity: totalQty,
        })
        .then(() => {
          setCell('');
          setAddress('');
          dispatch({ type: 'EMPTY' });
          setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected soon.');
          setTimeout(() => {
            navigate('/');
          }, 5000);
        })
        .catch(err => setError(err.message));
      }
    });
  };

  return (
    <>
      <Navbar user={props.user} />
      <div className="container">
        <h2>Cashout Details</h2>
        {successMsg && <div className='success-msg'>{successMsg}</div>}
        <form autoComplete="off" className="form-group" onSubmit={cashoutSubmit}>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            required 
            value={name} 
            disabled 
          />
          <br />

          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            className="form-control" 
            required 
            value={email} 
            disabled 
          />
          <br />

          <label htmlFor="Cell No">Cell No</label>
          <input 
            type="number" 
            className="form-control" 
            required 
            placeholder="e.g. 03123456789" 
            onChange={(e) => setCell(e.target.value)} 
            value={cell} 
          />
          <br />

          <label htmlFor="Delivery Address">Delivery Address</label>
          <input 
            type="text" 
            className="form-control" 
            required 
            onChange={(e) => setAddress(e.target.value)} 
            value={address} 
            placeholder="e.g. 123 Main St"
          />
          <br />

          <label htmlFor="Price to Pay">Price to Pay</label>
          <input 
            type="number" 
            className="form-control" 
            required 
            value={totalPrice} 
            disabled 
          />
          <br />

          <label htmlFor="Total No of Products">Total No of Products</label>
          <input 
            type="number" 
            className="form-control" 
            required 
            value={totalQty} 
            disabled 
          />
          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {error && <div className='error-msg'>{error}</div>}
      </div>
    </>
  );
}

export default Cashout;
