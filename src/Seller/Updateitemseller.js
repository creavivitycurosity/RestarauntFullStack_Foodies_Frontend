// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const Updateitemseller = () => {
//     const { id } = useParams();
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [sellerName, setSellerName] = useState('');
//     const [image, setImage] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [quantity, setQuantity] = useState(0);

//     const navigate = useNavigate();



//   useEffect(() => {
//     async function fetchItem() {

//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//               const decodedToken = jwtDecode(token);
//              let selleremail = decodedToken.sub; // or decodedToken.username, depending on your token structure
//              setSellerName(selleremail)
//               console.log(selleremail);
//             } catch (error) {
//               console.error('Error decoding token:', error);
//               localStorage.removeItem('token'); // Remove the token from local storage
//               localStorage.removeItem('refreshToken'); // Remove the token from local storage

//             }
//           }

//       try {
//         const response = await axios.get(`${BASE_URL}/items/seller-item/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//         const item = response.data;
//         console.log(response.data)
//         setName(item.name);
//         setPrice(item.price);
//         setCategory(item.category.name); // Assuming category is an object with name
//         setQuantity(item.quantity)
//         // setSellerName(item.sellerName);
//         // No need to set image as it's handled separately
//       } catch (error) {
//         console.error('Error fetching item:', error);
//       }
//     }

//     async function fetchCategories() {
//       const token = localStorage.getItem('token');

//       try {
//         const response = await axios.get(`${BASE_URL}/items/get/category`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });        setCategories(response.data); // Assuming this returns a list of categories
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }

//     fetchItem();
//     fetchCategories();
//   }, [id]);

//   const handleUpdateItem = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('category', getCategoryIdByName(category)); // Convert name to ID
//     formData.append('sellerName', sellerName);
//     formData.append('quantity', quantity);

//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const token = localStorage.getItem('token');

//       await axios.put(`${BASE_URL}/items/seller/edit/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/seller/sellerhome');
//     } catch (error) {
//       console.error('Error updating item:', error);
//     }
//   };

//   // Helper function to get category ID by name
//   const getCategoryIdByName = (name) => {
//     const category = categories.find(cat => cat.name === name);
//     return category ? category.id : '';
//   };


//   return (
//     <div className="add-item-container1">
//       <form onSubmit={handleUpdateItem} className="add-item-form1">
//         <div className="form-group1">
//           <label>Name:</label>
//           <input 
//             type="text" 
//             className="form-control1" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//           />
//         </div>
//         <div className="form-group1">
//           <label>Price:</label>
//           <input 
//             type="number" 
//             className="form-control1" 
//             value={price} 
//             onChange={(e) => setPrice(e.target.value)} 
//           />
//         </div>
//         <div className="form-group1">
//           <label>Category:</label>
//           <select 
//             className="form-control1" 
//             value={category} 
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group1">
//           <label>Seller Name:</label>
//           <input 
//             type="text" 
//             className="form-control1" 
//             value={sellerName} 
//             onChange={(e) => setSellerName(e.target.value)} 
//             readOnly
//           />
//         </div>
//         <div className="form-group1">
//           <label>Image:</label>
//           <input 
//             type="file" 
//             className="form-control1" 
//             onChange={(e) => setImage(e.target.files[0])} 
//           />
//         </div>

//         <div className="form-group1">
//                     <label>Quantity:</label>
//                     <input
//                         type="number"
//                         className="form-control1"
//                         value={quantity}
//                         onChange={(e) => setQuantity(e.target.value)}
//                     />
//                 </div>
//         <button type="submit" className="submit-button1">Update Item</button>
//       </form>
//     </div>
//   );
// }

