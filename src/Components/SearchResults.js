// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';

// const SearchResults = ({addtocart}) => {
//   const { query } = useParams();
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:8080/items/name/${query}`)
//       .then(response => {
//         console.log('Search results fetched:', response.data);
//         setItems(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching search results:', error);
//       });
//   }, [query]);

//   return (
//     <div>
//       <h2>Search Results for "{query}"</h2>
//       <div className="item-list">
//         {items.length > 0 ? (
//           items.map(item => (
//             <div key={item.id} style={{marginBottom:"20px",marginLeft:"30%",cursor:"pointer",width:"700px",alignItems:"center"}} onClick={() => navigate(`/item/${item.id}`)} className="item-card scards">
//             <img src={`data:image/jpeg;base64,${item.image}`} style={{width:"300px"}} alt={item.name} />
//             <span>
//                <h2>{item.name}</h2> 
//               <h3>Price: ${item.price}</h3>
//               <h3>{item.sellerName}</h3>
//               <button onClick={() => addtocart(item)}>ADD TO Cart</button>
//               </span>
//             </div>
//           ))
//         ) : (
//           <p>No items found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select'; // Importing react-select for better multi-select support
// import "./SearchResults.css"
// const SearchResults = ({ addtocart }) => {
//   const { query } = useParams();
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(query);
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/name/${query}`);
//         const processedItems = response.data.map(item => ({
//           id: item.id,
//           image: `data:image/jpeg;base64,${item.image}`,
//           name: item.name,
//           price: item.price,
//           sellerName: item.sellerName,
//           restaurantName: item.restaurantName,

//         }));
//         setFilteredItems([])
//         setItems([])
//         setSearchTerm('');
//         setSelectedSellers([]);
//         setSelectedPrices([]);

//         console.log("search results page "+query)
//         console.log(+processedItems)       
//         console.log(response.data)
//         setItems(processedItems);
//         setFilteredItems(processedItems);
//         console.log("search results page "+query)
//         console.log(processedItems)       
//         console.log(response.data)
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       }
//     }

//     fetchItems();
//   }, [query]);

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
//       <h2 style={{marginLeft:"45%"}}>Search Results for "{query}"</h2>
//       <div className="filters" style={{marginLeft:"38%",marginTop:"10px"}}>
//         {/* <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         /> */}
//         <Select
//           isMulti
//           options={sellerOptions}
//           className="multi-select"
//           placeholder="Filter by seller"
//           onChange={(selectedOptions) => setSelectedSellers(selectedOptions.map(option => option.value))}
//         />
//         <Select
//           isMulti
//           options={priceOptions}
//           className="multi-select"
//           placeholder="Filter by price"
//           onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
//         />
//       </div>
//       <div className="category-items" style={{display:"flex",flexDirection:"column",marginTop:"20px"}}>
//         {filteredItems.length > 0 ? (
//           filteredItems.map(item => (
//             <div
//               key={item.id}
//               style={{ marginBottom: "20px", marginLeft: "30%", cursor: "pointer", width: "700px", alignItems: "center" }}
//               onClick={() => navigate(`/item/${item.id}`)}
//               className="item-card scards"
//             >
//               <img src={item.image} style={{ width: "300px" }} alt={item.name} />
//               <span>
//                 <h2>{item.name}</h2>
//                 <h3>Price: ₹{item.price}</h3>        
//                 <h3>{item.restaurantName}</h3>
//                 <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//               </span>
//             </div>
//           ))
//         ) : (
//           <p style={{marginLeft:"45%"}}>No items found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;


