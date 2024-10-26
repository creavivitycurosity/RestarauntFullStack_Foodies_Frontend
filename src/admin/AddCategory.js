// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AddItem.css';

// function AddCategory() {
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
  
//     try {
//       const formData = new URLSearchParams();
//       formData.append('name', name);
  
//       await axios.post('http://localhost:8080/items/admin/add-category', 
//         formData.toString(), 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );
//       navigate('/admin');
//     } catch (error) {
//       console.error('Error adding category:', error);
//     }
//   };

//   return (
//     <div className="add-category-container">
//       <h1>Add New Category</h1>
//       <form onSubmit={handleAddCategory} className="add-category-form">
//         <div className="form-group">
//           <label>Category Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required // Ensure the field is not empty
//           />
//         </div>
//         <button type="submit" className="submit-button">Add Category</button>
//       </form>
//     </div>
//   );
// }

// export default AddCategory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css'; // Import the CSS file

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AddCategory() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    try {
      const formData = new URLSearchParams();
      formData.append('name', name);
  
      await axios.post(`${BASE_URL}/items/admin/add-category`, 
        formData.toString(), 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      navigate('/admin/admindashboard');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="add-category-container">
      <h1>Add New Category</h1>
      <form onSubmit={handleAddCategory} className="add-category-form">
        <div className="form-group">
          <label>Category Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Ensure the field is not empty
          />
        </div>
        <button type="submit" className="submit-button">Add Category</button>
      </form>
      <div className="categories-list">
        <h2>Existing Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <strong>ID:</strong> {category.id} <br />
              <strong>Name:</strong> {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddCategory;

