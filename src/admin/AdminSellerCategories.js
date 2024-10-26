
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Components/CategoryItems.css';
// import { useNavigate } from 'react-router-dom';

// const CACHE_KEY = 'sellersCache';
// const CACHE_EXPIRATION = 5 * 60 * 1000; // Cache expires in 5 minutes

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const AdminSellerCategories = () => {
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSellers = async () => {
//       const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
//       const now = Date.now();

//       // Check if the cached data exists and is not expired
//       if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
//         setSellers(cachedData.data); // Use cached data
//         setLoading(false); // Stop loading when data is fetched

//         console.log('Using cached data:', cachedData.data);
//       } else {
//         try {
//           // Fetch new data from the API if no valid cache
//           const response = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
//           setSellers(response.data);
//           setLoading(false); // Stop loading when data is fetched

//           // Store fetched data with timestamp in localStorage
//           localStorage.setItem(
//             CACHE_KEY,
//             JSON.stringify({
//               data: response.data,
//               timestamp: now,
//             })
//           );
//           console.log('Fetched and cached data:', response.data);
//         } catch (error) {
//           console.error('Error fetching sellers:', error);
//         }
//       }
//     };

//     fetchSellers();
//   }, []); // Run only once when the component mounts

//   return (
//     <>
//       <h1>SELLERS</h1>
//       {loading ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//         </div>
//       ) : (

//       <div className="categories">
//         {sellers.map(seller => (
//           <div 
//             key={seller.sellerName} 
//             className="category-card" 
//             style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }} 
//             onClick={() => navigate(`/admin/selle-items/${seller.sellerName}`)}
//           >
//             <div className="category-name">{seller.sellerName}</div>
//           </div>
//         ))}
//       </div>

//       )}
//     </>
//   );
// };

// export default AdminSellerCategories;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Components/CategoryItems.css';
import { useNavigate } from 'react-router-dom';

const CACHE_KEY = 'sellersCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // Cache expires in 5 minutes
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminSellerCategories = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1); // 🆕 Pagination state
  const [sellersPerPage] = useState(4);     
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellersAndItems = async () => {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      const now = Date.now();

      if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
        setSellers(cachedData.data); // Use cached data
        setLoading(false);
        console.log('Using cached data:', cachedData.data);
      } else {
        try {
          // Fetch sellers data
          const sellersResponse = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
          console.log('Fetched sellers:', sellersResponse.data);

          // Fetch items data
          const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
          console.log('Fetched items:', itemsResponse.data);

          // Create a seller item count map
          const sellerItemCounts = {};

          itemsResponse.data.forEach(item => {
            const sellerName = item.sellerName; // The seller's email
            const restaurantName = item.restaurantName; // The restaurant name
            console.log(`Processing item with sellerName: ${sellerName}, restaurantName: ${restaurantName}`);

            if (sellerName) {
              // Count the number of items for each seller using restaurantName
              sellerItemCounts[restaurantName] = (sellerItemCounts[restaurantName] || 0) + 1;
            }
          });

          console.log('Seller item counts:', sellerItemCounts); // Log the count mapping

          // Add item count to each seller based on restaurant name
          const sellersWithItemCounts = sellersResponse.data.map(seller => {
            const sellerName = seller.sellerName; // Ensure this corresponds to your seller structure
            console.log('Seller item counts2:', sellerName); // Log the count mapping

            const itemCount = sellerItemCounts[sellerName] || 0; // Get count based on restaurantName
            console.log('Seller item counts3:', itemCount); // Log the count mapping

            console.log(`Seller: ${sellerName}, Items Count: ${itemCount}`); // Log the final item count

            return { ...seller, itemsCount: itemCount };
          });

          setSellers(sellersWithItemCounts);
          setLoading(false); // Stop loading when data is fetched

          // Store fetched data with timestamp in localStorage
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: sellersWithItemCounts,
              timestamp: now,
            })
          );
          console.log('Fetched and cached data:', sellersWithItemCounts);
        } catch (error) {
          console.error('Error fetching sellers or items:', error);
        }
      }
    };

    fetchSellersAndItems();
  }, []); // Run only once when the component mounts



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
      <h1>SELLERS</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
        <div className="categories">
          {currentSellers.map(seller => (
            <div>
            <div
              key={seller.sellerName}
              className="category-card"
              style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }}
              onClick={() => navigate(`/admin/selle-items/${seller.sellerName}`)}
            >
              <div className="category-name">{seller.sellerName}</div>
            </div><br/>
           <h3 className="category-item-count">Total Items: {seller.itemsCount || 0}</h3> {/* Display item count */}
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

        </>

      )}
    </>
  );
};

export default AdminSellerCategories;


