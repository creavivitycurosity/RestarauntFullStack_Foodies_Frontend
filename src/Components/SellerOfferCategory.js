// // SellerCategory.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './OfferedItemsAndCategories.module.css';
// import { useNavigate } from 'react-router-dom';

// const SellerOfferCategory = () => {
//   const [items, setItems] = useState([]);
//   const [sellers, setSellers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch items and sellers
//         const itemsResponse = await axios.get('http://localhost:8080/items/allitems');
//         const sellersResponse = await axios.get('http://localhost:8080/items/seller-categories-with-random-images');
//         console.log(itemsResponse)
// console.log(sellersResponse)
//         // Filter items with discounts
//         const discountedItems = itemsResponse.data.filter(item => item.discountActive);
//         console.log("discounted",discountedItems)
//         // Calculate high and low discounts for each seller
//         const sellerDiscounts = sellersResponse.data.map(seller => {
//         const sellerItems = discountedItems.filter(item => item.restaurantName === seller.sellerName);

//           if (sellerItems.length === 0) {
//             return null;
//           }

//           const sdiscounts = sellerItems.map(item => item.discountPercentage).filter(d => d != null);
//           const shighDiscount = Math.max(...sdiscounts);
//           const slowDiscount = Math.min(...sdiscounts);

//           return {
//             ...seller,
//             shighDiscount,
//             slowDiscount
//           };
//         }).filter(seller => seller !== null);
//          console.log(sellerDiscounts)
//         // Set state with fetched and calculated data
//         setItems(discountedItems);
//         setSellers(sellerDiscounts);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);


// //   const handleSellerClick = (sellerName) => {
// //     navigate(`/sell-offers/${sellerName}`); // Navigate to the SellerDiscountedItems component
// //   };

//   const handleSellerClick = (sellerName) => {
//     navigate(`/selle-categories-items/${sellerName}`, { state: { filter: 'discount' } }); // Passing the filter state
//   };

//   return (
//     <div>
//       <h1>Seller Categories</h1>
//       <div className={styles.categoriesContainers}>
//         {sellers.map(seller => (
//           <div
//             key={seller.sellerName}
//             className={styles.categoryCards}
//             style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }}
//             onClick={() => handleSellerClick(seller.sellerName)} // Add click event

//           >
//             <div className={styles.categoryNames}>
//               {seller.sellerName}
//               <div className={styles.discountInfos}>
//                 {seller.slowDiscount === seller.shighDiscount
//                   ? `0-${seller.shighDiscount}%`
//                   : `${seller.slowDiscount}-${seller.shighDiscount}%`}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SellerOfferCategory;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OfferedItemsAndCategories.module.css';
import { useNavigate } from 'react-router-dom';

const CACHE_KEY = 'sellerOfferCategoryCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // Cache expires in 5 minutes

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerOfferCategory = () => {
  const [items, setItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const [currentPage, setCurrentPage] = useState(1);  // 🆕 Pagination state
  const [sellersPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const now = Date.now();

      // Check for cached data in localStorage
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

      if (cachedData && (now - cachedData.timestamp) < CACHE_EXPIRATION) {
        // Use cached data if it exists and is not expired
        setLoading(false); // Stop loading when data is fetched

        setItems(cachedData.items);
        setSellers(cachedData.sellers);
        console.log('Using cached data:', cachedData);
        return;
      }

      // If no valid cache, fetch data from the API
      try {
        const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
        const sellersResponse = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
        console.log(itemsResponse);
        console.log(sellersResponse);

        // Filter items with discounts
        const discountedItems = itemsResponse.data.filter(item => item.discountActive);
        console.log('discounted', discountedItems);

        // Calculate high and low discounts for each seller
        const sellerDiscounts = sellersResponse.data.map(seller => {
          const sellerItems = discountedItems.filter(item => item.restaurantName === seller.sellerName);

          if (sellerItems.length === 0) {
            return null;
          }

          const sdiscounts = sellerItems.map(item => item.discountPercentage).filter(d => d != null);
          const shighDiscount = Math.max(...sdiscounts);
          const slowDiscount = Math.min(...sdiscounts);

          return {
            ...seller,
            shighDiscount,
            slowDiscount
          };
        }).filter(seller => seller !== null);
        console.log(sellerDiscounts);
        setLoading(false); // Stop loading when data is fetched


        // Set state with fetched and calculated data
        setItems(discountedItems);
        setSellers(sellerDiscounts);

        // Store the fetched data in localStorage with a timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            items: discountedItems,
            sellers: sellerDiscounts,
            timestamp: now
          })
        );
        console.log('Fetched and cached data:', { items: discountedItems, sellers: sellerDiscounts });
      } catch (error) {
        setLoading(false);

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const handleSellerClick = (sellerName) => {
    navigate(`/selle-categories-items/${sellerName}`, { state: { filter: 'discount' } });
  };

  // Pagination logic
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

  const totalPages = Math.ceil(sellers.length / sellersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    <>
      <h1>RESTAURANTS OFFERS</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>

          <div className={styles.offcontainer}>

            <div className={styles.categoriesContainers}>
              {currentSellers.map(seller => (
                <div
                  key={seller.sellerName}
                  className={styles.categoryCards}
                  style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }}
                  onClick={() => handleSellerClick(seller.sellerName)}
                >
                  <div className={styles.categoryNames}>
                    {seller.sellerName}
                    <div className={styles.discountInfos}>
                      {seller.slowDiscount === seller.shighDiscount
                        ? `0-${seller.shighDiscount}%`
                        : `${seller.slowDiscount}-${seller.shighDiscount}%`} OFF
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
                  {i + 1}
                </button>
              ))}
            </div>


          </div>


        </>

      )}


    </>
  );
};