// import React, { useEffect, useState } from 'react'; //working
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Select from 'react-select'; // Importing react-select for better multi-select support
// import "./SearchResults.css";

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SearchResults = ({ addtocart }) => {
//   const { query } = useParams();
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(query);
//   const [selectedRestaurants, setSelectedRestaurants] = useState([]); // Renamed state
//   const [selectedPrices, setSelectedPrices] = useState([]);
//   const [discountFilter, setDiscountFilter] = useState('all'); // Added discount filter state

//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchItems() {
//       try {
//         const response = await axios.get(`${BASE_URL}/items/name/${query}`);
//         const processedItems = response.data.map(item => ({
//           id: item.id,
//           image: `data:image/jpeg;base64,${item.image}`,
//           name: item.name,
//           price: item.price,
//           restaurantName: item.restaurantName, // Updated to focus on restaurant names
//           previousAmount: item.previousAmount, // assuming this field contains the original price
//           discountActive: item.discountActive, // assuming this field indicates if a discount is active
//           quantity: item.quantity,

//         }));
//         setFilteredItems([]);
//         setItems([]);
//         setSearchTerm('');
//         setSelectedRestaurants([]);
//         setSelectedPrices([]);

//         setItems(processedItems);
//         setFilteredItems(processedItems);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       }
//     }

//     fetchItems();
//   }, [query]);

//   useEffect(() => {
//     let filtered = items;

//     if (searchTerm) {
//       filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
//     }

//     if (selectedRestaurants.length > 0) {
//       filtered = filtered.filter(item => selectedRestaurants.includes(item.restaurantName)); // Updated filter condition
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
//   }, [searchTerm, selectedRestaurants, selectedPrices,discountFilter, items]);

//   const restaurantOptions = Array.from(new Set(items.map(item => item.restaurantName))).map(restaurant => ({
//     value: restaurant,
//     label: restaurant
//   }));

//   const priceOptions = [
//     { value: 100, label: 'Below ₹100' },
//     { value: 200, label: 'Below ₹200' },
//     { value: 500, label: 'Below ₹500' }
//   ];

//   const discountOptions = [
//     { value: 'all', label: 'All' },
//     { value: 'discount', label: 'Discounted' },
//     { value: 'non-discount', label: 'Non-Discounted' },
//   ];

//   return (
//     <div className="category-items-container">
//       <h2 style={{ marginLeft: "5%" }}>Search Results for "{query}"</h2>
//       <div className="filters" style={{ marginLeft: "38%", marginTop: "10px" }}>
//         <Select
//           isMulti
//           options={restaurantOptions}
//           className="multi-select"
//           placeholder="Filter by restaurant"
//           onChange={(selectedOptions) => setSelectedRestaurants(selectedOptions.map(option => option.value))} // Updated handler
//         />
//         <Select
//           isMulti
//           options={priceOptions}
//           className="multi-select"
//           placeholder="Filter by price"
//           onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
//         />
//           <Select
//           options={discountOptions}
//           className="multi-select"
//           placeholder="Filter by discount"
//           onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
//           defaultValue={discountOptions[0]} // Set "All" as the default
//         />
//       </div>
//       <div className="category-items" style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
//         {filteredItems.length > 0 ? (
//           filteredItems.map(item => (
//             <div
//               key={item.id}
//               style={{ marginBottom: "20px", marginLeft: "30%", cursor: "pointer", width: "700px", alignItems: "center" }}
//               onClick={() => navigate(`/item/${item.id}`)}
//               className="item-card scards"
//             >
//               <img src={item.image} style={{ width: "300px" }} alt={item.name} />
//               {item.discountActive && (
//                 <div className="discount-badge">
//                   {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
//                 </div>
//               )}

//               <span>
//                 <h2>{item.name}</h2>
//                 <h3>
//                   Price:
//                   {item.price !== null && item.price !== undefined && !item.discountActive ? (
//                     <span>${item.price}</span>
//                   ) : (
//                     <span></span>
//                   )}
//                   {item.discountActive && (
//                     <>
//                       <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//                         ${item.previousAmount}
//                       </span>
//                       <span style={{ display: 'block', color: 'red' }}>${item.price}</span>
//                     </>
//                   )}
//                 </h3>
//                 <h3>{item.restaurantName}</h3>
//                 {item.quantity === 0 ? (
//                   <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
//                 ) : (
//                   <div>
//                     <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
//                     {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
//                   </div>
//                 )}
//               </span>
//             </div>
//           ))
//         ) : (
//           <p style={{ marginLeft: "45%" }}>No items found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import "./SearchResults.css";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SearchResults = ({ addtocart }) => {
  const { query } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [discountFilter, setDiscountFilter] = useState('all');
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false); // New state to track search attempts
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loader state
  const [nameMatchedItems, setNameMatchedItems] = useState([]);
  const [tagMatchedItems, setTagMatchedItems] = useState([]);
  const [restaurantMatchedItems, setRestaurantMatchedItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Current page for search results
  const [recommendedPage, setRecommendedPage] = useState(1); // Current page for recommended items
  const [restaurantMatchedPage, setRestaurantMatchedPage] = useState(1); // Page state for restaurant matched items
  const [matchedPage, setMatchedPage] = useState(1); // Current page for matched items

  const itemsPerPage = 3; // Number of items per page

  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = getPaginatedItems(filteredItems, currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // For recommended items pagination
  const recommendedTotalPages = Math.ceil(recommendedItems.length / itemsPerPage);
  const paginatedRecommendedItems = getPaginatedItems(recommendedItems, recommendedPage);

  const handleRecommendedPageChange = (page) => {
    setRecommendedPage(page);
  };

    // Matched Items Pagination
    const matchedTotalPages = Math.ceil(restaurantMatchedItems.length / itemsPerPage);
    const paginatedMatchedItems = getPaginatedItems(restaurantMatchedItems, matchedPage);

    const handleMatchedPageChange = (page) => {
      setMatchedPage(page);
    };

  useEffect(() => {
    


    async function fetchItems() {
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch
        console.log(query)

        // Fetch name-matched items
        const nameResponse = await axios.get(`${BASE_URL}/items/name/${query}`);
        const nameMatchedItems = nameResponse.data
          .filter(item => item.id !== undefined && !item.seller) // Ensure it's an item and not a seller
          .map(item => ({
            id: item.id,
            image: `data:image/jpeg;base64,${item.image}`,
            name: item.name,
            price: item.price,
            restaurantName: item.restaurantName,
            previousAmount: item.previousAmount,
            discountActive: item.discountActive,
            quantity: item.quantity,
            available: item.available,

          }));

        // Clear previous state
        setFilteredItems([]);
        setItems([]);
        setSearchTerm('');
        setSelectedRestaurants([]);
        setSelectedPrices([]);

        // Set name matched items
        setItems(nameMatchedItems);
        setFilteredItems(nameMatchedItems);

        // Fetch all matched items (by tags and names)
        const searchResponse = await axios.get(`${BASE_URL}/items/searchingjava?query=${query}`);
        const allMatchedItems = searchResponse.data;

        // Log the data structures for debugging
        console.log("Name Matched Items:", nameMatchedItems);
        console.log("All Matched Items:", allMatchedItems);

        // Filter to get only tag-matched items by excluding name-matched items
        const recommendedItems = allMatchedItems.filter(item =>
          item.itemId !== undefined && // Ensure it's an item by checking for 'itemId'
          !nameMatchedItems.some(nameItem => nameItem.id === item.itemId) && // Exclude name-matched items
          !item.seller // Exclude sellers
        );

        // Log recommended items after filtering
        console.log("Recommended Items (Tag Matched):", recommendedItems);

        // Set filtered tag-matched items only
        setRecommendedItems(recommendedItems);
        setIsLoading(false);  // 🆕 Hide loader after fetch

      } catch (error) {
        setIsLoading(false);  // 🆕 Hide loader after fetch

        console.error('Error fetching search results:', error);
      }
    }



    fetchItems();
  }, [query]);


 

  useEffect(() => {
    async function fetchItems2() {
      try {
        console.log(`Fetching results for query: ${query}`);

        // Fetch categorized data from the API
        const response = await axios.get(`${BASE_URL}/items/searchingwithheading?query=${query}`);
        const categorizedResults = response.data;

        // Set Name Matched, Tag Matched, and Restaurants Matched
        setNameMatchedItems(categorizedResults['Name Matched'] || []);
        setTagMatchedItems(categorizedResults['Tag Matched'] || []);
        setRestaurantMatchedItems(categorizedResults['Restaurants Matched'] || []);

        // Log results for debugging
        console.log('Name Matched:', categorizedResults['Name Matched']);
        console.log('Tag Matched:', categorizedResults['Tag Matched']);
        console.log('Restaurants Matched:', categorizedResults['Restaurants Matched']);
     // Clear previous state
     setFilteredItems([]);
     setItems([]);
     setSearchTerm('');
     setSelectedRestaurants([]);
     setSelectedPrices([]);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
        
      }
    }

    fetchItems2();
  }, [query]);

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

    setFilteredItems(filtered);
  }, [searchTerm, selectedRestaurants, selectedPrices, discountFilter, items]);

  const restaurantOptions = Array.from(new Set(items.map(item => item.restaurantName))).map(restaurant => ({
    value: restaurant,
    label: restaurant
  }));

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


  const handleAddToCart = (item) => {
    addtocart(item);
    console.log(item)
  };

  return (
    <div className="category-items-container" >
      <h1>Search Results for "{query}"</h1>

      {items.length > 0  &&

      <div className="filters" >
        <Select
          isMulti
          options={restaurantOptions}
          className="multi-select"
          placeholder="Filter by restaurant"
          onChange={(selectedOptions) => setSelectedRestaurants(selectedOptions.map(option => option.value))}
          isSearchable={false} // Disable the keyboard popup

        />
        <Select
          isMulti
          options={priceOptions}
          className="multi-select"
          placeholder="Filter by price"
          onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
          isSearchable={false} // Disable the keyboard popup

        />
        <Select
          options={discountOptions}
          className="multi-select"
          placeholder="Filter by discount"
          onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
          defaultValue={discountOptions[0]}
          isSearchable={false} // Disable the keyboard popup

        />
      </div>
      }

      {isLoading ? (  // 🆕 Display loader during fetching
        <div className="loader-container">
          <div className="loader"></div>
          <h2>Loading items...</h2>
        </div>
      ) : (
        <>
        <div className="category-items" style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
          {paginatedItems.length > 0 ? (
            paginatedItems.map(item => (
              <div
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="item-card scards"
              >
                <img src={item.image} style={{ width: "300px" }} alt={item.name} />
                {item.discountActive && (
                  <div className="discount-badge">
                    {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                  </div>
                )}
                <span>
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
                  <h3>{item.restaurantName}</h3>
                  {item.quantity === 0 || !item.available ? (
                    <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                  ) : (
                    <div>
                      <button onClick={(e) => { e.stopPropagation(); addtocart(item); }}>ADD TO Cart</button>
                      {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
                    </div>
                  )}
                </span>
              </div>
            ))
          ) : (
            <>
              <br />
              <p >No items found</p>
            </>
          )}
        </div>


      

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Recommended Items Section */}
      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>Recommended Items</h2>
      <div className="category-items" style={{ display: "flex", flexDirection: "column", marginTop: "20px", }}>
        {paginatedRecommendedItems.length > 0 ? (
          paginatedRecommendedItems.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/item/${item.itemId }`)}
              className="item-card scards"
            >
              <img src={`data:image/jpeg;base64,${item.image}`} style={{ width: "300px" }} alt={item.name} />
              {item.discountActive && (
                <div className="discount-badge">
                  {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                </div>
              )}
              <span>
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
                <h3>{item.restaurantName}</h3>
                {item.quantity === 0 ? (
                  <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                ) : (
                  <div>
                    <button
                     onClick={() => navigate(`/item/${item.itemId }`)}
                    >
                      VIEW ITEM
                      </button>
                    {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
                  </div>
                )}
              </span>
            </div>
          ))
        ) : (
          <>
            <br />
            <p > No recommended items found</p>
          </>
        )}
      </div>



      <div className="pagination">
        {Array.from({ length: recommendedTotalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handleRecommendedPageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>


            {/* Restaurants Matched Items */}
            <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>Restaurants Matched</h2>
            <div className="category-items" style={{ display: "flex", flexDirection: "column", marginTop: "20px", }}>
            {paginatedMatchedItems.length > 0 ? (
              paginatedMatchedItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/selle-categories-items/${item.restaurantName}`)}
                  className="item-card scards"
                >
                  <img src={`data:image/jpeg;base64,${item.image}`} alt={item.restaurantName} style={{ width: '300px' }} />
                  <span>
                    <h2>{item.restaurantName}</h2>
                    {/* <h3>Seller: {item.sellerName}</h3> */}
                    <button
                  onClick={() => navigate(`/selle-categories-items/${item.restaurantName}`)}
                  >
                      VIEW ITEM
                      </button>
                  </span>
                </div>
              ))
            ) : (
              <p>No restaurants found</p>
            )}
          </div>

 {/* Pagination for Matched Items */}
 <div className="pagination">
        {Array.from({ length: matchedTotalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handleMatchedPageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>



      </>
)}

    </div>
  );
};

export default SearchResults;




