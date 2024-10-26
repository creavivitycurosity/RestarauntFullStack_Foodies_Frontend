
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SellerOrderStatus.css';
import { parse } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerOrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedTime, setSelectedTime] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const sellerEmail = jwtDecode(localStorage.getItem('token')).sub;

    const ordersPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);  // 🆕 Show loader when fetching starts

        axios.get(`${BASE_URL}/orders/orders/seller/${sellerEmail}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => {
                const orders = response.data;
                console.log('Raw Orders Data:', orders); // Log raw orders

                orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setIsLoading(false);  // 🆕 Hide loader when fetching is done

                setOrders(orders);
                setFilteredOrders(orders);
            })
            .catch(error => {
                setIsLoading(false);  // 🆕 Hide loader when fetching is done
                console.error(error);
            });
    }, []);

    const filterOrders = (status, time, query) => {
        let filtered = orders;
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
        navigate(`/seller/SellerUpdateOrderStatus/${orderId2}/${status}`);
    };

    const handleUpdateItemStatus = (orderId3, status3, orderId4) => {
        navigate(`/seller/UpdateOrderItemStatus/${orderId3}/${status3}/${orderId4}`);
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



    const trackRefund = (itemId) => {
        navigate(`/seller/seller-RefundProgress/${itemId}`); // Redirect to view review page
      };
    


    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(true);  // Toggle for Status Filter
    const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(true);  // Toggle for Time Filter
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);  // Toggle for Date Filter

    // Toggles for filter sections
    const toggleStatusFilter = () => setIsStatusFilterOpen(!isStatusFilterOpen);
    const toggleTimeFilter = () => setIsTimeFilterOpen(!isTimeFilterOpen);
    const toggleDateFilter = () => setIsDateFilterOpen(!isDateFilterOpen);

    return (
        <div className="order-status-segregation">

            {/* Filters Container */}
            <div className="filters-container">
                {/* Search Bar */}
                <div className="search-bar">
                    <h2>Search Here :</h2>
                    <input
                        type="text"
                        placeholder="Search by Order ID"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {/* Filter by Status */}
                <div className={`filter-section3 ${isStatusFilterOpen ? 'active' : ''}`}>
                    <h2 onClick={toggleStatusFilter}>Filter by Status</h2>
                    {isStatusFilterOpen && (
                        <>
                            <button className={selectedStatus === 'all' ? 'active' : ''} onClick={() => handleStatusFilter('all')}>All</button>
                            <button className={selectedStatus === 'pending' ? 'active' : ''} onClick={() => handleStatusFilter('pending')}>Pending</button>
                            <button className={selectedStatus === 'order accepted' ? 'active' : ''} onClick={() => handleStatusFilter('order accepted')}>order accepted</button>
                            <button className={selectedStatus === 'cooking' ? 'active' : ''} onClick={() => handleStatusFilter('cooking')}>cooking</button>
                            <button className={selectedStatus === 'ready for pickup' ? 'active' : ''} onClick={() => handleStatusFilter('ready for pickup')}>ready for pickup</button>
                            <button className={selectedStatus === 'delivered' ? 'active' : ''} onClick={() => handleStatusFilter('delivered')}>Delivered</button>
                            <button className={selectedStatus === 'cancelled' ? 'active' : ''} onClick={() => handleStatusFilter('cancelled')}>Cancelled</button>
                        </>
                    )}
                </div>

                {/* Filter by Time */}
                <div className={`filter-section2 ${isTimeFilterOpen ? 'active' : ''}`}>
                    <h2 onClick={toggleTimeFilter}> Filter by Time</h2>
                    {isTimeFilterOpen && (
                        <>
                            <button className={selectedTime === 'all' ? 'active' : ''} onClick={() => handleTimeFilter('all')}>All Time</button>
                            {/* <button className={selectedTime === 'lastHour' ? 'active' : ''} onClick={() => handleTimeFilter('lastHour')}>Last Hour</button> */}
                            <button className={selectedTime === 'last12Hours' ? 'active' : ''} onClick={() => handleTimeFilter('last12Hours')}>Last 12 Hours</button>
                            <button className={selectedTime === 'today' ? 'active' : ''} onClick={() => handleTimeFilter('today')}>Today</button>
                            <button className={selectedTime === 'lastWeek' ? 'active' : ''} onClick={() => handleTimeFilter('lastWeek')}>Last Week</button>
                            <button className={selectedTime === 'last6Months' ? 'active' : ''} onClick={() => handleTimeFilter('last6Months')}>Last 6 Months</button>
                        </>
                    )}
                </div>

                {/* Filter by Date Range */}
                <div className="filter-section-custom">
                    <h2>Filter by Date Range</h2>
                    <label>STARTING DATE : </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                    />
                    <br />
                    <label>ENDING DATE &nbsp; &nbsp;&nbsp;: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                    /> &nbsp;
                    <button onClick={() => filterOrders(selectedStatus, selectedTime, searchQuery, startDate, endDate)}>
                        Apply Date Range
                    </button>
                    <button className="clear-dates-button" onClick={handleClearDates}>
                        Clear Dates
                    </button>
                </div>
            </div>

            {/* Order List Container */}
            <div className="order-list-container">


                {isLoading ? (   // 🆕 Display loader while loading
                    <div className="loader-container">
                        <div className="loader"></div>
                        <h3> &nbsp; Loading orders...</h3>
                    </div>
                ) : (
                    currentOrders.length > 0 ? (
                        <ul className="order-list">
                            {currentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(order => (
                                <li key={order.id}>
                                    <h2>Order {order.id}</h2>
                                    <p><b>Placed by:</b> {order.userEmail}</p>
                                    <p><b>Placed on:</b> {new Date(order.createdAt).toLocaleString()}</p>

                                    {/* Display the order address using AddressDTO */}
                                    {order.orderAddress && (
                                        <div>
                                            <p><b>Delivery Address:</b></p>
                                            <p>
                                                {order.orderAddress.street}, {order.orderAddress.city}, {order.orderAddress.state}, {order.orderAddress.country} - {order.orderAddress.pincode}
                                            </p>
                                            <p><b>Nearby Location:</b> {order.orderAddress.nearbyLocation}</p>
                                            <p><b>Area:</b> {order.orderAddress.area}</p>
                                        </div>
                                    )}
                                    <h3><b>Order Items:</b></h3>
                                    <ul className="order-items">
                                        {order.orderItems && order.orderItems.map(orderItem => (
                                            <li key={orderItem.id}>
                                                <span>
                                                    <b>Item:</b> {orderItem.name}
                                                    <br />
                                                    (Quantity: {orderItem.quantity})
                                                    <br />
                                                    (Status: {orderItem.status})
                                                </span>
                                                {/* <button
                                                    onClick={() => handleUpdateItemStatus(orderItem.id, orderItem.status, order.id)}
                                                    style={{ backgroundColor: orderItem.status === 'cancelled' ? 'red' : 'skyblue' }}
                                                >
                                                    {orderItem.status === 'cancelled' ? 'Initiate Refund' : 'Update Item Status'}
                                                </button> */}
                                                {
                                                    orderItem.status === 'cancelled by user' ? (
                                                        // Render "Update Refund" button when status is "cancelled by user"
                                                        <button
                                                            style={{ backgroundColor: '#007bff', color: 'whitesmoke' }}
                                                            onClick={() => trackRefund(orderItem.itemId)}
                                                        >
                                                            Update Refund
                                                        </button>
                                                    ) : (
                                                        // Render "Update Status" button for all other statuses
                                                        <button
                                                        onClick={() => handleUpdateItemStatus(orderItem.id, orderItem.status, order.id)}
                                                        style={{ backgroundColor: orderItem.status === 'cancelled' ? 'red' : 'skyblue' }}
                                                    >
                                                        {orderItem.status === 'cancelled' ? 'Initiate Refund' : 'Update Item Status'}
                                                    </button>
                                                    )
                                                }

                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-orders">No orders found</p>
                    )
                )}

                {/* Pagination */}
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

export default SellerOrderStatus;


