// // SellerItems.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './CategoryItems.css';

// const SellerCategoryItems = ({addtocart}) => {
//     const { sellerEmail } = useParams();
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const fetchItems = async () => {
//         try {
//             console.log("seller email from category"+sellerEmail)
//           const response = await axios.get(`http://localhost:8080/items/seller/${sellerEmail}`);
//           setItems(response.data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching items for seller", error);
//           setLoading(false);
//         }
//       };

//       fetchItems();
//     }, [sellerEmail]);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     return (
//       <div>
//         <h2>Items for {sellerEmail}</h2>
//         <div className="items-grid">
//           {items.map(item => (
//             <div key={item.id} className="item-card">
//               <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} />
//               <h3>{item.name}</h3>
//               <p>Price: ${item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };


// export default SellerCategoryItems;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select'; // Importing react-select for better multi-select support
import './CategoryItems.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerCategoryItems = ({ addtocart }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [discountFilter, setDiscountFilter] = useState('all'); // Added discount filter state
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [isVegFilter, setIsVegFilter] = useState('all'); // New state for veg/non-veg filter

  const [currentPage, setCurrentPage] = useState(1); // 🆕 Current page state
  const itemsPerPage = 6; // 🆕 Items per page

  const { sellerEmail } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch

        const response = await axios.get(`${BASE_URL}/items/seller/name/${sellerEmail}`);
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
          category: item.category, // Add this line
          available :item.available,
          isVeg: item.veg,

        }));
        console.log(response.data)
        console.log(processedItems)
        setIsLoading(false);  // 🆕 Hide loader after fetch

        setItems(processedItems);
        setFilteredItems(processedItems);
      } catch (error) {
        setIsLoading(false);  // 🆕 Hide loader after fetch

        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, [sellerEmail]);





  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${BASE_URL}/items/get/categories/sellers/${sellerEmail}`);
        const categoryOptions = response.data.map(category => ({
          value: category.name,
          label: category.name
        }));
        console.log('Categories response:', response.data);
        console.log(sellerEmail)
        setCategoryOptions(categoryOptions);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    console.log(categoryOptions)
    fetchCategories();
  }, [sellerEmail]);






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

    if (selectedSellers.length > 0) {
      filtered = filtered.filter(item => selectedSellers.includes(item.sellerName));
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category.name));
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
  }, [searchTerm, selectedSellers, selectedPrices, discountFilter, selectedCategories, items, isVegFilter]);

  const sellerOptions = Array.from(new Set(items.map(item => item.sellerName))).map(seller => ({
    value: seller,
    label: seller
  }));

    // Pagination logic 🆕
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

  const priceOptions = [
    { value: 100, label: 'Below ₹100' },
    { value: 200, label: 'Below ₹200' },
    { value: 500, label: 'Below ₹500' }
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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
}, []); // Empty dependency array means this runs once when the component mounts


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

        {/* <Select
          isMulti
          options={sellerOptions}
          className="multi-select3"
          placeholder="Filter by seller"
          onChange={(selectedOptions) => setSelectedSellers(selectedOptions.map(option => option.value))}
        /> */}

<div className="filters3">

        <Select
          isMulti
          options={priceOptions}
          className="multi-select3"
          placeholder="Filter by price"
          onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
          isSearchable={false} // Disable the keyboard popup

        />
        {/* Discount filter dropdown */}
        {/* <Select
          options={discountOptions}
          className="multi-select3"
          placeholder="Filter by discount"
          onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
          defaultValue={discountOptions[0]} // Set "All" as the default
        /> */}
        <Select
          options={discountOptions}
          className="multi-select3"
          placeholder="Filter by discount"
          onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
          value={discountOptions.find(option => option.value === discountFilter)} // Make it controlled by state
          isSearchable={false} // Disable the keyboard popup

        />
         <Select
          options={vegOptions}
          className="multi-select3"
          placeholder="Filter by type"
          onChange={(selectedOption) => setIsVegFilter(selectedOption.value)}
          value={vegOptions.find(option => option.value === isVegFilter)}
          isSearchable={false} // Disable the keyboard popup
        />
        <Select
          isMulti
          options={categoryOptions}
          className="multi-select3"
          placeholder="Filter by category"
          onChange={(selectedOptions) => setSelectedCategories(selectedOptions.map(option => option.value))}
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
          <div className="no-items-message" style={{textAlign:"center",marginTop:"20px"}}>
            <h2>No items matched your filters.</h2>
          </div>
        ) : (



        <div className="category-items">
          {currentItems.map(item => (
            <div key={item.id} className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
              <img src={item.image} alt={item.name} />
              {item.discountActive && (
                <div className="discount-badge">
                  {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                </div>
              )}

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
              {item.quantity === 0 || !item.available ?  (
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

export default SellerCategoryItems;

