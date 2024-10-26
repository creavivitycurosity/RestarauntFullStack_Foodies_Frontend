import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserTable.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerTable = () => {
    const [sellers, setSellers] = useState([]);
    const [filterEnabled, setFilterEnabled] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const sellersPerPage = 3;

    // Pagination logic
    const indexOfLastSeller = currentPage * sellersPerPage;
    const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
    const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        fetchSellers();
    }, [filterEnabled]);

    const fetchSellers = async () => {
        try {
            setIsLoading(true);  // 🆕 Show loader before fetch

            const response = await axios.get(`${BASE_URL}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Filter sellers based on role and enabled status
            const filteredSellers = response.data.filter(user => user.role === 'SELLER');
            if (filterEnabled !== null) {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setSellers(filteredSellers.filter(user => user.enabled === filterEnabled));
            } else {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setSellers(filteredSellers);
            }
        } catch (error) {
            setIsLoading(false);  // 🆕 Hide loader after fetch

            console.error('Error fetching sellers:', error);
        }
    };

    const toggleSellerStatus = async (id, currentStatus) => {
        try {
            await axios.put(`${BASE_URL}/api/users/${id}/status?enabled=${!currentStatus}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchSellers();
        } catch (error) {
            console.error('Error updating seller status:', error);
        }
    };
    const deleteUser = (id) => {
        axios.delete(`${BASE_URL}/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                setSellers(sellers.filter(seller => seller.id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };
    return (
        <div className="user-table-container">
            <h1>Seller List</h1>
            {isLoading ? (  // 🆕 Display loader during fetching
                <div className="loader-container">
                    <div className="loader"></div>
                    <h2>Loading sellers...</h2>
                </div>
            ) : (
                <>
                    {/* Filter Section */}
                    <div id="user-table-filter-section">
                        <label className='labelq'>
                            <input
                                type="checkbox"
                                checked={filterEnabled === true}
                                onChange={() => setFilterEnabled(filterEnabled === true ? null : true)}
                            />
                            Show Enabled Only
                        </label>
                        <label className='labelq'>
                            <input
                                type="checkbox"
                                checked={filterEnabled === false}
                                onChange={() => setFilterEnabled(filterEnabled === false ? null : false)}
                            />
                            Show Disabled Only
                        </label>
                    </div>


                    {/* Seller Cards */}
                    <div className="user-card-container">
                        {currentSellers.map(seller => (
                            <div className="seller-card" key={seller.id}>
                                <div className="seller-info">
                                    <p><b>ID:</b> {seller.id}</p>
                                    <p><b>Email:</b> {seller.email}</p>
                                    <p><b>Role:</b> {seller.role}</p>
                                    <p><b>Status:</b> {seller.enabled ? 'Enabled' : 'Disabled'}</p>
                                </div>

                                <div className="user-actions">
                                    <button
                                        className={`toggle-btn ${seller.enabled ? 'enabled' : 'disabled'}`}
                                        onClick={() => toggleSellerStatus(seller.id, seller.enabled)}
                                    >
                                        {seller.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                    {/* <button className="delete-btn" onClick={() => deleteUser(seller.id)}>
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        itemsPerPage={sellersPerPage}
                        totalItems={sellers.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </>
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

export default SellerTable;