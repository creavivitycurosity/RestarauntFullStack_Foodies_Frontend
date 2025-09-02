


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './ComparePage.module.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ComparePage = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems1, setFilteredItems1] = useState([]);
//   const [filteredItems2, setFilteredItems2] = useState([]);
//   const [selectedRestaurant1, setSelectedRestaurant1] = useState('');
//   const [selectedItem1, setSelectedItem1] = useState('');
//   const [selectedRestaurant2, setSelectedRestaurant2] = useState('');
//   const [selectedItem2, setSelectedItem2] = useState('');
//   const [item1Details, setItem1Details] = useState(null);
//   const [item2Details, setItem2Details] = useState(null);
//   const [item1Reviews, setItem1Reviews] = useState([]);
//   const [item2Reviews, setItem2Reviews] = useState([]);
//   const [item1AverageRating, setItem1AverageRating] = useState(0);
//   const [item2AverageRating, setItem2AverageRating] = useState(0);
//   const [currentPage1, setCurrentPage1] = useState(1);
//   const [currentPage2, setCurrentPage2] = useState(1);
//   const [selectedRatingFilter1, setSelectedRatingFilter1] = useState(null);
//   const [selectedRatingFilter2, setSelectedRatingFilter2] = useState(null);

//   const REVIEWS_PER_PAGE = 2;

//   // Fetch restaurants and items
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const restaurantResponse = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
//         setRestaurants(restaurantResponse.data);

//         const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
//         setItems(itemsResponse.data);
//       } catch (error) {
//         console.error('Error fetching restaurants or items:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setFilteredItems1(items.filter((item) => item.restaurantName === selectedRestaurant1));
//   }, [selectedRestaurant1, items]);

//   useEffect(() => {
//     setFilteredItems2(items.filter((item) => item.restaurantName === selectedRestaurant2));
//   }, [selectedRestaurant2, items]);

//   const fetchItemDetailsAndReviews = async (itemId, setDetails, setReviews, setAverageRating) => {
//     if (!itemId) return;
//     try {
//       const itemResponse = await axios.get(`${BASE_URL}/items/${itemId}`);
//       setDetails(itemResponse.data);

//       const reviewsResponse = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
//       setReviews(reviewsResponse.data.reviews);
//       setAverageRating(reviewsResponse.data.averageRating);
//     } catch (error) {
//       console.error('Error fetching item details or reviews:', error);
//     }
//   };

//   const filterReviews = (reviews, ratingFilter) => {
//     return ratingFilter
//       ? reviews.filter((review) => review.rating === ratingFilter)
//       : reviews;
//   };

//   const paginateReviews = (reviews, currentPage) => {
//     const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
//     return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
//   };

//   return (
//     <div className={styles.comparePaget}>
//       <h1 className={styles.headingt}>Compare Items</h1>

//       <div className={styles.selectContainert}>
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 1:</label>
//           <select
//             value={selectedRestaurant1}
//             onChange={(e) => setSelectedRestaurant1(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 1:</label>
//           <select
//             value={selectedItem1}
//             onChange={(e) => {
//               setSelectedItem1(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem1Details, setItem1Reviews, setItem1AverageRating);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems1.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className={styles.selectColumnt}>
//           <label>Restaurant 2:</label>
//           <select
//             value={selectedRestaurant2}
//             onChange={(e) => setSelectedRestaurant2(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 2:</label>
//           <select
//             value={selectedItem2}
//             onChange={(e) => {
//               setSelectedItem2(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem2Details, setItem2Reviews, setItem2AverageRating);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems2.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className={styles.comparisonContainert}>
//         {item1Details && (
//           <div className={styles.itemDetailst}>
//             <img
//               className={styles.itemImaget}
//               src={`data:image/png;base64,${item1Details.image}`}
//               alt={item1Details.name}
//             />
//             <h2>{item1Details.name}</h2>
//             <p>Price: ₹{item1Details.price}</p>
//             <p>Average Rating: {item1AverageRating.toFixed(1)} / 5</p>
//             <div className={styles.reviewFiltert}>
//               <button onClick={() => setSelectedRatingFilter1(null)}>All</button>
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <button key={rating} onClick={() => setSelectedRatingFilter1(rating)}>
//                   {rating} Star
//                 </button>
//               ))}
//             </div>
//             <div className={styles.reviewt}>
//               {paginateReviews(filterReviews(item1Reviews, selectedRatingFilter1), currentPage1).map((review) => (
//                 <div key={review.id}>
//                   <p>{review.comment}</p>
//                   <p>Rating: {review.rating} / 5</p>
//                 </div>
//               ))}
//               <div className={styles.paginationt}>
//                 <button
//                   onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage1 === 1}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage1((prev) =>
//                       prev * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
//                         ? prev
//                         : prev + 1
//                     )
//                   }
//                   disabled={currentPage1 * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {item2Details && (
//           <div className={styles.itemDetailst}>
//             <img
//               className={styles.itemImaget}
//               src={`data:image/png;base64,${item2Details.image}`}
//               alt={item2Details.name}
//             />
//             <h2>{item2Details.name}</h2>
//             <p>Price: ₹{item2Details.price}</p>
//             <p>Average Rating: {item2AverageRating.toFixed(1)} / 5</p>
//             <div className={styles.reviewFiltert}>
//               <button onClick={() => setSelectedRatingFilter2(null)}>All</button>
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <button key={rating} onClick={() => setSelectedRatingFilter2(rating)}>
//                   {rating} Star
//                 </button>
//               ))}
//             </div>
//             <div className={styles.reviewt}>
//               {paginateReviews(filterReviews(item2Reviews, selectedRatingFilter2), currentPage2).map((review) => (
//                 <div key={review.id}>
//                   <p>{review.comment}</p>
//                   <p>Rating: {review.rating} / 5</p>
//                 </div>
//               ))}
//               <div className={styles.paginationt}>
//                 <button
//                   onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage2 === 1}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage2((prev) =>
//                       prev * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
//                         ? prev
//                         : prev + 1
//                     )
//                   }
//                   disabled={currentPage2 * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComparePage;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ComparePage.module.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ComparePage = () => {
//   const { itemId } = useParams(); // Get itemId from the URL
//   const [restaurants, setRestaurants] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems1, setFilteredItems1] = useState([]);
//   const [filteredItems2, setFilteredItems2] = useState([]);
//   const [selectedRestaurant1, setSelectedRestaurant1] = useState('');
//   const [selectedItem1, setSelectedItem1] = useState('');
//   const [selectedRestaurant2, setSelectedRestaurant2] = useState('');
//   const [selectedItem2, setSelectedItem2] = useState('');
//   const [item1Details, setItem1Details] = useState(null);
//   const [item2Details, setItem2Details] = useState(null);
//   const [item1Reviews, setItem1Reviews] = useState([]);
//   const [item2Reviews, setItem2Reviews] = useState([]);
//   const [item1AverageRating, setItem1AverageRating] = useState(0);
//   const [item2AverageRating, setItem2AverageRating] = useState(0);
//   const [currentPage1, setCurrentPage1] = useState(1);
//   const [currentPage2, setCurrentPage2] = useState(1);
//   const [selectedRatingFilter1, setSelectedRatingFilter1] = useState(null);
//   const [selectedRatingFilter2, setSelectedRatingFilter2] = useState(null);
//   const navigate = useNavigate();

