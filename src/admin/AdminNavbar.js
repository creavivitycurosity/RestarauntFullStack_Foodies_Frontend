import React, { useState, useEffect,useRef } from 'react';
import './AdminNavbar.css';
import logo from '../assests/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected the import for jwt-decode
import axios from 'axios';
import useDebounce from '../pages/useDebounce';
import { FaBars, FaTimes } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminNavbar = ({ cart, setRole }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedQuery) {
      axios.get(`${BASE_URL}/items/search?query=${debouncedQuery}`)
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // setRole(null);

    navigate('/signin');
  };

  let a = null;
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        a = "homepage";
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  const handleSuggestionClick = (itemId) => {
    navigate(`/item/${itemId}`);
    setSuggestions([]);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      navigate(`/item/${suggestions[0].id}`);
      setSuggestions([]);
    }
  };





  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle for mobile menu

  const menuRef = useRef(null); // Reference to detect clicks outside the menu

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




  return (
    <nav>



      
            {/* Toggle Button for Mobile */}
            <div>

<div className="menu-icon" onClick={handleToggleMenu}>
<span >{isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</span> 

  <h2 >FOODIES</h2>
  <div class="spacer"></div>  

</div>






</div>
      {/* <Link className='logo'>
        <img src={logo} alt='' />
      </Link> */}
      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/homepage'>HOME</Link></li>
        {/* <li><Link to='/menu3'>MENU</Link></li> */}
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/OrderStatusSegregation'>ORDERS DASHBOARD</Link></li>
        {/* <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/OrderStatusAll'>STATUS CHANGE</Link></li> */}
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/dashboard'>ORDERS SALES</Link></li>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/admindashboard'>ADMIN DASHBOARD</Link></li>
        {/* <li><Link to='/admin/addcategory'>ADD CATEGORY</Link></li> */}
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/seller-info'>SELLER ORDERS</Link></li>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/user-order-info'>USER ORDERS</Link></li>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/user-info'>ACCOUNTS</Link></li>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/couponManagement'>COUPONS</Link></li>
        <li onClick={() => setIsMenuOpen(false)}><Link to='/admin/selle-SellerList'>SELLERS PAYOUT</Link></li>

        

        {/* <li><Link to='/cart'>
        CART <span>({cart && cart.length ? cart.length : 0})</span>
          </Link></li> */}

        <li>
          <div className="search-container">
            {/* <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                className="form-control me-2"
                type="search"
                size={40}
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-success btext" type="submit"><b>Search</b></button>
            </form> */}

            {/* <form className="d-flex" role="search" >
              <input
                className="form-control me-2"
                type="search"
                size={40}
                placeholder="Search"              
              />
              <button className="btn btn-outline-success btext" type="submit"><b>Search</b></button>
            </form>

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion.id)}>
                    {highlightMatch(suggestion.name, debouncedQuery)}
                  </li>))}
              </ul>
            )} */}
          </div>
        </li>
        {a === "homepage" ? (
          <>
            <li><button className='adm-logout' style={{backgroundColor:"lime"}} onClick={logout}>LOGOUT</button></li>
            {/* <li><Link to='/my-orders'>MY ORDERS</Link></li> */}

          </>
        ) : (
          <>
            <li><Link to='/signup'>SIGNUP</Link></li>
            <li><Link to='/signin'>SIGNIN</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default AdminNavbar;