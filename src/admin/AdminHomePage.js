// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AdminHomePage.css';
// import Footer from '../pages/Footer';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const AdminHomePage = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [itemNameFilter, setItemNameFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [featuredFilter, setFeaturedFilter] = useState(''); // New state for featured filter
//   const [restaurantFilter, setRestaurantFilter] = useState(''); // New state for restaurant filter
//   const [restaurants, setRestaurants] = useState([]); // State for unique restaurant names

//   const navigate = useNavigate();





//   useEffect(() => {
//     fetchItems();
//     fetchCategories();

//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/items/allitems`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setItems(response.data);
//       setFilteredItems(response.data); // Initialize filteredItems with all items

//       const uniqueRestaurants = [...new Set(response.data.map(item => item.restaurantName))];
//       setRestaurants(uniqueRestaurants);
//     } catch (error) {
//       setMessage("Error fetching items. Please try again.");
//     }
//   };



//   const toggleFeatured = async (id, featured) => {
//     try {
//       await axios.put(`${BASE_URL}/items/admin/feature/${id}`, null, {
//         params: { featured },
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       fetchItems(); // Refresh items
//     } catch (error) {
//       setMessage("Error updating featured status. Please try again.");
//     }
//   };








//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/items/get/category`);
//       setCategories(response.data);
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };





