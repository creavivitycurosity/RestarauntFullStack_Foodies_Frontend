// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './ItemDetails.css';
// import Footer from "./Footer"
// const ItemDetails = ({addtocart}) => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/${id}`);
//         const itemData = response.data;

//         const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//           responseType: 'arraybuffer',
//         });

//         const base64String = await arrayBufferToBase64(imageResponse.data);
//         const itemWithImage = {
//           ...itemData,
//           image: `data:image/png;base64,${base64String}`
//         };

//         setItem(itemWithImage);
//       } catch (error) {
//         console.error('Error fetching item:', error);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   function arrayBufferToBase64(arrayBuffer) {
//     return new Promise((resolve, reject) => {
//       try {
//         const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64String = reader.result?.toString().split(',')[1];
//           resolve(base64String || '');
//         };
//         reader.onerror = (error) => {
//           console.error('Error reading array buffer:', error);
//           reject(error);
//         };
//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error('Error converting array buffer to base64:', error);
//         reject(error);
//       }
//     });
//   }

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   return (<>
//     <div className="item-details">
//       <div className='iimage'>
//       <img src={item.image} alt={item.name} />
//       </div><div>
//       <h1>{item.name}</h1>
//       <h2>Price: ${item.price}</h2>
//       <h3>seller: ${item.sellerName}</h3>

//       <button onClick={() => addtocart(item)}><b>ADD TO CART</b></button>
//       </div>
//       {/* Add more item details here if needed */}
//     </div><br/>
//           <Footer />
//           </>
//   );
// };

// export default ItemDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Slider from 'react-slick';
// import './ItemDetails.css';
// import Footer from "./Footer";

// const ItemDetails = ({ addtocart }) => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [recommendedItems, setRecommendedItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/${id}`);
//         const itemData = response.data;

//         const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//           responseType: 'arraybuffer',
//         });

//         const base64String = await arrayBufferToBase64(imageResponse.data);
//         const itemWithImage = {
//           ...itemData,
//           image: `data:image/png;base64,${base64String}`
//         };

//         setItem(itemWithImage);

//         // Fetch recommended items based on the category
//         const recommendedResponse = await axios.get(`http://localhost:8080/items/category/${itemData.category.id}`);
//         const recommendedItemsData = recommendedResponse.data;

//         const recommendedImagePromises = recommendedItemsData.map(async (recommendedItem) => {
//           const { id } = recommendedItem;
//           const recommendedImageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(recommendedImageResponse.data);
//           return { ...recommendedItem, image: `data:image/png;base64,${base64String}` };
//         });

//         const recommendedItemsWithImages = await Promise.all(recommendedImagePromises);
//         setRecommendedItems(recommendedItemsWithImages);

//       } catch (error) {
//         console.error('Error fetching item:', error);
//       }
//     };
//     window.scrollTo(0, 0);

//     fetchItem();
//   }, [id]);

//   function arrayBufferToBase64(arrayBuffer) {
//     return new Promise((resolve, reject) => {
//       try {
//         const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64String = reader.result?.toString().split(',')[1];
//           resolve(base64String || '');
//         };
//         reader.onerror = (error) => {
//           console.error('Error reading array buffer:', error);
//           reject(error);
//         };
//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error('Error converting array buffer to base64:', error);
//         reject(error);
//       }
//     });
//   }

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     gap: 10,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <>
//       <div className="item-details">
//         <div className='item-details-image'>
//           <img src={item.image} alt={item.name} />
//         </div>
//         <div className='item-details-info'>
//           <h1>{item.name}</h1>
//           <h2>Price: ₹{item.price}</h2>
//           <h3>Seller: {item.sellerName}</h3>
//           <button onClick={() => addtocart(item)}><b>ADD TO CART</b></button>
//           <p className='item-description'>
//             This is a dummy description of the item. It contains detailed information about the item, including its features, benefits, and usage instructions.
//           </p>
//           <div className='item-reviews' style={{marginBottom:"60px",marginTop:"80px"}}>
//           <hr></hr>

//             <h3>User Reviews</h3>
//             <div className='review'>
//               <p>"Amazing product! Highly recommend."</p>
//               <h4>- John Doe</h4>
//             </div>
//             <div className='review'>
//               <p>"Great quality and fast shipping."</p>
//               <h4>- Jane Smith</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='recommended-products'>
//         <h2>Recommended Products Of Same Category</h2>
//         <Slider {...sliderSettings}>
//           {recommendedItems.map((recommendedItem) => (
//             <div className='recommended-item' style={{width:"100%"}} key={recommendedItem.id}>
//               <img style={{height:"200px",width:"100%",objectFit:"contain"}} src={recommendedItem.image} alt={recommendedItem.name} onClick={() =>navigate(`/item/${recommendedItem.id}`)} />
//               <h3>{recommendedItem.name}</h3>
//               <h4>₹{recommendedItem.price}</h4>
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ItemDetails;












// import React, { useState, useEffect } from 'react';    //working properly
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Slider from 'react-slick';
// import './ItemDetails.css';
// import Footer from "./Footer";
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to extract email

// const ItemDetails = ({ addtocart }) => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [recommendedItems, setRecommendedItems] = useState([]);
//   const [sellerItems, setSellerItems] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [averageRating, setAverageRating] = useState(0); // State for average rating

//   const navigate = useNavigate();




//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/items/new/item/${id}`);
//       setReviews(response.data.reviews);
//       setAverageRating(response.data.averageRating); // Set the average rating
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();

//     // Get JWT token from local storage
//     const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage with key 'token'
//     if (!token) {
//       console.error('User is not authenticated');
//       return;
//     }

//     // Decode the token to extract the user's email
//     const decodedToken = jwtDecode(token);
//     const userEmail = decodedToken.sub; // Assuming email is stored under 'sub'. Change if it's under a different key.

//     try {
//       const review = {
//         email: userEmail,
//         rating,
//         comment,
//       };
//       await axios.post(`http://localhost:8080/items/item/${id}`, review, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in case the backend needs to verify the user
//         },
//       });
//       fetchReviews(); // Refresh the reviews list
//       setRating(0);
//       setComment('');
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };









