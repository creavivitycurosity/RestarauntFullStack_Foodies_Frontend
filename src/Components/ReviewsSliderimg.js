// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import reviewPic1 from '../assests/Curd.jpg';
// import reviewPic2 from '../assests/Chickenbriyani.jpg';
// import reviewPic3 from '../assests/Burger.jpg';
// import './ReviewsSliderimg.css';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const reviews = [
//   {
//     img: reviewPic1,
//     text: "Amazing food and great service!",
//     name: "John Doe"
//   },
//   {
//     img: reviewPic2,
//     text: "A delightful dining experience.",
//     name: "Jane Smith"
//   },
//   {
//     img: reviewPic3,
//     text: "The best restaurant in town!",
//     name: "Mary Johnson"
//   }
// ];

// const ReviewsSliderimg = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />
//   };

//   return (
//     <div className="review-slider">
//       <h1>User Reviews</h1>
//       <Slider {...settings}>
//         {reviews.map((review, index) => (
//           <div className="slide" key={index}>
//             <img src={review.img} alt={`Review ${index + 1}`} />
//             <p>"{review.text}" - {review.name}</p>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-next`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-prev`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// };

// export default ReviewsSliderimg;


// import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import './ReviewsSliderimg.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const ReviewsSliderimg = () => {
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();


//     // useEffect(() => {
//   //   // Fetch reviews from the API
//   //   fetch(`${BASE_URL}/items/highest-rated-reviews`)
//   //     .then(response => response.json())
//   //     .then(data => setReviews(data))
//   //     .catch(error => console.error('Error fetching reviews:', error));
//   // }, []);


//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/items/highest-rated-reviews`);
//         const reviewsData = response.data;
//         // Sort reviews by date in descending order
//         const sortedReviews = reviewsData.sort((a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate));
//         setReviews(sortedReviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };
//     fetchReviews();
//   }, []);
  
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />
//   };

//   return (
//     <div className="review-slider">
//       <h1>User Reviews</h1>
//       {reviews.length > 0 ? (
//         <Slider {...settings}>
//           {reviews.map((reviewData, index) => (
//             <div className="slide" key={index}>
//               {/* Handling potential null images and using the right base64 format */}
//               {reviewData.item.image ? (
//                 <img 
//                   src={`data:image/jpeg;base64,${reviewData.item.image}`} 
//                   alt={`Review ${index + 1}`} 
//                   onClick={() => navigate(`/item/${reviewData.item.id}`)}
//                   style={{ cursor: "pointer" }}
//                 />
//               ) : (
//                 <img 
//                   src="/default-image.jpg" // Fallback for missing images
//                   alt="Default Review" 
//                   style={{ cursor: "pointer" }}
//                 />
//               )}

//               <p>{reviewData.item.name}</p>

//               <p>"{reviewData.review.comment}" - {reviewData.review.user.email}</p>
//               <p>Rating: {reviewData.review.rating}</p>
//               <p>
//                 <small>Reviewed on: {new Date(reviewData.review.lastUpdatedDate).toLocaleDateString()}</small>
//               </p>
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// // Custom arrows for the slider
// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-next`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} custom-prev`}
//       style={{ ...style }}
//       onClick={onClick}
//     />
//   );
// };

// export default ReviewsSliderimg;

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ReviewsSliderimg.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReviewsSliderimg = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/items/latest-highest-rated-review`);
  //       setReviews(response.data); // No need for sorting, backend handles that
  //     } catch (error) {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);  // 🆕 Show loader before fetch

        const response = await axios.get(`${BASE_URL}/items/latest-highest-rated-review`);
        const featuredReviews = response.data.filter((reviewData) => reviewData.item.featured);
        setIsLoading(false);  // 🆕 Hide loader after fetch

        setReviews(featuredReviews); // Only set featured reviews
        console.log("featuredReviews",featuredReviews)
      } catch (error) {
        setIsLoading(false);  // 🆕 Hide loader after fetch

        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // Adjust based on your needs, 768px is a common mobile breakpoint
        settings: {
          slidesToShow: 1, // Show 2 slides on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  

  return (
    <div className="review-slider">
      <h1>User Reviews</h1>


      {isLoading ? (  // 🆕 Display loader when loading
        <div className="loader-container" style={{height:"20%"}}>
          <div className="loader"></div>
          <h2>Loading reviews...</h2>
        </div>
      ) : reviews.length > 0 ? (        <Slider {...settings}>
          {reviews.map((reviewData, index) => (
            <div className="slide" key={index}>
              {/* Handling potential null images and using the right base64 format */}
              {reviewData.item.image ? (
                <img 
                  src={`data:image/jpeg;base64,${reviewData.item.image}`} 
                  alt={`Review ${index + 1}`} 
                  onClick={() => navigate(`/item/${reviewData.item.id}`)}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <img 
                  src="/default-image.jpg" // Fallback for missing images
                  alt="Default Review" 
                  style={{ cursor: "pointer" }}
                />
              )}

              <p>{reviewData.item.name}</p>

              <h3>"{reviewData.review.comment}" - {reviewData.userEmail}</h3>
              <br/>
              <p>Rating: {reviewData.review.rating}</p>
              <h3>
                <small>Reviewed on: {new Date(reviewData.review.lastUpdatedDate).toLocaleDateString()}</small>
              </h3>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No reviews available.</p>
      )}



    </div>
  );
};

// Custom arrows for the slider
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export default ReviewsSliderimg;