//   const REVIEWS_PER_PAGE = 2;

//   // Fetch restaurants and items
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const restaurantResponse = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
//         setRestaurants(restaurantResponse.data);

//         const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
//         setItems(itemsResponse.data);
//       } catch (error) {
//         console.error('Error fetching restaurants or items:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Prefill the first item and restaurant dropdown
//   useEffect(() => {
//     const prefillItemDetails = async () => {
//       if (!itemId) return;

//       try {
//         const response = await axios.get(`${BASE_URL}/items/${itemId}`);
//         const item = response.data;

//         setSelectedRestaurant1(item.restaurantName); // Prefill restaurant name
//         setSelectedItem1(item.id.toString()); // Prefill item ID as string
//         setFilteredItems1(items.filter((i) => i.restaurantName === item.restaurantName)); // Filter items for the restaurant

//         // Fetch item details and reviews
//         fetchItemDetailsAndReviews(item.id, setItem1Details, setItem1Reviews, setItem1AverageRating);
//       } catch (error) {
//         console.error('Error fetching item details for prefill:', error);
//       }
//     };

//     prefillItemDetails();
//   }, [itemId, items]);

//   // Update filtered items for Restaurant 1 when selectedRestaurant1 changes
//   useEffect(() => {
//     setFilteredItems1(items.filter((item) => item.restaurantName === selectedRestaurant1));
//   }, [selectedRestaurant1, items]);

//   // Update filtered items for Restaurant 2 when selectedRestaurant2 changes
//   useEffect(() => {
//     setFilteredItems2(items.filter((item) => item.restaurantName === selectedRestaurant2));
//   }, [selectedRestaurant2, items]);

//   const fetchItemDetailsAndReviews = async (itemId, setDetails, setReviews, setAverageRating) => {
//     if (!itemId) return;
//     try {
//       const itemResponse = await axios.get(`${BASE_URL}/items/${itemId}`);
//       setDetails(itemResponse.data);

//       const reviewsResponse = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
//       const sortedReviews = reviewsResponse.data.reviews.sort(
//         (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
//       );
//       setReviews(sortedReviews);
//       setAverageRating(reviewsResponse.data.averageRating);
//     } catch (error) {
//       console.error('Error fetching item details or reviews:', error);
//     }
//   };

//   const filterReviews = (reviews, ratingFilter) => {
//     return ratingFilter
//       ? reviews.filter((review) => review.rating === ratingFilter)
//       : reviews;
//   };