//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/items/${id}`);
//         const itemData = response.data;

//         const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//           responseType: 'arraybuffer',
//         });

//         const base64String = await arrayBufferToBase64(imageResponse.data);
//         // const itemWithImage = {
//         //   ...itemData,
//         //   image: `data:image/png;base64,${base64String}`
//         // };
//         const itemWithImage = {
//           ...itemData,
//           image: `data:image/png;base64,${base64String}`,
//           // Ensure your backend response includes these fields
//           price: itemData.price,
//           discountActive: itemData.discountActive,
//           discountPercentage: itemData.discountPercentage,
//           previousAmount: itemData.previousAmount,
//         };
//         setItem(itemWithImage);

//         // Fetch recommended items based on the category
//         const recommendedResponse = await axios.get(`http://localhost:8080/items/category/${itemData.category.id}`);
//         const recommendedItemsData = recommendedResponse.data;

//         const recommendedImagePromises = recommendedItemsData.map(async (recommendedItem) => {
//           const { id } = recommendedItem;
//           const recommendedImageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(recommendedImageResponse.data);
//           return { ...recommendedItem, image: `data:image/png;base64,${base64String}` };
//         });

//         const recommendedItemsWithImages = await Promise.all(recommendedImagePromises);
//         setRecommendedItems(recommendedItemsWithImages);

//         // Fetch items from the same seller
//         const sellerResponse = await axios.get(`http://localhost:8080/items/seller/${itemData.sellerName}`);
//         const sellerItemsData = sellerResponse.data;

//         const sellerImagePromises = sellerItemsData.map(async (sellerItem) => {
//           const { id } = sellerItem;
//           const sellerImageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(sellerImageResponse.data);
//           return { ...sellerItem, image: `data:image/png;base64,${base64String}` };
//         });

