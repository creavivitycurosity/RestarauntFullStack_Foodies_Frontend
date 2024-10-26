// import React, { useState, useEffect } from 'react';
// import './Navbar.css';
// import logo from '../assests/logo.jpg';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Corrected the import for jwt-decode
// import axios from 'axios';
// import useDebounce from '../pages/useDebounce';

// const Navbar = ({ cart ,setRole}) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const debouncedQuery = useDebounce(searchQuery, 300);

//   const cartCount = cart && cart.length > 0 ? cart.length : 0;


//   useEffect(() => {
//     if (debouncedQuery) {
//       axios.get(`http://localhost:8080/items/search?query=${debouncedQuery}`)
//         .then(response => {
//           setSuggestions(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching suggestions:', error);
//         });
//     } else {
//       setSuggestions([]);
//     }
//   }, [debouncedQuery]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     // setRole(null);

//     navigate('/signin');
//   };

//   let a = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken) {
//         a = "homepage";
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   const handleSuggestionClick = (itemId) => {
//     navigate(`/item/${itemId}`);
//     setSuggestions([]);
//   };

//   const highlightMatch = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="highlight">{part}</span>
//       ) : (
//         part
//       )
//     );
//   };

//   const handleSearch = () => {
//     if (suggestions.length > 0) {
//       navigate(`/item/${suggestions[0].id}`);
//       setSuggestions([]);
//     }
//   };

//   return (
//     <nav>
//       <Link className='logo'>
//         <img src={logo} alt='' />
//       </Link>
//       <ul>
//         <li><Link to='/'>HOME</Link></li>
//         <li><Link to='/menu3'>MENU</Link></li>
//         <li><Link to='/contact'>CONTACT</Link></li>
//         <li><Link to='/about'>ABOUT</Link></li>
//         <li><Link to='/cart'>
//         CART {cartCount !== null && <span>({cartCount})</span>}
//           </Link></li>
//         <li>
//           <div className="search-container">
//             <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 size={40}
//                 placeholder="Search"
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="btn btn-outline-success btext" type="submit"><b>Search</b></button>
//             </form>
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion.id)}>
//                     {highlightMatch(suggestion.name, debouncedQuery)}
//                   </li>))}
//               </ul>
//             )}
//           </div>
//         </li>
//         {a === "homepage" ? (
//           <>
//           <li><button onClick={logout}>Logout</button></li>
//           <li><Link to='/my-orders'>MY ORDERS</Link></li>

//           </>
//         ) : (
//           <>
//             <li><Link to='/signup'>SIGNUP</Link></li>
//             <li><Link to='/signin'>SIGNIN</Link></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import './Navbar.css';
// import logo from '../assests/logo.jpg';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Corrected the import for jwt-decode
// import axios from 'axios';
// import useDebounce from '../pages/useDebounce';

// const Navbar = ({ cart, setRole }) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const debouncedQuery = useDebounce(searchQuery, 300);

//   const cartCount = cart && cart.length > 0 ? cart.length : 0;

//   useEffect(() => {
//     if (debouncedQuery) {
//       axios.get(`http://localhost:8080/items/search?query=${debouncedQuery}`)
//         .then(response => {
//           setSuggestions(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching suggestions:', error);
//         });
//     } else {
//       setSuggestions([]);
//     }
//   }, [debouncedQuery]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     navigate('/signin');
//   };

//   let a = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken) {
//         a = "homepage";
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   const handleSuggestionClick = (itemId) => {
//     navigate(`/item/${itemId}`);
//     setSuggestions([]);
//   };

//   const highlightMatch = (text, query) => {
//     if (!query) return text;
//     const parts = text.split(new RegExp(`(${query})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="highlight">{part}</span>
//       ) : (
//         part
//       )
//     );
//   };

//   const handleSearch = () => {
//     if (suggestions.length > 0) {
//       navigate(`/item/${suggestions[0].id}`);
//       setSuggestions([]);
//     }
//   };

//   return (
//     <nav>
//       <Link className='logo'>
//         <img src={logo} alt='' />
//       </Link>
//       <ul>
//         <li><Link to='/'>HOME</Link></li>
//         <li><Link to='/menu3'>MENU</Link></li>
//         <li><Link to='/contact'>CONTACT</Link></li>
//         <li><Link to='/about'>ABOUT</Link></li>
//         <li className="dropdown">
//           <Link to='/Categories'>CATEGORIES</Link>
//           {/* <div className="dropdown-content">
//             <Link to='/categories/biryani'>Biryani</Link>
//             <Link to='/categories/salads'>Salads</Link>
//             <Link to='/categories/desserts'>Desserts</Link>
//           </div> */}
//         </li>
//         <li><Link to='/cartpage'>
//           CART {cartCount !== null && <span>({cartCount})</span>}
//         </Link></li>
//         <li>
//           <div className="search-container">
//             <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 size={40}
//                 placeholder="Search"
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="btn btn-outline-success btext" type="submit"><b>Search</b></button>
//             </form>
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion.id)}>
//                     {highlightMatch(suggestion.name, debouncedQuery)}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </li>
//         {a === "homepage" ? (
//           <>
//             <li><button style={{backgroundColor:"lime"}} onClick={logout}>LOGOUT</button></li>
//             <li><Link to='/my-orders'>ORDERS</Link></li>
//           </>
//         ) : (
//           <>
//             <li><Link to='/signin'>SIGNIN</Link></li>
//             <li><Link to='/sell-signin'>SELLER SIGNIN</Link></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;












