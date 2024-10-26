// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserList() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/users', {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         .then(response => setUsers(response.data))
//         .catch(error => console.error('Error fetching users:', error));
//     }, []);

//     const toggleUserStatus = (id, currentStatus) => {
//         axios.put(`http://localhost:8080/api/users/${id}/status?enabled=${!currentStatus}`, {}, {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         .then(response => {
//             setUsers(users.map(user => 
//                 user.id === id ? { ...user, enabled: !currentStatus } : user
//             ));
//         })
//         .catch(error => console.error('Error updating user status:', error));
//     };

//     return (
//         <div>
//             <h1>User List</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>
//                             <td>{user.enabled ? 'Enabled' : 'Disabled'}</td>
//                             <td>
//                                 <button onClick={() => toggleUserStatus(user.id, user.enabled)}>
//                                     {user.enabled ? 'Disable' : 'Enable'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default UserList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import SellerTable from './SellerTable';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UserList() {
    const [users, setUsers] = useState([]);
    const [filterEnabled, setFilterEnabled] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const usersPerPage = 8;

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // useEffect(() => {
    //     setIsLoading(true);  // 🆕 Show loader before fetch

    //     axios.get(`${BASE_URL}/api/users`, {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //         .then(response => setUsers(response.data))
    //         .catch(error => console.error('Error fetching users:', error));
    // }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);  // 🆕 Show loader before fetch
            try {
                const response = await axios.get(`${BASE_URL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setUsers(response.data);
            } catch (error) {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);


    const toggleUserStatus = (id, currentStatus) => {
        axios.put(`${BASE_URL}/api/users/${id}/status?enabled=${!currentStatus}`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, enabled: !currentStatus } : user
                ));
            })
            .catch(error => console.error('Error updating user status:', error));
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

        <>

            <UserTable />
            <SellerTable />
            <div className="user-list-container">
                <h1>All List</h1>

                {isLoading ? (  // 🆕 Display loader during fetching
                    <div className="loader-container">
                        <div className="loader"></div>
                        <h2>Loading users and sellers...</h2>
                    </div>
                ) : (
                    <>

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
        </>
    );
}

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
}

export default UserList;