//         const sellerItemsWithImages = await Promise.all(sellerImagePromises);
//         setSellerItems(sellerItemsWithImages);

//       } catch (error) {
//         console.error('Error fetching item:', error);
//       }
//     };
//     window.scrollTo(0, 0);

//     fetchItem();
//     fetchReviews();

//   }, [id]);

//   function arrayBufferToBase64(arrayBuffer) {
//     return new Promise((resolve, reject) => {
//       try {
//         const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64String = reader.result?.toString().split(',')[1];
//           resolve(base64String || '');
//         };
//         reader.onerror = (error) => {
//           console.error('Error reading array buffer:', error);
//           reject(error);
//         };
//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error('Error converting array buffer to base64:', error);
//         reject(error);
//       }
//     });
//   }

//   if (!item) {
//     return <div>Loading...</div>;
//   }





















//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     gap: 10,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   return (
//     <>
//       <div className="item-details">
//         <div className='item-details-image'>
//           <img src={item.image} alt={item.name} />
//         </div>
//         <div className='item-details-info'>
//           <h1>{item.name}</h1>
//           <h3>
//             Price:
//             {item.price !== null && item.price !== undefined && !item.discountActive ? (
//               <span>${item.price}</span>
//             ) : (
//               <span></span>
//             )}
//             {item.discountActive && (
//               <>
//                 <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
//                   ${item.previousAmount}
//                 </span>
//                 <span style={{ display: 'block', color: 'red' }}>${item.price}</span>
//               </>
//             )}
//           </h3>
//           <h3>Seller: {item.restaurantName}</h3>
//           <button onClick={() => addtocart(item)}><b>ADD TO CART</b></button>
//           <p className='item-description'>
//             This is a dummy description of the item. It contains detailed information about the item, including its features, benefits, and usage instructions.
//           </p>
//           <div className='item-reviews'>
//             <h3>User Reviews</h3>
//             {reviews.map((review) => (
//               <div key={review.id} className='review'>
//                 <p>"{review.comment}"</p>
//                 <h4>- {review.user.email}</h4> {/* Display user's email as username */}
//                 <p>Rating: {review.rating} / 5</p>
//               </div>
//             ))}
//             {/* Display average rating below the reviews */}
//             <div className="average-rating">
//               <h4>Average Rating: {averageRating.toFixed(1)} / 5</h4> {/* Display the average rating */}
//             </div>
//           </div>

