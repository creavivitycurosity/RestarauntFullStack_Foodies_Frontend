// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Categories.css';
// import { useNavigate } from 'react-router-dom';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get('http://localhost:8080/items/categories');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   return (
//     <div className="categories">
//       {categories.map(category => (
//         <div 
//           key={category.categoryName} 
//           className="category-card" 
//           style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }}
//           onClick={() => navigate(`/category/${category.categoryName}`)}
//         >
//           <div className="category-name">{category.categoryName}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Categories;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Categories.css';
// import { useNavigate } from 'react-router-dom';
// import SellerCategories from './SellerCategories';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get('http://localhost:8080/items/categories-with-random-images');
//         setCategories(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   return (
//     <>
//     <h1>Items Category</h1>
//     <div className="categories">
//       {categories.map(category => (
//         <div 
//           key={category.categoryId} 
//           className="category-card" 
//           style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }} 
//           onClick={() => navigate(`/category/${category.categoryId}`)}
//         >
//           <div className="category-name">{category.categoryName}</div>
//         </div>
//       ))}
//     </div>
// <br/>
// <hr/>
//     <SellerCategories></SellerCategories>
//     </>
//   );
// }

// export default Categories;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css';
import { useNavigate } from 'react-router-dom';
import SellerCategories from './SellerCategories';
import ItemType from './ItemType';

const CACHE_KEY = 'categoriesCache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // Cache expires in 24 hours (optional)

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);  // 🆕 Pagination state
  const [categoriesPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      // Check for cached categories in localStorage
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

      // Check if cached data exists and is not expired
      if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION) {
        setCategories(cachedData.data);
        setLoading(false); // Stop loading when data is fetched

        console.log('Using cached data:', cachedData.data);
        return;
      }

      // If no valid cache, fetch data from the API
      try {
        const response = await axios.get(`${BASE_URL}/items/categories-with-random-images`);
        setCategories(response.data);
        setLoading(false); // Stop loading when data is fetched

        // Store the fetched data in localStorage with a timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
        console.log('Fetched and cached data:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false); // Stop loading when data is fetched

      }
    }

    fetchCategories();
  }, []);


  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>ITEMS CATEGORIES</h1>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>

          <div className='offcontainer'>
            <div className="categories">
              {currentCategories.map(category => (
                <div
                  key={category.categoryId}
                  className="category-card"
                  style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }}
                  onClick={() => navigate(`/category/${category.categoryId}`)}
                >
                  <div className="category-name">{category.categoryName}</div>
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
      <br />
      {/* <hr /> */}
      <SellerCategories />


<ItemType></ItemType>


    </>
  );
};

export default Categories;
