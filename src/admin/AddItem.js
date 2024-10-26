import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AddItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
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
    };
  
    fetchCategories();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category); // Sending category ID
    formData.append('sellerName', sellerName);
    formData.append('image', image);
    const token = localStorage.getItem('token');

    try {
      await axios.post( `${BASE_URL}/items/admin/addnew`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admindashboard');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-container1">
      <h1>Add New Item</h1>
      <form onSubmit={handleAddItem} className="add-item-form1">
        <div className="form-group1">
          <label>Name:</label>
          <input type="text" className="form-control1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group1">
          <label>Price:</label>
          <input type="number" className="form-control1" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group1">
          <label>Category:</label>
          <select className="form-control1" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option> // Using category ID as value
            ))}
          </select>
        </div>
        <div className="form-group1">
          <label>Seller Name:</label>
          <input type="text" className="form-control1" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
        </div>
        <div className="form-group1">
          <label>Image:</label>
          <input type="file" className="form-control1" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="submit-button1">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
