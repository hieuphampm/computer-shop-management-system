import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/Config';

export const Signup = () => {
  const [name, setName] = useState(''); // Added missing state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Replacing history with useNavigate

  const handleSignup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.collection('SignedUpUsersData').doc(cred.user.uid).set({
        Name: name,
        Email: email,
        Password: password
      }).then(() => {
        setName(''); // Clearing the name input after signup
        setEmail('');
        setPassword('');
        setError('');
        navigate('/'); // Navigate to home page after signup
      })
      .catch(err => setError(err.message));
    })
    .catch(err => setError(err.message));
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <br />
      <form autoComplete="off" className="form-group" onSubmit={handleSignup}>
        <label htmlFor="Name">Name</label>
        <input 
          type="text" 
          className="form-control" 
          required 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
        />
        <br />
        <label htmlFor="Email">Email</label>
        <input 
          type="email" 
          className="form-control" 
          required 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <br />
        <label htmlFor="Password">Password</label>
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
};

export default Signup;
