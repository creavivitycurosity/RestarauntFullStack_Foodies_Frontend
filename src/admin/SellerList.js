import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SellerList.module.css';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerList = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 3;

    useEffect(() => {
        axios.get(`${BASE_URL}/orders/admin/sellers`)
            .then(response => {
                setSellers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    // Pagination logic
    const indexOfLastCategory = currentPage * usersPerPage;
    const indexOfFirstCategory = indexOfLastCategory - usersPerPage;
    const currentCategories = sellers.slice(indexOfFirstCategory, indexOfLastCategory);

    const totalPages = Math.ceil(sellers.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <div className={styles.container}>
            <h2 style={{color:"grey"}}>Sellers Payouts</h2>
            <hr/>

            {loading ? (
                <h2 style={{color:"black"}}>Loading...</h2>
            ) : (
                <>
                    <ul className={styles.list}>
                        {currentCategories.map(seller => (
                            <li key={seller.sellerName} className={styles.item}>
                                {/* <h2>{seller.sellerName}</h2> */}
                                <h2>Restaurant Name: {seller.restaurantName}</h2><br />

                                <p>Total Income: ₹{seller.totalIncome}</p><br />
                                <p>Total Orders: {seller.totalOrders}</p><br/>
                                {/* <hr/><br/> */}
                                            <p>Month Income: ₹{seller.monthlyIncome}</p><br />
                                            <p>Month Orders: {seller.monthlyOrders}</p>
                                            <button >PAY NOW</button>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default SellerList;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './SellerList.module.css';
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const SellerList = () => {
//     const [sellers, setSellers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);

//     const usersPerPage = 3;

//     useEffect(() => {
//         axios.get(`${BASE_URL}/orders/admin/sellers`)
//             .then(response => {
//                 setSellers(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);


//     // Pagination logic
//     const indexOfLastCategory = currentPage * usersPerPage;
//     const indexOfFirstCategory = indexOfLastCategory - usersPerPage;
//     const currentCategories = sellers.slice(indexOfFirstCategory, indexOfLastCategory);

//     const totalPages = Math.ceil(sellers.length / usersPerPage);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };


//     return (
//         <div className={styles.container}>
//             <h2>Sellers Payouts</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <ul className={styles.list}>
//                         {currentCategories.map(seller => (
//                             <li key={seller.sellerName} className={styles.item2}>
//                                 {/* <h2>{seller.sellerName}</h2> */}
//                                 <h2>Restaurant Name: {seller.restaurantName}</h2><br />

//                                 <p>Total Income: {seller.totalIncome}</p><br />
//                                 <p>Total Orders: {seller.totalOrders}</p>
//                                 <div className={styles.container}>

//                                     <ul className={styles.list}>

//                                         <li key={seller.sellerName} className={styles.item}>
//                                             <p>Month Income: {seller.monthlyIncome}</p><br />
//                                             <p>Month Orders: {seller.monthlyOrders}</p>
//                                             <button >PAY NOW</button>
//                                         </li>
//                                     </ul>
//                                 </div>

//                             </li>
//                         ))}
//                     </ul>

//                     {/* Pagination Controls */}
//                     <div className="pagination">
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <button key={i} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
//                                 {i + 1}
//                             </button>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default SellerList;