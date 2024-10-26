// // src/components/ViewReview.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ViewReview = () => {
//   const { itemId } = useParams(); // Get the item ID from the route parameters
//   const [reviewsData, setReviewsData] = useState({ reviews: [], averageRating: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/items/new/item/${itemId}`); // Adjust the API endpoint as necessary
//         setReviewsData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [itemId]);

//   if (loading) {
//     return <p>Loading reviews...</p>;
//   }

//   if (error) {
//     return <p>Error fetching reviews: {error}</p>;
//   }

//   return (
//     <div>
//       <h2>Reviews for Item ID: {itemId}</h2>
//       <h3>Average Rating: {reviewsData.averageRating.toFixed(1)} / 5</h3>
//       <ul>
//         {reviewsData.reviews.length > 0 ? (
//           reviewsData.reviews.map((review) => (
//             <li key={review.id}>
//               <h3><strong>User:</strong> {review.user.email}</h3> {/* Assuming user has a name property */}
//               <h3><strong>Rating:</strong> {review.rating} / 5</h3>
//               <h3><strong>Comment:</strong> {review.comment}</h3>
//               <h3><strong>Reviewed On:</strong> {new Date(review.reviewDate).toLocaleDateString()}</h3>
//               <hr />
//             </li>
//           ))
//         ) : (
//           <p>No reviews available for this item.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ViewReview;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ViewReview = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const fetchItemDetails = async () => {
    try {
      setIsLoading(true); // Show loader before fetch

      // Fetch item details
      const response = await axios.get(`${BASE_URL}/items/${itemId}`);
      const itemData = response.data;

      // Convert item image to base64
      const imageResponse = await axios.get(`${BASE_URL}/items/images/${itemId}`, {
        responseType: 'arraybuffer',
      });
      const base64String = await arrayBufferToBase64(imageResponse.data);

      // Set item details with the image
      const itemWithImage = {
        ...itemData,
        image: `data:image/png;base64,${base64String}`,
      };

      setItem(itemWithImage);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const fetchItemReviews = async () => {
    try {
      // Fetch item reviews and average rating
      const response = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
      const { reviews, averageRating } = response.data; // Destructure reviews and average rating from response



    // Decode JWT token to get user's email from localStorage
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub; // Get email from token (assuming 'sub' contains the email)

      // Filter reviews to show only the logged-in user's review
      const userReviews = reviews.filter(review => review.user.email === userEmail);

      setReviews(userReviews);



      setAverageRating(averageRating);
    }
    } catch (error) {
      console.error('Error fetching item reviews:', error);
    }
  };

  useEffect(() => {
    fetchItemDetails();
    fetchItemReviews();
  }, [itemId]);

  useEffect(() => {
    if (item) {
      setIsLoading(false); // Hide loader after fetch
    }
  }, [item]);

  if (isLoading) {
    return <p>Loading item and reviews...</p>;
  }

  if (!item) {
    return <p>No item found.</p>;
  }
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>{item.name}</h2>
      <div style={{ maxWidth: '400px', margin: '0 auto', overflow: 'hidden' }}> {/* Container for image */}
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '200px', // Set max height for the image
            objectFit: 'cover', // Cover to maintain aspect ratio
            borderRadius: '10px',
            marginBottom: '20px',
          }}
        />
      </div>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Price: ${item.price}</p><br/>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Average Rating: {averageRating.toFixed(1)} / 5</p>
      <h3 style={{ marginTop: '20px' }}>Review</h3>
      {reviews.length === 0 ? (
        <p>No reviews available for this item.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {reviews.map((review) => (
            <li key={review.id*2+12} style={{ marginBottom: '15px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
              <p style={{ fontWeight: 'bold' }}><strong>{review.user.email}:</strong> </p><br/>
              <p>comment : {review.comment}</p>
              <p style={{ margin: '5px 0' }}>Rating: {review.rating} / 5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewReview;