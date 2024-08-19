import React, { useEffect } from 'react';
import '../css/Home.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';
import { auth } from '../config/Config';
import { useNavigate } from 'react-router-dom';

export const Home = ({ user }) => {
  const navigate = useNavigate();  

  useEffect(() => {
 
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login'); 
      }
    });
  }, [navigate]);  

  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products />
    </div>
  );
};

export default Home;