//           <form onSubmit={handleSubmitReview}>
//             <h3>Add a Review</h3>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Write your comment"
//               required
//             />
//             <label>
//               Rating:
//               <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required>
//                 <option value={0}>Select rating</option>
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <option key={num} value={num}>
//                     {num} Star{num > 1 && 's'}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <button type="submit">Submit Review</button>
//           </form>
//         </div>
//       </div>
//       <div className='recommended-products'>
//         <h2>Recommended Products Of Same Category</h2>
//         <Slider {...sliderSettings}>
//           {recommendedItems.map((recommendedItem) => (
//             <div className='recommended-item' style={{ width: "100%" }} key={recommendedItem.id}>
//               <img style={{ height: "200px", width: "100%", objectFit: "contain" }} src={recommendedItem.image} alt={recommendedItem.name} onClick={() => navigate(`/item/${recommendedItem.id}`)} />
//               <h3>{recommendedItem.name}</h3>
//               <h4>₹{recommendedItem.price}</h4>
//             </div>
//           ))}
//         </Slider><br />
//         <hr />
//       </div>
//       <div className='recommended-products'>
//         <h2>More Products from the {item.restaurantName}</h2>
//         <Slider {...sliderSettings}>
//           {sellerItems.map((sellerItem) => (
//             <div className='recommended-item' style={{ width: "100%" }} key={sellerItem.id}>
//               <img style={{ height: "200px", width: "100%", objectFit: "contain" }} src={sellerItem.image} alt={sellerItem.name} onClick={() => navigate(`/item/${sellerItem.id}`)} />
//               <h3>{sellerItem.name}</h3>
//               <h4>₹{sellerItem.price}</h4>
//             </div>
//           ))}
//         </Slider>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ItemDetails;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import styles from './ItemDetails.module.css'; // Import CSS module
import Footer from "./Footer";
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to extract email
// import ColorThief from 'color-thief';
import CartAlert from '../Components/CartAlert';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ItemDetails = ({ addtocart }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [sellerItems, setSellerItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState(0); // State for average rating
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [favorites, setFavorites] = useState([]);
  const [token3, setToken3] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null); // State for selected rating filter
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const [showAlert, setShowAlert] = useState(false);
  const [alertName, setAlertName] = useState('');


  const reviewsPerPage = 2; // Number of reviews per page

  const navigate = useNavigate();





  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items/new/item/${id}`);
      const reviewsData = response.data.reviews;
      // Sort reviews by date in descending order
      const sortedReviews = reviewsData.sort((a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate));
      setReviews(sortedReviews);
      setAverageRating(response.data.averageRating); // Set the average rating
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Get JWT token from local storage
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage with key 'token'
    if (!token) {
      console.error('User is not authenticated');
      return;
    }

    // Decode the token to extract the user's email
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub; // Assuming email is stored under 'sub'. Change if it's under a different key.

    try {
      const review = {
        email: userEmail,
        rating,
        comment,
      };
      await axios.post(`${BASE_URL}/items/item/${id}`, review, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in case the backend needs to verify the user
        },
      });
      fetchReviews(); // Refresh the reviews list
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch

        const response = await axios.get(`${BASE_URL}/items/${id}`);
        const itemData = response.data;

        const imageResponse = await axios.get(`${BASE_URL}/items/images/${id}`, {
          responseType: 'arraybuffer',
        });

        const base64String = await arrayBufferToBase64(imageResponse.data);
        const itemWithImage = {
          ...itemData,
          image: `data:image/png;base64,${base64String}`,
          price: itemData.price,
          discountActive: itemData.discountActive,
          discountPercentage: itemData.discountPercentage,
          previousAmount: itemData.previousAmount,
          // description: description, // Add the description to the item object

        };
        setIsLoading(false);  // 🆕 Hide loader after fetch

        setItem(itemWithImage);

        // Fetch recommended items based on the category
        const recommendedResponse = await axios.get(`${BASE_URL}/items/category/${itemData.category.id}`);
        const recommendedItemsData = recommendedResponse.data;

        const recommendedImagePromises = recommendedItemsData.map(async (recommendedItem) => {
          const { id } = recommendedItem;
          const recommendedImageResponse = await axios.get(`${BASE_URL}/items/images/${id}`, {
            responseType: 'arraybuffer',
          });
          const base64String = await arrayBufferToBase64(recommendedImageResponse.data);
          return { ...recommendedItem, image: `data:image/png;base64,${base64String}` };
        });

        const recommendedItemsWithImages = await Promise.all(recommendedImagePromises);
        setRecommendedItems(recommendedItemsWithImages);

        // Fetch items from the same seller
        const sellerResponse = await axios.get(`${BASE_URL}/items/seller/${itemData.sellerName}`);
        const sellerItemsData = sellerResponse.data;

        const sellerImagePromises = sellerItemsData.map(async (sellerItem) => {
          const { id } = sellerItem;
          const sellerImageResponse = await axios.get(`${BASE_URL}/items/images/${id}`, {
            responseType: 'arraybuffer',
          });
          const base64String = await arrayBufferToBase64(sellerImageResponse.data);
          return { ...sellerItem, image: `data:image/png;base64,${base64String}` };
        });

        const sellerItemsWithImages = await Promise.all(sellerImagePromises);
        setSellerItems(sellerItemsWithImages);

      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    window.scrollTo(0, 0);
    // Check if the user is logged in by checking for the token
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');

      if (token && typeof token === 'string') {
        try {
          const decodedToken = jwtDecode(token);
          setIsLoggedIn(true);
          setUserEmail(decodedToken.sub); // Assuming the user's email is stored under 'sub'
          setToken3(token)
        } catch (error) {
          console.error('Error decoding token:', error.message);
          setIsLoggedIn(false); // Token is invalid, treat user as not logged in
        }
      } else {
        setIsLoggedIn(false); // No token found
      }
    };

    fetchItem();
    fetchReviews();
    checkLoginStatus();
    // fetchFavorites();

  }, [id]);

  useEffect(() => {
    if (isLoggedIn && userEmail && token3) {
      fetchFavorites();
    }
  }, [isLoggedIn, userEmail, token3]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items?email=${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token3}`,
        },
      });
      setFavorites(response.data.map(fav => fav.item.id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (itemId) => {
    try {
      if (favorites.includes(itemId)) {
        await axios.delete(`${BASE_URL}/items/del/${itemId}`, {
          data: { email: userEmail },  // send user email in request body
          headers: {
            Authorization: `Bearer ${token3}`,
          },
        });
        setAlertName("REMOVED FROM YOUR FAVOURATES")
        setShowAlert(true); // Show the alert
      } else {
        await axios.post(`${BASE_URL}/items/ad/${itemId}`, { email: userEmail }, {
          headers: {
            Authorization: `Bearer ${token3}`,
          },
        });
        setAlertName("ADDED TO YOUR FAVOURATES")
        setShowAlert(true); // Show the alert

      }
      fetchFavorites();  // Refresh favorites after action
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };



  function arrayBufferToBase64(arrayBuffer) {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1];
          resolve(base64String || '');
        };
        reader.onerror = (error) => {
          console.error('Error reading array buffer:', error);
          reject(error);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error converting array buffer to base64:', error);
        reject(error);
      }
    });
  }

  // if (!item) {
  //   return <div>Loading...</div>;
  // }

  if (!item) {
    return (
      <div className={styles.loadercontainer2}>
        <div className={styles.loader2}></div>
        <p>Loading details...</p>
      </div>
    );
  }


  // Calculate the index of the last review to show
  const lastIndex = currentPage * reviewsPerPage;
  // Calculate the index of the first review to show
  const firstIndex = lastIndex - reviewsPerPage;

  // Filter reviews based on selected rating
  const filteredReviews = selectedRating
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews;

  // Slice the filtered reviews array to get the current page reviews
  const currentReviews = filteredReviews.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    gap: 10,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className={styles.itemDetailsr}>
        <div className={styles.itemDetailsImager}>
          <img src={item.image} alt={item.name} className={styles.imager} />
        </div>
        <div className={styles.itemDetailsInfor}>
          <h1>{item.name}</h1>
          <h3>
            Price:{" "}
            {item.price !== null && !item.discountActive ? (
              <span>₹{item.price}</span>
            ) : (
              <></>
            )}
            {item.discountActive && (
              <>
                <span style={{ textDecoration: "line-through" }}>₹{item.previousAmount}</span>
                &nbsp;
                <span className={styles.discountPricer}>₹{item.price}</span>
              </>
            )}
          </h3>
          <h3>Seller: <span>{item.restaurantName}</span></h3>
