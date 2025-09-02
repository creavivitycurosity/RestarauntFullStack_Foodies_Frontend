// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './CategoryItems.css';

// const CategoryItems = ({ addtocart }) => {
//   const [items, setItems] = useState([]);
//   const { categoryId } = useParams(); // Changed from categoryName to categoryId
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/category/${categoryId}`);
//         const processedItems = response.data.map(item => ({
//           id: item.id,
//           image: `data:image/png;base64,${item.image}`,
//           name: item.name,
//           price: item.price,
//           sellerName:item.sellerName
//         }));
//         setItems(processedItems);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     }

//     fetchItems();
//   }, [categoryId]);

//   return (
//     <div className="category-items">
//       {items.map(item => (
//         <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
//           <img src={item.image} alt={item.name} />
//           <h2>{item.name}</h2>
//           <h3>₹{item.price}</h3>
//           <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CategoryItems;

















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select'; // Importing react-select for better multi-select support
import './CategoryItems.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CategoryItems = ({ addtocart }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [discountFilter, setDiscountFilter] = useState('all'); // Added discount filter state
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [isVegFilter, setIsVegFilter] = useState('all'); // New state for veg/non-veg filter

  const [currentPage, setCurrentPage] = useState(1); // 🆕 Current page state
  const itemsPerPage = 6; // 🆕 Number of items per page

  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch

        const response = await axios.get(`${BASE_URL}/items/category/${categoryId}`);
        const processedItems = response.data.map(item => ({
          id: item.id,
          image: `data:image/png;base64,${item.image}`,
          name: item.name,
          price: item.price,
          sellerName: item.sellerName,
          restaurantName: item.restaurantName,
          previousAmount: item.previousAmount, // assuming this field contains the original price
          discountActive: item.discountActive, // assuming this field indicates if a discount is active
          quantity: item.quantity,
          available: item.available,
          isVeg: item.veg,
        }));
        setIsLoading(false);  // 🆕 Hide loader after fetch

        setItems(processedItems);
        setFilteredItems(processedItems);
        console.log(processedItems)
        console.log(response.data)

      } catch (error) {
        setIsLoading(false);  // 🆕 Hide loader after fetch

        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, [categoryId]);


  useEffect(() => {
    if (location.state?.filter === 'discount') {
      setDiscountFilter('discount');
    }
  }, [location.state]);


  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }

    if (selectedRestaurants.length > 0) {
      filtered = filtered.filter(item => selectedRestaurants.includes(item.restaurantName));
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
    }


    if (discountFilter === 'discount') {
      filtered = filtered.filter(item => item.discountActive);
    } else if (discountFilter === 'non-discount') {
      filtered = filtered.filter(item => !item.discountActive);
    }

    if (isVegFilter === 'veg') {
      filtered = filtered.filter(item => item.isVeg);
    } else if (isVegFilter === 'non-veg') {
      filtered = filtered.filter(item => !item.isVeg);
    }



    setFilteredItems(filtered);
  }, [searchTerm, selectedRestaurants, selectedPrices, discountFilter, items, isVegFilter]);

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

  const vegOptions = [
    { value: 'all', label: 'All' },
    { value: 'veg', label: 'Vegetarian' },
    { value: 'non-veg', label: 'Non-Vegetarian' },
  ];

  // Pagination logic 🆕
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="category-items-container">
      <div>
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
            // onFocus={(e) => e.target.blur()} // Prevents focus, thus no keyboard
            isSearchable={false} // Disable the keyboard popup

          />
          <Select
            isMulti
            options={priceOptions}
            className="multi-select3"
            placeholder="Filter by price"
            onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
            isSearchable={false} // Disable the keyboard popup

          />
          {/* <Select
            options={discountOptions}
            className="multi-select3"
            placeholder="Filter by discount"
            onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
            defaultValue={discountOptions[0]} // Set "All" as the default
          /> */}

          <Select
            options={vegOptions}
            className="multi-select3"
            placeholder="Filter by type"
            onChange={(selectedOption) => setIsVegFilter(selectedOption.value)}
            value={vegOptions.find(option => option.value === isVegFilter)}
            isSearchable={false} // Disable the keyboard popup
          />

          <Select
            options={discountOptions}
            className="multi-select3"
            placeholder="Filter by discount"
            onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
            value={discountOptions.find(option => option.value === discountFilter)} // Make it controlled by state
            isSearchable={false} // Disable the keyboard popup

          />
        </div>



      </div>

      {isLoading ? (  // 🆕 Display loader during fetching
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
                  <img className="testimg" src={item.image} alt={item.name} />

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

          {/* 🆕 Pagination Controls */}
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
}

export default CategoryItems;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Select from 'react-select'; // Importing react-select for better multi-select support
// import './CategoryItems.css';

// const CategoryItems = ({ addtocart }) => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const { categoryId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/category/${categoryId}`);
//         const processedItems = response.data.map(item => ({
//           id: item.id,
//           image: `data:image/png;base64,${item.image}`,
//           name: item.name,
//           price: item.price,
//           sellerName: item.sellerName,
//           restaurantName:item.restaurantName
//         }));
//         setItems(processedItems);
//         setFilteredItems(processedItems);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     }

