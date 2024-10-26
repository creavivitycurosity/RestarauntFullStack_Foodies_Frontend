import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the JWT token from localStorage (or wherever it's stored)
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      // Decode the token to get the email
        const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Log the decoded token

      const email = decodedToken.sub; // Adjust based on your token structure
      console.log('Decoded Token:', email); // Log the decoded token

      // Fetch the image from the backend
      axios
        .get(`${BASE_URL}/api/users/image?email=${email}`, { responseType: 'arraybuffer' })
        .then((response) => {
          // Convert the binary data to a URL
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          setImageUrl(`data:image/jpeg;base64,${base64}`);
        })
        .catch((err) => {
          setError('Failed to load image');
          console.error(err);
        });
    } catch (err) {
      setError('Invalid token');
      console.error(err);
    }
  }, []);

  return (
    <div style={{width:'100%',overflow:"hidden",height: '300px'}}>
      {error && <p>{error}</p>}
      {imageUrl ? (
        <img src={imageUrl} alt="Seller" style={{ width: '100%', height: '400px',objectFit:'contain', height: '100%' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default SellerImage;