//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/items/delete/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setMessage("Item deleted successfully!");
//       fetchItems();
//     } catch (error) {
//       setMessage("Error deleting item. Please try again.");
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/admin/update/${id}`);
//   };

//   const handleAdd = () => {
//     navigate('/admin/add');
//   };

//   const handleItemNameFilterChange = (e) => {
//     setItemNameFilter(e.target.value);
//     filterItems();
//   };

//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     filterItems();
//   };

//   const handleFeaturedFilterChange = (e) => {
//     setFeaturedFilter(e.target.value);
//     filterItems();
//   };

//   const handleRestaurantFilterChange = (e) => {
//     setRestaurantFilter(e.target.value);
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

//     // Filter by restaurant name
//     if (restaurantFilter) {
//       filteredItems = filteredItems.filter((item) => item.restaurantName.toLowerCase().startsWith(restaurantFilter.toLowerCase()));
//     }


//     if (featuredFilter === 'featured') {
//       filteredItems = filteredItems.filter((item) => item.featured);
//     } else if (featuredFilter === 'non-featured') {
//       filteredItems = filteredItems.filter((item) => !item.featured);
//     }
//     setFilteredItems(filteredItems);
//   };

//   useEffect(() => {
//     filterItems();
//   }, [itemNameFilter, categoryFilter, restaurantFilter, featuredFilter]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;



//   // Calculate pagination
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//       setCurrentPage(pageNumber);
//   };
//   return (
//     <>
//       <div>

//         <h2>Your Items</h2><br /><h2>MULTI FILTERS</h2>
//         <p>{message}</p>

//         <div className="filter-container0">
//           <label> name:</label>
//           <input
//             type="text"
//             value={itemNameFilter}
//             onChange={handleItemNameFilterChange}
//             placeholder="Filter by item name"
//           />
//           <label>category:</label>
//           <select value={categoryFilter} onChange={handleCategoryFilterChange}>
//             <option value="">ALL</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.name}>
//                 {category.name}
//               </option>
//             ))}
//           </select>

//           <label>restaurant name:</label>
//           <select value={restaurantFilter} onChange={handleRestaurantFilterChange}>
//             <option value="">ALL</option>
//             {restaurants.map((restaurant, index) => (
//               <option key={index} value={restaurant}>
//                 {restaurant}
//               </option>
//             ))}
//           </select>

//           <label>featured status:</label>
//           <select value={featuredFilter} onChange={handleFeaturedFilterChange}>
//             <option value="">All</option>
//             <option value="featured">Featured</option>
//             <option value="non-featured">Non-Featured</option>
//           </select>
//         </div>

//       </div>



//       {/* <button onClick={handleAdd} style={{ height: "46px", width: "180px", backgroundColor: "skyblue", marginLeft: "740px" }}>
//         ADD NEW ITEM
//       </button> */}
//       <div className="cards211">

//         {filteredItems.map((item) => (
//           <div className="cards-img1" key={item.id}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//             <h3>{item.name}</h3>
//             <h3>Price: ${item.price}</h3>
//             <h3>Category: {item.category.name}</h3>
//             <button onClick={() => handleEdit(item.id)}>Edit</button>
//             <button onClick={() => handleDelete(item.id)}>Delete</button>
//             <input
//               type="checkbox"
//               checked={item.featured}
//               onChange={(e) => toggleFeatured(item.id, e.target.checked)}
//             />
//           </div>
//         ))}

//       </div>

//             {/* Pagination Component */}
//             <div className="pagination">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handlePageChange(index + 1)}
//                         className={currentPage === index + 1 ? 'active' : ''}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>

//             <Footer />
//         </>
//     );
// };

// export default AdminHomePage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminHomePage.css';
import Footer from '../pages/Footer';
import AdminPage from './AdminPage';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminHomePage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemNameFilter, setItemNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [message, setMessage] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [availabilityFilter, setAvailabilityFilter] = useState(''); // New availability filter
  const [stockFilter, setStockFilter] = useState(''); // New stock status filter
  const [vegFilter, setVegFilter] = useState(''); // State for veg filter

  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);  // 🆕 Show loader before fetch

      const response = await axios.get(`${BASE_URL}/items/allitems`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIsLoading(false);  // 🆕 Hide loader after fetch

      setItems(response.data);
      setFilteredItems(response.data); // Initialize filteredItems with all items

      const uniqueRestaurants = [...new Set(response.data.map((item) => item.restaurantName))];
      setRestaurants(uniqueRestaurants);
    } catch (error) {
      setIsLoading(false);  // 🆕 Hide loader after fetch

      setMessage("Error fetching items. Please try again.");
    }
  };

  const toggleFeatured = async (id, featured) => {
    try {
      await axios.put(`${BASE_URL}/items/admin/feature/${id}`, null, {
        params: { featured },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchItems(); // Refresh items
    } catch (error) {
      setMessage("Error updating featured status. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items/get/category`);
      setCategories(response.data);
    } catch (error) {
      setMessage("Error fetching categories. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/items/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      setMessage("Error deleting item. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update/${id}`);
  };

  const handleAdd = () => {
    navigate('/admin/add');
  };

  const handleItemNameFilterChange = (e) => {
    setItemNameFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleFeaturedFilterChange = (e) => {
    setFeaturedFilter(e.target.value);
  };

  const handleRestaurantFilterChange = (e) => {
    setRestaurantFilter(e.target.value);
  };


  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handleStockFilterChange = (e) => {
    setStockFilter(e.target.value);
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

    if (restaurantFilter) {
      filteredItems = filteredItems.filter((item) => item.restaurantName.toLowerCase().startsWith(restaurantFilter.toLowerCase()));
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
  }, [itemNameFilter, categoryFilter, restaurantFilter, featuredFilter, items, availabilityFilter, stockFilter,vegFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <h2>MULTI FILTERS</h2>
        {/* <p>{message}</p> */}



        <div className="filter-container0" >

          <div >

            <label> name:</label>
            <input
              type="text"
              value={itemNameFilter}
              onChange={handleItemNameFilterChange}
              placeholder="Filter by item name"
            />
          </div>


          <div >

            <label>category:</label>
            <select value={categoryFilter} onChange={handleCategoryFilterChange}>
              <option value="">ALL</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>


          <div >

            <label>restaurants:</label>
            <select value={restaurantFilter} onChange={handleRestaurantFilterChange}>
              <option value="">ALL</option>
              {restaurants.map((restaurant, index) => (
                <option key={index} value={restaurant}>
                  {restaurant}
                </option>
              ))}
            </select>
          </div>


          <div >

            <label>features:</label>
            <select value={featuredFilter} onChange={handleFeaturedFilterChange}>
              <option value="">All</option>
              <option value="featured">Featured</option>
              <option value="non-featured">Non-Featured</option>
            </select>
          </div>



          {/* New Filters for Availability and Stock Status */}
          <div >

            <label>Availability:</label>
            <select value={availabilityFilter} onChange={handleAvailabilityFilterChange}>
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>



          <div >

            <label>Stock Status:</label>
            <select value={stockFilter} onChange={handleStockFilterChange}>
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


{paginatedItems.length === 0 ? (
          <div className="no-items-message" style={{textAlign:"center",marginTop:"20px"}}>
            <h2>No items matched your filters.</h2>
          </div>
        ) : (





          <div className="cards211">
            {paginatedItems.map((item) => (
              <div className="cards-img1" key={item.id}>
                <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} onClick={() => navigate(`/admin/items/${item.id}`)} style={{cursor:"pointer"}}/>
                <h3>{item.name}</h3>
                <h3>Price: ₹{item.price}</h3>
                <h3>Category: {item.category.name}</h3>
                {/* <button style={{ backgroundColor: "lightblue",marginTop:"10px" }} onClick={() => handleEdit(item.id)}>Edit</button> */}
                <button style={{ backgroundColor: "#007bff", marginTop: "2px",color:"white" }} onClick={() => navigate(`/admin/items/${item.id}`)}>Details</button>

                {/* <button style={{ backgroundColor: "orange", marginTop: "10px",color:"white" }} onClick={() => handleDelete(item.id)}>Delete</button> */}
                <br />
                {/* <input
              type="checkbox"
              checked={item.featured}
              onChange={(e) => toggleFeatured(item.id, e.target.checked)}
              style={{marginLeft:"40%"}}
            /> */}
                <button
                  onClick={() => toggleFeatured(item.id, !item.featured)}
                  style={{ marginTop: "2%", marginTop: "10px", backgroundColor: item.featured ? "green" : "red", color: "white" }}
                >
                  {item.featured ? "Featured" : "Not Featured"}
                </button>
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

      {/* <AdminPage/> */}


    </>
  );
};

export default AdminHomePage;
