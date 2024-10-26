import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemStock.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ItemStock = () => {
    const [items, setItems] = useState([]);
    const [editQuantities, setEditQuantities] = useState({});
    const [editQuantities2, setEditQuantities2] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [filter, setFilter] = useState('all'); // Filter state
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationItemId, setNotificationItemId] = useState(null);

    
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Fetch items from the API on component mount
    const fetchItems = async () => {
        setLoading(true); // Set loading to true before the API call
        try {
            const response = await axios.get(`${BASE_URL}/items/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setItems(response.data);
            setLoading(false); // Set loading to false after fetching items
        } catch (error) {
            setLoading(false); // Set loading to false in case of error
            setError("There was an error fetching the items!");
        }
    };

    useEffect(() => {
        fetchItems();
    }, [token]);

    useEffect(() => {
        const handleDocumentClick = () => {
            setShowNotification(false);
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    // Handle input changes for quantity
    const handleQuantityChange = (id, value) => {
        setEditQuantities({
            ...editQuantities,
            [id]: value
        });
    };

    // Handle input changes for quantity
    const handleQuantityChange2 = (id, value) => {
        setEditQuantities2({
            ...editQuantities2,
            [id]: value
        });
    };





    // Handle quantity update
    const handleDecreaseQuantity = (id) => {
        const newQuantity = editQuantities2[id];
        if (newQuantity === undefined || newQuantity === '' || newQuantity < 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const item = items.find(item => item.id === id);
        const currentQuantity = item.quantity;
        const updatedQuantity = parseInt(currentQuantity) - parseInt(newQuantity);


        console.log(updatedQuantity)


        axios.put(`${BASE_URL}/items/seller/edit/${id}/quantity`, null, {
            params: {
                quantity: updatedQuantity
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Update the item's quantity in the UI
                fetchItems();

                setItems(items.map(item =>
                    item.id === id ? { ...item, quantity: updatedQuantity } : item
                ));
                setEditQuantities2({
                    ...editQuantities2,
                    [id]: ''
                });
                // Display the notification
                const negativeQuantity = parseInt(currentQuantity) * -1
                if (!showNotification) {
                    if (updatedQuantity < 0) {
                        setShowNotification(true);
                        setNotificationMessage(`${item.name} is now out of stock.`);
                        setNotificationItemId(id);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000);
                    } else {
                        setShowNotification(true);
                        setNotificationMessage(`${item.name} has ${updatedQuantity} in stock now.`);
                        setNotificationItemId(id);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000);
                    }
                }
            })
            .catch(error => {
                console.error("There was an error updating the quantity!", error);
                setError("Failed to update the quantity.");
            });
    };















    // Handle quantity update
    const handleUpdateQuantity = (id) => {
        const newQuantity = editQuantities[id];
        if (newQuantity === undefined || newQuantity === '' || newQuantity < 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const item = items.find(item => item.id === id);
        const currentQuantity = item.quantity;
        const updatedQuantity = parseInt(currentQuantity) + parseInt(newQuantity);


        console.log(updatedQuantity)


        axios.put(`${BASE_URL}/items/seller/edit/${id}/quantity`, null, {
            params: {
                quantity: updatedQuantity
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Update the item's quantity in the UI
                fetchItems();

                setItems(items.map(item =>
                    item.id === id ? { ...item, quantity: updatedQuantity } : item
                ));
                setEditQuantities({
                    ...editQuantities,
                    [id]: ''
                });
                // Display the notification
                const negativeQuantity = parseInt(currentQuantity) * -1
                if (!showNotification) {
                    if (updatedQuantity < 0) {
                        setShowNotification(true);
                        setNotificationMessage(`${item.name} is now out of stock.`);
                        setNotificationItemId(id);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000);
                    } else {
                        setShowNotification(true);
                        setNotificationMessage(`${item.name} has ${updatedQuantity} in stock now.`);
                        setNotificationItemId(id);
                        setTimeout(() => {
                            setShowNotification(false);
                        }, 3000);
                    }
                }
            })
            .catch(error => {
                console.error("There was an error updating the quantity!", error);
                setError("Failed to update the quantity.");
            });
    };

    const filteredItems = items.filter(item => {
        const matchesFilter = filter === 'all' ||
            (filter === 'in-stock' && item.quantity > 0) ||
            (filter === 'out-of-stock' && item.quantity === 0);
        const matchesSearch = item.name.toLowerCase().startsWith(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Calculate current items for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="item-list-containerz">
            <h1 className='ti'>Inventory</h1>


            <div className="filter-buttonsz">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('in-stock')}>In Stock</button>
                <button onClick={() => setFilter('out-of-stock')}>Out of Stock</button>
            </div>
            <div className='Search-containerz'>
                <input
                    type="text"
                    placeholder="Search by item name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-barz"
                />
            </div>

            {showNotification && (
                <div className="notificationz">
                    <h4>{notificationMessage}</h4>
                </div>
            )}


            {error && <p className="error">{error}</p>}
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                    <h2>Loading items...</h2>
                </div> 
            ) : (


                <ul className="item-listz">
                    {currentItems.length > 0 ? (
                        currentItems.map(item => (
                            <li key={item.id} className="item-cardz">
                                <div className="item-infoz">
                                    <img src={`data:image/png;base64,${item.image}`} alt={item.name} className="item-imagez" />
                                    <div>
                                        <h2>{item.name}</h2>
                                        <p>Item Stock: {item.quantity < 0 ? 0 : item.quantity}</p>
                                        <p>Price: ₹{item.price}</p>
                                    </div>
                                </div>
                                <div className='btnsz'>
                                    <div className="item-actionsz">
                                        <input
                                            type="number"
                                            min="0" // Ensure positive numbers only

                                            className="quantity-inputz"
                                            value={editQuantities[item.id] || ''}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            placeholder="Enter quantity"
                                        />
                                        <button
                                            className="update-btnz2"
                                            onClick={() => handleUpdateQuantity(item.id)}
                                        >
                                            {/* {editQuantities[item.id] ? 'Update Quantity' : 'Add Quantity'} */}
                                            ADD
                                        </button>
                                    </div>

                                    <div className="item-actionsz">
                                        <input
                                            type="number"
                                            min="0" // Ensure positive numbers only
                                            className="quantity-inputz"
                                            value={editQuantities2[item.id] || ''}
                                            onChange={(e) => handleQuantityChange2(item.id, e.target.value)}
                                            placeholder="Enter quantity"
                                        />
                                        <button
                                            className="update-btnz"
                                            style={{ backgroundColor: "crimson" }}
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                        >
                                            {/* {editQuantities[item.id] ? 'Update Quantity' : 'Add Quantity'} */}
                                            REMOVE
                                        </button>
                                    </div>
                                </div>


                            </li>
                        ))


                    ) : (
                        <p>No items found</p>
                    )}

                </ul>

            )}


            <div className="paginationz">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

        </div>
    );
};


export default ItemStock;
