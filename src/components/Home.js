import React from 'react';
import '../css/Home.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';

export const Home = ({ user }) => {
  return (
    <div className="wrapper">
      <Navbar user={user} />
      <Products user={user} />
    </div>
  );
};

export default Home;
