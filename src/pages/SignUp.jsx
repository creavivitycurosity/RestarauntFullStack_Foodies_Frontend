// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import ".././index.css"

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [reEnterPassword, setReEnterPassword] = useState('');


//   const navigate = useNavigate(); // Add this line

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }
//     if (password!== reEnterPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/signup`, {
//         email,
//         password,
//       });

//       console.log(response.data);
//       window.alert("SIGNUP SUCCESSFUL PLEASE SIGNIN")
//       navigate('/signin'); // Now navigate is defined
//       // handle successful sign-up response
//     } catch (error) {
//       console.error(error.response.data);
//       // handle error response
//     }
//   };

//   return (
//     <>
//     <div style={{ marginTop: "24vh" }}></div>
//     <div className="signup-container" style={{paddingRight:"35px"}}>
//     <h3>Sign Up</h3>
//     <hr />
//     <form className="signup-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="email">E-MAIL</label>
//         <input
//           id="email"
//           placeholder="Email"

//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">PASSWORD</label>
//         <input
//           id="password"
//           placeholder="password"

//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="reEnterPassword">RE-ENTER PASSWORD</label>
//         <input
//           id="reEnterPassword"
//           placeholder="Confirm Password"

//           type="password"
//           value={reEnterPassword}
//           onChange={(e) => setReEnterPassword(e.target.value)}
//           required
//         />
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       <div className="form-actions">
//         <button type="submit">Sign Up</button>
//         <button className="bt">
//           <Link to="/signin">Sign In</Link>
//         </button>
//       </div>
//     </form>
//   </div>
//   </>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ".././index.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  // const [address, setAddress] = useState(''); // New field
  const [error, setError] = useState(null);
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name ) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== reEnterPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
        name,
        // address, // Include address in the request
      });

      console.log(response.data);
      window.alert("SIGNUP SUCCESSFUL PLEASE SIGNIN");
      navigate('/signin');
    } catch (error) {
      console.error(error.response.data);
      // handle error response
    }
  };

  return (
    <>
      <div style={{ marginTop: "24vh" }}></div>
      <div className="signup-container" style={{ paddingRight: "35px" }}>
      <h3>User Sign Up</h3>
        <hr />
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input
              id="name"
              placeholder="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="reEnterPassword">RE-ENTER PASSWORD</label>
            <input
              id="reEnterPassword"
              placeholder="Confirm Password"
              type="password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="address">ADDRESS</label> 
            <input
              id="address"
              placeholder="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div> */}
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit">Sign Up</button>
            <button className="bt">
              <Link to="/signin">Sign In</Link>
            </button>
          </div>
        </form>

        <h4>ARE YOU A SELLER ?</h4><br/>

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

export default SignUp;
 