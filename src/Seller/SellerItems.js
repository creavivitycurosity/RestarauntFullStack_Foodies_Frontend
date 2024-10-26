// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../pages/Home.css';
// import { jwtDecode } from 'jwt-decode';

// const SellerItems = () => {
//   const [items, setItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/seller', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/delete-seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/seller/items/edit/${id}`);
//   };

//   const handleadd = () => {
//     navigate(`/seller/items/add`);
//   };

//   return (
//     <>
//     <h2>Your Items</h2>
//       <p>{message}</p>
//     <div style={{marginRight:"40%"}} className="cards211">   
//         {items.map(item => (
//             <div className='cards-img1' key={item.id}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//               <h3>{item.name}</h3>
//               <h3>Price: ${item.price}</h3>
//               <button onClick={() => handleEdit(item.id)}>Edit</button>
//               <button onClick={() => handleDelete(item.id)}>Delete</button>
//             </div>
//         ))}
//       <button onClick={handleadd} style={{height:"46px",width:"120px",backgroundColor:"skyblue"}}>Add New Item</button>
//     </div>
//     </>
//   );
// };

// export default SellerItems;

// import React, { useEffect, useState } from 'react';   // working
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../pages/Home.css';
// import { jwtDecode } from 'jwt-decode';
// import SellerImage from './SellerImage';

// const SellerItems = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNameFilter, setItemNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//     fetchCategories();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/seller', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//       setFilteredItems(response.data); // Initialize filteredItems with all items
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/get/category');
//       setCategories(response.data);
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/delete-seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/seller/items/edit/${id}`);
//   };

//   const handleAdd = () => {
//     navigate('/seller/items/add');
//   };

//   const handleItemNameFilterChange = (e) => {
//     setItemNameFilter(e.target.value);
//     filterItems();
//   };

//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     filterItems();
//   };

//   const filterItems = () => {
//     let filteredItems = items;
//     if (itemNameFilter) {
//       filteredItems = filteredItems.filter((item) =>
//         item.name.toLowerCase().startsWith(itemNameFilter.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       filteredItems = filteredItems.filter((item) => item.category.name === categoryFilter);
//     }
//     setFilteredItems(filteredItems);
//   };

//   useEffect(() => {
//     filterItems();
//   }, [itemNameFilter, categoryFilter]);

//   return (
//     <>
//           <SellerImage/>

//       <h2>Your Items</h2><h2>MULTI FILTERS</h2>
//       <p>{message}</p>
//       <div className="filter-container0">
//   <label>Filter by item name:</label>
//   <input
//     type="text"
//     value={itemNameFilter}
//     onChange={handleItemNameFilterChange}
//     placeholder="Filter by item name"
//   />
//   <label>Filter by category:</label>
//   <select value={categoryFilter} onChange={handleCategoryFilterChange}>
//     <option value="">ALL</option>
//     {categories.map((category) => (
//       <option key={category.id} value={category.name}>
//         {category.name}
//       </option>
//     ))}
//   </select>
// </div>
// <button onClick={handleAdd} style={{ height: "46px", width: "180px", backgroundColor: "skyblue",marginLeft:"740px" }}>
//           ADD NEW ITEM
//         </button>
//       <div  className="cards211">

//         {filteredItems.map((item) => (
//           <div className="cards-img1" key={item.id}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//             <h3>{item.name}</h3>
//             <h3>Price: ${item.price}</h3>
//             <h3>Category: {item.category.name}</h3>
//             <button onClick={() => handleEdit(item.id)}>Edit</button>
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </div>
//         ))}

//       </div>
//     </>
//   );
// };

// export default SellerItems;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../pages/Home.css';
// import SellerImage from './SellerImage';

// const SellerItems = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNameFilter, setItemNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [discountPercentage, setDiscountPercentage] = useState('');
//   const [activeDiscountId, setActiveDiscountId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//     fetchCategories();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/seller', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//       setFilteredItems(response.data);
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/get/category');
//       setCategories(response.data);
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/delete-seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/seller/items/edit/${id}`);
//   };

