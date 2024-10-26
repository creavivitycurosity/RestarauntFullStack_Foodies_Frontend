




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './OfferedItemsAndCategories.module.css';
// import SellerOfferCategory from './SellerOfferCategory';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// const OfferedItemsAndCategories = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   // const [sellers, setSellers] = useState([]);
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch items and categories
//         const itemsResponse = await axios.get('http://localhost:8080/items/allitems');
//         const categoriesResponse = await axios.get('http://localhost:8080/items/categories-with-random-images');
//         // const sellersResponse = await axios.get('http://localhost:8080/items/seller-categories-with-random-images');
//         console.log(itemsResponse)
//         console.log(categoriesResponse)   
//         // console.log(sellersResponse)

//         // Filter items with discounts
//         const discountedItems = itemsResponse.data.filter(item => item.discountActive);

//         // Calculate high and low discounts for each category
//         const categoryDiscounts = categoriesResponse.data.map(category => {
//           const categoryItems = discountedItems.filter(item => item.category.id === category.categoryId);

//           if (categoryItems.length === 0) {
//             return null; // Skip categories with no discounted items
//           }

//           const discounts = categoryItems.map(item => item.discountPercentage).filter(d => d != null);

//           const highDiscount = Math.max(...discounts);
//           const lowDiscount = Math.min(...discounts);

//           return {
//             ...category,
//             highDiscount,
//             lowDiscount
//           };
//         }).filter(category => category !== null); // Remove null entries

//         setItems(discountedItems);
//         setCategories(categoryDiscounts);


//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);



//   const handleCategoryClick = (categoryId) => {
//     navigate(`/category/${categoryId}`, { state: { filter: 'discount' } }); // Passing the filter state
//   };

//   return (
//     <div>
//             <h1>Items Categories</h1>

//       {/* Categories Slider */}
//       <div className={styles.categoriesContainer}>
//         {/* <div className={styles.categoriesSlider}> */}
//           {categories.map(category => (
//             <div
//               key={category.categoryId}
//               className={styles.categoryCard}
//               style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }}
//               onClick={() => handleCategoryClick(category.categoryId)} // Trigger navigation on click

//             >
//               <div className={styles.categoryName}>
//                 {category.categoryName}
//                 <div className={styles.discountInfo}>
//                   {/* {category.highDiscount} - {category.lowDiscount}% */}
//                   {category.lowDiscount === category.highDiscount
//                   ? `0-${category.highDiscount}%`
//                   : `${category.lowDiscount}-${category.highDiscount}%`}
//                 </div>
//               </div>
//             </div>
//           ))}
//         {/* </div> */}
//       </div>

// <SellerOfferCategory></SellerOfferCategory>

//       {/* Discounted Items Grid */}
//       <h1>Items </h1>

//       <div className={styles.itemsGrid}>
//         {items.map(item => (
//           <div key={item.id} className={styles.itemCard}>
//             <img src={`data:image/png;base64,${item.image}`} alt={item.name} />
//             <div className={styles.itemInfo}>
//               <h3>{item.name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Discount: {item.discountPercentage}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OfferedItemsAndCategories;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OfferedItemsAndCategories.module.css';
import SellerOfferCategory from './SellerOfferCategory';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Grid, Row, Col } from 'react-grid-layout';
import ItemTypeOffers from './ItemTypeOffers';

