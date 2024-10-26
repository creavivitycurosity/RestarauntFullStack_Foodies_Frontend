import React, { useEffect, useState } from 'react';
import styles from './SellersSummary.module.css'; // Assuming your CSS module is named this
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellersSummary = () => {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        const fetchSellersSummary = async () => {
            const response = await fetch(`${BASE_URL}/orders/orders/sellersSummary`); // Adjust the URL as necessary
            const data = await response.json();
            setSellers(data);
        };

        fetchSellersSummary();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Sellers Summary</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Seller Name</th>
                        <th>Restaurant Name</th>
                        <th>Total Income</th>
                        <th>Total Orders</th>
                        <th>Monthly Income</th>
                        <th>Monthly Orders</th>
                    </tr>
                </thead>
                <tbody>
                    {sellers.map((seller) => (
                        <tr key={seller.sellerName}>
                            <td>{seller.sellerName}</td>
                            <td>{seller.restaurantName}</td>
                            <td>{seller.totalIncome.toFixed(2)}</td>
                            <td>{seller.totalOrders}</td>
                            <td>{seller.monthlyIncome.toFixed(2)}</td>
                            <td>{seller.monthlyOrders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellersSummary;
