// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './SellerItemDateRange.css'
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SellerItemDateRange = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [SellerId, setSellerId] = useState(0);
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
  
//     useEffect(() => {
//       const token = localStorage.getItem('token');
  
//       const fetchItems = async () => {
//         if (!startDate || !endDate) return;  // Only fetch when both dates are selected

//         setLoading(true);
//         try {
//           // Get seller ID
//           const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           });
//           setSellerId(idresponse.data);
  
//           // Fetch items with date range filter
//           const response = await axios.get(`${BASE_URL}/orders/seller-item-detail-date-range/${sellerEmail2}/${SellerId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             params: {
//               sellerEmail:sellerEmail2,
//               sellerId:SellerId,
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString()
//             }
//           });
//           setItems(response.data);
//           console.log("Data about each item", response.data);
//         } catch (error) {
//           setError(error.message);
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchItems();
//     }, [SellerId, startDate, endDate]);
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     if (error) {
//       return <div>Error: {error}</div>;
//     }
  
    
//   return (
//     <div className="seller-item-container">
//       <h1>Seller Item Custom Date Details</h1>
      
//       {/* Date Picker Section */}
//       <div className="date-picker-container" style={{margin:"0 auto"}}>
//         <div style={{margin:"0 auto"}}>
//         <label>&nbsp; Start Date: </label>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}  // Set start date
//           selectsStart
//           startDate={startDate}
//           endDate={endDate}
//           dateFormat="yyyy/MM/dd"
//         />
//         </div>
//         <div style={{margin:"0 auto"}}>
//         <label> &nbsp; &nbsp; End Date: </label>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}  // Set end date
//           selectsEnd
//           startDate={startDate}
//           endDate={endDate}
//           minDate={startDate}  // Prevent selecting a date before startDate
//           dateFormat="yyyy/MM/dd"
//         />
//         </div>
//       </div>

//       {/* Loading and Error States */}
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}

//       {/* Items List */}
//       <div className="item-cards-container">
//         {items.map(item => (
//           <div className="item-card" key={item.id} style={{margin:"0 auto"}}>
//             <h2>{item.name}</h2><br/>
//             <p><b>Price:</b> ₹{item.price}</p>
//             <p><b>Total Quantity Ordered:</b> {item.totalAmount / item.price}</p>
//             <p><b>Total Orders:</b> {item.totalOrders}</p>
//             <p><b>Total Amount:</b> ₹{item.totalAmount}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SellerItemDateRange;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SellerItemDateRange.css'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerItemDateRange = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [SellerId, setSellerId] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);  // Set to null initially to ensure no prefetching
  const [triggerSearch, setTriggerSearch] = useState(false);  // To manually trigger fetch
  const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;

  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSellerId(idresponse.data);
      } catch (error) {
        console.error("Error fetching SellerId:", error);
      }
    };

    fetchSellerId();
  }, [sellerEmail2]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!startDate || !endDate || !triggerSearch) return;  // Fetch data only after both dates and search are set

      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/orders/seller-item-detail-date-range/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: {
            sellerEmail: sellerEmail2,
            sellerId: SellerId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });
        setItems(response.data);
        console.log("Data about each item", response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [triggerSearch, SellerId, startDate, endDate, sellerEmail2]);

  const handleSearch = () => {
    if (startDate && endDate) {
      setTriggerSearch(true);  // Trigger search when both dates are selected
    } else {
      alert('Please select both start and end dates.');
    }
  };

  return (
    <div className="seller-item-container">
      <h1>Seller Item Custom Date Details</h1>

      {/* Date Picker Section */}
      <div className="date-picker-container" style={{ margin: '0 auto' }}>
        <div style={{ margin: '0 auto' }}>
          <label>&nbsp; Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}  // Set start date
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div style={{ margin: '0 auto' }}>
          <label> &nbsp; &nbsp; End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}  // Set end date
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}  // Prevent selecting a date before startDate
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {/* Items List */}
      <div className="item-cards-container">
        {items.map((item) => (
          <div className="item-card" key={item.id} style={{ margin: '0 auto' }}>
            <h2>{item.name}</h2><br />
            <p><b>Price:</b> ₹{item.price}</p>
            <p><b>Total Quantity Ordered:</b> {item.totalAmount / item.price}</p>
            <p><b>Total Orders:</b> {item.totalOrders}</p>
            <p><b>Total Amount:</b> ₹{item.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerItemDateRange;
