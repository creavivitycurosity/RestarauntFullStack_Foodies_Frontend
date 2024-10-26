// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/orders/allOrders2');
//         setTotalOrders(response.data.length);

//         const totalAmountResponse = await axios.get('http://localhost:8080/orders/totalAmount');
//         setTotalAmount(totalAmountResponse.data);

//         const usersResponse = await axios.get('http://localhost:8080/orders/allUsers');
//         setTotalUsers(usersResponse.data.length);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

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
//         <div className="stat">
//           <h2>Total Users:</h2>
//           <p>{totalUsers}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react'; //working
// import axios from 'axios';
// import './Dashboard.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import UserOrderSearch from './UserOrderSearch';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const Dashboard = () => {
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [weeklyOrders, setWeeklyOrders] = useState(0);
//   const [weeklyAmount, setWeeklyAmount] = useState(0);
//   const [monthlyOrders, setMonthlyOrders] = useState(0);
//   const [monthlyAmount, setMonthlyAmount] = useState(0);
//   const [todayOrders, setTodayOrders] = useState(0);
//   const [todayAmount, setTodayAmount] = useState(0);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [customOrders, setCustomOrders] = useState(0);
//   const [customAmount, setCustomAmount] = useState(0);
//   const [totalSellers, setTotalSellers] = useState(0);

//   useEffect(() => {
//     const fetchTotalSellers = async () => {
//       try {
//           const response = await axios.get(`${BASE_URL}/items/total-sellers`);
//           setTotalSellers(response.data);
//       } catch (error) {
//           console.error('Error fetching total sellers:', error);
//       }
//   };

//   fetchTotalSellers();
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch total orders and amount
//         const response = await axios.get(`${BASE_URL}/orders/allOrders2`);
//         setTotalOrders(response.data.length);

//         const totalAmountResponse = await axios.get(`${BASE_URL}/orders/totalAmount`);
//         setTotalAmount(totalAmountResponse.data);

//         const usersResponse = await axios.get(`${BASE_URL}/orders/allUsers`);
//         setTotalUsers(usersResponse.data.length);

//         // Fetch weekly, monthly, and today data
//         const weeklyOrdersResponse = await axios.get(`${BASE_URL}/orders/weeklyOrders`);
//         setWeeklyOrders(weeklyOrdersResponse.data.totalOrders);
//         setWeeklyAmount(weeklyOrdersResponse.data.totalAmount);

//         const monthlyOrdersResponse = await axios.get(`${BASE_URL}/orders/monthlyOrders`);
//         setMonthlyOrders(monthlyOrdersResponse.data.totalOrders);
//         setMonthlyAmount(monthlyOrdersResponse.data.totalAmount);

//         const todayOrdersResponse = await axios.get(`${BASE_URL}/orders/todayOrders`);
//         setTodayOrders(todayOrdersResponse.data.totalOrders);
//         setTodayAmount(todayOrdersResponse.data.totalAmount);

//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);


//   const fetchCustomDateData = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/orders/count`, {
//         params: {
//           startDate: startDate.toISOString().split('T')[0],
//           endDate: endDate.toISOString().split('T')[0]
//         }
//       });
//       setCustomOrders(response.data.totalOrders);
//       setCustomAmount(response.data.totalAmount);
//     } catch (error) {
//       console.error('Error fetching custom date data:', error);
//     }
//   };

//   const clearCustomDates = () => {
//     setStartDate(new Date());
//     setEndDate(new Date());
//     setCustomOrders(0);
//     setCustomAmount(0);
//   };
// let a = totalUsers-totalSellers;
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="dashboard-stats">
//         <div className="stat">
//           <h2>Total Orders:</h2>
//           <p>{totalOrders}</p>
//         </div>

//         <div className="stat">
//           <h2>Total Users:</h2>
//           <p>{a}</p>
//         </div>

//         <div className="stat">
//           <h2>Total Sellers:</h2>
//           <p>{totalSellers}</p>
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
//       <div className="custom-date-section">
//         <h1>
//           &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
//           Custom Date Range
//           </h1>
//         <div className='p'>
//           <div className='dataf'>
//             <div className="date-picker">
//               <label>Start Date:</label>
//               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//             </div>
//             <div className="date-picker">
//               <label>End Date:</label>
//               <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//             </div>

