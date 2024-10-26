// import React, { useState } from 'react';
// import axios from 'axios';

// const UserOrderSearch = () => {
//     const [email, setEmail] = useState('');
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState('');

//     const handleSearch = () => {
//         axios.get(`http://localhost:8080/api/users/orders/${email}`, {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           })
//         .then(response => {
//             setOrders(response.data);
//             setError('');
//         })
//         .catch(error => {
//             setError('Error fetching orders');
//             console.error('Error fetching orders:', error);
//         });
//     };

//     return (
//         <div>
//             <h1>Search Orders</h1>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter user email"
//             />
//             <button onClick={handleSearch}>Search</button>

//             {error && <p>{error}</p>}
//             {orders.length > 0 && (
//                 <div>
//                     <h2>Orders</h2>
//                     <ul>
//                         {orders.map(order => (
//                             <li key={order.id}>
//                                 <h3>Order ID: {order.id}</h3>
//                                 <p>Total Amount: ${order.totalAmount}</p>
//                                 <p>Status: {order.status}</p>
//                                 <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
//                                 <h4>Items:</h4>
//                                 <ul>
//                                     {order.orderItems.map(item => (
//                                         <li key={item.id}>
//                                             <p>Item Name: {item.name}</p>
//                                             <p>Price: ${item.price}</p>
//                                             <p>Quantity: {item.quantity}</p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserOrderSearch;


// import React, { useState } from 'react';  //working
// import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const UserOrderSearch = () => {
//     const [email, setEmail] = useState('');
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState('');

//     const handleSearch = () => {
//         axios.get(`${BASE_URL}/api/users/orders/${email}`, {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         .then(response => {
//             // Sort orders in descending order based on order ID
//             const sortedOrders = response.data.sort((a, b) => b.id - a.id);
//             setOrders(sortedOrders);
//             setError('');
//         })
//         .catch(error => {
//             setError('Error fetching orders');
//             console.error('Error fetching orders:', error);
//         });
//     };

//     return (
//         <div>
//             <h1>Search Orders</h1>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter user email"
//             />
//             <button onClick={handleSearch}>Search</button>

//             {error && <p className="error">{error}</p>}
//             {orders.length > 0 && (
//                 <div>
//                     <h2>Orders</h2>
//                     <table className="orders-table">
//                         <thead>
//                             <tr>
//                                 <th>Order ID</th>
//                                 <th>Total Amount</th>
//                                 <th>Status</th>
//                                 <th>Created At</th>
//                                 <th>Item name</th>
//                                 <th>Item price</th>
//                                 <th>Item quantity</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map(order => (
//                                 <tr key={order.id}>
//                                     <td>{order.id}</td>
//                                     <td>${order.totalAmount}</td>
//                                     <td>{order.status}</td>
//                                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                                     <td>
//                                         <ul>
//                                             {order.orderItems.map(item => (
//                                                 <li key={item.id}>
//                                                     <p>Item Name: {item.name}</p>
                                                  
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </td>
//                                     <td>
//                                         <ul>
//                                             {order.orderItems.map(item => (
//                                                 <li key={item.id}>
//                                                     <p>Price: ${item.price}</p>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </td>
//                                     <td>
//                                         <ul>
//                                             {order.orderItems.map(item => (
//                                                 <li key={item.id}>
                                                    
//                                                     <p>Quantity: {item.quantity}</p>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserOrderSearch;

import React, { useState } from 'react';
import axios from 'axios';
import UserNames from './UserNames';
import './UserOrderSearch.css'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserOrderSearch = () => {
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 4;
    const [loading, setLoading] = useState(false); // Step 1: Add loading state

    // Pagination Logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearch = () => {
        setLoading(true); // Step 2: Set loading to true

        axios.get(`${BASE_URL}/api/users/orders/${email}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            // Sort orders in descending order based on order ID
            const sortedOrders = response.data.sort((a, b) => b.id - a.id);
            setLoading(false); // Step 3: Set loading to false after the request completes

            setOrders(sortedOrders);
            setError('');
        })
        .catch(error => {
            setLoading(false); // Step 3: Set loading to false after the request completes

            setError('Error fetching orders');
            console.error('Error fetching orders:', error);
        });
    };

    const handleClear = () => {
        setEmail('');
        setOrders([]);
        setError('');
    };

    return (
        <div className="order-search-container">
           <div id="search-orders-container">
            <h1 id="search-orders-title">Search Orders</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                id="search-input"
            />
            <div id="search-buttons">
                <button onClick={handleSearch} id="search-btn">Search</button>
                <button onClick={handleClear} id="clear-btn">Clear Data</button>
            </div>
        </div>
            {/* UserNames Component */}
            <UserNames />

            {/* Error Handling */}
            {error && <p className="error">{error}</p>}

            {/* Loader message */}
            {loading &&
           <div className="loader-container">
           <div className="loader"></div>
           <h3> &nbsp; Loading users orders...</h3>
       </div>
             } 


            {/* Display Orders */}
            {currentOrders.length > 0 && !loading && (
                <div>
                    <h2>Orders</h2>
                    <div className="orders-list">
                        {currentOrders.map(order => (
                            <div className="order-card" key={order.id}>
                                <h3>Order ID: {order.id}</h3>
                                <p><b>Total Amount:</b> ${order.totalAmount}</p><br/>
                                <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p><br/>

                                <div className="order-items">
                                    {order.orderItems.map(item => (
                                        <div className="order-item" key={item.id}>
                                            <p><b>Item Name:</b> {item.name}</p><br/>
                                            <p><b>Price:</b> ${item.price}</p><br/>
                                            <p><b>Quantity:</b> {item.quantity}</p><br/>
                                            <p><b>Status:</b> {item.status}</p>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination for Orders */}
                    <Pagination
                        itemsPerPage={ordersPerPage}
                        totalItems={orders.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li key={number} className={currentPage === number ? 'active' : ''}>
                    <button onClick={() => paginate(number)}>
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default UserOrderSearch;