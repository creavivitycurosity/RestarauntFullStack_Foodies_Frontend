// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const SellerOrders = () => {
//     const { sellerId } = useParams();
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/items/orders/seller/${sellerId}`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setOrders(response.data);
//             } catch (error) {
//                 console.error('Error fetching seller orders:', error);
//             }
//         };

//         fetchOrders();
//     }, [sellerId]);

//     return (
//         <div>
//             <h1>Orders for Seller {sellerId}</h1>
//             {orders.length === 0 ? (
//                 <p>No orders found for this seller.</p>
//             ) : (
//                 <ul>
//                     {orders.map(orderItem => (
//                         <li key={orderItem.id}>
//                             <p>Item Name: {orderItem.name}</p>
//                             <p>Quantity: {orderItem.quantity}</p>
//                             <p>Price: ₹{orderItem.price}</p>
//                             <p>Order ID: {orderItem.order.id}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default SellerOrders;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [sellerEmail, setSellerEmail] = useState('');
    let email = null;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        email = decodedToken.sub;
        setSellerEmail(jwtDecode(token).sub);
        console.log(sellerEmail)
        axios.get(`${BASE_URL}/orders/orders/seller/${email}`,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
           .then(response => {
                setOrders(response.data);
                console.log(response.data)
            })
           .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>
            <h1>Seller Orders for items of {sellerEmail}</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h2>Order {order.id}</h2>
                        <p>Created at: {order.createdAt}</p>
                        <p>Status: {order.status}</p>
                        <p>Total amount: {order.totalAmount}</p>
                        <ul>
                            {order.orderItems.map(orderItem => (
                                <li key={orderItem.id}>
                                    <h3>Order item {orderItem.id}</h3>
                                    <p>Name: {orderItem.name}</p>
                                    <p>Price: {orderItem.price}</p>
                                    <p>Quantity: {orderItem.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerOrders;