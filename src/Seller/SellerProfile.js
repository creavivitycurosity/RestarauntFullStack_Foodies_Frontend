
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import styles from '../pages/UserProfile.module.css'; // Import the CSS module

const SellerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.sub; // Assuming the email is stored in 'sub'
          const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Unable to fetch user data.');
          setLoading(false);
        }
      } else {
        setError('No token found, please log in.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [BASE_URL]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const token = localStorage.getItem('token');
    if (selectedImage && token) {
      const formData = new FormData();
      formData.append('image', selectedImage);
  
      // Add email to form data
      const email = jwtDecode(token).sub;
      formData.append('email', email);
  
      try {
        await axios.post(`${BASE_URL}/api/users/upload-image`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        // Refresh user data after upload
        const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error uploading image:', err);
        setError('Unable to upload image.');
      }
    }
  };
  
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.userProfileContainer}>
      <h1>Seller Profile</h1>
      {user && (
        <div className={styles.userInfo}>
          {user.image ? (
            <img
              src={`data:image/jpeg;base64,${user.image}`}
              alt="User"
              className={styles.userImage}
            />
          ) : (
            <div className={styles.uploadContainer}>
              <h2>no profile picture</h2>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button  onClick={handleImageUpload}>Upload Image</button>
            </div>
          )}
          <p><strong>restaurantName:</strong> {user.restaurantName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
