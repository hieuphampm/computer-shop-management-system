import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replacing history with useNavigate

  const signup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        setError('');
        navigate('/'); // Navigate to home page after signup
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={signup}>
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
          REGISTER
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
      <br />
      <span>Already have an account? <Link to="/login">Login here</Link></span>
    </div>
  );
}

export default Signup;
