
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../admin/Dashboard.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { jwtDecode } from 'jwt-decode';
// import SellerItemDetails from './SellerItemsDetails';
// import SellerItemsDetails from './SellerItemsDetails';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SellerDashboard = () => {
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   // const [totalUsers, setTotalUsers] = useState(0);
//   const [weeklyOrders, setWeeklyOrders] = useState(0);
//   const [weeklyAmount, setWeeklyAmount] = useState(0);
//   const [monthlyOrders, setMonthlyOrders] = useState(0);
//   const [monthlyAmount, setMonthlyAmount] = useState(0);
//   const [todayOrders, setTodayOrders] = useState(0);
//   const [todayAmount, setTodayAmount] = useState(0);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   // const [customOrders, setCustomOrders] = useState(0);
//   // const [customAmount, setCustomAmount] = useState(0);
//   // const [totalSellers, setTotalSellers] = useState(0);
//   // const [sellerEmail, setSellerEmail] = useState('');
//   const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
//   const [SellerId, setSellerId] = useState(0);



//   useEffect(() => {
//     const fetchSellerId = async () => {
//       try {
//         const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setSellerId(idresponse.data);
//         console.log(idresponse.data);
//       } catch (error) {
//         console.error('Error fetching SellerId:', error);
//       }
//     };

//     fetchSellerId();
//   }, [sellerEmail2]); // Fetch SellerId separately on initial load

//   useEffect(() => {

//     const fetchDashboardData = async () => {
//       if (SellerId === 0) return;  // Ensure SellerId is fetched

//       try {
//         const token = localStorage.getItem('token');
// // console.log("seller dashboard"+sellerEmail2)
// // console.log("dashboard")

// //         const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
// //             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
// //           });
// //           setSellerId(idresponse.data);
// //           console.log(idresponse.data)
//         // Fetch total orders and amount
//         const response = await axios.get(`${BASE_URL}/orders/seller/allOrders/${sellerEmail2}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           });
//         setTotalOrders(response.data.length);

//         const totalAmountResponse = await axios.get(`${BASE_URL}/orders/sellerTotalAmount/totalAmount/${sellerEmail2}/${SellerId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           }); 
//         setTotalAmount(totalAmountResponse.data);
//         console.log(totalAmountResponse.data)

//         // Fetch weekly, monthly, and today data
//         const weeklyOrdersResponse = await axios.get(`${BASE_URL}/orders/sellerweeklyOrders/weeklyOrders/${sellerEmail2}/${SellerId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           });
//         setWeeklyOrders(weeklyOrdersResponse.data.totalOrders);
//         setWeeklyAmount(weeklyOrdersResponse.data.totalAmount);

//         const monthlyOrdersResponse = await axios.get(`${BASE_URL}/orders/sellermonthlyOrders/monthlyOrders/${sellerEmail2}/${SellerId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           });
//         setMonthlyOrders(monthlyOrdersResponse.data.totalOrders);
//         setMonthlyAmount(monthlyOrdersResponse.data.totalAmount);

//         const todayOrdersResponse = await axios.get(`${BASE_URL}/orders/sellertodayOrders/todayOrders/${sellerEmail2}/${SellerId}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           });
//         setTodayOrders(todayOrdersResponse.data.totalOrders);
//         setTodayAmount(todayOrdersResponse.data.totalAmount);

//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, [SellerId]);


//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="dashboard-stats">
//         <div className="stat">
//           <h2>Total Orders:</h2>
//           <p>{totalOrders}</p>
//         </div>


//         <div className="stat">
//           <h2>Total Amount:</h2>
//           <p>${totalAmount.toFixed(2)}</p>
//         </div>
//       </div>
//       <hr />

//       <div className="dashboard-stats2">
//         <div className="stat2">
//           <h2>Today's Orders:</h2>
//           <p>{todayOrders}</p>
//         </div>
//         <h1>Today</h1>

//         <div className="stat2">
//           <h2>Today's Amount:</h2>
//           <p>${todayAmount.toFixed(2)}</p>
//         </div>
//       </div>
//       <div>

//         <hr />

//         <div className="dashboard-stats3">
//           <div className="stat3">
//             <h2>Weekly Orders:</h2>
//             <p>{weeklyOrders}</p>
//           </div>
//           <h1>Weekly</h1>

//           <div className="stat3">
//             <h2>Weekly Amount:</h2>
//             <p>${weeklyAmount.toFixed(2)}</p>
//           </div>
//         </div>

//         <hr />

