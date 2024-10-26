import React, { useState } from 'react';
import axios from 'axios';
import './UpdateOrderStatus.css'; // Import the CSS file

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OrderStatusAll = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      const response = await axios.put(`${BASE_URL}/orders/${orderId}/status`, 
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
        <label>Order ID:</label>
        <input type="number" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
        <br />
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <br />
        <button type="submit">Update Status</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default OrderStatusAll;
