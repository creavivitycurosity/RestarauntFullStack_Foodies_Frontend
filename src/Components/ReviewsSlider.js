import React from 'react';
import './ReviewsSlider.css';
import Slider from 'react-slick';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const reviews = [
  {
    id: 1,
    content: "The food was amazing! Will definitely come back again.",
    author: "John Doe"
  },
  {
    id: 2,
    content: "Great atmosphere and friendly staff.",
    author: "Jane Smith"
  },
  {
    id: 3,
    content: "Loved the variety of dishes. Highly recommended!",
    author: "Robert Brown"
  }
];

function ReviewsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    prevArrow: <button className="custom-prev" aria-label="Previous">❮</button>,
    nextArrow: <button className="custom-next" aria-label="Next">❯</button>
  };

  return (
    <div className="reviews-slider">
      <h4>User Reviews</h4>
      <Slider {...settings}>
        {reviews.map(review => (
          <div key={review.id} className="review">
            <p>"{review.content}"</p>
            <h5>- {review.author}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewsSlider;