//   const paginateReviews = (reviews, currentPage) => {
//     const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
//     return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className={styles.comparePaget}>
//       <h1 className={styles.heading}>Compare Items</h1>
//       <div className={styles.selectContainert}>
//         {/* Selection for Item 1 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 1:</label>
//           <select
//             value={selectedRestaurant1}
//             onChange={(e) => setSelectedRestaurant1(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 1:</label>
//           <select
//             value={selectedItem1}
//             onChange={(e) => {
//               setSelectedItem1(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem1Details, setItem1Reviews, setItem1AverageRating);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems1.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Selection for Item 2 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 2:</label>
//           <select
//             value={selectedRestaurant2}
//             onChange={(e) => setSelectedRestaurant2(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 2:</label>
//           <select
//             value={selectedItem2}
//             onChange={(e) => {
//               setSelectedItem2(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem2Details, setItem2Reviews, setItem2AverageRating);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems2.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className={styles.comparisonContainert}>
//         {item1Details && (
//           <div className={styles.itemDetailst}        >
//             <img
//                             onClick={() => navigate(`/item/${item1Details.id}`)}

//               className={styles.itemImaget}
//               src={`data:image/png;base64,${item1Details.image}`}
//               alt={item1Details.name}
//             />
//             <h2>{item1Details.name}</h2><br/>
//             <p>Price: ₹{item1Details.price}</p><br/>
//             <p>Average Rating: {item1AverageRating.toFixed(1)} / 5</p>
//             <div className={styles.reviewFiltert}>
//               <button onClick={() => setSelectedRatingFilter1(null)}>All</button>
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <button key={rating} onClick={() => setSelectedRatingFilter1(rating)}>
//                   {rating} Star
//                 </button>
//               ))}
//             </div>
//             <div className={styles.reviewt}>
//               {paginateReviews(filterReviews(item1Reviews, selectedRatingFilter1), currentPage1).map((review) => (
//                 <div key={review.id}>
//                   <p><strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}</p>
//                   <p>{review.comment}</p>
//                   <p>Rating: {review.rating} / 5</p>
//                 </div>
//               ))}
//               <div className={styles.paginationt}>
//                 <button
//                   onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage1 === 1}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage1((prev) =>
//                       prev * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
//                         ? prev
//                         : prev + 1
//                     )
//                   }
//                   disabled={currentPage1 * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {item2Details && (
//           <div className={styles.itemDetailst} >
//             <img
//                             onClick={() => navigate(`/item/${item1Details.id}`)}

//               className={styles.itemImaget}
//               src={`data:image/png;base64,${item2Details.image}`}
//               alt={item2Details.name}
//             />
//             <h2>{item2Details.name}</h2><br/>
//             <p>Price: ₹{item2Details.price}</p><br/>
//             <p>Average Rating: {item2AverageRating.toFixed(1)} / 5</p>
//             <div className={styles.reviewFiltert}>
//               <button onClick={() => setSelectedRatingFilter2(null)}>All</button>
//               {[1, 2, 3, 4, 5].map((rating) => (
//                 <button key={rating} onClick={() => setSelectedRatingFilter2(rating)}>
//                   {rating} Star
//                 </button>
//               ))}
//             </div>
//             <div className={styles.reviewt}>
//               {paginateReviews(filterReviews(item2Reviews, selectedRatingFilter2), currentPage2).map((review) => (
//                 <div key={review.id}>
//                   <p><strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}</p>
//                   <p>{review.comment}</p>
//                   <p>Rating: {review.rating} / 5</p>
//                 </div>
//               ))}
//               <div className={styles.paginationt}>
//                 <button
//                   onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage2 === 1}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() =>
//                     setCurrentPage2((prev) =>
//                       prev * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
//                         ? prev
//                         : prev + 1
//                     )
//                   }
//                   disabled={currentPage2 * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ComparePage;


