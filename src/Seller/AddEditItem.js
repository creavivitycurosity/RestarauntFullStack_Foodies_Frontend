// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import '.././index.css';
// import { jwtDecode } from 'jwt-decode';

// const AddEditItem = ({ isEdit }) => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [sellerName, setSellerName] = useState('');
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (isEdit) {
//       fetchItem();
//     }
//     fetchCategories();
//   }, [isEdit]);

//   const fetchItem = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8080/items/seller-item/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       const item = response.data;
//       setName(item.name);
//       setPrice(item.price);
//       setCategory(item.category.name); // Assuming category is an object with name
//       // No need to set image as it's handled separately
//     } catch (error) {
//       setMessage("Error fetching item. Please try again.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/items/get/category', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       setCategories(response.data); // Assuming this returns a list of categories
//     } catch (error) {
//       setMessage("Error fetching categories. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('category', getCategoryIdByName(category)); // Convert name to ID
//     formData.append('image', image);

//     try {
//       const token = localStorage.getItem('token');
//       if (isEdit) {
//         await axios.put(`http://localhost:8080/items/update-seller-item/${id}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//       } else {
//         await axios.post('http://localhost:8080/items/add-seller-item', formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       }
//       setMessage(isEdit ? "Item updated successfully!" : "Item added successfully!");
//       navigate('/seller-items');
//     } catch (error) {
//       setMessage("Error saving item. Please try again.");
//     }
//   };

//   // Helper function to get category ID by name
//   const getCategoryIdByName = (name) => {
//     const category = categories.find(cat => cat.name === name);
//     return category ? category.id : '';
//   };

//   // Helper function to convert image file to base64
//   const convertImageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div className="item-form-container">
//       <form onSubmit={handleSubmit}>
//         <h2>{isEdit ? 'Edit Item' : 'Add New Item'}</h2>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         >
//           <option value="">Select a category</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.name}>
//               {cat.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button type="submit">{isEdit ? 'Update Item' : 'Add Item'}</button>
//         <p>{message}</p>
//       </form>
//     </div>
//   );
// };

// export default AddEditItem;
