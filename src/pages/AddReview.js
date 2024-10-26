import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import styles from './ItemDetails.module.css'; // Assuming you have the same styles
import {  useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddReview = () => {
    const [item, setItem] = useState({});
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { itemId } = useParams(); // Get itemId from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/items/${itemId}`);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        fetchItemDetails();
    }, [itemId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;

        try {
            const review = { email: userEmail, rating, comment };
            await axios.post(`${BASE_URL}/items/item/${itemId}`, review, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.alert("Thank You for your review")
            navigate('/my-orders')

            setRating(1);
            setComment('');
            // Redirect back to My Orders after successful submission
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className={styles.itemDetailsr}>
            <div className={styles.itemDetailsImager}>
                <img
                    src={`data:image/jpeg;base64,${item.image}`}
                    alt={item.name}
                    className={styles.imager}
                />
            </div>
            <div className={styles.itemDetailsInfor}>
                <h1>{item.name}</h1>
                <h3>Price: ₹{item.price}</h3>
                <h3>Seller: {item.restaurantName}</h3>

                <form onSubmit={handleSubmitReview} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="rating" className={styles.label}>
                            Rating:
                        </label>
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
                        <label htmlFor="comment" className={styles.label}>
                            Comment:
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                            className={styles.textarea}
                            maxLength="250"
                        />
                        {comment && <h5>{250 - comment.length} characters remaining</h5>}
                    </div>
                    <button type="submit" className={styles.button}>
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;
