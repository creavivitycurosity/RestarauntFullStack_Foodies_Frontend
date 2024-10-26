import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ".././index.css"
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    // Calculate 10% of the viewport height
    const scrollToPosition = window.innerHeight * 0.1; // 10% of the viewport height
    // Scroll to the calculated position
    window.scrollTo(0, scrollToPosition);
  }, []); // Empty dependency array to run on component mount


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email ||!password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/auth/signin`, {
        email,
        password,
      });

      if (response.data.error) {
        throw new Error(response.data.error); // Throw an error with the error message
      } else {
        const token = response.data.token;
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        const decodedToken = jwtDecode(token); // <--- Decode the JWT token
        const role = decodedToken.role; // <--- Extract the role from the decoded token

        if (role === 'ADMIN') {
          navigate('/admin/homepage'); // Redirect to admin homepage
        } 
        else if(role === 'SELLER'){
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.alert("please sign in seller signin page this is only for user and admin")
       
          navigate('/sell-signin')
        }else {
          navigate('/'); // Redirect to user homepage
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Bad credentials') {
        setError('Wrong credentials');
      } else {
        console.error(error.message);
        setError(error.message);
      }
      return;
    }
  };

  return (
    <>
    <div style={{ marginTop: "24vh" }}></div>
    <h1>USER AND ADMIN </h1>
    <div className="signin-container" style={{paddingRight:"35px"}}>
    <div className="signin-header">
      <h3>Sign In</h3>
      <hr />
    </div>
    <form className="signin-form" onSubmit={handleSubmit}>
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
          placeholder="password"

          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="form-actions">
        <button type="submit">Sign In</button>
        <button className="bt">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </form>
        <h3>ARE YOU A SELLER ?</h3><br/>

    <div className='seller-button'>
    {/* <h3>ARE YOU A SELLER ?</h3><br/> */}
    <div style={{display:"flex"}}>
    <button className="bt2" style={{backgroundColor:"limegreen"}}>
          <Link style={{backgroundColor:"limegreen"}} to="/sell-signin">Sign in</Link>
        </button>
        <button className="bt2" style={{backgroundColor:"limegreen"}}>
          <Link style={{backgroundColor:"limegreen"}} to="/sell-signup"> Sign up</Link>
        </button>
        </div>

        </div>
  </div>
  </>
  );
};

export default SignIn;