// import React, { useState, useEffect } from 'react';
// import './Navbar.css';
// import logo from '../assests/logo.jpg';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';
// import useDebounce from '../pages/useDebounce';
// import { FaHome, FaList, FaEnvelope, FaInfoCircle, FaShoppingCart, FaSearch, FaSignInAlt, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';

// const Navbar = ({ cart, setRole }) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const [items, setItems] = useState([]);
//   const debouncedQuery = useDebounce(searchQuery, 300);

//   const cartCount = cart && cart.length > 0 ? cart.length : 0;

//   useEffect(() => {
//     if (debouncedQuery) {
//       console.log(`Fetching suggestions for query: ${debouncedQuery}`);
//       axios.get(`http://localhost:8080/items/search?query=${debouncedQuery}`)
//         .then(response => {
//           console.log('Suggestions fetched:', response.data);
//           setSuggestions(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching suggestions:', error);
//         });
//     } else {
//       setSuggestions([]);
//     }
//   }, [debouncedQuery]);


//   // useEffect(() => {   // us this if you have same category names like duplicate
//   //   console.log('Fetching categories');
//   //   axios.get('http://localhost:8080/items/get/category')
//   //     .then(response => {
//   //       const uniqueCategories = response.data.filter((category, index, self) =>
//   //         index === self.findIndex((c) => c.name.toLowerCase() === category.name.toLowerCase())
//   //       );
//   //       console.log('Unique categories fetched:', uniqueCategories);
//   //       setCategories(uniqueCategories);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching categories:', error);
//   //     });
//   // }, []);



//   useEffect(() => {
//     console.log('Fetching categories');
//     axios.get('http://localhost:8080/items/get/category')
//       .then(response => {
//         console.log('Categories fetched:', response.data);
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   // useEffect(() => {
//   //   if (hoveredCategory !== null) {
//   //     console.log(`Fetching items for category: ${hoveredCategory}`);
//   //     axios.get(`http://localhost:8080/items/category/${hoveredCategory}`)
//   //       .then(response => {
//   //         console.log('Items fetched:', response.data);
//   //         setItems(response.data);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error fetching items:', error);
//   //       });
//   //   } else {
//   //     setItems([]);
//   //   }
//   // }, [hoveredCategory]);

//   useEffect(() => {
//     if (hoveredCategory !== null) {
//       console.log(`Fetching items for category: ${hoveredCategory}`);
//       axios.get(`http://localhost:8080/items/category/${hoveredCategory}`)
//         .then(response => {
//           const uniqueItems = response.data.filter((item, index, self) =>
//             index === self.findIndex((i) => i.name.toLowerCase() === item.name.toLowerCase())
//           );
//           console.log('Unique items fetched:', uniqueItems);
//           setItems(uniqueItems);
//         })
//         .catch(error => {
//           console.error('Error fetching items:', error);
//         });
//     } else {
//       setItems([]);
//     }
//   }, [hoveredCategory]);


//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     navigate('/signin');
//   };

