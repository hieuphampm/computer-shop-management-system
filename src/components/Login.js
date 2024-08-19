import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
        navigate('/'); // Redirect to home page after successful login
      })
      .catch(err => setError(err.message));
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          className="form-control" 
          required 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <br />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          className="form-control" 
          required 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
        <br />
        <button 
          type="submit" 
          className="btn btn-success btn-md mybtn">
          LOGIN
        </button>
      </form>
      {error && <span className='error-msg'>{error}</span>}
      <br />
      <span>Don’t have an account? Register 
        <Link to="/signup"> Here</Link>
      </span>
    </div>
  );
}

export default Login;
