import React from 'react';
import '../css/Home.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';

export const Home = ({ user }) => {
  return (
    <div>
    <Navbar user={user} />
    
    <div className="home-wrapper">
      
      <Products user={user} />
    </div>
    </div>
  );
};

export default Home;
