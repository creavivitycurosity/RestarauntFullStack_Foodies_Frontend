// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CouponManagement.css'
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const CouponManagement = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [couponName, setCouponName] = useState('');
//   const [couponAmount, setCouponAmount] = useState(0);
//   const [expiryDate, setExpiryDate] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3; // Number of coupons to display per page

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   // Fetch all coupons
//   const fetchCoupons = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/orders/all`);
//       setCoupons(response.data);
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//     }
//   };

//   // Create a new coupon
//   const handleCreateCoupon = async () => {
//     try {
//       const newCoupon = {
//         name: couponName,
//         amount: couponAmount,
//         expiryDate: expiryDate,
//       };
//       await axios.post(`${BASE_URL}/orders/create`, newCoupon);
//       alert('Coupon created successfully');
//       setCouponName('')
//       setCouponAmount('')
//       setExpiryDate('')
//       fetchCoupons();
//     } catch (error) {
//       console.error('Error creating coupon:', error);
//       alert('Error creating coupon');
//     }
//   };

//   // Delete a coupon
//   const handleDeleteCoupon = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/orders/delete/${id}`);
//       alert('Coupon deleted successfully');
//       fetchCoupons();
//     } catch (error) {
//       console.error('Error deleting coupon:', error);
//       alert('Error deleting coupon');
//     }
//   };

//     // Pagination logic
//     const indexOfLastCoupon = currentPage * itemsPerPage;
//     const indexOfFirstCoupon = indexOfLastCoupon - itemsPerPage;
//     const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
//     const totalPages = Math.ceil(coupons.length / itemsPerPage);
  
  

//   return (
//     <div id="coupon-management-container">
//       <h1 id="coupon-management-title">Manage Coupons</h1>
//       <div id="coupon-form">
//         <input
//           type="text"
//           placeholder="Coupon Name"
//           value={couponName}
//           onChange={(e) => setCouponName(e.target.value)}
//           id="coupon-input"
//         />
//         <input
//           type="number"
//           placeholder="Coupon Amount"
//           value={couponAmount}
//           onChange={(e) => setCouponAmount(Number(e.target.value))}
//           id="coupon-input"
//         />
//         <input
//           type="date"
//           value={expiryDate}
//           onChange={(e) => setExpiryDate(e.target.value)}
//           id="coupon-input"
//         />
//         <button onClick={handleCreateCoupon} id="create-coupon-btn">Create Coupon</button>
//       </div>

//       <h2 id="existing-coupons-title">Existing Coupons</h2>
//       <ul id="coupon-list">
//         {coupons.map((coupon) => (
//           <li key={coupon.id} id="coupon-item">
//             {coupon.name} - ₹{coupon.amount} - Expires: {coupon.expiryDate}
//             <button onClick={() => handleDeleteCoupon(coupon.id)} id="delete-coupon-btn">Delete</button>
//           </li>
//         ))}
//       </ul>

//  {/* Pagination Controls */}
//  <div id="pagination-controls">
//         <button 
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage} of {totalPages}</span>
//         <button 
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CouponManagement;  

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CouponManagement.css'; // Import the CSS file

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponName, setCouponName] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  const itemsPerPage = 3; // Number of coupons to display per page

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/all`);
      setLoading(false); // Stop loading

      setCoupons(response.data);
    } catch (error) {
      setLoading(false); // Stop loading

      console.error('Error fetching coupons:', error);
    }
  };

  // Create a new coupon
  const handleCreateCoupon = async () => {
    try {
      const newCoupon = {
        name: couponName,
        amount: couponAmount,
        expiryDate: expiryDate,
      };
      await axios.post(`${BASE_URL}/orders/create`, newCoupon);
      alert('Coupon created successfully');
      setCouponName('');
      setCouponAmount(0);
      setExpiryDate('');
      fetchCoupons();
    } catch (error) {
      console.error('Error creating coupon:', error);
      alert('Error creating coupon');
    }
  };

  // Delete a coupon
  const handleDeleteCoupon = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/orders/delete/${id}`);
      alert('Coupon deleted successfully');
      fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
      alert('Error deleting coupon');
    }
  };

  // Pagination logic
  const indexOfLastCoupon = currentPage * itemsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - itemsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
  const totalPages = Math.ceil(coupons.length / itemsPerPage);

  return (
    <div id="coupon-management-container">
      <h1 id="coupon-management-title">Manage Coupons</h1>
      <div id="coupon-form">
        <input
          type="text"
          placeholder="Coupon Name"
          value={couponName}
          onChange={(e) => setCouponName(e.target.value)}
          id="coupon-input"
        />
        <input
          type="number"
          placeholder="Coupon Amount"
          value={couponAmount}
          onChange={(e) => setCouponAmount(Number(e.target.value))}
          id="coupon-input"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          id="coupon-input"
        />
        <button onClick={handleCreateCoupon} id="create-coupon-btn">Create Coupon</button>
      </div>



      <h2 id="existing-coupons-title">Existing Coupons</h2>

      {loading ? (
        <div id="spinner"></div> // Spinner while fetching coupons
        ) : (
      <ul id="coupon-list">
        {currentCoupons.map((coupon) => (
          <li key={coupon.id} id="coupon-item">
            {coupon.name} - ₹{coupon.amount} - Expires: {coupon.expiryDate}
            <button onClick={() => handleDeleteCoupon(coupon.id)} id="delete-coupon-btn">Delete</button>
          </li>
        ))}
      </ul>
      )}




      {/* Pagination Controls */}
      <div id="pagination-controls">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouponManagement;
