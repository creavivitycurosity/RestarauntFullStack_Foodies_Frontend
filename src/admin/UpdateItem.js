import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddItem.css'; // Import the CSS file

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UpdateItem() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(`${BASE_URL}/items/${id}`);
        const item = response.data;
        setName(item.name);
        setPrice(item.price);
        setCategory(item.category.name); // Assuming category is an object with name
        setSellerName(item.sellerName);
        // No need to set image as it's handled separately
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
        });        setCategories(response.data); // Assuming this returns a list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchItem();
    fetchCategories();
  }, [id]);

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', getCategoryIdByName(category)); // Convert name to ID
    formData.append('sellerName', sellerName);

    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');

      await axios.put(`${BASE_URL}/items/admin/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin/homepage');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Helper function to get category ID by name
  const getCategoryIdByName = (name) => {
    const category = categories.find(cat => cat.name === name);
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
            onChange={(e) => setSellerName(e.target.value)} 
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
        <button type="submit" className="submit-button1">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateItem;