//chatgpt
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ComparePage.module.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ComparePage = () => {
//   const { itemId } = useParams(); // Get itemId from the URL
//   const [restaurants, setRestaurants] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems1, setFilteredItems1] = useState([]);
//   const [filteredItems2, setFilteredItems2] = useState([]);
//   const [selectedRestaurant1, setSelectedRestaurant1] = useState('');
//   const [selectedItem1, setSelectedItem1] = useState('');
//   const [selectedRestaurant2, setSelectedRestaurant2] = useState('');
//   const [selectedItem2, setSelectedItem2] = useState('');
//   const [item1Details, setItem1Details] = useState(null);
//   const [item2Details, setItem2Details] = useState(null);
//   const [item1Reviews, setItem1Reviews] = useState([]);
//   const [item2Reviews, setItem2Reviews] = useState([]);
//   const [item1AverageRating, setItem1AverageRating] = useState(0);
//   const [item2AverageRating, setItem2AverageRating] = useState(0);
//   const [currentPage1, setCurrentPage1] = useState(1);
//   const [currentPage2, setCurrentPage2] = useState(1);
//   const [selectedRatingFilter1, setSelectedRatingFilter1] = useState(null);
//   const [selectedRatingFilter2, setSelectedRatingFilter2] = useState(null);
//   const [isLoadingItem1, setIsLoadingItem1] = useState(false);
//   const [isLoadingItem2, setIsLoadingItem2] = useState(false);
//   const navigate = useNavigate();

//   const REVIEWS_PER_PAGE = 2;

//   // Fetch restaurants and items
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const restaurantResponse = await axios.get(`${BASE_URL}/items/seller-categories-with-random-imagesss`);
//         setRestaurants(restaurantResponse.data);

//         const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
//         setItems(itemsResponse.data);
//       } catch (error) {
//         console.error('Error fetching restaurants or items:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Prefill the first item and restaurant dropdown
//   useEffect(() => {
//     const prefillItemDetails = async () => {
//       if (!itemId || items.length === 0) return; // Only run when items are loaded
  
//       try {
//         const response = await axios.get(`${BASE_URL}/items/${itemId}`);
//         const item = response.data;
  
//         setSelectedRestaurant1(item.restaurantName); // Prefill restaurant name
//         setSelectedItem1(item.id.toString()); // Prefill item ID as string
//         setFilteredItems1(items.filter((i) => i.restaurantName === item.restaurantName)); // Filter items for the restaurant
  
//         // Fetch item details and reviews with loader for Item 1
//         fetchItemDetailsAndReviews(
//           item.id,
//           setItem1Details,
//           setItem1Reviews,
//           setItem1AverageRating,
//           setIsLoadingItem1
//         );
//       } catch (error) {
//         console.error('Error fetching item details for prefill:', error);
//       }
//     };
  
//     prefillItemDetails();
//   }, [itemId, items]);
  

//   // Update filtered items for Restaurant 1 when selectedRestaurant1 changes
//   useEffect(() => {
//     setFilteredItems1(items.filter((item) => item.restaurantName === selectedRestaurant1));
//   }, [selectedRestaurant1, items]);

//   // Update filtered items for Restaurant 2 when selectedRestaurant2 changes
//   useEffect(() => {
//     setFilteredItems2(items.filter((item) => item.restaurantName === selectedRestaurant2));
//   }, [selectedRestaurant2, items]);

//   // Modified function to optionally set a loading state during the fetch
//   const fetchItemDetailsAndReviews = async (itemId, setDetails, setReviews, setAverageRating, setLoading = null) => {
//     if (!itemId) return;
//     try {
//       if (setLoading) setLoading(true);
//       const itemResponse = await axios.get(`${BASE_URL}/items/${itemId}`);
//       setDetails(itemResponse.data);

//       const reviewsResponse = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
//       const sortedReviews = reviewsResponse.data.reviews.sort(
//         (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
//       );
//       setReviews(sortedReviews);
//       setAverageRating(reviewsResponse.data.averageRating);
//     } catch (error) {
//       console.error('Error fetching item details or reviews:', error);
//     } finally {
//       if (setLoading) setLoading(false);
//     }
//   };

//   const filterReviews = (reviews, ratingFilter) => {
//     return ratingFilter
//       ? reviews.filter((review) => review.rating === ratingFilter)
//       : reviews;
//   };

//   const paginateReviews = (reviews, currentPage) => {
//     const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
//     return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className={styles.comparePaget}>
//       <h1 className={styles.headingt}>Compare Items</h1>
//       <div className={styles.selectContainert}>
//         {/* Selection for Item 1 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 1:</label>
//           <select
//             value={selectedRestaurant1}
//             onChange={(e) => setSelectedRestaurant1(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 1:</label>
//           <select
//             value={selectedItem1}
//             onChange={(e) => {
//               setSelectedItem1(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem1Details, setItem1Reviews, setItem1AverageRating, setIsLoadingItem1);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems1.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Selection for Item 2 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 2:</label>
//           <select
//             value={selectedRestaurant2}
//             onChange={(e) => setSelectedRestaurant2(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 2:</label>
//           <select
//             value={selectedItem2}
//             onChange={(e) => {
//               setSelectedItem2(e.target.value);
//               fetchItemDetailsAndReviews(e.target.value, setItem2Details, setItem2Reviews, setItem2AverageRating, setIsLoadingItem2);
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems2.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className={styles.comparisonContainert}>
//         {/* Item 1 Details Section */}
//         <div className={styles.itemDetailst}>
//           {isLoadingItem1 ? (
//             <div className={styles.loader}></div>
//           ) : (
//             item1Details && (
//               <>
//                 <img
//                   onClick={() => navigate(`/item/${item1Details.id}`)}
//                   className={styles.itemImaget}
//                   src={`data:image/png;base64,${item1Details.image}`}
//                   alt={item1Details.name}
//                 />
//                 <h2>{item1Details.name}</h2>
//                 <br />
//                 <p>Price: ₹{item1Details.price}</p>
//                 <br />
//                 <p>Average Rating: {item1AverageRating.toFixed(1)} / 5</p>
//                 <div className={styles.reviewFiltert}>
//                   <button onClick={() => setSelectedRatingFilter1(null)}>All</button>
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button key={rating} onClick={() => setSelectedRatingFilter1(rating)}>
//                       {rating} Star
//                     </button>
//                   ))}
//                 </div>
//                 <div className={styles.reviewt}>
//                   {paginateReviews(filterReviews(item1Reviews, selectedRatingFilter1), currentPage1).map((review) => (
//                     <div key={review.id}>
//                       <p>
//                         <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
//                       </p>
//                       <p>{review.comment}</p>
//                       <p>Rating: {review.rating} / 5</p>
//                     </div>
//                   ))}
//                   <div className={styles.paginationt}>
//                     <button
//                       onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage1 === 1}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage1((prev) =>
//                           prev * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
//                             ? prev
//                             : prev + 1
//                         )
//                       }
//                       disabled={
//                         currentPage1 * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
//                       }
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )
//           )}
//         </div>

