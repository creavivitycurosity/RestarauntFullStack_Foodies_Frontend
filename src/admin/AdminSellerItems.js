
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select'; // Importing react-select for better multi-select support
import '../Components/CategoryItems.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminSellerItems = ({ addtocart }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSellers, setSelectedSellers] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [discountFilter, setDiscountFilter] = useState('all'); // Added discount filter state
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [featuredFilter, setFeaturedFilter] = useState('all'); // Featured filter state
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const { sellerEmail } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object

    useEffect(() => {
        async function fetchItems() {
            try {
                setIsLoading(true);  // 🆕 Show loader before fetch

                const response = await axios.get(`${BASE_URL}/items/seller/name/${sellerEmail}`);
                const processedItems = response.data.map(item => ({
                    id: item.id,
                    image: `data:image/png;base64,${item.image}`,
                    name: item.name,
                    price: item.price,
                    sellerName: item.sellerName,
                    restaurantName: item.restaurantName,
                    previousAmount: item.previousAmount, // assuming this field contains the original price
                    discountActive: item.discountActive, // assuming this field indicates if a discount is active
                    quantity: item.quantity,
                    category: item.category, // Add this line
                    featured: item.featured,
                }));
                console.log(response.data)
                console.log(processedItems)
                setIsLoading(false);  // 🆕 Hide loader after fetch

                setItems(processedItems);
                setFilteredItems(processedItems);
            } catch (error) {
                setIsLoading(false);  // 🆕 Hide loader after fetch

                console.error('Error fetching items:', error);
            }
        }

        fetchItems();
    }, [sellerEmail]);





    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`${BASE_URL}/items/get/categories/sellers/${sellerEmail}`);
                const categoryOptions = response.data.map(category => ({
                    value: category.name,
                    label: category.name
                }));
                console.log('Categories response:', response.data);
                console.log(sellerEmail)
                setCategoryOptions(categoryOptions);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        console.log(categoryOptions)
        fetchCategories();
    }, [sellerEmail]);






    useEffect(() => {
        if (location.state?.filter === 'discount') {
            setDiscountFilter('discount');
        }
    }, [location.state]);

    useEffect(() => {
        let filtered = items;

        if (searchTerm) {
            filtered = filtered.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        }

        if (selectedSellers.length > 0) {
            filtered = filtered.filter(item => selectedSellers.includes(item.sellerName));
        }

        if (selectedPrices.length > 0) {
            filtered = filtered.filter(item => selectedPrices.some(price => item.price <= price));
        }
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(item => selectedCategories.includes(item.category.name));
        }


        if (discountFilter === 'discount') {
            filtered = filtered.filter(item => item.discountActive);
        } else if (discountFilter === 'non-discount') {
            filtered = filtered.filter(item => !item.discountActive);
        }


        // Add featured filter logic
        if (featuredFilter === 'featured') {
            filtered = filtered.filter(item => item.featured);
        } else if (featuredFilter === 'non-featured') {
            filtered = filtered.filter(item => !item.featured);
        }

        setFilteredItems(filtered);
    }, [searchTerm, selectedSellers, selectedPrices, discountFilter, featuredFilter, selectedCategories, items]);

    const sellerOptions = Array.from(new Set(items.map(item => item.sellerName))).map(seller => ({
        value: seller,
        label: seller
    }));

    const priceOptions = [
        { value: 100, label: 'Below ₹100' },
        { value: 200, label: 'Below ₹200' },
        { value: 500, label: 'Below ₹500' }
    ];

    const discountOptions = [
        { value: 'all', label: 'All' },
        { value: 'discount', label: 'Discounted' },
        { value: 'non-discount', label: 'Non-Discounted' },
    ];

    const featuredOptions = [
        { value: 'all', label: 'All' },
        { value: 'featured', label: 'Featured' },
        { value: 'non-featured', label: 'Non-Featured' },
    ];

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/items/delete/${id}`);
            setItems(items.filter(items => items.id !== id));
            // setFilteredDishes(filteredDishes.filter(dish => dish.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    const handleUpdate = (id) => {
        navigate(`/admin/update/${id}`);
    };


    const toggleFeatured = async (id, featured) => {
        try {
            await axios.put(`${BASE_URL}/items/admin/feature/${id}`, null, {
                params: { featured },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            setMessage("Error updating featured status. Please try again.");
        }
    };

    return (
        <div className="category-items-container">

            <input
                type="text"
                placeholder="Search by item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filters3">

                {/* <Select
          isMulti
          options={sellerOptions}
          className="multi-select3"
          placeholder="Filter by seller"
          onChange={(selectedOptions) => setSelectedSellers(selectedOptions.map(option => option.value))}
        /> */}
                <Select
                    isMulti
                    options={priceOptions}
                    className="multi-select3"
                    placeholder="Filter by price"
                    onChange={(selectedOptions) => setSelectedPrices(selectedOptions.map(option => option.value))}
                    isSearchable={false} // Disable the keyboard popup

                />
                {/* Discount filter dropdown */}
                {/* <Select
          options={discountOptions}
          className="multi-select3"
          placeholder="Filter by discount"
          onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
          defaultValue={discountOptions[0]} // Set "All" as the default
        /> */}
          <Select
                    isMulti
                    options={categoryOptions}
                    className="multi-select3"
                    placeholder="Filter by category"
                    onChange={(selectedOptions) => setSelectedCategories(selectedOptions.map(option => option.value))}
                    isSearchable={false} // Disable the keyboard popup

                />
                <Select
                    options={discountOptions}
                    className="multi-select3"
                    placeholder="Filter by discount"
                    onChange={(selectedOption) => setDiscountFilter(selectedOption.value)}
                    value={discountOptions.find(option => option.value === discountFilter)} // Make it controlled by state
                    isSearchable={false} // Disable the keyboard popup

                />
              
                <Select
                    options={featuredOptions}
                    className="multi-select3"
                    placeholder="Filter by featured status"
                    onChange={(selectedOption) => setFeaturedFilter(selectedOption.value)}
                    value={featuredOptions.find(option => option.value === featuredFilter)}
                    isSearchable={false} // Disable the keyboard popup

                />


            </div>


            {isLoading ? (  // 🆕 Display loader during fetching
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (



                <div className="category-items">
                    {filteredItems.map(item => (
                        <div style={{cursor:"pointer"}} key={item.id} className="item-card" onClick={() => navigate(`/admin/items/${item.id}`)}>
                            <img src={item.image} alt={item.name} />
                            {item.discountActive && (
                                <div className="discount-badge">
                                    {Math.round(((item.previousAmount - item.price) / item.previousAmount) * 100)}% OFF
                                </div>
                            )}

                            <h2>{item.name}</h2>
                            <h3 style={{marginTop:"3rem"}}>
                                Price:
                                {item.price !== null && item.price !== undefined && !item.discountActive ? (
                                    <span>${item.price}</span>
                                ) : (
                                    <span></span>
                                )}
                                {item.discountActive && (
                                    <>
                                        <span style={{ textDecoration: item.discountActive ? 'line-through' : 'none' }}>
                                            ${item.previousAmount}
                                        </span>
                                        <span style={{ display: 'block', color: 'red' }}>${item.price}</span>
                                    </>
                                )}
                            </h3>
                            {item.quantity === 0 ? (
                                <>
                                    <button style={{ backgroundColor: 'red', cursor: 'not-allowed' }} disabled>Out of Stock</button>
                                    {/* <button style={{ backgroundColor: "crimson", padding: "20px 40px" }} onClick={() => handleDelete(item.id)}>Delete</button> */}
                                </>) : (
                                <div>
                                    {/* <button style={{ backgroundColor: "skyblue", padding: "20px 40px" }} onClick={() => handleUpdate(item.id)}>Update</button> */}
                                    {/* <button style={{ backgroundColor: "crimson", padding: "20px 40px" }} onClick={() => handleDelete(item.id)}>Delete</button> */}

                                    {/* <button style={{ backgroundColor: "lightgreen", padding: "20px 40px" }} onClick={() => navigate(`/admin/items/${item.id}`)}>Details</button> */}

                                    {item.quantity < 10 && <h3>Only {item.quantity} left in stock!</h3>}
                                </div>
                            )}

                            {/* <input
                            type="checkbox"
                            checked={item.featured}
                            size={40}
                            onChange={(e) => toggleFeatured(item.id, e.target.checked)}
                        /> */}
                            {/* <button
                                onClick={() => toggleFeatured(item.id, !item.featured)}
                                style={{ marginTop: "2%", backgroundColor: item.featured ? "green" : "red", color: "white" }}
                            >
                                {item.featured ? "Featured" : "Not Featured"}
                            </button> */}
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default AdminSellerItems;
