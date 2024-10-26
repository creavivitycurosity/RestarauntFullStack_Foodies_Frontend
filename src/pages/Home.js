// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Home.css';
// import Footer from './Footer';
// import { jwtDecode } from 'jwt-decode';
// import { Link, useNavigate } from 'react-router-dom';
// import pic from '../assests/pic.jpg'
// import Slider from 'react-slick';
// import ReviewsSliderimg from '../Components/ReviewsSliderimg';

// function Home({addtocart}) {
//   const [dishes, setDishes] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:8080/items/allitems');
//         const imagesData = response.data;

//         const imagePromises = imagesData.map(async (imageInfo) => {
//           const { id } = imageInfo;
//           const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(imageResponse.data);
//           return { id, image: `data:image/png;base64,${base64String}`, name: imageInfo.name, price: imageInfo.price,sellerName: imageInfo.sellerName, restaurantName: imageInfo.restaurantName  }; // Include name and price here
//         });

//         const imageUrls = await Promise.all(imagePromises);
//         setDishes(imageUrls);
//         console.log(dishes)

//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }


//     }

//     fetchData();
//     console.log(dishes)
//   }, []);

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
//   let email = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       email = decodedToken.sub; // or decodedToken.username, depending on your token structure
//       console.log(email);
//       console.log(dishes)

//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token'); // Remove the token from local storage
//       localStorage.removeItem('refreshToken'); // Remove the token from local storage

//     }
//   }

//   const sliderSettings2 = {
//     dots: true, // Show dots for navigation
//     infinite: true, // Infinite scrolling
//     speed: 500, // Transition speed
//     slidesToShow: 4, // Number of slides to show
//     slidesToScroll: 1, // Number of slides to scroll per action
//     arrows: true, // Show navigation arrows
//     gap:10,
//     autoplay: true, // Automatically transition
//     autoplaySpeed: 3000, // Time (in ms) between auto transitions
//   };
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     gap:10,
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
//       <div style={{ marginTop: "14vh" }}></div>
//       {token && (
//         <div className='welcomename1'>Welcome {email}</div>
//       )}
//       <div className='about-img2'>
//         <img src={pic} alt='' />
//         <div className='text22'>
//           <h2>WELCOME TO YOUR FOOD HEAVEN</h2>
//         </div>
//       </div>


//       <div className='cards211'>
//         {dishes.slice(0, 12).map((dish) => (
//           <div className='cards-img1' key={dish.id}>
//             <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />
//             <h2>{dish.name}</h2>
//             <h2>₹{dish.price}</h2>
//             <h2>{dish.sellerid}</h2>
//             <h2>Restaurant: {dish.restaurantName}</h2> {/* Display the restaurant name here */}

//             <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
//           </div>
//         ))}
//       </div>

//       {/* Slider Section */}
//       <div className='cardsslider'>
//         <h1>Featured Dishes</h1>
//         <Slider {...sliderSettings}>
//           {dishes.map((dish) => (
//             <div className='cards-img14' key={dish.id}>
//               <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />
//               <h2>{dish.name}</h2>
//               <h2>₹{dish.price}</h2>
//               <button className="b" onClick={() => addtocart(dish)}>ADD TO Cart</button>
//             </div>
//           ))}
//         </Slider>
//       </div>
//   {/* Banner Section */}
//   <div className='banner'>
//         <h1>About Our Restaurant</h1>
//         <p>
//           Welcome to our restaurant, where we serve the finest dishes with the freshest ingredients. Our chefs are dedicated to providing you with an unforgettable dining experience.
//         </p>
//       </div>

//       <ReviewsSliderimg></ReviewsSliderimg>
//       <Footer />
//     </>
//   );
// }



















































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import pic from '../assests/pic.jpg';
import Slider from 'react-slick';
import ReviewsSliderimg from '../Components/ReviewsSliderimg';
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getAllItems } from '../api'; // Adjust the import path if needed
import DiscountedItemsSlider from '../Components/DiscountedItemsSlider'; // Import the new component
import OfferedItemsAndCategories from '../Components/OfferedItemsAndCategories';