<br/>
          {item.quantity === 0 || !item.available ? (
            <button className={styles.outOfStockr} disabled>
              Out of Stock
            </button>
          ) : (
            <div>
              <button onClick={() => addtocart(item)} className={styles.addToCartr}>
                ADD TO CART
              </button>
              <br/> <br/>
              {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
            </div>
          )}

          {isLoggedIn && (
            <button className={styles.favoriteBtnr} onClick={() => toggleFavorite(item.id)}>
              {favorites.includes(item.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}<br/><br/>
          <button
            style={{backgroundColor:"lightcoral"}}
            className={styles.compareBtn}
            onClick={() => navigate(`/compare/${item.id}`)}
          >
            Compare
          </button>

          <br/>
          <CartAlert show={showAlert} itemName={item.name} onClose={() => setShowAlert(false)} name={alertName} />
          <br/>
          <h3>Description :</h3>
          <p className={styles.itemDescriptionr}>
            {item.description || "No description available for this item."}
          </p>

          <div className={styles.averageRatingr}>
            <h4>Average Rating: {averageRating.toFixed(1)} / 5</h4>
          </div>

          <div className={styles.itemReviewsr}>
            <div className={styles.ratingFiltersr}>
              <button onClick={() => setSelectedRating(null)}>All Ratings</button>
              <button onClick={() => setSelectedRating(1)}>1 Star</button>
              <button onClick={() => setSelectedRating(2)}>2 Stars</button>
              <button onClick={() => setSelectedRating(3)}>3 Stars</button>
              <button onClick={() => setSelectedRating(4)}>4 Stars</button>
              <button onClick={() => setSelectedRating(5)}>5 Stars</button>
            </div>

            <h3>
              <span>User Reviews</span>
            </h3>
            {currentReviews.length === 0 ? (
              <h3>No reviews yet</h3>
            ) : (

              <>
                {currentReviews.map((review) => (
                  <div key={review.id} className={styles.reviewr}>
                    <hr />
                    <h3>
                      - {review.user.email} - {new Date(review.lastUpdatedDate).toLocaleDateString()}
                    </h3>
                    <h3>"{review.comment}"</h3>
                    <h3>Rating: {review.rating} / 5</h3>
                  </div>
                ))}
                <div className={styles.paginationr}>
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </>
            )}



          </div>


          {/* {isLoggedIn ? (
            <form onSubmit={handleSubmitReview} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="rating" className={styles.label}>Rating:</label>
                <select
                  id="rating"
                  value={rating}
                  required
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className={styles.select}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="comment" className={styles.label}>Comment:</label>
                <textarea
                  id="comment"
                  value={comment}
                  required
                  onChange={(e) => setComment(e.target.value)}
                  className={styles.textarea}
                  maxLength="250"
                />
                {comment && (
                  <h5>{250 - comment.length} characters remaining</h5>
                )}
              </div>
              <button type="submit" className={styles.button}>Submit Review</button>
            </form>
          ) : (
            <h2>Please log in to submit a review.</h2>
          )} */}



        </div>



      </div>


      <div className={styles.recommendedItems}>
        <h2>Items you might also like</h2>
        <Slider {...sliderSettings}>
          {recommendedItems.map((recommendedItem) => (
            <div className={styles.recommendedItemr} key={recommendedItem.id}>
              <img
                className={styles.recommendedImage}
                src={recommendedItem.image}
                alt={recommendedItem.name}
                onClick={() => navigate(`/item/${recommendedItem.id}`)}
              />
              <h4>{recommendedItem.name}</h4>
              <h4>₹{recommendedItem.price}</h4>
              <button onClick={() => addtocart(recommendedItem)} className={styles.addToCartr}>
                ADD TO CART
              </button>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.recommendedItems}>
        <h2>More Products from {item.restaurantName}</h2>
        <Slider {...sliderSettings}>
          {sellerItems.map((sellerItem) => (
            <div className={styles.recommendedItemr} key={sellerItem.id}>
              <img
                className={styles.recommendedImage}
                src={sellerItem.image}
                alt={sellerItem.name}
                onClick={() => navigate(`/item/${sellerItem.id}`)}
              />
              <h4>{sellerItem.name}</h4>
              <h4>₹{sellerItem.price}</h4>
              <button onClick={() => addtocart(sellerItem)} className={styles.addToCartr}>
                ADD TO CART
              </button>
            </div>
          ))}
        </Slider>
      </div>


    </>
  );
};

export default ItemDetails;