// export default Updateitemseller 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./AddItem.css"

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UpdateItemSeller = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');  // Add description state
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [tags, setTags] = useState([]);  // New state for tags
    const [tagInput, setTagInput] = useState('');  // New state for tag input
    const [isVeg, setIsVeg] = useState(false);  // New state for Veg/Non-Veg

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchItem() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const selleremail = decodedToken.sub;
                    setSellerName(selleremail);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                }
            }

            try {
                const response = await axios.get(`${BASE_URL}/items/seller-item/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const item = response.data;
                setName(item.name);
                setPrice(item.price);
                setCategory(item.category.name);
                setQuantity(item.quantity);
                setDescription(item.description);  // Set description
                setTags(item.tags || []);  // Set existing tags if any
                setIsVeg(item.veg);  // Set existing Veg/Non-Veg status

            } catch (error) {
                console.error('Error fetching item:', error);
            }
        }

        async function fetchCategories() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${BASE_URL}/items/get/category`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchItem();
        fetchCategories();
    }, [id]);

    // Function to add a new tag
    const addTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);  // Add new tag
            setTagInput('');  // Clear input field
        }
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);  // Add new tag
            setTagInput('');  // Clear input
            e.preventDefault();  // Prevent form submission
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));  // Remove tag
    };


    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', getCategoryIdByName(category));
        formData.append('sellerName', sellerName);
        formData.append('quantity', quantity);
        formData.append('description', description);  // Append description
        formData.append('tags', JSON.stringify(tags));  // Send tags as a JSON array
        formData.append('isVeg', isVeg);  // Append the isVeg value

        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');

            await axios.put(`${BASE_URL}/items/seller/edit/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/seller/sellerhome');
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const getCategoryIdByName = (name) => {
        const category = categories.find((cat) => cat.name === name);
        return category ? category.id : '';
    };

    return (
        <div className="add-item-container1">
            <form onSubmit={handleUpdateItem} className="add-item-form1">
                <div className="form-group1">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group1">
                    <label>Price:</label>
                    <input
                        min="0"
                        type="number"
                        className="form-control1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group1">
                    <label>Category:</label>
                    <select
                        className="form-control1"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group1">
                    <label>Seller Name:</label>
                    <input
                        type="text"
                        className="form-control1"
                        value={sellerName}
                        readOnly
                    />
                </div>
                <div className="form-group1">
                    <label>Image:</label>
                    <input
                        type="file"
                        className="form-control1"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="form-group1">
                    <label>Description:</label> {/* Add description input */}
                    <textarea
                        className="form-control1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="250"
                    />
                    {description ? (
                        <h5>{250 - description.length} characters remaining</h5>
                    ) : (
                        <h5>No description</h5>
                    )}
                </div>


                {/* Veg/Non-Veg Checkbox */}
                <div className="form-group12">
                    <label>
                        <h4>Is It A Veg Item?</h4>

                        <input
                            style={{ height: "1.5rem", width: "2rem" }}

                            type="checkbox"
                            checked={isVeg}
                            onChange={(e) => setIsVeg(e.target.checked)}
                        />
                    </label>
                </div>

                <div className="form-group1">
                    <label>Quantity:</label>
                    <input
                        min="0"
                        type="number"
                        className="form-control1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>

                {/* Tags section */}
                <div className="form-group1">
                    <label>Tags:</label>
                    <input
                        type="text"
                        className="form-control1"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInput}  // Handle tag input on "Enter"
                        placeholder="Press Enter to add tag"
                    />
                    <button
                        type="button"
                        className="add-tag-button"
                        onClick={addTag}  // Add tag on button click
                    >
                        Add Tag
                    </button>
                    <div className="tags-container">
                        {tags.map((tag, index) => (
                            <div key={index} className="tag">
                                {tag}
                                <h2 style={{ marginTop: "15px" }} onClick={() => removeTag(index)}>x</h2>
                                {/* <h3 onClick={() => removeTag(index)}> x </h3> */}

                            </div>
                        ))}
                    </div>
                </div>



                <button type="submit" className="submit-button1">Update Item</button>
            </form>
        </div>
    );
};

export default UpdateItemSeller;