const CACHE_KEY = 'dishesCache';
const CACHE_EXPIRATION = 2 * 60 * 1000; // 5 minutes cache expiration
// const CACHE_EXPIRATION = 10 * 1000; // 10 seconds cache expiration

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Home({ addtocart }) {
  const [dishes, setDishes] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1); // 🆕 Pagination state
  const [dishesPerPage] = useState(8);

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    async function fetchData() {
      // Check if data is available in the cache
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

      // Check if cached data exists and is not expired
      if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION) {
        setDishes(cachedData.data);
        setLoading(false); // Stop loading when data is fetched

        console.log('Using cached data:', cachedData.data);
        return;
      }

      // Fetch new data if cache is not available or expired
      try {
        const response = await axios.get(`${BASE_URL}/items/allitems`);
        // const response = await getAllItems();

        const imagesData = response.data;

        const imagePromises = imagesData.map(async (imageInfo) => {
          const { id } = imageInfo;
          const imageResponse = await axios.get(`${BASE_URL}/items/images/${id}`, {
            responseType: 'arraybuffer',
          });

          const base64String = await arrayBufferToBase64(imageResponse.data);
          // console.log('Processing item:', imageInfo); // Log to confirm the data structure

          return {
            id,
            image: `data:image/png;base64,${base64String}`,
            name: imageInfo.name,
            price: imageInfo.price,
            sellerName: imageInfo.sellerName,
            restaurantName: imageInfo.restaurantName,
            featured: imageInfo.featured,
            quantity: imageInfo.quantity,
            previousAmount: imageInfo.previousAmount, // assuming this field contains the original price
            discountActive: imageInfo.discountActive, // assuming this field indicates if a discount is active
            available: imageInfo.available,
          };
        });

        const imageUrls = await Promise.all(imagePromises);
        setDishes(imageUrls);

        // Store fetched data in localStorage
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: imageUrls, timestamp: Date.now() })
        );
        console.log('Fetched and cached data:', imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchData();
    // fetchFavorites(); // Fetch user's favorites on component load

  }, []);



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
      setLoading(false); // Stop loading when data is fetched

    });
  }

  // const token2 = localStorage.getItem('token');
  // const decodedToken = jwtDecode(token2);
  // const userEmail = decodedToken.sub;  // assuming the token contains the 'email' field



  // const fetchFavorites = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/items?email=${userEmail}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setFavorites(response.data.map(fav => fav.item.id));
  //   } catch (error) {
  //     console.error('Error fetching favorites:', error);
  //   }
  // };

  // const toggleFavorite = async (itemId) => {
  //   try {
  //     if (favorites.includes(itemId)) {
  //       await axios.delete(`${BASE_URL}/items/del/${itemId}`, {
  //         data: { email: userEmail },  // send user email in request body
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     } else {
  //       await axios.post(`${BASE_URL}/items/ad/${itemId}`, { email: userEmail }, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //     }
  //     fetchFavorites();  // Refresh favorites after action
  //   } catch (error) {
  //     console.error('Error updating favorite:', error);
  //   }
  // };


  let email = null;
  const token = localStorage.getItem('token');
  if (token && typeof token === "string") {

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        email = decodedToken.sub; // or decodedToken.username, depending on your token structure
        console.log(email);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token'); // Remove the token from local storage
        localStorage.removeItem('refreshToken');
      }
    }
  }
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    gap: 10,
    autoplay: true,
    autoplaySpeed: 3000,
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log('dishes:', dishes);
  const discountedItems = dishes.filter(dish => dish.discountActive);

  const featuredItems = dishes.filter(dish => dish.featured);
  console.log("featured dished", featuredItems)
  const filteredDishes = featuredItems.filter(dish => dish.available && dish.quantity > 0);

  // Pagination logic
  const indexOfLastDish = currentPage * dishesPerPage;
  const indexOfFirstDish = indexOfLastDish - dishesPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);
  console.log('Current Dishes:', currentDishes.length);  // Add this inside the render block

  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div style={{ marginTop: '14vh' }}></div>
      {token && <div className='welcomename1'>Welcome {email}</div>}
      <div className='about-img2'>
        <img src={pic} alt='' />
        <div className='text22'>
          <h2>WELCOME TO YOUR FOOD HEAVEN</h2>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className='cards212 c212'>
            {currentDishes.map((dish) => (
              <div className='cards-img2' key={dish.id}>

                <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />

                {/* <LazyLoadImage
                  src={dish.image}
                  alt={dish.name}
                  onClick={() => navigate(`/item/${dish.id}`)}
                  effect="blur" // Optional effect for image loading
                />       */}

                {dish.discountActive && (
                  <div className="discount-badge">
                    {Math.round(((dish.previousAmount - dish.price) / dish.previousAmount) * 100)}% OFF
                  </div>
                )}
                <h2>{dish.name}</h2>
                <h3>
                  Price:
                  {dish.price !== null && dish.price !== undefined && !dish.discountActive ? (
                    <span>₹{dish.price}</span>
                  ) : (
                    <span></span>
                  )}
                  {dish.discountActive && (
                    <>
                      <span className='dispirice' style={{ textDecoration: dish.discountActive ? 'line-through' : 'none' }}>
                      ₹{dish.previousAmount}
                      </span>
                      <span className='orgprice' style={{ display: 'block', color: 'red' }}>₹{dish.price}</span>
                    </>
                  )}
                </h3>
                <h2>{dish.sellerid}</h2>
                <h2 className='res'>Restaurant: {dish.restaurantName}</h2>

                {dish.quantity === 0 || !dish.available ? (
                  <button className='bstock' style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                ) : (
                  <div className='stock'>
                    <button onClick={() => addtocart(dish)} >ADD TO Cart</button>
                    {dish.quantity < 10 && <h3 style={{marginBottom:"0px",fontSize:"13px"}}>Only {dish.quantity} left in stock!</h3>}
                    {/* <button onClick={() => toggleFavorite(dish.id)}>
                    {favorites.includes(dish.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button> */}
                  </div>
                )}
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













      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (

        <>
          <div className='cardsslider'>
            <h1>Featured Dishes</h1>
            <Slider {...sliderSettings}>
              {dishes.filter(dish => dish.available && dish.quantity > 0).map((dish) => (
                <div className='cards-img14 a14' key={dish.id}>
                  <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />
                  <h2>{dish.name}</h2>
                  <h2>₹{dish.price}</h2>

                  {dish.quantity === 0 ? (
                    <button className='bstock' style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                  ) : (
                    <div className='stock'>
                      <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
                      {/* {dish.quantity < 10 && <h3>Only {dish.quantity} left in stock!</h3>} */}
                      {/* <button onClick={() => toggleFavorite(dish.id)}>
                    {favorites.includes(dish.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button> */}
                    </div>
                  )}                </div>
              ))}
            </Slider>
          </div>

          <DiscountedItemsSlider discountedItems={discountedItems} addtocart={addtocart} navigate={navigate} />

          <div className='banner'>
            <h1>About Our Restaurant</h1>
            <p>
              Welcome to our restaurant, where we serve the finest dishes with the freshest ingredients. Our chefs are dedicated to providing you with an unforgettable dining experience.
            </p>
          </div>

          <ReviewsSliderimg />
        </>

      )}
      {/* <Footer /> */}
      {/* <OfferedItemsAndCategories/> */}
    </>
  );
}

