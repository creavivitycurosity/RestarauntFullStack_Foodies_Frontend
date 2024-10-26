import React, { useState } from 'react';
import axios from 'axios';
import './UpdateOrderStatus.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UpdateOrderStatus = () => {
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
      const response = await axios.put(`${BASE_URL}/orders/${orderId2}/status`, 
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

export default UpdateOrderStatus;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './UpdateOrderStatus.css';

// const UpdateOrderStatus = () => {
//   const { orderId } = useParams();
//   const [status, setStatus] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };
//       const response = await axios.put(`http://localhost:8080/orders/${orderId}/status`, 
//         { status }, 
//         { headers }
//       );
//       setMessage(response.data);
//     } catch (error) {
//       console.error(error);
//       setMessage('Error updating order status');
//     }
//   };

//   useEffect(() => {
//     // Optional: Fetch the order details if needed to display on the page
//   }, [orderId]);

//   return (
//     <div className="update-order-status">
//       <h1>Update Order Status</h1>
      // <form onSubmit={handleSubmit}>
      //   <div className="form-group">
      //     <label htmlFor="orderId">Order ID:</label>
      //     <input type="text" id="orderId" value={orderId} readOnly />
      //   </div>
      //   <div className="form-group">
      //     <label htmlFor="status">Status:</label>
      //     <select 
      //       id="status" 
      //       value={status} 
      //       onChange={(e) => setStatus(e.target.value)} 
      //       required
      //     >
      //       <option value="">Select status</option>
      //       <option value="pending">Pending</option>
      //       <option value="shipped">Shipped</option>
      //       <option value="delivered">Delivered</option>
      //       <option value="cancelled">Cancelled</option>
      //     </select>
      //   </div>
      //   <button type="submit">Update Status</button>
      //   {message && <p>{message}</p>}
      // </form>
//     </div>
//   );
// };

// export default UpdateOrderStatus;
