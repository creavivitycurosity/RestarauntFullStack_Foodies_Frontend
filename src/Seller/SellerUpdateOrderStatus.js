import React, { useState } from 'react';
import axios from 'axios';
import '../admin/UpdateOrderStatus.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerUpdateOrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const { orderId2, status2} = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.put(`${BASE_URL}/orders/seller/${orderId2}/status`, 
        { status }, 
        { headers }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage('Error updating order status');
    }
  };

  return (
    <div className="update-order-status ">
      <h1>Update Order Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orderId">Order ID:</label>
          <input type="text" id="orderId" value={orderId2} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="orderId">CURRENT STATUS:</label>
          <input type="text" id="orderId" value={status2} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="status">UPDATED STATUS:</label>
          <select 
            id="status" 
            onChange={(e) => setStatus(e.target.value)} 
            required
          >
            <option value="">Select Status</option>
            <option value="pending">pending</option>
            <option value="order accepted">order accepted</option>
            <option value="cooking">cooking</option>
            <option value="ready for pickup">ready for pickup</option>
            <option value="delivered">delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default SellerUpdateOrderStatus;
