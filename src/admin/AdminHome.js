import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Menu2.css';
import Footer from '../pages/Footer';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminHome() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/items/allitems`);
        const imagesData = response.data;

        const imagePromises = imagesData.map(async (imageInfo) => {
          const { id } = imageInfo;
          const imageResponse = await axios.get(`${BASE_URL}/items/images/${id}`, {
            responseType: 'arraybuffer',
          });
          const base64String = await arrayBufferToBase64(imageResponse.data);
          return { id, image: `data:image/png;base64,${base64String}`, name: imageInfo.name, price: imageInfo.price };
        });

        const imageUrls = await Promise.all(imagePromises);
        setDishes(imageUrls);
        setFilteredDishes(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchData();
  }, []);

  function arrayBufferToBase64(arrayBuffer) {
    return new Promise((resolve, reject) => {
      try {
        const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result?.toString().split(',')[1];
          resolve(base64String || '');
        };
        reader.onerror = (error) => {
          console.error('Error reading array buffer:', error);
          reject(error);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error converting array buffer to base64:', error);
        reject(error);
      }
    });
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/items/delete/${id}`);
      setDishes(dishes.filter(dish => dish.id !== id));
      setFilteredDishes(filteredDishes.filter(dish => dish.id !== id));
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

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDishes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    
          {/* <AdminNavbar/>  */}

      <div style={{ marginTop: "14vh" }}></div>
      <button style={{ backgroundColor: "skyblue",padding:"20px 40px",position:"relative" ,left:"47%"}} onClick={handleAdd} className="add-button">Add Item</button>
      <div className='cards213'>
        {currentDishes.map((dish) => (
          <div className='cards-img' key={dish.id}>
            <div className='imgg2'>
              <img src={dish.image} alt={dish.name} onClick={() => navigate(`/item/${dish.id}`)}/>
            </div>
            <div>
              <h2>{dish.name}</h2>
              <h2>${dish.price}</h2>
              <button style={{ backgroundColor: "skyblue",padding:"20px 40px"}} onClick={() => handleUpdate(dish.id)}>Update</button>
              <button style={{ backgroundColor: "skyblue",padding:"20px 40px"}} onClick={() => handleDelete(dish.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination'>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className='page-link'>
            {number}
          </button>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default AdminHome;