//     fetchItems();
//   }, [categoryId]);

//   useEffect(() => {
//     let filtered = items;

//     if (searchTerm) {
//       filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
//     }

//     if (selectedSellers.length > 0) {
//       filtered = filtered.filter(item => selectedSellers.includes(item.sellerName));
//     }

//     if (selectedPrices.length > 0) {
//       filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
//     }

//     setFilteredItems(filtered);
//   }, [searchTerm, selectedSellers, selectedPrices, items]);

//   const sellerOptions = Array.from(new Set(items.map(item => item.sellerName))).map(seller => ({
//     value: seller,
//     label: seller
//   }));

//   const priceOptions = [
//     { value: 100, label: 'Below ₹100' },
//     { value: 200, label: 'Below ₹200' },
//     { value: 500, label: 'Below ₹500' }
//   ];

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
//           options={sellerOptions}
//           className="multi-select3"
//           placeholder="Filter by seller"
//           onChange={(selectedOptions) => setSelectedSellers(selectedOptions.map(option => option.value))}
//         />
//         <Select
//           isMulti
//           options={priceOptions}
//           className="multi-select3"
//           placeholder="Filter by price"
//           onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
//         />
//       </div>
//       <div className="category-items">
//         {filteredItems.map(item => (
//           <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
//             <img src={item.image} alt={item.name} />
//             <h2>{item.restaurantName}</h2>
//             <h2>{item.name}</h2>
//             <h3>₹{item.price}</h3>
//             <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryItems;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './CategoryItems.css';

// const CategoryItems = ({ addtocart }) => {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const { categoryId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/category/${categoryId}`);
//         const processedItems = response.data.map(item => ({
//           id: item.id,
//           image: `data:image/png;base64,${item.image}`,
//           name: item.name,
//           price: item.price,
//           sellerName: item.sellerName
//         }));
//         setItems(processedItems);
//         setFilteredItems(processedItems);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     }

//     fetchItems();
//   }, [categoryId]);

//   useEffect(() => {
//     let filtered = items;

//     if (searchTerm) {
//       filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
//     }

//     if (selectedSellers.length > 0) {
//       filtered = filtered.filter(item => selectedSellers.includes(item.sellerName));
//     }

//     if (selectedPrices.length > 0) {
//       filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
//     }

//     setFilteredItems(filtered);
//   }, [searchTerm, selectedSellers, selectedPrices, items]);

//   const handleSellerChange = (seller) => {
//     setSelectedSellers(prevSelectedSellers =>
//       prevSelectedSellers.includes(seller)
//         ? prevSelectedSellers.filter(s => s !== seller)
//         : [...prevSelectedSellers, seller]
//     );
//   };

//   const handlePriceChange = (price) => {
//     setSelectedPrices(prevSelectedPrices =>
//       prevSelectedPrices.includes(price)
//         ? prevSelectedPrices.filter(p => p !== price)
//         : [...prevSelectedPrices, price]
//     );
//   };

//   return (
//     <div className="category-items-container">
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="seller-filters">
//           <label>Filter by seller:</label>
//           {Array.from(new Set(items.map(item => item.sellerName))).map(seller => (
//             <div key={seller}>
//               <input
//                 type="checkbox"
//                 checked={selectedSellers.includes(seller)}
//                 onChange={() => handleSellerChange(seller)}
//               />
//               {seller}
//             </div>
//           ))}
//         </div>
//         <div className="price-filters">
//           <label>Filter by price:</label>
//           <div>
//             <input
//               type="checkbox"
//               checked={selectedPrices.includes(100)}
//               onChange={() => handlePriceChange(100)}
//             />
//             Below ₹100
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               checked={selectedPrices.includes(200)}
//               onChange={() => handlePriceChange(200)}
//             />
//             Below ₹200
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               checked={selectedPrices.includes(500)}
//               onChange={() => handlePriceChange(500)}
//             />
//             Below ₹500
//           </div>
//         </div>
//       </div>
//       <div className="category-items">
//         {filteredItems.map(item => (
//           <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
//             <img src={item.image} alt={item.name} />
//             <h2>{item.name}</h2>
//             <h3>₹{item.price}</h3>
//             <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategoryItems;



























































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CategoryItems.css';
// import { useParams } from 'react-router-dom';

// const CategoryItems = () => {
//   const [items, setItems] = useState([]);
//   const { categoryName } = useParams();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(http://localhost:8080/items/category/${categoryName});
//         setItems(response.data);
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     }

//     fetchItems();
//   }, [categoryName]);

//   return (
//     <div className="category-items">
//       {items.map(item => (
//         <div key={item.id} className="item-card">
//           <img src={data:image/png;base64,${item.image}} alt={item.name} />
//           <h2>{item.name}</h2>
//           <p>₹{item.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CategoryItems;