const CACHE_KEY = 'offeredItemsAndCategoriesCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // Cache expires in 5 minutes

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OfferedItemsAndCategories = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);  // 🆕 Pagination state
  const [categoriesPerPage] = useState(3);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      const now = Date.now();
      const cachedDataString = localStorage.getItem(CACHE_KEY);
      const cachedData = cachedDataString ? JSON.parse(cachedDataString) : null;

      if (cachedData && (now - cachedData.timestamp) < CACHE_EXPIRATION) {
        // Use cached data if it exists and is not expired
        setItems(cachedData.items);
        setCategories(cachedData.categories);
        setLoading(false); // Stop loading when data is fetched

        console.log('Using cached data:', cachedData);
        return;
      }

      try {
        // Fetch items and categories
        const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
        const categoriesResponse = await axios.get(`${BASE_URL}/items/categories-with-random-images`);
        console.log(itemsResponse);
        console.log(categoriesResponse);
        setLoading(false); // Stop loading when data is fetched

        // Filter items with discounts
        const discountedItems = itemsResponse.data.filter(item => item.discountActive);

        // Calculate high and low discounts for each category
        const categoryDiscounts = categoriesResponse.data.map(category => {
          const categoryItems = discountedItems.filter(item => item.category.id === category.categoryId);

          if (categoryItems.length === 0) {
            return null; // Skip categories with no discounted items
          }

          const discounts = categoryItems.map(item => item.discountPercentage).filter(d => d != null);

          const highDiscount = discounts.length ? Math.max(...discounts) : 0;
          const lowDiscount = discounts.length ? Math.min(...discounts) : 0;

          return {
            ...category,
            highDiscount,
            lowDiscount
          };
        }).filter(category => category !== null); // Remove null entries

        // Set state with fetched and calculated data
        setItems(discountedItems);
        setCategories(categoryDiscounts);

        // Store the fetched data in localStorage with a timestamp
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            items: discountedItems,
            categories: categoryDiscounts,
            timestamp: now
          })
        );
        console.log('Fetched and cached data:', { items: discountedItems, categories: categoryDiscounts });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run only once when the component mounts

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`, { state: { filter: 'discount' } }); // Passing the filter state
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show 1 slide containing the 2x2 grid
    slidesToScroll: 1,
    arrows: true,
  };

  // Split items into chunks of 6 (3 columns x 2 rows per slide)
  // const chunkedItems = [];
  // for (let i = 0; i < items.length; i += 6) {
  //   chunkedItems.push(items.slice(i, i + 6));
  // }


  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div >
      <h1>ITEMS OFFERS</h1>


      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
<div className={styles.offcontainer}>
          <div className={styles.categoriesContainer}>
            {currentCategories.map(category => (
              <div
                key={category.categoryId}
                className={styles.categoryCard}
                style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }}
                onClick={() => handleCategoryClick(category.categoryId)} // Trigger navigation on click
              >
                <div className={styles.categoryName}>
                  {category.categoryName}
                  <div className={styles.discountInfo}>
                    {category.lowDiscount === category.highDiscount
                      ? `0-${category.highDiscount}%`
                      : `${category.lowDiscount}-${category.highDiscount}%`} OFF
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
      <SellerOfferCategory />

<ItemTypeOffers/>

      {/* Discounted Items Grid */}
      {/* <div className='disitems'>
        <h1>Discounted Items</h1>
        <Slider {...settings}>

          {Array(Math.ceil(items.length / 6)) // Divide items into groups of 4 per slide
            .fill()
            .map((_, i) => (
              <div key={i}>
                <div className={styles.itemsGrid}>
                  {items.slice(i * 6, i * 6 + 6).map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                      <img style={{ height: "190px" }} src={`data:image/png;base64,${item.image}`} alt={item.name} />
                      <div className={styles.itemInfo}>
                        <h3>{item.name}</h3>
                        <h2><b>Final Price: </b>${item.price}</h2>
                        <h3><b>Discount: </b> {item.discountPercentage}%</h3>
                      </div>
                      <button style={{ backgroundColor: "lightblue" }} onClick={() => navigate(`/item/${item.id}`)}>Go To Item</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </Slider>
      </div> */}
    </div>
  );
};

export default OfferedItemsAndCategories;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './OfferedItemsAndCategories.module.css';
// import SellerOfferCategory from './SellerOfferCategory';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// const OfferedItemsAndCategories = () => {
//   const [items, setItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const cacheKey = 'categoriesData';
//       const cachedData = JSON.parse(localStorage.getItem(cacheKey));
//       const cacheExpiration = 5 * 60 * 1000; // 5 minutes in milliseconds
//       const now = new Date().getTime();

//       // Check if the cached data exists and is still valid
//       if (cachedData && now - cachedData.timestamp < cacheExpiration) {
//         setCategories(cachedData.data); // Use cached data
//       } else {
//         try {
//           // Fetch fresh categories data if cache is expired or doesn't exist
//           const categoriesResponse = await axios.get('http://localhost:8080/items/categories-with-random-images');
//           const categoriesData = categoriesResponse.data;

//           // Save the fresh data to localStorage with a timestamp
//           localStorage.setItem(
//             cacheKey,
//             JSON.stringify({
//               data: categoriesData,
//               timestamp: now,
//             })
//           );

//           // Calculate high and low discounts for each category
//           const itemsResponse = await axios.get('http://localhost:8080/items/allitems');
//           const discountedItems = itemsResponse.data.filter(item => item.discountActive);

//           const categoryDiscounts = categoriesData.map(category => {
//             const categoryItems = discountedItems.filter(item => item.category.id === category.categoryId);

//             if (categoryItems.length === 0) {
//               return null; // Skip categories with no discounted items
//             }

//             const discounts = categoryItems.map(item => item.discountPercentage).filter(d => d != null);

//             const highDiscount = Math.max(...discounts);
//             const lowDiscount = Math.min(...discounts);

//             return {
//               ...category,
//               highDiscount,
//               lowDiscount,
//             };
//           }).filter(category => category !== null); // Remove null entries

//           setCategories(categoryDiscounts);

//         } catch (error) {
//           console.error('Error fetching categories:', error);
//         }
//       }
//     };

//     fetchCategories();
//   }, []); // Runs only once when the component mounts

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/category/${categoryId}`, { state: { filter: 'discount' } }); // Passing the filter state
//   };

//   return (
//     <div>
//       <h1>Items Categories</h1>

//       {/* Categories Slider */}
//       <div className={styles.categoriesContainer}>
//         {categories.map(category => (
//           <div
//             key={category.categoryId}
//             className={styles.categoryCard}
//             style={{ backgroundImage: `url(data:image/png;base64,${category.image})` }}
//             onClick={() => handleCategoryClick(category.categoryId)} // Trigger navigation on click
//           >
//             <div className={styles.categoryName}>
//               {category.categoryName}
//               <div className={styles.discountInfo}>
//                 {category.lowDiscount === category.highDiscount
//                   ? `0-${category.highDiscount}%`
//                   : `${category.lowDiscount}-${category.highDiscount}%`}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <SellerOfferCategory />

//       {/* Discounted Items Grid */}
//       <h1>Items</h1>

//       <div className={styles.itemsGrid}>
//         {items.map(item => (
//           <div key={item.id} className={styles.itemCard}>
//             <img src={`data:image/png;base64,${item.image}`} alt={item.name} />
//             <div className={styles.itemInfo}>
//               <h3>{item.name}</h3>
//               <p>Price: ${item.price}</p>
//               <p>Discount: {item.discountPercentage}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OfferedItemsAndCategories;