//         <div className="dashboard-stats4">
//           <div className="stat4">
//             <h2>Monthly Orders:</h2>
//             <p>{monthlyOrders}</p>
//           </div>
//           <h1>Monthly</h1>

//           <div className="stat4">
//             <h2>Monthly Amount:</h2>
//             <p>${monthlyAmount.toFixed(2)}</p>
//           </div>
//         </div>
//       </div>
//       <hr />
//       {/* <SellerItemsDetails/> */}
//     </div>

//   );
// };

// export default SellerDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../admin/Dashboard.css';
// import { jwtDecode } from 'jwt-decode';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SellerDashboard = () => {
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [weeklyOrders, setWeeklyOrders] = useState(0);
//   const [weeklyAmount, setWeeklyAmount] = useState(0);
//   const [monthlyOrders, setMonthlyOrders] = useState(0);
//   const [monthlyAmount, setMonthlyAmount] = useState(0);
//   const [todayOrders, setTodayOrders] = useState(0);
//   const [todayAmount, setTodayAmount] = useState(0);
//   const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
//   const [SellerId, setSellerId] = useState(0);

//   useEffect(() => {
//     const fetchSellerId = async () => {
//       try {
//         const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setSellerId(idresponse.data);
//       } catch (error) {
//         console.error('Error fetching SellerId:', error);
//       }
//     };

//     fetchSellerId();
//   }, [sellerEmail2]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       if (SellerId === 0) return;

//       try {
//         // Fetch total orders and amount
//         const response = await axios.get(`${BASE_URL}/orders/orders/seller/allOrders3/${sellerEmail2}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setTotalOrders(response.data);

//         const totalAmountResponse = await axios.get(`${BASE_URL}/orders/orders/sellerTotalAmount3/${sellerEmail2}/${SellerId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setTotalAmount(totalAmountResponse.data);

//         // Fetch weekly, monthly, and today data
//         const weeklyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellerweeklyOrders3/${sellerEmail2}/${SellerId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setWeeklyOrders(weeklyOrdersResponse.data.totalOrders);
//         setWeeklyAmount(weeklyOrdersResponse.data.totalAmount);

//         const monthlyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellermonthlyOrders3/${sellerEmail2}/${SellerId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setMonthlyOrders(monthlyOrdersResponse.data.totalOrders);
//         setMonthlyAmount(monthlyOrdersResponse.data.totalAmount);

//         const todayOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellertodayOrders3/${sellerEmail2}/${SellerId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setTodayOrders(todayOrdersResponse.data.totalOrders);
//         setTodayAmount(todayOrdersResponse.data.totalAmount);

