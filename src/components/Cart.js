import React, { useContext } from 'react';
import { CartContext } from '../global/CartContext';
import { Navbar } from './Navbar';
import { IoIosAdd, IoIosRemove, IoIosTrashOutline } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../config/Config';

export const Cart = () => {
  const { shoppingCart, dispatch, TotalPrice, totalQty } = useContext(CartContext);
  console.log(shoppingCart);

  return (
    <div>
      <Navbar user={auth.currentUser} />
      {shoppingCart.length === 0 && <h1>Cart</h1>}
      <div className="cart-container">
        {shoppingCart.length === 0 && (
          <div>
            <div>No items in your cart or slow internet causing trouble (Refresh the page) or you may want to return to the home page</div>
            <Link to="/">Return to Home page</Link>
          </div>
        )}

        {shoppingCart.length > 0 && shoppingCart.map(cart => (
          <div className="cart-card" key={cart.ProductID}>
            <div className="cart-img">
              <img src={cart.ProductImg} alt="not found" />
            </div>
            <div className="cart-name">{cart.ProductName}</div>
            <div className="cart-price-original">
              Rs {cart.ProductPrice}.00
            </div>
            <div className="inc" onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
              <IoIosAdd size={24} />
            </div>
            <div className="quantity">{cart.qty}</div>
            <div className="dec" onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
              <IoIosRemove size={24} />
            </div>
            <div className="cart-price">
              Rs {cart.TotalProductPrice}.00
            </div>
            <button className="delete-btn" onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
              <IoIosTrashOutline size={24} />
            </button>
          </div>
        ))}
      </div>

      {shoppingCart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-heading">
            Cart Summary
          </div>
          <div className="cart-summary-price">
            <span>Total Price</span>
            <span>{TotalPrice}</span>
          </div>
          <div className="cart-summary-price">
            <span>Total Qty</span>
            <span>{totalQty}</span>
          </div>
          <Link to="cashout" className="cashout-link">
            <button className="btn btn-success btn-md" style={{ marginTop: '5px' }}>
              Cash on delivery
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