//         {/* Item 2 Details Section */}
//         <div className={styles.itemDetailst}>
//           {isLoadingItem2 ? (
//             <div className={styles.loader}></div>
//           ) : (
//             item2Details && (
//               <>
//                 <img
//                   onClick={() => navigate(`/item/${item2Details.id}`)}
//                   className={styles.itemImaget}
//                   src={`data:image/png;base64,${item2Details.image}`}
//                   alt={item2Details.name}
//                 />
//                 <h2>{item2Details.name}</h2>
//                 <br />
//                 <p>Price: ₹{item2Details.price}</p>
//                 <br />
//                 <p>Average Rating: {item2AverageRating.toFixed(1)} / 5</p>
//                 <div className={styles.reviewFiltert}>
//                   <button onClick={() => setSelectedRatingFilter2(null)}>All</button>
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button key={rating} onClick={() => setSelectedRatingFilter2(rating)}>
//                       {rating} Star
//                     </button>
//                   ))}
//                 </div>
//                 <div className={styles.reviewt}>
//                   {paginateReviews(filterReviews(item2Reviews, selectedRatingFilter2), currentPage2).map((review) => (
//                     <div key={review.id}>
//                       <p>
//                         <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
//                       </p>
//                       <p>{review.comment}</p>
//                       <p>Rating: {review.rating} / 5</p>
//                     </div>
//                   ))}
//                   <div className={styles.paginationt}>
//                     <button
//                       onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage2 === 1}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage2((prev) =>
//                           prev * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
//                             ? prev
//                             : prev + 1
//                         )
//                       }
//                       disabled={
//                         currentPage2 * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
//                       }
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComparePage;

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import styles from './ComparePage.module.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ComparePage = () => {
//   const { itemId } = useParams();
//   const navigate = useNavigate();

//   // Data states
//   const [restaurants, setRestaurants] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems1, setFilteredItems1] = useState([]);
//   const [filteredItems2, setFilteredItems2] = useState([]);
//   const [selectedRestaurant1, setSelectedRestaurant1] = useState('');
//   const [selectedItem1, setSelectedItem1] = useState('');
//   const [selectedRestaurant2, setSelectedRestaurant2] = useState('');
//   const [selectedItem2, setSelectedItem2] = useState('');
//   const [item1Details, setItem1Details] = useState(null);
//   const [item2Details, setItem2Details] = useState(null);
//   const [item1Reviews, setItem1Reviews] = useState([]);
//   const [item2Reviews, setItem2Reviews] = useState([]);
//   const [item1AverageRating, setItem1AverageRating] = useState(0);
//   const [item2AverageRating, setItem2AverageRating] = useState(0);
//   const [currentPage1, setCurrentPage1] = useState(1);
//   const [currentPage2, setCurrentPage2] = useState(1);
//   const [selectedRatingFilter1, setSelectedRatingFilter1] = useState(null);
//   const [selectedRatingFilter2, setSelectedRatingFilter2] = useState(null);

//   // Initialize loader for Item 1 immediately if an itemId exists
//   const [isLoadingItem1, setIsLoadingItem1] = useState(!!itemId);
//   const [isLoadingItem2, setIsLoadingItem2] = useState(false);

//   const REVIEWS_PER_PAGE = 2;

//   // Use a ref to ensure the prefill effect runs only once.
//   const hasPrefilled = useRef(false);