export default SellerOfferCategory;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './OfferedItemsAndCategories.module.css';
// import { useNavigate } from 'react-router-dom';

// const SellerOfferCategory = () => {
//   const [items, setItems] = useState([]);
//   const [sellers, setSellers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSellers = async () => {
//       const cacheKey = 'sellersData';
//       const cachedData = JSON.parse(localStorage.getItem(cacheKey));
//       const cacheExpiration = 5 * 60 * 1000; // 5 minutes in milliseconds
//       const now = new Date().getTime();

//       // Check if the cached data exists and is still valid
//       if (cachedData && now - cachedData.timestamp < cacheExpiration) {
//         setSellers(cachedData.data); // Use cached data
//       } else {
//         try {
//           // Fetch fresh sellers data if cache is expired or doesn't exist
//           const sellersResponse = await axios.get('http://localhost:8080/items/seller-categories-with-random-images');
//           const sellersData = sellersResponse.data;

//           // Save the fresh data to localStorage with a timestamp
//           localStorage.setItem(
//             cacheKey,
//             JSON.stringify({
//               data: sellersData,
//               timestamp: now,
//             })
//           );

//           // Fetch items for discount calculations
//           const itemsResponse = await axios.get('http://localhost:8080/items/allitems');
//           const discountedItems = itemsResponse.data.filter(item => item.discountActive);

//           // Calculate high and low discounts for each seller
//           const sellerDiscounts = sellersData.map(seller => {
//             const sellerItems = discountedItems.filter(item => item.restaurantName === seller.sellerName);

//             if (sellerItems.length === 0) {
//               return null;
//             }

//             const sdiscounts = sellerItems.map(item => item.discountPercentage).filter(d => d != null);
//             const shighDiscount = Math.max(...sdiscounts);
//             const slowDiscount = Math.min(...sdiscounts);

//             return {
//               ...seller,
//               shighDiscount,
//               slowDiscount
//             };
//           }).filter(seller => seller !== null); // Remove null entries

//           setItems(discountedItems);
//           setSellers(sellerDiscounts);

//         } catch (error) {
//           console.error('Error fetching sellers:', error);
//         }
//       }
//     };

//     fetchSellers();
//   }, []); // Runs only once when the component mounts

//   const handleSellerClick = (sellerName) => {
//     navigate(`/selle-categories-items/${sellerName}`, { state: { filter: 'discount' } }); // Passing the filter state
//   };

//   return (
//     <div>
//       <h1>Seller Categories</h1>
//       <div className={styles.categoriesContainers}>
//         {sellers.map(seller => (
//           <div
//             key={seller.sellerName}
//             className={styles.categoryCards}
//             style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }}
//             onClick={() => handleSellerClick(seller.sellerName)} // Add click event
//           >
//             <div className={styles.categoryNames}>
//               {seller.sellerName}
//               <div className={styles.discountInfos}>
//                 {seller.slowDiscount === seller.shighDiscount
//                   ? `0-${seller.shighDiscount}%`
//                   : `${seller.slowDiscount}-${seller.shighDiscount}%`}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SellerOfferCategory;
