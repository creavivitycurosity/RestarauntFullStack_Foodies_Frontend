// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import Select from 'react-select'; // Importing react-select for better multi-select support

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ItemTypeItems = ({ addtocart }) => {
//   const { category } = useParams();  // Get category from URL (veg/non-veg)
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedRestaurants, setSelectedRestaurants] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const [discountFilter, setDiscountFilter] = useState('all'); // Added discount filter state

//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1); // 🆕 Current page state
//   const itemsPerPage = 6; // 🆕
//   useEffect(() => {
//     const isVeg = category === 'veg'; // Convert category to boolean value

//     async function fetchItems() {
//       try {
//         const response = await axios.get(`${BASE_URL}/items/category2/${isVeg}`);
//         setItems(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//         setLoading(false);
//       }
//     }

//     fetchItems();
//   }, [category]);




//   useEffect(() => {
//     let filtered = items;

//     if (searchTerm) {
//       filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
//     }

//     if (selectedRestaurants.length > 0) {
//       filtered = filtered.filter(item => selectedRestaurants.includes(item.restaurantName));
//     }

//     if (selectedPrices.length > 0) {
//       filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
//     }


//     if (discountFilter === 'discount') {
//       filtered = filtered.filter(item => item.discountActive);
//     } else if (discountFilter === 'non-discount') {
//       filtered = filtered.filter(item => !item.discountActive);
//     }


//     setFilteredItems(filtered);
//   }, [searchTerm, selectedRestaurants, selectedPrices, discountFilter, items]);

//   const restaurantOptions = Array.from(new Set(items.map(item => item.restaurantName))).map(restaurant => ({
//     value: restaurant,
//     label: restaurant,
//   }));

//   const priceOptions = [
//     { value: 100, label: 'Below ₹100' },
//     { value: 200, label: 'Below ₹200' },
//     { value: 500, label: 'Below ₹500' },
//   ];

//   const discountOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'discount', label: 'Discounted' },
//     { value: 'non-discount', label: 'Non-Discounted' },
//   ];


//   // Pagination logic 🆕
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };










//   return (
//     <div className="category-items-container">
//       <div className="filters3">
//         <input
//           type="text"
//           placeholder="Search by item name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}

//         />
//         <Select
//           isMulti
//           options={restaurantOptions}
//           className="multi-select3"
//           placeholder="Filter by restaurant"
//           onChange={(selectedOptions) => setSelectedRestaurants(selectedOptions.map(option => option.value))}
//           // onFocus={(e) => e.target.blur()} // Prevents focus, thus no keyboard
//           isSearchable={false} // Disable the keyboard popup

//         />
//         <Select
//           isMulti
//           options={priceOptions}
//           className="multi-select3"
//           placeholder="Filter by price"
//           onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
//           isSearchable={false} // Disable the keyboard popup

//         />
//         {/* <Select
//           options={discountOptions}
//           className="multi-select3"
//           placeholder="Filter by discount"
//           onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
//           defaultValue={discountOptions[0]} // Set "All" as the default
//         /> */}


//         <Select
//           options={discountOptions}
//           className="multi-select3"
//           placeholder="Filter by discount"
//           onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
//           value={discountOptions.find(option => option.value === discountFilter)} // Make it controlled by state
//           isSearchable={false} // Disable the keyboard popup

//         />



//       </div>

//       {loading ? (  // 🆕 Display loader during fetching
//         <div className="loader-container">
//           <div className="loader"></div>
//           <h2>Loading items...</h2>
//         </div>
//       ) : (

//         <>

//           {currentItems.length === 0 ? (
//             <div className="no-items-message" style={{ textAlign: "center", marginTop: "20px" }}>
//               <h2>No items matched your filters.</h2>
//             </div>
//           ) : (


//             <div className="category-items">
//               {currentItems.map(item => (
//                 <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
//                 <img src={`data:image/png;base64,${item.image}`} alt={item.name} />

//                   {item.discountActive && (
//                     <div className="discount-badge">
//                       {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
//                     </div>
//                   )}

//                   <h2>{item.restaurantName}</h2>
//                   <h2>{item.name}</h2>
//                   <h3>
//                     Price:
//                     {item.price !== null && item.price !== undefined && !item.discountActive ? (
//                       <span>${item.price}</span>
//                     ) : (
//                       <span></span>
//                     )}
//                     {item.discountActive && (
//                       <>
//                         <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//                           ${item.previousAmount}
//                         </span>
//                         <span style={{ display: 'block', color: 'red' }}>${item.price}</span>
//                       </>
//                     )}
//                   </h3>
//                   {item.quantity === 0 || !item.available ? (
//                     <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
//                   ) : (
//                     <div>
//                       <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//                       {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
//                     </div>
//                   )}
//                 </div>
//               ))}