//   const handleAdd = () => {
//     navigate('/seller/items/add');
//   };

//   const handleItemNameFilterChange = (e) => {
//     setItemNameFilter(e.target.value);
//     filterItems();
//   };

//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     filterItems();
//   };

//   const filterItems = () => {
//     let filteredItems = items;
//     if (itemNameFilter) {
//       filteredItems = filteredItems.filter((item) =>
//         item.name.toLowerCase().startsWith(itemNameFilter.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       filteredItems = filteredItems.filter((item) => item.category.name === categoryFilter);
//     }
//     setFilteredItems(filteredItems);
//   };

//   useEffect(() => {
//     filterItems();
//   }, [itemNameFilter, categoryFilter]);

//   const handleDiscountChange = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/update-discount/${id}`, null, {
//         params: { discountPercentage },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount updated successfully!");
//       setActiveDiscountId(id);
//       fetchItems();
//     } catch (error) {
//       setMessage("Error updating discount. Please try again.");
//     }
//   };

//   const handleRemoveDiscount = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/remove-discount/${id}`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount removed successfully!");
//       setActiveDiscountId(null);
//       fetchItems();
//     } catch (error) {
//       setMessage("Error removing discount. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SellerImage />

//       <h2>Your Items</h2><h2>MULTI FILTERS</h2>
//       <p>{message}</p>
//       <div className="filter-container0">
//         <label>Filter by item name:</label>
//         <input
//           type="text"
//           value={itemNameFilter}
//           onChange={handleItemNameFilterChange}
//           placeholder="Filter by item name"
//         />
//         <label>Filter by category:</label>
//         <select value={categoryFilter} onChange={handleCategoryFilterChange}>
//           <option value="">ALL</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleAdd} style={{ height: "46px", width: "180px", backgroundColor: "skyblue", marginLeft: "740px" }}>
//         ADD NEW ITEM
//       </button>
//       <div className="cards211">
//         {filteredItems.map((item) => (
//     <div className="cards-img1" key={item.id} style={{ position: 'relative' }}>
//     <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//     <h3>{item.name}</h3>
//     <h3>
//       Price: 
//       <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//         ${item.previousAmount}
//       </span>
//       {item.discountActive && (
//         <span style={{ display: 'block', color: 'red' }}>
//           ${item.price}
//         </span>
//       )}
//     </h3>
//     {item.discountActive && (
//       <div style={{
//         position: 'absolute', 
//         top: '10px', 
//         right: '10px', 
//         background: 'red', 
//         color: 'white', 
//         borderRadius: '50%', 
//         width: '30px', 
//         height: '30px', 
//         display: 'flex', 
//         alignItems: 'center', 
//         justifyContent: 'center'
//       }}>
//         {item.discountPercentage}%
//       </div>
//     )}
//     <div>
//       {item.id === activeDiscountId ? (
//         <>
//           <input
//             type="number"
//             value={discountPercentage}
//             onChange={(e) => setDiscountPercentage(e.target.value)}
//             placeholder="Discount percentage"
//             style={{ marginRight: '10px' }}
//           />
//           <button onClick={() => handleDiscountChange(item.id)}>Update Discount</button>
//           <button onClick={() => {
//             handleRemoveDiscount(item.id);
//             setActiveDiscountId(null); // Clear the active discount ID
//           }}>Remove Discount</button>
//         </>
//       ) : (
//         <>
//           {!item.discountActive ? (
//             <button onClick={() => {
//               setActiveDiscountId(item.id);
//               setDiscountPercentage('');
//             }}>Add Discount</button>
//           ) : (
//             <button onClick={() => {
//               setActiveDiscountId(item.id);
//             }}>Remove Discount</button>
//           )}
//         </>
//       )}
//     </div>
//     <button onClick={() => handleEdit(item.id)}>Edit</button>
//     <button onClick={() => handleDelete(item.id)}>Delete</button>
//   </div>