//   let a = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       if (decodedToken) {
//         a = "homepage";
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   const handleSuggestionClick = (itemId) => {
//     navigate(`/item/${itemId}`);

//     setSuggestions([]);
//   };

//   const highlightMatch = (text, query) => {
//     if (!query) return text;
//     const index = text.toLowerCase().indexOf(query.toLowerCase());
//     if (index === 0) {
//       return (
//         <span>
//           <span className="highlight">{text.substring(0, query.length)}</span>
//           {text.substring(query.length)}
//         </span>
//       );
//     }
//     return text;
//   };


//   const handleSearch = () => {
//     if (suggestions.length > 0) {
//     navigate(`/search-results/${searchQuery}`);
//       setSuggestions([]);
//     }
//   };

//   return (
//     <nav>
//       {/* <Link className='logo'>
//         <img src={logo} alt='' />
//       </Link> */}
//       <ul>
//         <li ><h2 style={{color:"lime"}}>FOODIFY</h2></li>
//         <li>
//           <Link to='/'>
//             <FaHome /> &nbsp;HOME
//           </Link>
//         </li>
//         <li>
//           <Link to='/Categories'>
//             <FaList /> &nbsp;CATEGORIES
//           </Link>
//         </li>
//         <li className="dropdowns">
//           <Link to='/'>
//             <FaList />  &nbsp;MENU LIST
//           </Link>
//           <div className="dropdown-contents">
//             {categories.map(category => (
//               <div key={category.id} className="category-itemss"
//                 onMouseEnter={() => {
//                   console.log(`Hovered over category: ${category.name}`);
//                   setHoveredCategory(category.id);
//                 }}
//                 onMouseLeave={() => {
//                   console.log(`Mouse left category: ${category.name}`);
//                   setHoveredCategory(null);
//                 }}
//               >
//                 {category.name.toUpperCase()}
//                 {hoveredCategory === category.id && (
//                   <div className="sub-dropdown-contents">
//                     {items.map(item => (
//                       <div key={item.id} onClick={() => {
//                         console.log(`Clicked on item: ${item.name}`);
//                         setHoveredCategory(null);
//                         navigate(`/search-results/${item.name}`);
//                         // navigate(`/item/${item.id}`);
//                       }}>
//                         {item.name.toUpperCase()}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </li>
//         {/* <li>
//           <Link to='/contact'>
//             <FaEnvelope /> CONTACT
//           </Link>
//         </li> */}
//         <li>
//           <Link to='/about'>
//             <FaInfoCircle />  &nbsp;ABOUT
//           </Link>
//         </li>
//         <li>
//           <Link to='/cartpage'>
//             <FaShoppingCart />  &nbsp;CART {cartCount !== null && <span>({cartCount})</span>}
//           </Link>
//         </li>
//         <li>
//           <div className="search-container">
//             <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
//               <input
//                 className="form-control me-2 sa"
//                 type="search"
//                 size={40}
//                 placeholder="Search"
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}              
//               />
//               {searchQuery.length === 0 && <FaSearch className='ss' />}
//               <button className="btn btn-outline-success btext" type="submit"><b> Search</b></button>
//             </form>
//             {suggestions.length > 0 && (
//               <ul className="suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion.id)}>
//                   <img src={`data:image/jpeg;base64,${suggestion.image}`} alt={suggestion.name} className='simage'/>
//                   <div> 
//                    <h3>{highlightMatch(suggestion.name, debouncedQuery)}</h3>  
//                     <h5>{suggestion.sellerName}</h5>
//                     </div>