//             </div>

//           )}

//           {/* 🆕 Pagination Controls */}
//           <div className="pagination">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={currentPage === i + 1 ? 'active' : ''}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//         </>
//       )}
//     </div>
//   );
// }
//       export default ItemTypeItems;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-default-api-url.com'; // Fallback to prevent errors

const ItemTypeItems = ({ addtocart }) => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [discountFilter, setDiscountFilter] = useState('all');
  const [availableCategories, setAvailableCategories] = useState([]); // 🆕 Store available categories
  const [selectedCategories, setSelectedCategories] = useState([]); // 🆕 Track selected categories
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  // Fetch items and categories on component mount
  useEffect(() => {
    const isVeg = category === 'veg';

    async function fetchItems() {
      try {
        const itemsResponse = await axios.get(`${BASE_URL}/items/category2/${isVeg}`);
        const fetchedItems = itemsResponse.data;
        setItems(fetchedItems);
        setLoading(false);

        // 🆕 Get unique categories from available items
        const uniqueCategories = Array.from(new Set(fetchedItems.map(item => item.category.name)));
        const availableCategoryOptions = uniqueCategories.map(categoryName => ({
          value: categoryName,
          label: categoryName,
        }));
        setAvailableCategories(availableCategoryOptions);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    }

    fetchItems();
  }, [category]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = items;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }

    // Restaurant filter
    if (selectedRestaurants.length > 0) {
      filtered = filtered.filter(item => selectedRestaurants.includes(item.restaurantName));
    }

    // Price filter
    if (selectedPrices.length > 0) {
      filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
    }

    // 🆕 Category filter - Ensure we compare the selected category names with `item.category.name`
    if (selectedCategories.length > 0) {
      console.log("Selected Categories:", selectedCategories); // Debug
      filtered = filtered.filter(item => selectedCategories.includes(item.category.name)); // Ensure category.name is used
    }

    // Discount filter
    if (discountFilter === 'discount') {
      filtered = filtered.filter(item => item.discountActive);
    } else if (discountFilter === 'non-discount') {
      filtered = filtered.filter(item => !item.discountActive);
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedRestaurants, selectedPrices, selectedCategories, discountFilter, items]);

  const restaurantOptions = Array.from(new Set(items.map(item => item.restaurantName))).map(restaurant => ({
    value: restaurant,
    label: restaurant,
  }));

  const priceOptions = [
    { value: 100, label: 'Below ₹100' },
    { value: 200, label: 'Below ₹200' },
    { value: 300, label: 'Below ₹300' },
    { value: 400, label: 'Below ₹400' },
    { value: 500, label: 'Below ₹500' },
    { value: 600, label: 'Below ₹600' },

  ];

  const discountOptions = [
    { value: 'all', label: 'All' },
    { value: 'discount', label: 'Discounted' },
    { value: 'non-discount', label: 'Non-Discounted' },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
}, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="category-items-container">
      <div >

        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

          <input
                    className='itext'

            type="text"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ height: "40px" }}

          />
        </div>


        <div className="filters3">


          <Select
            isMulti
            options={restaurantOptions}
            className="multi-select3"
            placeholder="Filter by restaurant"
            onChange={(selectedOptions) => setSelectedRestaurants(selectedOptions.map(option => option.value))}
            isSearchable={false}
          />
          <Select
            isMulti
            options={priceOptions}
            className="multi-select3"
            placeholder="Filter by price"
            onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
            isSearchable={false}
          />
          <Select
            isMulti
            options={availableCategories} // 🆕 Show only available categories here
            className="multi-select3"
            placeholder="Filter by category"
            onChange={(selectedOptions) => setSelectedCategories(selectedOptions.map(option => option.value))} // Update selected categories
            isSearchable={false}
          />
          <Select
            options={discountOptions}
            className="multi-select3"
            placeholder="Filter by discount"
            onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
            value={discountOptions.find(option => option.value === discountFilter)}
            isSearchable={false}
          />
        </div>

      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <h2>Loading items...</h2>
        </div>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="no-items-message" style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>No items matched your filters.</h2>
            </div>
          ) : (
            <div className="category-items">
              {currentItems.map(item => (
                <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
                  <img src={`data:image/png;base64,${item.image}`} alt={item.name} />

                  {item.discountActive && (
                    <div className="discount-badge">
                      {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                    </div>
                  )}

                  <h3>{item.restaurantName}</h3>
                  <h2>{item.name}</h2>
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
                  {item.quantity === 0 || !item.available ? (
                    <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                  ) : (
                    <div>
                      <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
                      {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemTypeItems;
