// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Categories.css'; // You may reuse Categories.css if the styles are the same
// import { useNavigate } from 'react-router-dom';

// const SellerCategories = () => {
//   const [sellers, setSellers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchSellers() {
//       try {
//         const response = await axios.get('http://localhost:8080/items/seller-categories-with-random-images');
//         setSellers(response.data);
//       } catch (error) {
//         console.error('Error fetching sellers:', error);
//       }
//     }

//     fetchSellers();
//   }, []);

//   return (<>
//   <h1>SELLERS</h1>
//     <div className="categories">
//       {sellers.map(seller => (
//         <div 
//           key={seller.sellerName} 
//           className="category-card" 
//           style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }} 
//           onClick={() => navigate(`/selle-categories-items/${seller.sellerName}`)}
//         >
//           <div className="category-name">{seller.sellerName}</div>
//         </div>
//       ))}
//     </div>
//     </>
//   );
// };

// export default SellerCategories;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css'; // Reuse Categories.css if the styles are the same
import { useNavigate } from 'react-router-dom';

const CACHE_KEY = 'sellersCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // Cache expires in 5 minutes

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerCategories = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);  // 🆕 Pagination state
  const [sellersPerPage] = useState(3);              // 🆕 Sellers per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
      const now = Date.now();

      // Check if the cached data exists and is not expired
      if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
        setSellers(cachedData.data); // Use cached data
        setLoading(false); // Stop loading when data is fetched

        console.log('Using cached data:', cachedData.data);
      } else {
        try {
          // Fetch new data from the API if no valid cache
          const response = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
          setSellers(response.data);
          setLoading(false); // Stop loading when data is fetched

          // Store fetched data with timestamp in localStorage
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: response.data,
              timestamp: now,
            })
          );
          console.log('Fetched and cached data:', response.data);
        } catch (error) {
          console.error('Error fetching sellers:', error);
        }
      }
    };

    fetchSellers();
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
      <h1>RESTAURANTS</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className='offcontainer'>
            <div className="categories">
              {currentSellers.map(seller => (
                <div
                  key={seller.sellerName}
                  className="category-card"
                  style={{ backgroundImage: `url(data:image/png;base64,${seller.image})` }}
                  onClick={() => navigate(`/selle-categories-items/${seller.sellerName}`)}
                >
                  <div className="category-name">{seller.sellerName}</div>
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

export default SellerCategories;
