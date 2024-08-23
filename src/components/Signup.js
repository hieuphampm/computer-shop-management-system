import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/Config';
import Navbar from './Navbar';

export const Signup = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.collection('SignedUpUsersData').doc(cred.user.uid).set({
        Name: name,
        Email: email,
        Password: password
      }).then(() => {
        setName(''); 
        setEmail('');
        setPassword('');
        setError('');
        navigate('/'); 
      })
      .catch(err => setError(err.message));
    })
    .catch(err => setError(err.message));
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form autoComplete="off" className="form-group" onSubmit={handleSignup}>
          <label htmlFor="Name">Name</label>
          <input 
            type="text" 
            required 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
          <label htmlFor="Email">Email</label>
          <input 
            type="email" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
          />
          <label htmlFor="Password">Password</label>
          <input 
            type="password" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
          <button 
            type="submit" 
            className="btn btn-success">
            REGISTER
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
        <span>Already have an account? <Link to="/login">Login here</Link></span>
      </div>
    </div>
  );
};

export default Signup;
