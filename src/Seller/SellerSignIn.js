import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ".././index.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerSignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/auth/seller/signin`, { email, password });
      if (response.data.statusCode === 200) {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('token', token); // Save token to localStorage
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setMessage("Sign in successful!");
        navigate('/seller/sellerhome');
      } else {
        setMessage(response.data.message);
        window.alert(response.data.error)
      }
    } catch (error) {
      setMessage("Error signing in. Please try again.");
      window.alert(error.message)

    }
  };

  return (
    <div style={{ marginTop: "24vh" }} className="signin-container" >
      <h1>Seller Signin</h1>
      <form onSubmit={handleSignIn} className="signin-form" style={{paddingRight:"20px"}}>
      <div className="form-group">
        <label htmlFor="email">E-MAIL</label>
        <input
          id="email"
          placeholder="Email"

          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          placeholder="Password"

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
        <button type="submit" style={{padding:"10px",backgroundColor:"lime"}}>Sign In</button>
        <p>{message}</p>
        <br/>
        <br/>

        <p>Don't have an account? <Link to="/sell-signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default SellerSignIn;
