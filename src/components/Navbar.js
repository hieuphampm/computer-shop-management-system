import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/ecommerce.svg';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { auth } from '../config/Config';

export const Navbar = ({ user }) => {
  const history = useHistory();

  const logout = () => {
    auth.signOut().then(() => {
      history.push('/login');
    });
  };

  return (
    <div className="navbox">
      <div className="leftside">
        <img src={logo} alt="" />
      </div>
      <div className="rightside">
        {/* If we don't have any user */}
        {!user && (
          <>
            <Link to="/signup" className="navlinks">SIGN UP</Link>
            <Link to="/login" className="navlinks">LOGIN</Link>
          </>
        )}
        {/* If we have a user */}
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
