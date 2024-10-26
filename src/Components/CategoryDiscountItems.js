// CategoryDiscountItems.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CategoryDiscountItems.module.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CategoryDiscountItems = () => {
  const { categoryId } = useParams(); // Get categoryId from route params
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryDiscountItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/items/allitems`);
        const discountedItems = response.data.filter(item => item.discountActive && item.category.id === parseInt(categoryId));
        setItems(discountedItems);
      } catch (error) {
        console.error('Error fetching category discount items:', error);
      }
    };

    fetchCategoryDiscountItems();
  }, [categoryId]);

  return (
    <div>
      <h1>Discounted Items for Category {categoryId}</h1>
      <div className={styles.itemsGrid}>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className={styles.itemCard}>
              <img src={`data:image/png;base64,${item.image}`} alt={item.name} />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Discount: {item.discountPercentage}%</p>
              </div>
            </div>
          ))
        ) : (
          <p>No discounted items available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDiscountItems;