//   // Fetch restaurants and items
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const restaurantResponse = await axios.get(
//           `${BASE_URL}/items/seller-categories-with-random-imagesss`
//         );
//         setRestaurants(restaurantResponse.data);

//         const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
//         setItems(itemsResponse.data);
//       } catch (error) {
//         console.error('Error fetching restaurants or items:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Prefill the first item and restaurant dropdown (only run once)
//   useEffect(() => {
//     const prefillItemDetails = async () => {
//       if (!itemId || items.length === 0 || hasPrefilled.current) return;
//       hasPrefilled.current = true;

//       try {
//         const response = await axios.get(`${BASE_URL}/items/${itemId}`);
//         const item = response.data;

//         setSelectedRestaurant1(item.restaurantName);
//         setSelectedItem1(item.id.toString());
//         setFilteredItems1(
//           items.filter((i) => i.restaurantName === item.restaurantName)
//         );

//         // Fetch item details and reviews with loader for Item 1
//         fetchItemDetailsAndReviews(
//           item.id,
//           setItem1Details,
//           setItem1Reviews,
//           setItem1AverageRating,
//           setIsLoadingItem1
//         );
//       } catch (error) {
//         console.error('Error fetching item details for prefill:', error);
//       }
//     };

//     prefillItemDetails();
//   }, [itemId, items]);

//   // Update filtered items for Restaurant 1 when selectedRestaurant1 changes
//   useEffect(() => {
//     setFilteredItems1(items.filter((item) => item.restaurantName === selectedRestaurant1));
//   }, [selectedRestaurant1, items]);

//   // Update filtered items for Restaurant 2 when selectedRestaurant2 changes
//   useEffect(() => {
//     setFilteredItems2(items.filter((item) => item.restaurantName === selectedRestaurant2));
//   }, [selectedRestaurant2, items]);

//   // Fetch item details and reviews with an optional loading state setter
//   const fetchItemDetailsAndReviews = async (
//     itemId,
//     setDetails,
//     setReviews,
//     setAverageRating,
//     setLoading = null
//   ) => {
//     if (!itemId) return;
//     try {
//       if (setLoading) setLoading(true);
//       const itemResponse = await axios.get(`${BASE_URL}/items/${itemId}`);
//       setDetails(itemResponse.data);

//       const reviewsResponse = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
//       const sortedReviews = reviewsResponse.data.reviews.sort(
//         (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
//       );
//       setReviews(sortedReviews);
//       setAverageRating(reviewsResponse.data.averageRating);
//     } catch (error) {
//       console.error('Error fetching item details or reviews:', error);
//     } finally {
//       if (setLoading) setLoading(false);
//     }
//   };

//   // Utility functions for filtering, pagination, and date formatting
//   const filterReviews = (reviews, ratingFilter) =>
//     ratingFilter ? reviews.filter((review) => review.rating === ratingFilter) : reviews;

//   const paginateReviews = (reviews, currentPage) => {
//     const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
//     return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
//   };

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className={styles.comparePaget}>
//       <h1 className={styles.headingt}>Compare Items</h1>
//       <div className={styles.selectContainert}>
//         {/* Selection for Item 1 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 1:</label>
//           <select
//             value={selectedRestaurant1}
//             onChange={(e) => setSelectedRestaurant1(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 1:</label>
//           <select
//             value={selectedItem1}
//             onChange={(e) => {
//               setSelectedItem1(e.target.value);
//               fetchItemDetailsAndReviews(
//                 e.target.value,
//                 setItem1Details,
//                 setItem1Reviews,
//                 setItem1AverageRating,
//                 setIsLoadingItem1
//               );
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems1.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Selection for Item 2 */}
//         <div className={styles.selectColumnt}>
//           <label>Restaurant 2:</label>
//           <select
//             value={selectedRestaurant2}
//             onChange={(e) => setSelectedRestaurant2(e.target.value)}
//           >
//             <option value="">Select Restaurant</option>
//             {restaurants.map((restaurant) => (
//               <option key={restaurant.sellerName} value={restaurant.sellerName}>
//                 {restaurant.sellerName}
//               </option>
//             ))}
//           </select>

//           <label>Item 2:</label>
//           <select
//             value={selectedItem2}
//             onChange={(e) => {
//               setSelectedItem2(e.target.value);
//               fetchItemDetailsAndReviews(
//                 e.target.value,
//                 setItem2Details,
//                 setItem2Reviews,
//                 setItem2AverageRating,
//                 setIsLoadingItem2
//               );
//             }}
//           >
//             <option value="">Select Item</option>
//             {filteredItems2.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className={styles.comparisonContainert}>
//         {/* Item 1 Details Section */}
//         <div className={styles.itemDetailst}>
//           {isLoadingItem1 ? (
//             <div className={styles.loader}>Loading Item 1...</div>
//           ) : (
//             item1Details && (
//               <>
//                 <img
//                   onClick={() => navigate(`/item/${item1Details.id}`)}
//                   className={styles.itemImaget}
//                   src={`data:image/png;base64,${item1Details.image}`}
//                   alt={item1Details.name}
//                 />
//                 <h2>{item1Details.name}</h2>
//                 <p>Price: ₹{item1Details.price}</p>
//                 <p>Average Rating: {item1AverageRating.toFixed(1)} / 5</p>
//                 <div className={styles.reviewFiltert}>
//                   <button onClick={() => setSelectedRatingFilter1(null)}>All</button>
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button key={rating} onClick={() => setSelectedRatingFilter1(rating)}>
//                       {rating} Star
//                     </button>
//                   ))}
//                 </div>
//                 <div className={styles.reviewt}>
//                   {paginateReviews(filterReviews(item1Reviews, selectedRatingFilter1), currentPage1).map((review) => (
//                     <div key={review.id}>
//                       <p>
//                         <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
//                       </p>
//                       <p>{review.comment}</p>
//                       <p>Rating: {review.rating} / 5</p>
//                     </div>
//                   ))}
//                   <div className={styles.paginationt}>
//                     <button
//                       onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage1 === 1}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage1((prev) =>
//                           prev * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
//                             ? prev
//                             : prev + 1
//                         )
//                       }
//                       disabled={currentPage1 * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )
//           )}
//         </div>

