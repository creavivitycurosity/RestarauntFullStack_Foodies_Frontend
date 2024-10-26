import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CategoryPage() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  console.log('Category ID:', categoryId); // Add this line to check the categoryId
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) { // Ensure categoryId is defined before making the request
      const fetchItems = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/items/category/${categoryId}`);
          setItems(response.data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

      fetchItems();
    }
  }, [categoryId]);



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

  const handleAdd = () => {
    navigate('/admin/add');
  };


  return (
    <div className="category-page-container">
      <h1>Items in Category</h1>
      <button style={{ backgroundColor: "skyblue",padding:"20px 40px",position:"relative" ,left:"46%"}} onClick={handleAdd} className="add-button">Add Item</button>
      <div className="items-list">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <h2>{item.name}</h2>
            <h3>Price: ${item.price}</h3>
            {item.image && (
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.name}
                className="item-image"
              />
            )}
              <button style={{ backgroundColor: "skyblue",padding:"20px 40px"}} onClick={() => handleUpdate(item.id)}>Update</button>
              <button style={{ backgroundColor: "crimson",padding:"20px 40px"}} onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
