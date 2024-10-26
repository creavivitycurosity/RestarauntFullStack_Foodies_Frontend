import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ".././index.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerSignUp = () => {
  const [email, setEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null); // State to store the image file

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('restaurantName', restaurantName);

      formData.append('image', image); // Append image file to FormData
  console.log(formData)

      const response = await axios.post(`${BASE_URL}/auth/seller/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.statusCode === 200) {
        setMessage("Sign up successful! Please sign in.");
        window.alert("SIGNUP SUCCESSFUL PLEASE SIGNIN")
        navigate('/sell-signin');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "24vh" }} className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form" style={{ paddingRight: "20px" }}>
        
        <div className="form-group">
          <label htmlFor="restaurantName">RESTAURANT NAME</label>
          <input
            type="text"
            id="restaurantName"
            placeholder="RESTAURANT NAME"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">RE-ENTER PASSWORD</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Restaurant Logo</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set the image file to state
            required
          />
        </div>

        <button type="submit" style={{ padding: "10px", backgroundColor: "lime" }}>Sign Up</button>
        <p>{message}</p>
        <br/>
        <br/>
        <p>Already have an account? <Link to="/sell-signin">Sign In</Link></p>
      </form>
    </div>
  );
};

export default SellerSignUp;
