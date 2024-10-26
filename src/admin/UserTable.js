import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UserTable.css"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [filterEnabled, setFilterEnabled] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const usersPerPage = 3;

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        fetchUsers();
    }, [filterEnabled]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);  // 🆕 Show loader before fetch

            const response = await axios.get(`${BASE_URL}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Filter users based on role and enabled status
            const filteredUsers = response.data.filter(user => user.role === 'USER');
            if (filterEnabled !== null) {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setUsers(filteredUsers.filter(user => user.enabled === filterEnabled));
            } else {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setUsers(filteredUsers);
            }
        } catch (error) {
            setIsLoading(false);  // 🆕 Hide loader after fetch

            console.error('Error fetching users:', error);
        }
    };

    const toggleUserStatus = async (id, currentStatus) => {
        try {
            await axios.put(`${BASE_URL}/api/users/${id}/status?enabled=${!currentStatus}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };
    const deleteUser = (id) => {
        axios.delete(`${BASE_URL}/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    };
    return (
        <div className="user-table-container">
            <h1>User List</h1>
            {isLoading ? (  // 🆕 Display loader during fetching
                <div className="loader-container">
                    <div className="loader"></div>
                    <h2>Loading users...</h2>
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

                    {/* User Cards */}
                    <div className="user-card-container">
                        {currentUsers.map(user => (
                            <div className="user-card" key={user.id}>
                                <div className="user-info">
                                    <p><b>ID:</b> {user.id}</p>
                                    <p><b>Email:</b> {user.email}</p>
                                    <p><b>Role:</b> {user.role}</p>
                                    <p><b>Status:</b> {user.enabled ? 'Enabled' : 'Disabled'}</p>
                                </div>

                                <div className="user-actions">
                                    <button
                                        className={`toggle-btn ${user.enabled ? 'enabled' : 'disabled'}`}
                                        onClick={() => toggleUserStatus(user.id, user.enabled)}
                                    >
                                        {user.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                    {/* <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        itemsPerPage={usersPerPage}
                        totalItems={users.length}
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

export default UserTable;