//         ))}
//       </div>
//     </>
//   );
// };

// export default SellerItems;


//working discount
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../pages/Home.css';
// import SellerImage from './SellerImage';

// const SellerItems = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNameFilter, setItemNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [discountPercentage, setDiscountPercentage] = useState('');
//   const [activeDiscountId, setActiveDiscountId] = useState(null);
//   const [isEditingDiscount, setIsEditingDiscount] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//     fetchCategories();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/seller', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//       setFilteredItems(response.data);
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/get/category');
//       setCategories(response.data);
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/delete-seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/seller/items/edit/${id}`);
//   };

//   const handleAdd = () => {
//     navigate('/seller/items/add');
//   };

//   const handleItemNameFilterChange = (e) => {
//     setItemNameFilter(e.target.value);
//     filterItems();
//   };

//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     filterItems();
//   };

//   const filterItems = () => {
//     let filteredItems = items;
//     if (itemNameFilter) {
//       filteredItems = filteredItems.filter((item) =>
//         item.name.toLowerCase().startsWith(itemNameFilter.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       filteredItems = filteredItems.filter((item) => item.category.name === categoryFilter);
//     }
//     setFilteredItems(filteredItems);
//   };

//   useEffect(() => {
//     filterItems();
//   }, [itemNameFilter, categoryFilter]);

//   const handleDiscountChange = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/update-discount/${id}`, null, {
//         params: { discountPercentage },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount updated successfully!");
//       setActiveDiscountId(null); // Clear the active discount ID
//       setIsEditingDiscount(false); // Hide the text box after updating
//       fetchItems();
//     } catch (error) {
//       setMessage("Error updating discount. Please try again.");
//     }
//   };

//   const handleRemoveDiscount = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/remove-discount/${id}`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount removed successfully!");
//       setActiveDiscountId(null); // Clear the active discount ID
//       fetchItems();
//     } catch (error) {
//       setMessage("Error removing discount. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SellerImage />
//       <h2>Your Items</h2><h2>MULTI FILTERS</h2>
//       <p>{message}</p>
//       <div className="filter-container0">
//         <label>Filter by item name:</label>
//         <input
//           type="text"
//           value={itemNameFilter}
//           onChange={handleItemNameFilterChange}
//           placeholder="Filter by item name"
//         />
//         <label>Filter by category:</label>
//         <select value={categoryFilter} onChange={handleCategoryFilterChange}>
//           <option value="">ALL</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>




//       <button onClick={handleAdd} style={{ height: "46px", width: "180px", backgroundColor: "skyblue", marginLeft: "740px" }}>
//         ADD NEW ITEM
//       </button>
//       <div className="cards211">
//         {filteredItems.map((item) => (
//           <div className="cards-img1" key={item.id} style={{ position: 'relative' }}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//             <h3>{item.name}</h3>






// <h3>
//   Price:
//   {item.price !== null && item.price !== undefined && !item.discountActive ? (
//     <span>${item.price}</span>
//   ) : (
//     <span></span>
//   )}

//   {item.discountActive && (<>
//      <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//      ${item.previousAmount}
//    </span>
//     <span style={{ display: 'block', color: 'red' }}>
//       ${item.price}
//     </span></>
//   )}
// </h3>







//             {item.discountActive && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 background: 'red',
//                 color: 'white',
//                 borderRadius: '50%',
//                 width: '30px',
//                 height: '30px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 {item.discountPercentage}%
//               </div>
//             )}
//             <div>
//               {item.id === activeDiscountId ? (
//                 <>
//                   {isEditingDiscount ? (
//                     <>
//                       <input
//                         type="number"
//                         value={discountPercentage}
//                         onChange={(e) => setDiscountPercentage(e.target.value)}
//                         placeholder="Discount percentage"
//                         style={{ marginRight: '10px' }}
//                       />
//                       <button onClick={() => handleDiscountChange(item.id)}>Update Discount</button>
//                       <button onClick={() => {
//                         handleRemoveDiscount(item.id);
//                         setActiveDiscountId(null); // Clear the active discount ID
//                         setIsEditingDiscount(false); // Hide the text box after removing discount
//                       }}>Remove Discount</button>
//                     </>
//                   ) : (
//                     <button onClick={() => setIsEditingDiscount(true)}>Edit Discount</button>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {!item.discountActive ? (
//                     <button onClick={() => {
//                       setActiveDiscountId(item.id);
//                       setDiscountPercentage('');
//                       setIsEditingDiscount(true); // Show the text box when adding discount
//                     }}>Add Discount</button>
//                   ) : (
//                     <button onClick={() => handleRemoveDiscount(item.id)}>Remove Discount</button>
//                   )}
//                 </>
//               )}
//             </div>
//             <button onClick={() => handleEdit(item.id)}>Edit</button>
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SellerItems;


import React, { useEffect, useState } from 'react';  //working
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SellerItems.css';
import SellerImage from './SellerImage';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemNameFilter, setItemNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState(''); // New state for discount filter
  const [filteredItems, setFilteredItems] = useState([]);
  const [message, setMessage] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [activeDiscountId, setActiveDiscountId] = useState(null);
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [featuredFilter, setFeaturedFilter] = useState(''); // New state for featured filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState(''); // New state for availability filter
  const [stockFilter, setStockFilter] = useState(''); // New state for stock filte
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [vegFilter, setVegFilter] = useState(''); // State for veg filter

  // Add sellerEmail as a state
  const [sellerEmail, setSellerEmail] = useState('');

  useEffect(() => {
    // Decode the JWT token to extract the seller's email
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.sub;  // Extract the email from the 'sub' field
      setSellerEmail(email);

    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);  // 🆕 Show loader before fetch

      const response = await axios.get(`${BASE_URL}/items/seller`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setIsLoading(false);  // 🆕 Hide loader after fetch

      setItems(response.data);
      setFilteredItems(response.data);
      console.log(items[1])
    } catch (error) {
      setIsLoading(false);  // 🆕 Hide loader after fetch

      setMessage('Error fetching items. Please try again.');
    }
  };



  const fetchCategories = async (restaurantName) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/get/categories/sellers/${restaurantName}`);
      const categories = response.data.map(category => ({
        id: category.id,
        name: category.name
      }));
      setCategories(categories); // Set the categories in state
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  console.log(categories)

  useEffect(() => {
    if (items.length > 0) {
      const restaurantName = items[0].restaurantName; // Fetch the restaurant name from the first item
      fetchCategories(restaurantName);
    }
  }, [items]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/items/delete-seller-items/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Item deleted successfully!');
      fetchItems();
    } catch (error) {
      setMessage('Error deleting item. Please try again.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/seller/items/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/seller/items/add');
  };

  const handleItemNameFilterChange = (e) => {
    setItemNameFilter(e.target.value);
    filterItems();
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    filterItems();
  };

  const handleDiscountFilterChange = (e) => {
    setDiscountFilter(e.target.value);
    filterItems();
  };

  const handleFeaturedFilterChange = (e) => {
    setFeaturedFilter(e.target.value);
    filterItems();
  };

  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
    filterItems();
  };

  const handleStockFilterChange = (e) => {
    setStockFilter(e.target.value);
    filterItems();
  };


  const handleVegFilterChange = (e) => {
    setVegFilter(e.target.value);
    filterItems();
  };

  const filterItems = () => {
    let filteredItems = items;

    if (itemNameFilter) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().startsWith(itemNameFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filteredItems = filteredItems.filter((item) => item.category.name === categoryFilter);
    }

    if (discountFilter) {
      if (discountFilter === 'discount') {
        filteredItems = filteredItems.filter((item) => item.discountActive);
      } else if (discountFilter === 'non-discount') {
        filteredItems = filteredItems.filter((item) => !item.discountActive);
      }
    }


    if (featuredFilter === 'featured') {
      filteredItems = filteredItems.filter((item) => item.featured);
    } else if (featuredFilter === 'non-featured') {
      filteredItems = filteredItems.filter((item) => !item.featured);
    }


    // Filter by availability
    if (availabilityFilter === 'available') {
      filteredItems = filteredItems.filter((item) => item.available); // Assuming available is a boolean
    } else if (availabilityFilter === 'not-available') {
      filteredItems = filteredItems.filter((item) => !item.available);
    }

    // Filter by stock status
    if (stockFilter === 'in-stock') {
      filteredItems = filteredItems.filter((item) => item.quantity > 0);
    } else if (stockFilter === 'out-of-stock') {
      filteredItems = filteredItems.filter((item) => item.quantity === 0);
    }

    // Filter by veg/non-veg
    if (vegFilter === 'veg') {
      filteredItems = filteredItems.filter((item) => item.veg === true);
    } else if (vegFilter === 'non-veg') {
      filteredItems = filteredItems.filter((item) => item.veg === false);
    }

    setFilteredItems(filteredItems);
  };





  useEffect(() => {
    filterItems();
  }, [itemNameFilter, categoryFilter, discountFilter, featuredFilter, availabilityFilter, stockFilter,vegFilter]);

  const handleDiscountChange = async (id) => {
    try {
      await axios.put(`${BASE_URL}/items/update-discount/${id}`, null, {
        params: { discountPercentage },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Discount updated successfully!');
      setActiveDiscountId(null); // Clear the active discount ID
      setIsEditingDiscount(false); // Hide the text box after updating
      fetchItems();
    } catch (error) {
      setMessage('Error updating discount. Please try again.');
    }
  };

  const handleRemoveDiscount = async (id) => {
    try {
      await axios.put(`${BASE_URL}/items/remove-discount/${id}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Discount removed successfully!');
      setActiveDiscountId(null); // Clear the active discount ID
      fetchItems();
    } catch (error) {
      setMessage('Error removing discount. Please try again.');
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <SellerImage />
      <div>
        <h2>Your Items</h2>
        <h2>MULTI FILTERS</h2>
        <h3>{message}</h3>

        {/* Filters Container */}
        <div className="filter-container0" >



          <div >

            {/* Filter by Item Name */}
            <label>search by name:</label>
            <input
              type="text"
              value={itemNameFilter}
              onChange={handleItemNameFilterChange}
              placeholder="Filter by item name"
            />

          </div>


          <div >


            {/* Filter by Category */}
            <label>filter by category:</label>
            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="multi-select3"
            >
              <option value="">ALL</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>



          <div >

            {/* Filter by Discount */}
            <label>filter by discount:</label>
            <select
              value={discountFilter}
              onChange={handleDiscountFilterChange}
              className="multi-select3"
            >
              <option value="">ALL ITEMS</option>
              <option value="discount">DISCOUNT ITEMS</option>
              <option value="non-discount">NON-DISCOUNT ITEMS</option>
            </select>


          </div>



          <div >

            <label>filter by features:</label>
            <select value={featuredFilter}
              onChange={handleFeaturedFilterChange}
              className="multi-select3"
            >

              <option value="">All</option>
              <option value="featured">Featured</option>
              <option value="non-featured">Non-Featured</option>
            </select>

          </div>


          <div >

            {/* Filter by Availability */}
            <label>filter by Availability:</label>
            <select
              value={availabilityFilter}
              onChange={handleAvailabilityFilterChange}
              className="multi-select3"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>


          </div>


          <div >

            {/* Filter by Stock Status */}
            <label>filter by Stock:</label>
            <select
              value={stockFilter}
              onChange={handleStockFilterChange}
              className="multi-select3"
            >
              <option value="">All</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

          </div>

          <div>
            <label>Filter by Veg:</label>
            <select value={vegFilter} onChange={handleVegFilterChange}  className="multi-select3">
              <option value="">All</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>




        </div>
      </div>




      {isLoading ? (  // 🆕 Display loader during fetching
        <div className="loader-container">
          <div className="loader"></div>
          <h2> Loading items...</h2>
        </div>
      ) : (
        <>





          <div style={{ display: "flex", alignItems: "center", width: "95vw", justifyContent: "center", marginBottom: "10px" }} >
            <button onClick={handleAdd} style={{ padding: "15px", backgroundColor: "greenyellow", fontSize: "20px" }} >
              ADD NEW ITEM
            </button>
          </div>


          {paginatedItems.length === 0 ? (
            <div className="no-items-message" style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>No items found.</h2>
            </div>
          ) : (





            <div className="cards212">
              {paginatedItems.map((item) => (
                <div className="cards-img2" key={item.id} style={{ position: 'relative' }}>
                  <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} onClick={() => navigate(`/seller/items-info/${item.id}`)} />
                  <h3>{item.name}</h3>

                  <h3>
                    Price:
                    {item.price !== null && item.price !== undefined && !item.discountActive ? (
                      <span>₹{item.price}</span>
                    ) : (
                      <span></span>
                    )}
                    {item.discountActive && (
                      <>
                        <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
                          ₹{item.previousAmount}
                        </span>
                        <span style={{ display: 'block', color: 'red' }}>₹{item.price}</span>
                      </>
                    )}
                  </h3>



                  {item.discountActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.discountPercentage}%
                    </div>
                  )}
                  <div>
                    {item.id === activeDiscountId ? (
                      <>
                        {isEditingDiscount ? (
                          <>
                            <input
                              type="number"
                              value={discountPercentage}
                              onChange={(e) => setDiscountPercentage(e.target.value)}
                              placeholder="Discount percentage"
                              style={{ marginRight: '10px' }}
                              className='dis-input'
                            />
                            <button className='dis-update' onClick={() => handleDiscountChange(item.id)}>Update Discount</button>
                            <button
                              onClick={() => {
                                handleRemoveDiscount(item.id);
                                setActiveDiscountId(null); // Clear the active discount ID
                                setIsEditingDiscount(false); // Hide the text box after removing discount
                              }}
                              className='dis-delete'
                            >
                              Remove Discount
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setIsEditingDiscount(true)}>Edit Discount</button>
                        )}
                      </>
                    ) : (
                      <>
                        {!item.discountActive ? (
                          <button
                            onClick={() => {
                              setActiveDiscountId(item.id);
                              setDiscountPercentage('');
                              setIsEditingDiscount(true); // Show the text box when adding discount
                            }}
                          >
                            Add Discount
                          </button>
                        ) : (
                          <button onClick={() => handleRemoveDiscount(item.id)}>Remove Discount</button>
                        )}
                      </>
                    )}
                  </div>
                  <div className='add-edit-b'>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => navigate(`/seller/items-info/${item.id}`)}>Details</button>
                  </div>

                </div>
              ))}
            </div>


          )}



          {/* Pagination Component */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>



        </>
      )}

    </>
  );
};

