
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import styles from "./SellerItemsInfo.module.css";
import Footer from "../pages/Footer";
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to extract email
// import ColorThief from 'color-thief';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerItemsInfo = ({ addtocart }) => {
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
        fetchItem();
        fetchReviews();
        // fetchFavorites();

    }, [id]);

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

    if (!item) {
        return <div>Loading...</div>;
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

    const toggleAvailability = () => {
        axios.put(`${BASE_URL}/items/${id}/toggle-availability`)
            .then(response => {
                setItem({ ...item, available: response.data.available });  // Update state with new availability
            })
            .catch(error => console.error('Error toggling availability:', error));
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
                    <span className={styles.discountPricer}>₹{item.price}</span>
                  </>
                )}
              </h3>
              <h3>Seller: {item.restaurantName}</h3>
    
              {item.quantity === 0 ? (
                <button className={styles.outOfStockr} disabled>
                  Out of Stock
                </button>
              ) : (
                <div>
                  <h3>Status: {item.available ? "Available" : "Not Available"}</h3>
                  <button
                    onClick={toggleAvailability}
                    style={{backgroundColor:'aquamarine'}}
                    className={item.available ? styles.unavailableBtnr : styles.availableBtnr}
                  >
                    {item.available ? "Make it Unavailable" : "Make it Available"}
                  </button>
                </div>
              )}
    
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
                  <strong>User Reviews</strong>
                </h3>
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
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    };
    
    export default SellerItemsInfo;