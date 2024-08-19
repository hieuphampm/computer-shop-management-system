import React, { useEffect } from 'react';
import '../css/Home.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';
import { auth } from '../config/Config';
import { useNavigate } from 'react-router-dom';  // Updated to useNavigate

export const Home = ({ user }) => {
  const navigate = useNavigate();  // Updated to useNavigate

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');  // Updated to useNavigate
      }
    });
  }, [navigate]);  // Updated dependency array to use navigate

  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products />
    </div>
  );
};

export default Home;