export default Home;






































































// export default Home;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Home.css';
// import Footer from './Footer';
// import {jwtDecode} from 'jwt-decode';
// import { Link, useNavigate } from 'react-router-dom';
// import pic from '../assests/pic.jpg'
// import Slider from 'react-slick';
// import ReviewsSliderimg from '../Components/ReviewsSliderimg';
// import { useQuery } from '@tanstack/react-query';

// function Home({ addtocart }) {
//   const navigate = useNavigate();

//   const { data: dishes = [], isLoading, error } = useQuery(
//     {
//       queryKey: ['dishes'],
//       queryFn: async () => {
//         const response = await axios.get('http://localhost:8080/items/allitems');
//         const imagesData = response.data;

//         const imagePromises = imagesData.map(async (imageInfo) => {
//           const { id } = imageInfo;
//           const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(imageResponse.data);
//           return { id, image: `data:image/png;base64,${base64String}`, name: imageInfo.name, price: imageInfo.price, sellerName: imageInfo.sellerName };
//         });

//         return await Promise.all(imagePromises);
//       },
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       cacheTime: 1000 * 60 * 5, // Cache data for 10 minutes
//     }
//   );

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

//   let email = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       email = decodedToken.sub;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//     }
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
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   // if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;

//   return (
//     <>
//       <div style={{ marginTop: '14vh' }}></div>
//       {token && <div className='welcomename1'>Welcome {email}</div>}
//       <div className='about-img2'>
//         <img src={pic} alt='' />
//         <div className='text22'>
//           <h2>WELCOME TO YOUR FOOD HEAVEN</h2>
//         </div>
//       </div>

//       <div className='cards211'>
//         {dishes.slice(0, 12).map((dish) => (
//           <div className='cards-img1' key={dish.id}>
//             <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />
//             <h2>{dish.name}</h2>
//             <h2>₹{dish.price}</h2>
//             <h2>{dish.sellerid}</h2>
//             <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
//           </div>
//         ))}
//       </div>

//       <div className='cardsslider'>
//         <h1>Featured Dishes</h1>
//         <Slider {...sliderSettings}>
//           {dishes.map((dish) => (
//             <div className='cards-img14' key={dish.id}>
//               <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)} />
//               <h2>{dish.name}</h2>
//               <h2>₹{dish.price}</h2>
//               <button className='b' onClick={() => addtocart(dish)}>ADD TO Cart</button>
//             </div>
//           ))}
//         </Slider>
//       </div>

//       <div className='banner'>
//         <h1>About Our Restaurant</h1>
//         <p>Welcome to our restaurant, where we serve the finest dishes with the freshest ingredients.</p>
//       </div>

//       <ReviewsSliderimg />
//       <Footer />
//     </>
//   );
// }

// export default Home;