//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, [SellerId]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="dashboard-stats">
//         <div className="stat">
//           <h2>Total Orders:</h2>
//           <p>{totalOrders}</p>
//         </div>
//         <div className="stat">
//           <h2>Total Amount:</h2>
//           <p>${totalAmount.toFixed(2)}</p>
//         </div>
//       </div>
//       <hr />
//       <div className="dashboard-stats2">
//         <div className="stat2">
//           <h2>Today's Orders:</h2>
//           <p>{todayOrders}</p>
//         </div>
//         <div className="stat2">
//           <h2>Today's Amount:</h2>
//           <p>${todayAmount.toFixed(2)}</p>
//         </div>
//       </div>
//       <hr />
//       <div className="dashboard-stats3">
//         <div className="stat3">
//           <h2>Weekly Orders:</h2>
//           <p>{weeklyOrders}</p>
//         </div>
//         <div className="stat3">
//           <h2>Weekly Amount:</h2>
//           <p>${weeklyAmount.toFixed(2)}</p>
//         </div>
//       </div>
//       <hr />
//       <div className="dashboard-stats4">
//         <div className="stat4">
//           <h2>Monthly Orders:</h2>
//           <p>{monthlyOrders}</p>
//         </div>
//         <div className="stat4">
//           <h2>Monthly Amount:</h2>
//           <p>${monthlyAmount.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Make sure you import the CSS for DatePicker
import '../admin/Dashboard.css';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState(0);
  const [weeklyAmount, setWeeklyAmount] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayAmount, setTodayAmount] = useState(0);

  // For date range filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRangeOrders, setDateRangeOrders] = useState(0);
  const [dateRangeAmount, setDateRangeAmount] = useState(0);
  const [loading, setLoading] = useState(false); // Add a new state variable

  const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
  const [SellerId, setSellerId] = useState(0);

  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSellerId(idresponse.data);
      } catch (error) {
        console.error('Error fetching SellerId:', error);
      }
    };

    fetchSellerId();
  }, [sellerEmail2]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (SellerId === 0) return;

      try {
        // Fetch total orders and amount
        const response = await axios.get(`${BASE_URL}/orders/orders/seller/allOrders3/${sellerEmail2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTotalOrders(response.data);

        const totalAmountResponse = await axios.get(`${BASE_URL}/orders/orders/sellerTotalAmount3/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTotalAmount(totalAmountResponse.data);

        // Fetch weekly, monthly, and today data
        const weeklyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellerweeklyOrders3/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setWeeklyOrders(weeklyOrdersResponse.data.totalOrders);
        setWeeklyAmount(weeklyOrdersResponse.data.totalAmount);

        const monthlyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellermonthlyOrders3/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMonthlyOrders(monthlyOrdersResponse.data.totalOrders);
        setMonthlyAmount(monthlyOrdersResponse.data.totalAmount);

        const todayOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/sellertodayOrders3/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTodayOrders(todayOrdersResponse.data.totalOrders);
        setTodayAmount(todayOrdersResponse.data.totalAmount);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [SellerId]);

  // Fetch orders and amount based on the date range
  const fetchDateRangeData = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      setLoading(true); // Set loading to true when the function is called

      const response = await axios.get(`${BASE_URL}/orders/orders/sellerDateRangeOrders2/${sellerEmail2}/${SellerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      setLoading(false); // Set loading to false when the request is complete

      setDateRangeOrders(response.data.totalOrders);
      setDateRangeAmount(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching date range data:", error);
    }
  };


  // Clear the date range data and reset the state
  const clearDateRangeData = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRangeOrders(0);
    setDateRangeAmount(0);
  };

  return (
    <div>
      <h1>Dashboard</h1>


      {/* Existing Stats */}
      <div className="dashboard-stats">
        <div className="stat">
          <h2>Total Orders:</h2>
          <p>{totalOrders}</p>
        </div>
        <div className="stat">
          <h2>Total Amount:</h2>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
      </div>
      <hr />
      <div className="dashboard-stats2">
        <div className="stat2">
          <h2>Today's Orders:</h2>
          <p>{todayOrders}</p>
        </div>
        <div className="stat2">
          <h2>Today's Amount:</h2>
          <p>${todayAmount.toFixed(2)}</p>
        </div>
      </div>
      <hr />
      <div className="dashboard-stats3">
        <div className="stat3">
          <h2>Weekly Orders:</h2>
          <p>{weeklyOrders}</p>
        </div>
        <div className="stat3">
          <h2>Weekly Amount:</h2>
          <p>${weeklyAmount.toFixed(2)}</p>
        </div>
      </div>
      <hr />
      <div className="dashboard-stats4">
        <div className="stat4">
          <h2>Monthly Orders:</h2>
          <p>{monthlyOrders}</p>
        </div>
        <div className="stat4">
          <h2>Monthly Amount:</h2>
          <p>${monthlyAmount.toFixed(2)}</p>
        </div>
      </div>

      <hr />
      <br/>
      <h2>CUSTOM DATE RANGE</h2>

      {/* <div className="date-picker-section">
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={startDate}  // Prevent end date from being before start date
          />
        </div>
        <button onClick={fetchDateRangeData} className="search-button">Search</button>
        <button onClick={clearDateRangeData} className="clear-button">Clear</button> 
        {loading && <div>Loading...</div>} 

      </div> */}

      <div className="date-picker-section" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            minDate={startDate}  // Prevent end date from being before start date
          />
        </div>
        <div>

        <button onClick={fetchDateRangeData} className="search-button" style={{
          margin: '10px',
          padding: '10px 20px',
          borderRadius: '10px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          cursor: 'pointer'
        }}>Search</button>
        <button onClick={clearDateRangeData} className="clear-button" style={{
          margin: '10px',
          padding: '10px 20px',
          borderRadius: '10px',
          // backgroundColor: '#fff',
          border: '1px solid #ddd',
          cursor: 'pointer'
        }}>Clear</button> {/* Clear button */}
              </div>

        {loading && <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#666'
        }}>Loading...</div>} {/* Add a loading indicator */}
      </div>

      {/* Date Range Results */}
      <div className="dashboard-stats">
        <div className="stat">
          <h2>Total Orders :</h2>
          <p>{dateRangeOrders}</p>
        </div>
        <div className="stat">
          <h2>Total Amount :</h2>
          <p>${dateRangeAmount.toFixed(2)}</p>
        </div>
      </div>

    </div>
  );
};

export default SellerDashboard;