//           </div>

//           <div className='datad'>
//             <button onClick={fetchCustomDateData}>Fetch Data</button>
//             <button onClick={clearCustomDates}>Clear Data</button>
//           </div>
//         </div>
//         <div className="custom-stats">
//           <div className="stat">
//             <h2>Orders:</h2>
//             <p>{customOrders}</p>
//           </div>
//           <div className="stat">
//             <h2>Amount:</h2>
//             <p>${customAmount ? customAmount.toFixed(2) : '0.00'}</p>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState(0);
  const [weeklyAmount, setWeeklyAmount] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayAmount, setTodayAmount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [customOrders, setCustomOrders] = useState(0);
  const [customAmount, setCustomAmount] = useState(0);
  const [totalSellers, setTotalSellers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchTotalSellers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items/total-sellers`);
      setTotalSellers(response.data);
    } catch (error) {
      console.error('Error fetching total sellers:', error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/users/count`);
      setTotalUsers(response.data);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total orders and amount
        const response = await axios.get(`${BASE_URL}/orders/orders/adminTotalOrdersAndAmount4`);
        setTotalOrders(response.data.totalOrders);
        setTotalAmount(response.data.totalAmount);

        // Fetch weekly, monthly, and today data
        const weeklyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/adminWeeklyOrdersAndAmount4`);
        setWeeklyOrders(weeklyOrdersResponse.data.totalOrders);
        setWeeklyAmount(weeklyOrdersResponse.data.totalAmount);

        const monthlyOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/adminMonthlyOrdersAndAmount4`);
        setMonthlyOrders(monthlyOrdersResponse.data.totalOrders);
        setMonthlyAmount(monthlyOrdersResponse.data.totalAmount);

        const todayOrdersResponse = await axios.get(`${BASE_URL}/orders/orders/adminTodayOrdersAndAmount4`);
        setTodayOrders(todayOrdersResponse.data.totalOrders);
        setTodayAmount(todayOrdersResponse.data.totalAmount);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchTotalSellers();
    fetchTotalUsers();

    fetchDashboardData();
  }, []);

  // const fetchCustomDateData = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/orders/orders/adminCustomDateRangeOrdersAndAmount4`, {
  //       params: {
  //         startDate: startDate.toISOString(),
  //         endDate: endDate.toISOString()
  //       }
  //     });
  //     setCustomOrders(response.data.totalOrders);
  //     setCustomAmount(response.data.totalAmount);
  //   } catch (error) {
  //     console.error('Error fetching custom date data:', error);
  //   }
  // };

  const fetchCustomDateData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/orders/adminCustomDateRangeOrdersAndAmount6`, {
        params: {
          startDate: startDate.toISOString().replace('Z', '+00:00'), // Convert to ISO offset date time
          endDate: endDate.toISOString().replace('Z', '+00:00') // Convert to ISO offset date time
        }
      });
      setCustomOrders(response.data.totalOrders);
      setCustomAmount(response.data.totalAmount);
      console.log('Response:', response.data); // Log the response

      console.log("CustomOrders", response.data.totalOrders)
      console.log("CustomAmount", response.data.totalAmount)
    } catch (error) {
      console.error('Error fetching custom date data:', error);
    }
  };

  const clearCustomDates = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setCustomOrders(0);
    setCustomAmount(0);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat">
          <h2>Total Orders:</h2>
          <p>{totalOrders}</p>
        </div>

        <div className="stat">
          <h2>Total Users:</h2>
          <p>{totalUsers}</p>
        </div>

         <div className="stat">
           <h2>Total Sellers:</h2>
          <p>{totalSellers}</p>
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

      <div className="custom-date-section" style={{width:"100%"}}>
        <div style={{margin:"0 auto"}}>
        <h2>Custom Date Range</h2>
        <div className="date-picker">
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <div className="date-picker">
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
        <button onClick={fetchCustomDateData}>Fetch Data</button>
        <button onClick={clearCustomDates}>Clear Data</button>
        </div>
        <div className="custom-stats">
          <div className="stat">
            <h2>Orders:</h2>
            <p>{customOrders}</p>
          </div>
          <div className="stat">
            <h2>Amount:</h2>
            <p>${customAmount ? customAmount.toFixed(2) : '0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




















































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [totalOrders, setTotalOrders] = useState(0);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [segregatedOrders, setSegregatedOrders] = useState({
//         lastHour: 0,
//         last12Hours: 0,
//         today: 0,
//         yesterday: 0,
//         last6Months: 0,
//     });
//     const [segregatedAmounts, setSegregatedAmounts] = useState({
//         lastHour: 0,
//         last12Hours: 0,
//         today: 0,
//         yesterday: 0,
//         last6Months: 0,
//     });

//     useEffect(() => {
//         const fetchDashboardData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const headers = {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 };

//                 const ordersResponse = await axios.get('http://localhost:8080/orders/allOrders2', { headers });
//                 const orders = ordersResponse.data;
//                 setTotalOrders(orders.length);

//                 const totalAmounts = orders.reduce((acc, order) => acc + order.amountPaid, 0);
//                 setTotalAmount(totalAmounts);

//                 const now = new Date();
//                 const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
//                 const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
//                 const startOfToday = new Date(now.setHours(0, 0, 0, 0));
//                 const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
//                 const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));

//                 const segregated = {
//                     lastHour: 0,
//                     last12Hours: 0,
//                     today: 0,
//                     yesterday: 0,
//                     last6Months: 0,
//                 };

//                 const segregatedAmounts = {
//                     lastHour: 0,
//                     last12Hours: 0,
//                     today: 0,
//                     yesterday: 0,
//                     last6Months: 0,
//                 };

//                 orders.forEach(order => {
//                     const orderDate = new Date(order.createdAt);
//                     if (orderDate > oneHourAgo) {
//                         segregated.lastHour += 1;
//                         segregatedAmounts.lastHour += order.amountPaid;
//                     }
//                     if (orderDate > twelveHoursAgo) {
//                         segregated.last12Hours += 1;
//                         segregatedAmounts.last12Hours += order.amountPaid;
//                     }
//                     if (orderDate >= startOfToday) {
//                         segregated.today += 1;
//                         segregatedAmounts.today += order.amountPaid;
//                     }
//                     if (orderDate >= startOfYesterday && orderDate < startOfToday) {
//                         segregated.yesterday += 1;
//                         segregatedAmounts.yesterday += order.amountPaid;
//                     }
//                     if (orderDate > sixMonthsAgo) {
//                         segregated.last6Months += 1;
//                         segregatedAmounts.last6Months += order.amountPaid;
//                     }
//                 });

//                 setSegregatedOrders(segregated);
//                 setSegregatedAmounts(segregatedAmounts);

//                 const usersResponse = await axios.get('http://localhost:8080/orders/allUsers', { headers });
//                 setTotalUsers(usersResponse.data.length);
//             } catch (error) {
//                 console.error('Error fetching dashboard data:', error);
//             }
//         };

//         fetchDashboardData();
//     }, []);

//     return (
//         <div>
//             <h1>Dashboard</h1>
//             <div className="dashboard-stats">
//                 <div className="stat">
//                     <h2>Total Orders:</h2>
//                     <p>{totalOrders}</p>
//                 </div>
//                 <div className="stat">
//                     <h2>Total Amount:</h2>
//                     <p>${totalAmount.toFixed(2)}</p>
//                 </div>
//                 <div className="stat">
//                     <h2>Total Users:</h2>
//                     <p>{totalUsers}</p>
//                 </div>
//             </div>
//             <div className="segregated-stats">
//                 <h2>Order Segregation</h2>
//                 <div className="stat">
//                     <h3>Last Hour</h3>
//                     <p>Orders: {segregatedOrders.lastHour}</p>
//                     <p>Amount: ${segregatedAmounts.lastHour.toFixed(2)}</p>
//                 </div>
//                 <div className="stat">
//                     <h3>Last 12 Hours</h3>
//                     <p>Orders: {segregatedOrders.last12Hours}</p>
//                     <p>Amount: ${segregatedAmounts.last12Hours.toFixed(2)}</p>
//                 </div>
//                 <div className="stat">
//                     <h3>Today</h3>
//                     <p>Orders: {segregatedOrders.today}</p>
//                     <p>Amount: ${segregatedAmounts.today.toFixed(2)}</p>
//                 </div>
//                 <div className="stat">
//                     <h3>Yesterday</h3>
//                     <p>Orders: {segregatedOrders.yesterday}</p>
//                     <p>Amount: ${segregatedAmounts.yesterday.toFixed(2)}</p>
//                 </div>
//                 <div className="stat">
//                     <h3>Last 6 Months</h3>
//                     <p>Orders: {segregatedOrders.last6Months}</p>
//                     <p>Amount: ${segregatedAmounts.last6Months.toFixed(2)}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [segregatedOrders, setSegregatedOrders] = useState({
//     lastHour: 0,
//     last12Hours: 0,
//     today: 0,
//     yesterday: 0,
//     last6Months: 0,
//   });
//   const [segregatedAmounts, setSegregatedAmounts] = useState({
//     lastHour: 0,
//     last12Hours: 0,
//     today: 0,
//     yesterday: 0,
//     last6Months: 0,
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const headers = {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         };

//         // Fetch orders and users data
//         const ordersResponse = await axios.get('http://localhost:8080/orders/allOrders2', { headers });
//         const orders = ordersResponse.data;

//         const usersResponse = await axios.get('http://localhost:8080/orders/allUsers', { headers });
//         const users = usersResponse.data;

//         // Calculate total orders and amounts
//         setTotalOrders(orders.length);
//         const totalAmounts = orders.reduce((acc, order) => acc + order.totalAmount, 0);
//         setTotalAmount(totalAmounts);

//         // Define time periods
//         const now = new Date();
//         const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
//         const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000);
//         const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of today
//         const startOfYesterday = new Date(startOfDay.getTime() - 24 * 60 * 60 * 1000); // Start of yesterday
//         const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

//         // Initialize counters
//         const segregatedOrders = {
//           lastHour: 0,
//           last12Hours: 0,
//           today: 0,
//           yesterday: 0,
//           last6Months: 0,
//         };

//         const segregatedAmounts = {
//           lastHour: 0,
//           last12Hours: 0,
//           today: 0,
//           yesterday: 0,
//           last6Months: 0,
//         };

//         // Process orders for segregation
//         orders.forEach(order => {
//           const orderDate = new Date(order.createdAt);

//           if (orderDate > sixMonthsAgo) {
//             segregatedOrders.last6Months += 1;
//             segregatedAmounts.last6Months += order.totalAmount;
//           }
//           if (orderDate > oneHourAgo) {
//             segregatedOrders.lastHour += 1;
//             segregatedAmounts.lastHour += order.totalAmount;
//           }
//           if (orderDate > twelveHoursAgo) {
//             segregatedOrders.last12Hours += 1;
//             segregatedAmounts.last12Hours += order.totalAmount;
//           }
//           if (orderDate >= startOfDay) {
//             segregatedOrders.today += 1;
//             segregatedAmounts.today += order.totalAmount;
//           }
//           if (orderDate >= startOfYesterday && orderDate < startOfDay) {
//             segregatedOrders.yesterday += 1;
//             segregatedAmounts.yesterday += order.totalAmount;
//           }
//         });

//         // Update state with segregated data
//         setSegregatedOrders(segregatedOrders);
//         setSegregatedAmounts(segregatedAmounts);
//         setTotalUsers(users.length);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

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
//         <div className="stat">
//           <h2>Total Users:</h2>
//           <p>{totalUsers}</p>
//         </div>
//       </div>
//       <div className="segregated-stats">
//         <h2>Order Segregation</h2>
//         <div className="stat">
//           <h3>Last Hour</h3>
//           <p>{segregatedOrders.lastHour} orders, ${segregatedAmounts.lastHour.toFixed(2)}</p>
//         </div>
//         <div className="stat">
//           <h3>Last 12 Hours</h3>
//           <p>{segregatedOrders.last12Hours} orders, ${segregatedAmounts.last12Hours.toFixed(2)}</p>
//         </div>
//         <div className="stat">
//           <h3>Today</h3>
//           <p>{segregatedOrders.today} orders, ${segregatedAmounts.today.toFixed(2)}</p>
//         </div>
//         <div className="stat">
//           <h3>Yesterday</h3>
//           <p>{segregatedOrders.yesterday} orders, ${segregatedAmounts.yesterday.toFixed(2)}</p>
//         </div>
//         <div className="stat">
//           <h3>Last 6 Months</h3>
//           <p>{segregatedOrders.last6Months} orders, ${segregatedAmounts.last6Months.toFixed(2)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
