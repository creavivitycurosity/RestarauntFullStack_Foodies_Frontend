

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddressForm.module.css';
import { useNavigate } from 'react-router-dom';

const AdressFormView = ({ userId, addressId = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    area: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    nearbyLocation: '',
  });
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (addressId) {
      // Fetch existing address if editing
      const fetchAddress = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`${BASE_URL}/api/users/user/addresses/${addressId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const addressData = response.data;
          setFormData({
            area: addressData.area,
            street: addressData.street,
            city: addressData.city,
            state: addressData.state,
            country: addressData.country,
            pincode: addressData.pincode,
            nearbyLocation: addressData.nearbyLocation,
          });
        } catch (err) {
          console.error('Error fetching address:', err);
        }
      };
      fetchAddress();
    }
  }, [addressId, BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      if (addressId) {
        // Update existing address
        await axios.put(`${BASE_URL}/api/users/addresses/${addressId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Add new address
        await axios.post(`${BASE_URL}/api/users/${userId}/addresses`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
    } catch (err) {
      console.error('Error submitting address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.addressForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={formData.area}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nearbyLocation"
        placeholder="Nearby Location"
        value={formData.nearbyLocation}
        onChange={handleChange}
        required
      />
      
      <button onClick={() => navigate('/details')}>Go to profile</button>
    </form>
  );
};

export default AdressFormView;