export default SellerItems;












































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../pages/Home.css';
// import SellerImage from './SellerImage';

// const SellerItems = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNameFilter, setItemNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [discountPercentage, setDiscountPercentage] = useState('');
//   const [activeDiscountId, setActiveDiscountId] = useState(null);
//   const [isEditingDiscount, setIsEditingDiscount] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//     fetchCategories();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/seller', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//       setFilteredItems(response.data);
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/get/category');
//       setCategories(response.data);
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/delete-seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/seller/items/edit/${id}`);
//   };

//   const handleAdd = () => {
//     navigate('/seller/items/add');
//   };

//   const handleItemNameFilterChange = (e) => {
//     setItemNameFilter(e.target.value);
//     filterItems();
//   };

//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     filterItems();
//   };

//   const filterItems = () => {
//     let filteredItems = items;
//     if (itemNameFilter) {
//       filteredItems = filteredItems.filter((item) =>
//         item.name.toLowerCase().startsWith(itemNameFilter.toLowerCase())
//       );
//     }
//     if (categoryFilter) {
//       filteredItems = filteredItems.filter((item) => item.category.name === categoryFilter);
//     }
//     setFilteredItems(filteredItems);
//   };

//   useEffect(() => {
//     filterItems();
//   }, [itemNameFilter, categoryFilter]);

//   const handleDiscountChange = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/update-discount/${id}`, null, {
//         params: { discountPercentage },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount updated successfully!");
//       setActiveDiscountId(null); // Clear the active discount ID
//       setIsEditingDiscount(false); // Hide the text box after updating
//       fetchItems();
//     } catch (error) {
//       setMessage("Error updating discount. Please try again.");
//     }
//   };

//   const handleRemoveDiscount = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/items/remove-discount/${id}`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Discount removed successfully!");
//       setActiveDiscountId(null); // Clear the active discount ID
//       setIsEditingDiscount(false); // Hide the text box after removing discount
//       fetchItems();
//     } catch (error) {
//       setMessage("Error removing discount. Please try again.");
//     }
//   };

//   return (
//     <>
//       <SellerImage />
//       <h2>Your Items</h2><h2>MULTI FILTERS</h2>
//       <p>{message}</p>
//       <div className="filter-container0">
//         <label>Filter by item name:</label>
//         <input
//           type="text"
//           value={itemNameFilter}
//           onChange={handleItemNameFilterChange}
//           placeholder="Filter by item name"
//         />
//         <label>Filter by category:</label>
//         <select value={categoryFilter} onChange={handleCategoryFilterChange}>
//           <option value="">ALL</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.name}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleAdd} style={{ height: "46px", width: "180px", backgroundColor: "skyblue", marginLeft: "740px" }}>
//         ADD NEW ITEM
//       </button>
//       <div className="cards211">
//         {filteredItems.map((item) => (
//           <div className="cards-img1" key={item.id} style={{ position: 'relative' }}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//             <h3>{item.name}</h3>
//             <h3>
//               Price:
//               <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//                 ${item.previousAmount}
//               </span>
//               {item.discountActive && (
//                 <span style={{ display: 'block', color: 'red' }}>
//                   ${item.price}
//                 </span>
//               )}
//             </h3>
//             {item.discountActive && (
//               <div style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 background: 'red',
//                 color: 'white',
//                 borderRadius: '50%',
//                 width: '30px',
//                 height: '30px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 {item.discountPercentage}%
//               </div>
//             )}
//             <div>
//   {item.id === activeDiscountId && isEditingDiscount ? (
//     <>
//       <input
//         type="number"
//         value={discountPercentage}
//         onChange={(e) => setDiscountPercentage(e.target.value)}
//         placeholder="Discount percentage"
//         style={{ marginRight: '10px' }}
//       />
//       <button onClick={() => handleDiscountChange(item.id)}>Update Discount</button>
//     </>
//   ) : (
//     <>
//       {item.id === activeDiscountId ? (
//         <button onClick={() => setIsEditingDiscount(true)}>Edit Discount</button>
//       ) : (
//         !item.discountActive && (
//           <button onClick={() => {
//             setActiveDiscountId(item.id);
//             setDiscountPercentage('');
//             setIsEditingDiscount(true); // Show the text box when adding discount
//           }}>Add Discount</button>
//         )
//       )}
//       {item.id === activeDiscountId && item.discountActive && !isEditingDiscount && (
//         <>
//           <button onClick={() => setIsEditingDiscount(true)}>Update Discount</button>
//           <button onClick={() => handleRemoveDiscount(item.id)}>Remove Discount</button>
//         </>
//       )}
//     </>
//   )}
// </div>
//             <button onClick={() => handleEdit(item.id)}>Edit</button>
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default SellerItems;