//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </li>
//         {a === "homepage" ? (
//           <>
//             <li>
//               <button style={{ backgroundColor: "lime" }} onClick={logout}>
//                 <FaSignOutAlt /> LOGOUT
//               </button>
//             </li>
//             <li>
//               <Link to='/my-orders'>
//                 <FaClipboardList /> ORDERS
//               </Link>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link to='/signin'>
//                 <FaSignInAlt /> &nbsp;SIGNIN
//               </Link>
//             </li>
//             <li>
//               <Link to='/sell-signin'>
//                 <FaSignInAlt /> &nbsp;SELLER SIGNIN
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assests/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import useDebounce from '../pages/useDebounce';
import { FaHome, FaList, FaEnvelope, FaInfoCircle, FaShoppingCart, FaSearch, FaSignInAlt, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Navbar = ({ cart, setRole }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For suggestions dropdown

  const debouncedQuery = useDebounce(searchQuery, 300);
  const dropdownRef = useRef(null);

  const cartCount = cart && cart.length > 0 ? cart.length : 0;

  useEffect(() => {
    if (debouncedQuery) {
      console.log(`Fetching suggestions for query: ${debouncedQuery}`);
      axios.get(`${BASE_URL}/items/searchingjava?query=${debouncedQuery}`)
        .then(response => {
          console.log('Suggestions fetched:', response.data);
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    console.log('Fetching categories');
    axios.get(`${BASE_URL}/items/get/category`)
      .then(response => {
        console.log('Categories fetched:', response.data);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (hoveredCategory !== null) {
      console.log(`Fetching items for category: ${hoveredCategory}`);
      axios.get(`${BASE_URL}/items/category/${hoveredCategory}`)
        .then(response => {
          const uniqueItems = response.data.filter((item, index, self) =>
            index === self.findIndex((i) => i.name.toLowerCase() === item.name.toLowerCase())
          );
          console.log('Unique items fetched:', uniqueItems);
          setItems(uniqueItems);
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    } else {
      setItems([]);
    }
  }, [hoveredCategory]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.seller) {
      navigate(`/selle-categories-items/${suggestion.restaurantName}`);  // Navigate to seller's page
    } else {
      navigate(`/item/${suggestion.itemId}`);  // Navigate to item details
    }
    setSuggestions([]);
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === 0) {
      return (
        <span>
          <span className="highlight">{text.substring(0, query.length)}</span>
          {text.substring(query.length)}
        </span>
      );
    }
    return text;
  };

  const handleSearch = () => {
    navigate(`/search-results/${searchQuery}`);
    console.log("search",)
    setSuggestions([]);

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

  const [theme, setTheme] = useState('dark'); // Global theme state


  const toggleTheme = (event) => {
    event.stopPropagation(); // Prevents the click from triggering the parent onClick

    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const logoColor = theme === 'light' ? 'lime' : '#007bff';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className='nav-nav'>
      {/* Toggle Button for Mobile */}
      <div>

        <div className="menu-icon" onClick={handleToggleMenu}>
          <span >{isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}</span>

          <h2
            onClick={toggleTheme}
            style={{ color: logoColor, margin: "0 auto" }}>
            FOODIES
          </h2>

          <div class="spacer"></div>


        </div>






        <div>
          {/* mobile view */}
          <div className="search-containers" >
            <form style={{ display: "flex", marginTop: "45px", justifyContent: "center" }} className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                className="form-control me-2 sa"
                type="search"
                size={20}
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* {searchQuery.length === 0 && <FaSearch className='ss' />} */}
              {/* <span className="icon">🔍</span> */}
              <button style={{ marginRight: "0px", left: "1px", top: "0px", height: "40px" }} id='search-btn2' className="btn btn-outline-success btext" type="submit" onClick={() => setIsMenuOpen(false)}><b> Search</b></button>
            </form>
            {suggestions.length > 0 && (
              <ul className="suggestions" ref={dropdownRef}>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} onTouchStart={() => handleSuggestionClick(suggestion)} // Ensure it works on mobile
                  >
                    {suggestion.image && <img src={`data:image/jpeg;base64,${suggestion.image}`} alt={suggestion.name} className='simage' />}
                    <div>
                      <h3>{highlightMatch(suggestion.name, debouncedQuery)}</h3>
                      <h5>{suggestion.seller ? "Seller" : suggestion.restaurantName}</h5>


                      <h3>
                        {!suggestion.seller && (
                          <>
                            Price:
                            {suggestion.price !== null && suggestion.price !== undefined && !suggestion.discountActive ? (
                              <span>₹{suggestion.price}</span>
                            ) : (
                              <span></span>
                            )}
                            {suggestion.discountActive && (
                              <>
                                <span style={{ textDecoration: suggestion.discountActive ? 'line-through' : 'none' }}>
                                  ₹{suggestion.previousAmount}
                                </span>
                                <span style={{ display: 'block', color: 'red' }}>₹{suggestion.price}</span>
                              </>
                            )}
                          </>
                        )}
                      </h3>



                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>





      </div>


      <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
        {/* <h2 style={{ color: "#32CD32 " ,position:"relative",top:"10px"}}>FOODIFY</h2> */}
        <h2 onClick={toggleTheme} style={{ color: logoColor, position: "relative", top: "10px", cursor: "pointer" }}>FOODIES</h2>

        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/'>
            <FaHome /> &nbsp;HOME
          </Link>
        </li>
        <li onClick={() => setIsMenuOpen(false)}>
          <Link to='/Categories'>
            <FaList /> &nbsp;CATEGORIES
          </Link>
        </li>






        <li className="dropdowns menuu" >
          <Link to='/'>
            <FaList />  &nbsp;MENU LIST
          </Link>
          <div className="dropdown-contents" >
            {categories.map(category => (
              <div key={category.id}
                onClick={(e) => {
                  e.stopPropagation(); // Add this line
                  navigate(`/category/${category.id}`);
                }}
                className="category-itemss"
                onMouseEnter={() => {
                  console.log(`Hovered over category: ${category.name}`);
                  setHoveredCategory(category.id);
                }}
                onMouseLeave={() => {
                  console.log(`Mouse left category: ${category.name}`);
                  setHoveredCategory(null);
                }}
              >
                {category.name.toUpperCase()}
                {hoveredCategory === category.id && (
                  <div className="sub-dropdown-contents" style={{ maxHeight: "400px", overflow: "hidden", overflowY: "auto" }}>
                    {items.map(item => (
                      <div key={item.id} onClick={(e) => {
                        e.stopPropagation(); // Add this line
                        console.log(`Clicked on item: ${item.name}`);
                        setHoveredCategory(null);
                        navigate(`/search-results/${item.name}`, { replace: true });
                      }}>
                        {item.name.toUpperCase()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </li>




















        <li>
          <Link to='/offers' onClick={() => setIsMenuOpen(false)}>
            <FaInfoCircle />  &nbsp;OFFERS
          </Link>
        </li>
        <li>
          <Link to='/cartpage' onClick={() => setIsMenuOpen(false)}>
            <FaShoppingCart />  &nbsp;CART {cartCount !== null &&
              <span style={{ display: 'inline-block', color: 'inherit', fontSize: 'inherit' }}>
                ({cartCount})
              </span>}
          </Link>
        </li>
        <li>
          <div className="search-container">
            <form className="d-flex" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                className="form-control me-2 sa"
                type="search"
                size={40}
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

              />
              {/* {searchQuery.length === 0 && <FaSearch className='ss' />} */}
              <button className="btn btn-outline-success btext" type="submit" onClick={() => setIsMenuOpen(false)}><b> Search</b></button>
            </form>
            {suggestions.length > 0 && (
              <ul className="suggestions" ref={dropdownRef}>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} onTouchStart={() => handleSuggestionClick(suggestion)} // Ensure it works on mobile
                  >
                    {suggestion.image && <img src={`data:image/jpeg;base64,${suggestion.image}`} alt={suggestion.name} className='simage' />}
                    <div>
                      <h3>{highlightMatch(suggestion.name, debouncedQuery)}</h3>
                      <h5>{suggestion.seller ? "Seller" : suggestion.restaurantName}</h5>
                      <h3>
                        {!suggestion.seller && (
                          <>
                            Price:
                            {suggestion.price !== null && suggestion.price !== undefined && !suggestion.discountActive ? (
                              <span>₹{suggestion.price}</span>
                            ) : (
                              <span></span>
                            )}
                            {suggestion.discountActive && (
                              <>
                                <span style={{ textDecoration: suggestion.discountActive ? 'line-through' : 'none' }}>
                                  ₹{suggestion.previousAmount}
                                </span>
                                <span style={{ display: 'block', color: 'red' }}>₹{suggestion.price}</span>
                              </>
                            )}
                          </>
                        )}
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>

        {a === "homepage" ? (
          <>


            {/* Profile with Dropdown */}
            <li className="nav-item profile">
              <span className="profile-link">
                <FaUserCircle /> &nbsp; PROFILE
              </span>
              <ul className="dropdown">
                <li>
                  <Link to='/details' onClick={() => setIsMenuOpen(false)}>
                    <FaUserCircle /> &nbsp; ACCOUNT
                  </Link>
                </li>

                <li>
                  <Link to='/favorites' onClick={() => setIsMenuOpen(false)}>
                    <FaInfoCircle /> &nbsp; FAVORITES
                  </Link>
                </li>
                <li>
                  <Link to='/my-orders' onClick={() => setIsMenuOpen(false)}>
                    <FaClipboardList /> &nbsp; ORDERS
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <button
                onClick={logout}
                className="logoutButton"
              // style={{backgroundColor:"aquamarine"}}
              >
                <FaSignOutAlt size={20} /> &nbsp; LOGOUT
              </button>

            </li>
          </>
        ) : (
          <>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link to='/signin'>
                <FaSignInAlt /> &nbsp;SIGNIN
              </Link>
            </li>
            <li className='selle-ques' onClick={() => setIsMenuOpen(false)}>
              <Link to='/sell-signin'>
                <FaSignInAlt /> &nbsp;SELLER SIGNIN
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
