// SellerDiscountedItems.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './SellerDiscountedItems.module.css'; // Import your CSS module

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerDiscountedItems = () => {
  const { sellerName } = useParams(); // Get the seller name from URL parameters
  const [discountedItems, setDiscountedItems] = useState([]);

  useEffect(() => {
    const fetchDiscountedItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items/allitems`);
        const filteredItems = response.data.filter(
          item => item.discountActive && item.restaurantName === sellerName
        );
        setDiscountedItems(filteredItems);
      } catch (error) {
        console.error('Error fetching discounted items:', error);
      }
    };

    fetchDiscountedItems();
  }, [sellerName]);

  return (
    <div className={styles.itemsContainer}>
      <h1>Discounted Items from {sellerName}</h1>
      <div className={styles.itemsGrid}>
        {discountedItems.length > 0 ? (
          discountedItems.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <img src={`data:image/png;base64,${item.image}`} alt={item.name} />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Discount: {item.discountPercentage}%</p>
              </div>
            </div>
          ))
        ) : (
          <p>No discounted items available from this seller.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDiscountedItems;