//         {/* Item 2 Details Section */}
//         <div className={styles.itemDetailst}>
//           {isLoadingItem2 ? (
//             <div className={styles.loader}>Loading Item 2...</div>
//           ) : (
//             item2Details && (
//               <>
//                 <img
//                   onClick={() => navigate(`/item/${item2Details.id}`)}
//                   className={styles.itemImaget}
//                   src={`data:image/png;base64,${item2Details.image}`}
//                   alt={item2Details.name}
//                 />
//                 <h2>{item2Details.name}</h2>
//                 <p>Price: ₹{item2Details.price}</p>
//                 <p>Average Rating: {item2AverageRating.toFixed(1)} / 5</p>
//                 <div className={styles.reviewFiltert}>
//                   <button onClick={() => setSelectedRatingFilter2(null)}>All</button>
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button key={rating} onClick={() => setSelectedRatingFilter2(rating)}>
//                       {rating} Star
//                     </button>
//                   ))}
//                 </div>
//                 <div className={styles.reviewt}>
//                   {paginateReviews(filterReviews(item2Reviews, selectedRatingFilter2), currentPage2).map((review) => (
//                     <div key={review.id}>
//                       <p>
//                         <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
//                       </p>
//                       <p>{review.comment}</p>
//                       <p>Rating: {review.rating} / 5</p>
//                     </div>
//                   ))}
//                   <div className={styles.paginationt}>
//                     <button
//                       onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
//                       disabled={currentPage2 === 1}
//                     >
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage2((prev) =>
//                           prev * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
//                             ? prev
//                             : prev + 1
//                         )
//                       }
//                       disabled={currentPage2 * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length}
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComparePage;


import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ComparePage.module.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ComparePage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  // Data states
  const [restaurants, setRestaurants] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems1, setFilteredItems1] = useState([]);
  const [filteredItems2, setFilteredItems2] = useState([]);
  const [selectedRestaurant1, setSelectedRestaurant1] = useState('');
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedRestaurant2, setSelectedRestaurant2] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [item1Details, setItem1Details] = useState(null);
  const [item2Details, setItem2Details] = useState(null);
  const [item1Reviews, setItem1Reviews] = useState([]);
  const [item2Reviews, setItem2Reviews] = useState([]);
  const [item1AverageRating, setItem1AverageRating] = useState(0);
  const [item2AverageRating, setItem2AverageRating] = useState(0);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [selectedRatingFilter1, setSelectedRatingFilter1] = useState(null);
  const [selectedRatingFilter2, setSelectedRatingFilter2] = useState(null);

  // Loading states:
  // For item1, initialize loader immediately if itemId exists.
  const [isLoadingItem1, setIsLoadingItem1] = useState(!!itemId);
  // For the second item comparison, we will show a full-page overlay loader.
  const [isLoadingItem2, setIsLoadingItem2] = useState(false);

  const REVIEWS_PER_PAGE = 2;
  const hasPrefilled = useRef(false);

  // Fetch restaurants and items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(
          `${BASE_URL}/items/seller-categories-with-random-imagesss`
        );
        setRestaurants(restaurantResponse.data);

        const itemsResponse = await axios.get(`${BASE_URL}/items/allitems`);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching restaurants or items:', error);
      }
    };

    fetchData();
  }, []);

  // Prefill the first item and restaurant dropdown (only once)
  useEffect(() => {
    const prefillItemDetails = async () => {
      if (!itemId || items.length === 0 || hasPrefilled.current) return;
      hasPrefilled.current = true;

      try {
        const response = await axios.get(`${BASE_URL}/items/${itemId}`);
        const item = response.data;
        setSelectedRestaurant1(item.restaurantName);
        setSelectedItem1(item.id.toString());
        setFilteredItems1(
          items.filter((i) => i.restaurantName === item.restaurantName)
        );
        fetchItemDetailsAndReviews(
          item.id,
          setItem1Details,
          setItem1Reviews,
          setItem1AverageRating,
          setIsLoadingItem1
        );
      } catch (error) {
        console.error('Error fetching item details for prefill:', error);
      }
    };

    prefillItemDetails();
  }, [itemId, items]);

  // Update filtered items for Restaurant 1 when selectedRestaurant1 changes
  useEffect(() => {
    setFilteredItems1(items.filter((item) => item.restaurantName === selectedRestaurant1));
  }, [selectedRestaurant1, items]);

  // Update filtered items for Restaurant 2 when selectedRestaurant2 changes
  useEffect(() => {
    setFilteredItems2(items.filter((item) => item.restaurantName === selectedRestaurant2));
  }, [selectedRestaurant2, items]);

  // Fetch item details and reviews with an optional loading setter
  const fetchItemDetailsAndReviews = async (
    itemId,
    setDetails,
    setReviews,
    setAverageRating,
    setLoading = null
  ) => {
    if (!itemId) return;
    try {
      if (setLoading) setLoading(true);
      const itemResponse = await axios.get(`${BASE_URL}/items/${itemId}`);
      setDetails(itemResponse.data);

      const reviewsResponse = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
      const sortedReviews = reviewsResponse.data.reviews.sort(
        (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
      );
      setReviews(sortedReviews);
      setAverageRating(reviewsResponse.data.averageRating);
    } catch (error) {
      console.error('Error fetching item details or reviews:', error);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const filterReviews = (reviews, ratingFilter) =>
    ratingFilter ? reviews.filter((review) => review.rating === ratingFilter) : reviews;

  const paginateReviews = (reviews, currentPage) => {
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Handler for when the second item is selected.
  // This triggers the full-page loader overlay (on the comparison area) until item2 details load.
  const handleSecondItemChange = (e) => {
    const value = e.target.value;
    setSelectedItem2(value);
    setIsLoadingItem2(true);
    fetchItemDetailsAndReviews(
      value,
      setItem2Details,
      setItem2Reviews,
      setItem2AverageRating,
      setIsLoadingItem2
    );
  };

  return (
    <div className={styles.comparePaget}>
      <h1 className={styles.headingt}>Compare Items</h1>
      {/* Compare dropdowns (always visible) */}
      <div className={styles.selectContainert}>
        <div className={styles.selectColumnt}>
          <label>Restaurant 1:</label>
          <select
            value={selectedRestaurant1}
            onChange={(e) => setSelectedRestaurant1(e.target.value)}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.sellerName} value={restaurant.sellerName}>
                {restaurant.sellerName}
              </option>
            ))}
          </select>
          <label>Item 1:</label>
          <select
            value={selectedItem1}
            onChange={(e) => {
              setSelectedItem1(e.target.value);
              fetchItemDetailsAndReviews(
                e.target.value,
                setItem1Details,
                setItem1Reviews,
                setItem1AverageRating,
                setIsLoadingItem1
              );
            }}
          >
            <option value="">Select Item</option>
            {filteredItems1.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.selectColumnt}>
          <label>Restaurant 2:</label>
          <select
            value={selectedRestaurant2}
            onChange={(e) => setSelectedRestaurant2(e.target.value)}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.sellerName} value={restaurant.sellerName}>
                {restaurant.sellerName}
              </option>
            ))}
          </select>
          <label>Item 2:</label>
          <select value={selectedItem2} onChange={handleSecondItemChange}>
            <option value="">Select Item</option>
            {filteredItems2.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison area wrapped in a container with relative positioning */}
      <div className={styles.comparisonWrapper}>
        <div className={styles.comparisonContainert}>
          {/* Item 1 Details */}
          <div className={styles.itemDetailst}>
            {isLoadingItem1 ? (
              <div className={styles.loader}></div>
            ) : (
              item1Details && (
                <>
                  <img
                    onClick={() => navigate(`/item/${item1Details.id}`)}
                    className={styles.itemImaget}
                    src={`data:image/png;base64,${item1Details.image}`}
                    alt={item1Details.name}
                  />
                  <h2>{item1Details.name}</h2>
                  <p><b style={{color:"black"}}>Price:</b> ₹{item1Details.price}</p>
                  <p><b  style={{color:"black"}}>Average Rating: </b> {item1AverageRating.toFixed(1)} / 5</p>
                  <div className={styles.reviewFiltert}>
                    <button onClick={() => setSelectedRatingFilter1(null)}>All</button>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button key={rating} onClick={() => setSelectedRatingFilter1(rating)}>
                        {rating} Star
                      </button>
                    ))}
                  </div>
                  <div className={styles.reviewt}>
                    {paginateReviews(filterReviews(item1Reviews, selectedRatingFilter1), currentPage1).map((review) => (
                      <div key={review.id}>
                        <p>
                          <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
                        </p>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating} / 5</p>
                      </div>
                    ))}
                    <div className={styles.paginationt}>
                      <button
                        onClick={() => setCurrentPage1((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage1 === 1}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage1((prev) =>
                            prev * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length
                              ? prev
                              : prev + 1
                          )
                        }
                        disabled={currentPage1 * REVIEWS_PER_PAGE >= filterReviews(item1Reviews, selectedRatingFilter1).length}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>

          {/* Item 2 Details */}
          <div className={styles.itemDetailst}>
            {item2Details && (
              <>
                <img
                  onClick={() => navigate(`/item/${item2Details.id}`)}
                  className={styles.itemImaget}
                  src={`data:image/png;base64,${item2Details.image}`}
                  alt={item2Details.name}
                />
                <h2>{item2Details.name}</h2>
                <p><b style={{color:"black"}}>Price: </b> ₹{item2Details.price}</p>
                <p><b style={{color:"black"}}>Average Rating: </b>{item2AverageRating.toFixed(1)} / 5</p>
                <div className={styles.reviewFiltert}>
                  <button onClick={() => setSelectedRatingFilter2(null)}>All</button>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} onClick={() => setSelectedRatingFilter2(rating)}>
                      {rating} Star
                    </button>
                  ))}
                </div>
                <div className={styles.reviewt}>
                  {paginateReviews(filterReviews(item2Reviews, selectedRatingFilter2), currentPage2).map((review) => (
                    <div key={review.id}>
                      <p>
                        <strong>{review.user.email}</strong> - {formatDate(review.reviewDate)}
                      </p>
                      <p>{review.comment}</p>
                      <p>Rating: {review.rating} / 5</p>
                    </div>
                  ))}
                  <div className={styles.paginationt}>
                    <button
                      onClick={() => setCurrentPage2((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage2 === 1}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage2((prev) =>
                          prev * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length
                            ? prev
                            : prev + 1
                        )
                      }
                      disabled={currentPage2 * REVIEWS_PER_PAGE >= filterReviews(item2Reviews, selectedRatingFilter2).length}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Full-page overlay loader for second item comparison */}
        {isLoadingItem2 && (
          <div className={styles.fullPageLoader}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
