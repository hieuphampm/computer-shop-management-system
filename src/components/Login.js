import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth

import { auth } from '../config/Config';
import Navbar from './Navbar';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); 

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
        navigate('/');
      })
      .catch(err => setError(err.message));
  }

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <form autoComplete="off" className="form-group" onSubmit={login}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
          <button 
            type="submit" 
            className="btn btn-success">
            LOGIN
          </button>
        </form>
        {error && <span className='error-msg'>{error}</span>}
        <span>Don’t have an account? Register 
          <Link to="/signup"> Here</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
