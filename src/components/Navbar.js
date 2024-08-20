import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { auth } from '../config/Config';

export const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="navbox">
      <div className="leftside">
        <Link to="/">  
          <img src={logo} alt="logo" />  
        </Link>
      </div>
      <div className="rightside">
        {!user && (
          <>
            <Link to="/signup" className="navlinks">SIGN UP</Link>
            <Link to="/login" className="navlinks">LOGIN</Link>
          </>
        )}
        {user && (
          <>
            <span>
              <Link to="/" className="navlinks">{user}</Link>
            </span>
            <span>
              <Link to="/cartproducts" className="navlinks">
                <Icon icon={cart} />
              </Link>
            </span>
            <span>
              <button className="logout-btn" onClick={logout}>LOGOUT</button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
