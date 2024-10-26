// DiscountSlider.js
import React from 'react';
import Slider from 'react-slick';
import styles from './DiscountSlider.module.css'; // Importing module CSS

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function DiscountSlider({ discountedItems = [], addtocart, navigate }) {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Check if discountedItems is an array and has items
//   if (!Array.isArray(discountedItems) || discountedItems.length === 0) {
//     return <div className={styles.noItems}>No discounted items available.</div>;
//   }

  return (
    <div className={styles.sliderContainer}>
      <h2>Discounted Items</h2>
      <Slider {...sliderSettings}>
        {discountedItems.map((item) => (
          <div key={item.id} className={styles.sliderItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
              onClick={() => navigate(`/item/${item.id}`)}
            />
            <h3>{item.name}</h3>
            {item.discountActive && (
              <>
                <span className={styles.discountBadge}>
                  {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                </span>
                <div className={styles.priceDetails}>
                  <span className={styles.previousPrice}>₹{item.previousAmount}</span>
                  <span className={styles.currentPrice}>₹{item.price}</span>
                </div>
              </>
            )}
            
            {item.quantity === 0 ? (
                  <button className='bstock' style={{ backgroundColor: 'red', cursor: 'not-allowed',color:"white" }} disabled>Out of Stock</button>
                ) : (
                  <div className={styles.stock}>
                    <button onClick={() => addtocart(item)} style={{BackgroundColor:"#4caf50",color:"white"}}>ADD TO Cart</button>
                    {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
                    {/* <button onClick={() => toggleFavorite(dish.id)}>
                    {favorites.includes(dish.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button> */}
                  </div>
                )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DiscountSlider;
