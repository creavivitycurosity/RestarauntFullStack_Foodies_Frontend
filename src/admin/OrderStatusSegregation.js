
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OrderStatusSegregation.css';
import { parse } from 'date-fns';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OrderStatusSegregation = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedTime, setSelectedTime] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const ordersPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        setIsLoading(true);  // 🆕 Show loader when fetching starts

        axios.get(`${BASE_URL}/orders/allOrders`, { headers })
            .then(response => {
                const orders = response.data;
                console.log('Raw Orders Data:', orders); // Log raw orders

                orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setIsLoading(false);  // 🆕 Hide loader when fetching is done

                setOrders(orders);
                setFilteredOrders(orders);
                console.log(orders)
            })
            .catch(error => {
                setIsLoading(false);  // 🆕 Hide loader when fetching is done

                console.error(error);
            });
    }, []);

    const filterOrders = (status, time, query) => {
        let filtered = orders;

        // if (status !== 'all') {
        //     filtered = filtered.filter(order => order.status === status);
        // }
        if (status !== 'all') {
            filtered = filtered.filter(order => {
                return order.orderItems.some(orderItem => orderItem.status === status);
            });
        }
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const now = new Date();
        if (time === 'lastHour') {
            filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 60 * 60 * 1000));
        } else if (time === 'last12Hours') {
            filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 12 * 60 * 60 * 1000));
        } else if (time === 'today') {
            const startOfDay = new Date(now.setHours(0, 0, 0, 0));
            filtered = filtered.filter(order => new Date(order.createdAt) >= startOfDay);
        } else if (time === 'yesterday') {
            const startOfToday = new Date(now.setHours(0, 0, 0, 0));
            const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
            filtered = filtered.filter(order => new Date(order.createdAt) >= startOfYesterday && new Date(order.createdAt) < startOfToday);
        } else if (time === 'lastWeek') {
            const currentDate = new Date();
            const startOfLastWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
            const endOfLastWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

            filtered = filtered.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= startOfLastWeek && orderDate <= endOfLastWeek;
            });
            console.log(startOfLastWeek);
            console.log(endOfLastWeek)
            console.log(filtered);
        } else if (time === 'last6Months') {
            filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.setMonth(now.getMonth() - 6)));
        }


        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            console.log(start);
            console.log(end)
            end.setHours(23, 59, 59); // Include the end of the endDate day
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= start && orderDate <= end;
            });
            console.log(filtered);

        }


        if (query) {
            filtered = filtered.filter(order => order.id.toString() === query);
            // filtered = filtered.filter(order => new RegExp(`\\b${query}\\b`).test(order.id.toString()));
            // filtered = filtered.filter(order => order.id.toString() === query);    
        }

        setFilteredOrders(filtered);
        setCurrentPage(1);
    };



    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        filterOrders(status, selectedTime);
    };

    const handleTimeFilter = (time) => {
        setSelectedTime(time);
        filterOrders(selectedStatus, time);
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        filterOrders(selectedStatus, selectedTime, e.target.value);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUpdateStatus = (orderId2, status) => {
        navigate(`/admin/UpdateOrderStatus/${orderId2}/${status}`);
    };

    const handleClearDates = () => {
        setStartDate('');
        setEndDate('');
        filterOrders(selectedStatus, selectedTime, searchQuery, '', '');
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div className="order-status-segregation">
            <div className="filters-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Order ID"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="filter-section3">
                    <h2>Filter by Status</h2>
                    <button className={selectedStatus === 'all' ? 'active' : ''} onClick={() => handleStatusFilter('all')}>All</button>
                    <button className={selectedStatus === 'pending' ? 'active' : ''} onClick={() => handleStatusFilter('pending')}>Pending</button>
                    <button className={selectedStatus === 'order accepted' ? 'active' : ''} onClick={() => handleStatusFilter('order accepted')}>order accepted</button>
                    <button className={selectedStatus === 'cooking' ? 'active' : ''} onClick={() => handleStatusFilter('cooking')}>cooking</button>
                    <button className={selectedStatus === 'ready for pickup' ? 'active' : ''} onClick={() => handleStatusFilter('ready for pickup')}>ready for pickup</button>
                    <button className={selectedStatus === 'delivered' ? 'active' : ''} onClick={() => handleStatusFilter('delivered')}>Delivered</button>
                    <button className={selectedStatus === 'cancelled' ? 'active' : ''} onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
                </div>
                <div className="filter-section2">
                    <h2>Filter by Time</h2>
                    <button className={selectedTime === 'all' ? 'active' : ''} onClick={() => handleTimeFilter('all')}>All Time</button>
                    {/* <button className={selectedTime === 'lastHour' ? 'active' : ''} onClick={() => handleTimeFilter('lastHour')}>Last Hour</button> */}
                    <button className={selectedTime === 'last12Hours' ? 'active' : ''} onClick={() => handleTimeFilter('last12Hours')}>Last 12 Hours</button>
                    <button className={selectedTime === 'today' ? 'active' : ''} onClick={() => handleTimeFilter('today')}>Today</button>
                    <button className={selectedTime === 'lastWeek' ? 'active' : ''} onClick={() => handleTimeFilter('lastWeek')}>last week</button>
                    <button className={selectedTime === 'last6Months' ? 'active' : ''} onClick={() => handleTimeFilter('last6Months')}>Last 6 Months</button>
                </div>
            </div>

            <div className="order-list-container">
                <div className="filter-section-custom">
                    <h2>Filter by Date Range</h2>
                    <label>STARTING DATE : </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                    /> &nbsp; &nbsp; &nbsp;
                    <label>ENDING DATE : </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                    /> &nbsp; &nbsp;
                    <button onClick={() => filterOrders(selectedStatus, selectedTime, searchQuery, startDate, endDate)}>
                        Apply Date Range
                    </button>
                    <button className="clear-dates-button" onClick={handleClearDates}>
                        Clear Dates
                    </button>
                </div>


                {isLoading ? (   // 🆕 Display loader while loading
                    <div className="loader-container">
                        <div className="loader"></div>
                        <h3> &nbsp; Loading orders...</h3>
                    </div>
                ) : (

                    currentOrders.length > 0 ? (
                        <ul className="order-list">
                            {currentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
                                <li key={order.id} className='lis'>
                                    <span>
                                        <h2>Order {order.id}</h2>
                                    </span>
                                    <br />
                                    <span>
                                        {/* <p><b>Placed by:</b> &nbsp; {order.user.email}</p><br /> */}
                                        <p><b>Placed on:</b> &nbsp; {new Date(order.createdAt).toLocaleString()}</p><br />
                                        {/* <p><b>Status:</b> &nbsp; {order.status}</p> */}
                                    </span>
                                    <span>
                                        <h3><b>Order Items:</b></h3>
                                        <ul className="order-items">
                                            {order.orderItems && order.orderItems.map(orderItem => (
                                                <li key={orderItem.id}>
                                                    <span><b>Item:</b> {orderItem.name}</span>
                                                    <h4>Quantity: {orderItem.quantity}</h4>
                                                    <h4>status: {orderItem.status}</h4>
                                                    {orderItem.item && (
                                                        <h4>order recieved by: {orderItem.item.restaurantName}</h4>
                                                    )}                                                </li>
                                            ))}
                                        </ul>
                                    </span>
                                    {/* <button style={{ backgroundColor: "skyblue",padding:"20px 40px" }} onClick={() => handleUpdateStatus(order.id, order.status)}>Update Status</button> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-orders">No orders found</p>
                    )
                )}



                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default OrderStatusSegregation;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './OrderStatusSegregation.css';

// const OrderStatusSegregation = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState('all');
//     const [selectedTime, setSelectedTime] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 5;
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/orders/allOrders', { headers })
//             .then(response => {
//                 const orders = response.data;
//                 orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 setOrders(orders);
//                 setFilteredOrders(orders);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     const filterOrders = (status, time) => {
//         let filtered = orders;

//         if (status !== 'all') {
//             filtered = filtered.filter(order => order.status === status);
//         }
//         filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         const now = new Date();
//         if (time === 'lastHour') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 60 * 60 * 1000));
//         } else if (time === 'last12Hours') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 12 * 60 * 60 * 1000));
//         } else if (time === 'today') {
//             const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//             filtered = filtered.filter(order => new Date(order.createdAt) >= startOfDay);
//         } else if (time === 'yesterday') {
//             const startOfToday = new Date(now.setHours(0, 0, 0, 0));
//             const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
//             filtered = filtered.filter(order => new Date(order.createdAt) >= startOfYesterday && new Date(order.createdAt) < startOfToday);
//         } else if (time === 'last6Months') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.setMonth(now.getMonth() - 6)));
//         }

//         setFilteredOrders(filtered);
//         setCurrentPage(1);

//     };

//     const handleStatusFilter = (status) => {
//         setSelectedStatus(status);
//         filterOrders(status, selectedTime);
//     };

//     const handleTimeFilter = (time) => {
//         setSelectedTime(time);
//         filterOrders(selectedStatus, time);
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const indexOfLastOrder = currentPage * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//     const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//     const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//     return (
//         <div className="order-status-segregation ">
//             <div className="filters-container">
//             <div className="filter-section3">
//                 <h2>Filter by Status</h2>
//                 <button className={selectedStatus === 'all' ? 'active' : ''} onClick={() => handleStatusFilter('all')}>All</button>
//                 <button className={selectedStatus === 'pending' ? 'active' : ''} onClick={() => handleStatusFilter('pending')}>Pending</button>
//                 <button className={selectedStatus === 'shipped' ? 'active' : ''} onClick={() => handleStatusFilter('shipped')}>Shipped</button>
//                 <button className={selectedStatus === 'delivered' ? 'active' : ''} onClick={() => handleStatusFilter('delivered')}>Delivered</button>
//                 <button className={selectedStatus === 'cancelled' ? 'active' : ''} onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
//             </div>
//             <div className="filter-section2">
//                 <h2>Filter by Time</h2>
//                 <button className={selectedTime === 'all' ? 'active' : ''} onClick={() => handleTimeFilter('all')}>All Time</button>
//                 <button className={selectedTime === 'lastHour' ? 'active' : ''} onClick={() => handleTimeFilter('lastHour')}>Last Hour</button>
//                 <button className={selectedTime === 'last12Hours' ? 'active' : ''} onClick={() => handleTimeFilter('last12Hours')}>Last 12 Hours</button>
//                 <button className={selectedTime === 'today' ? 'active' : ''} onClick={() => handleTimeFilter('today')}>Today</button>
//                 <button className={selectedTime === 'yesterday' ? 'active' : ''} onClick={() => handleTimeFilter('yesterday')}>Yesterday</button>
//                 <button className={selectedTime === 'last6Months' ? 'active' : ''} onClick={() => handleTimeFilter('last6Months')}>Last 6 Months</button>
//             </div>
//             </div>
//             <div className="order-list-container">
//             {currentOrders.length > 0 ? (
//             <ul className="order-list">
//                 {currentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
//                     <li key={order.id} className='lis'>
//                       <span> <h2>Order {order.id}</h2></span> <br></br>
//                       <span> 
//                         <p><b>Placed by:</b> &nbsp; {order.user.email}</p><br></br>
//                         <p><b>Placed by:</b> &nbsp; {new Date(order.createdAt).toLocaleString()}</p><br></br>
//                         <p><b>Status:</b> &nbsp; {order.status}</p>
//                         </span>
//                         <span> 
//                             <h3><b>Order Items:</b></h3>
//                         <ul className="order-items">
//                             {order.orderItems && order.orderItems.map(orderItem => (
//                                 <li key={orderItem.id}>
//                                     <span><b>Item:</b> {orderItem.name} (Quantity: {orderItem.quantity})</span>
//                                 </li>
//                             ))}
//                         </ul>
//                         </span>
//                     </li>
//                 ))}
//             </ul>
//             ) : (
//                     <p className="no-orders">No orders found</p>
//                 )}
//             <div className="pagination">
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button
//                         key={index + 1}
//                         className={currentPage === index + 1 ? 'active' : ''}
//                         onClick={() => handlePageChange(index + 1)}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//         </div>

//     );
// };

// export default OrderStatusSegregation;


































































































































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderStatusSegregation = () => {
//   const [orders, setOrders] = useState([]);
//   const [pendingOrders, setPendingOrders] = useState([]);
//   const [shippedOrders, setShippedOrders] = useState([]);
//   const [deliveredOrders, setDeliveredOrders] = useState([]);
//   const [cancelledOrders, setCancelledOrders] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const headers = {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     };
//     axios.get('http://localhost:8080/orders/allOrders', { headers })
//       .then(response => {
//         const orders = response.data;
//         setOrders(orders);
//         const pending = orders.filter(order => order.status === 'pending');
//         setPendingOrders(pending);
//         const shipped = orders.filter(order => order.status === 'shipped');
//         setShippedOrders(shipped);
//         const delivered = orders.filter(order => order.status === 'delivered');
//         setDeliveredOrders(delivered);
//         const cancelled = orders.filter(order => order.status === 'cancelled');
//         setCancelledOrders(cancelled);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Order Status Segregation</h1>
//       <h2>Pending Orders</h2>
//       <ul>
//         {pendingOrders.map(order => (
//           <li key={order.id}>{order.id} - {order.user.email}</li>
//         ))}
//       </ul>
//       <h2>Shipped Orders</h2>
//       <ul>
//         {shippedOrders.map(order => (
//           <li key={order.id}>{order.id} - {order.user.email}</li>
//         ))}
//       </ul>
//       <h2>Delivered Orders</h2>
//       <ul>
//         {deliveredOrders.map(order => (
//           <li key={order.id}>{order.id} - {order.user.email}</li>
//         ))}
//       </ul>
//       <h2>Cancelled Orders</h2>
//       <ul>
//         {cancelledOrders.map(order => (
//           <li key={order.id}>{order.id} - {order.user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrderStatusSegregation;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderStatusSegregation = () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/orders/allOrders', { headers })
//             .then(response => {
//                 const orders = response.data;
//                 setOrders(orders);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>All Orders</h1>
//             <ul>
//                 {orders.length > 0 && orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
//                     <li key={order.id}>
//                         <h2>Order {order.id}</h2>
//                         <p>Placed by: {order.user.email}</p>
//                         <p>Order Date: {order.createdAt}</p>
//                         <h3>Order Items:</h3>
//                         <ul>
//                             {order.orderItems && order.orderItems.map(orderItem => (
//                                 <li key={orderItem.id}>
//                                     <p>Item: {orderItem.name} (Quantity: {orderItem.quantity})</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderStatusSegregation;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderStatusSegregation = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState('all');

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/orders/allOrders', { headers })
//             .then(response => {
//                 const orders = response.data;
//                 setOrders(orders);
//                 setFilteredOrders(orders);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     const handleStatusFilter = (status) => {
//         setSelectedStatus(status);
//         if (status === 'all') {
//             setFilteredOrders(orders);
//         } else {
//             setFilteredOrders(orders.filter(order => order.status === status));
//         }
//     };

//     return (
//         <div>
//             <h1>All Orders</h1>
//             <div>
//                 <button onClick={() => handleStatusFilter('all')}>All</button>
//                 <button onClick={() => handleStatusFilter('pending')}>Pending</button>
//                 <button onClick={() => handleStatusFilter('shipped')}>Shipped</button>
//                 <button onClick={() => handleStatusFilter('delivered')}>Delivered</button>
//                 <button onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
//             </div>
//             <ul>
//                 {filteredOrders.length > 0 && filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
//                     <li key={order.id}>
//                         <h2>Order {order.id}</h2>
//                         <p>Placed by: {order.user.email}</p>
//                         <p>Order Date: {order.createdAt}</p>
//                         <p>Status: {order.status}</p>
//                         <h3>Order Items:</h3>
//                         <ul>
//                             {order.orderItems && order.orderItems.map(orderItem => (
//                                 <li key={orderItem.id}>
//                                     <p>Item: {orderItem.name} (Quantity: {orderItem.quantity})</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderStatusSegregation;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import dayjs from 'dayjs';

// const OrderStatusSegregation = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState('all');
//     const [selectedTime, setSelectedTime] = useState('all');

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/orders/allOrders', { headers })
//             .then(response => {
//                 const orders = response.data;
//                 setOrders(orders);
//                 setFilteredOrders(orders);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     const filterOrders = (status, time) => {
//         let filtered = orders;

//         if (status !== 'all') {
//             filtered = filtered.filter(order => order.status === status);
//         }

//         const now = dayjs();
//         if (time === 'lastHour') {
//             filtered = filtered.filter(order => dayjs(order.createdAt).isAfter(now.subtract(1, 'hour')));
//         } else if (time === 'last12Hours') {
//             filtered = filtered.filter(order => dayjs(order.createdAt).isAfter(now.subtract(12, 'hour')));
//         } else if (time === 'today') {
//             filtered = filtered.filter(order => dayjs(order.createdAt).isAfter(now.startOf('day')));
//         } else if (time === 'yesterday') {
//             filtered = filtered.filter(order => dayjs(order.createdAt).isBetween(now.subtract(1, 'day').startOf('day'), now.startOf('day')));
//         } else if (time === 'last6Months') {
//             filtered = filtered.filter(order => dayjs(order.createdAt).isAfter(now.subtract(6, 'month')));
//         }

//         setFilteredOrders(filtered);
//     };

//     const handleStatusFilter = (status) => {
//         setSelectedStatus(status);
//         filterOrders(status, selectedTime);
//     };

//     const handleTimeFilter = (time) => {
//         setSelectedTime(time);
//         filterOrders(selectedStatus, time);
//     };

//     return (
//         <div>
//             <h1>All Orders</h1>
//             <div>
//                 <h2>Filter by Status</h2>
//                 <button onClick={() => handleStatusFilter('all')}>All</button>
//                 <button onClick={() => handleStatusFilter('pending')}>Pending</button>
//                 <button onClick={() => handleStatusFilter('shipped')}>Shipped</button>
//                 <button onClick={() => handleStatusFilter('delivered')}>Delivered</button>
//                 <button onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
//             </div>
//             <div>
//                 <h2>Filter by Time</h2>
//                 <button onClick={() => handleTimeFilter('all')}>All Time</button>
//                 <button onClick={() => handleTimeFilter('lastHour')}>Last Hour</button>
//                 <button onClick={() => handleTimeFilter('last12Hours')}>Last 12 Hours</button>
//                 <button onClick={() => handleTimeFilter('today')}>Today</button>
//                 {/* <button onClick={() => handleTimeFilter('yesterday')}>Yesterday</button>
//                 <button onClick={() => handleTimeFilter('last6Months')}>Last 6 Months</button> */}
//             </div>
//             <ul>
//                 {filteredOrders.length > 0 && filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
//                     <li key={order.id}>
//                         <h2>Order {order.id}</h2>
//                         <p>Placed by: {order.user.email}</p>
//                         <p>Order Date: {order.createdAt}</p>
//                         <p>Status: {order.status}</p>
//                         <h3>Order Items:</h3>
//                         <ul>
//                             {order.orderItems && order.orderItems.map(orderItem => (
//                                 <li key={orderItem.id}>
//                                     <p>Item: {orderItem.name} (Quantity: {orderItem.quantity})</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderStatusSegregation;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderStatusSegregation = () => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState('all');
//     const [selectedTime, setSelectedTime] = useState('all');

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/orders/allOrders', { headers })
//             .then(response => {
//                 const orders = response.data;
//                 setOrders(orders);
//                 setFilteredOrders(orders);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     const filterOrders = (status, time) => {
//         let filtered = orders;

//         if (status !== 'all') {
//             filtered = filtered.filter(order => order.status === status);
//         }

//         const now = new Date();
//         if (time === 'lastHour') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 60 * 60 * 1000));
//         } else if (time === 'last12Hours') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.getTime() - 12 * 60 * 60 * 1000));
//         } else if (time === 'today') {
//             const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//             filtered = filtered.filter(order => new Date(order.createdAt) >= startOfDay);
//         } else if (time === 'yesterday') {
//             const startOfToday = new Date(now.setHours(0, 0, 0, 0));
//             const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
//             filtered = filtered.filter(order => new Date(order.createdAt) >= startOfYesterday && new Date(order.createdAt) < startOfToday);
//         } else if (time === 'last6Months') {
//             filtered = filtered.filter(order => new Date(order.createdAt) > new Date(now.setMonth(now.getMonth() - 6)));
//         }

//         setFilteredOrders(filtered);
//     };

//     const handleStatusFilter = (status) => {
//         setSelectedStatus(status);
//         filterOrders(status, selectedTime);
//     };

//     const handleTimeFilter = (time) => {
//         setSelectedTime(time);
//         filterOrders(selectedStatus, time);
//     };

//     return (
//         <div>
//             <h1>All Orders</h1>
//             <div>
//                 <h2>Filter by Status</h2>
//                 <button onClick={() => handleStatusFilter('all')}>All</button>
//                 <button onClick={() => handleStatusFilter('pending')}>Pending</button>
//                 <button onClick={() => handleStatusFilter('shipped')}>Shipped</button>
//                 <button onClick={() => handleStatusFilter('delivered')}>Delivered</button>
//                 <button onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
//             </div>
//             <div>
//                 <h2>Filter by Time</h2>
//                 <button onClick={() => handleTimeFilter('all')}>All Time</button>
//                 <button onClick={() => handleTimeFilter('lastHour')}>Last Hour</button>
//                 <button onClick={() => handleTimeFilter('last12Hours')}>Last 12 Hours</button>
//                 <button onClick={() => handleTimeFilter('today')}>Today</button>
//                 <button onClick={() => handleTimeFilter('yesterday')}>Yesterday</button>
//                 <button onClick={() => handleTimeFilter('last6Months')}>Last 6 Months</button>
//             </div>
//             <ul>
//                 {filteredOrders.length > 0 && filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
//                     <li key={order.id}>
//                         <h2>Order {order.id}</h2>
//                         <p>Placed by: {order.user.email}</p>
//                         <p>Order Date: {order.createdAt}</p>
//                         <p>Status: {order.status}</p>
//                         <h3>Order Items:</h3>
//                         <ul>
//                             {order.orderItems && order.orderItems.map(orderItem => (
//                                 <li key={orderItem.id}>
//                                     <p>Item: {orderItem.name} (Quantity: {orderItem.quantity})</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default OrderStatusSegregation;



{/* <ul>
  {orders.length > 0 && orders.map(order => (
    console.log(order), 
    <li key={order.id}>
      <h2>Order {order.id}</h2>
      <p>Placed by: {order.user.email}</p>
      <p>Order Date: {order.createdAt}</p>
      <h3>Order Items:</h3>
      <ul>
        {order.items && order.items.map(item => (
          console.log(item),
          <li key={item.id}>
            <p>Item: {item.product.name} (Quantity: {item.quantity})</p>
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul> */}