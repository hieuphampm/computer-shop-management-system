import React, { useState } from 'react'
import { auth, db } from '../config/Config';
import { Link } from 'react-router-dom';

export const Signup = (props) => {
  // defining state using useState hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const Signup = (e) => {
    e.preventDefault();
    // console.log('form submitted');
    // console.log(name, email, password);
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      db.Collection('SignedUpUsersData').doc(cred.user.uid).set({
        Name: name,
        Email: email,
        Password: password
      }).then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        props.history.push('/login');
      }).catch(err => setError(err.message));
    }).catch(err => setError(err.message));
  };


};

return (
    <div className="container">
      <h2>Sign Up</h2>
      <hr />
      <form autoComplete="off" className="form-group" onSubmit={Signup}>
        <br />
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
        <button type="submit" className="btn btn-success btn-md mybtn">
          REGISTER
        </button>
      </form>
      {error && <div className='error-msg'>{error}</div>}
      
      <span>Already have an account? Login
        <Link to="/login"> here</Link>
      </span>
    </div>
  );
  
