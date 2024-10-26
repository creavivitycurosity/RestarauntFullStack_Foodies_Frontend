import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import Footer from './Footer';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Menu({addtocart}) {
  const [dishes, setDishes] = useState([]);

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
          return { id, image: `data:image/png;base64,${base64String}`, name: imageInfo.name, price: imageInfo.price }; // Include name and price here
        });

        const imageUrls = await Promise.all(imagePromises);
        setDishes(imageUrls);
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

  return (
    <>
    <div  style={{marginTop:"14vh"}}></div>
       <div className='cards21'>
        {dishes.map((dish) => (
          <div className='cards-img' key={dish.id}>
            <img src={dish.image} alt={dish.name} />
            <h2>{dish.name}</h2>
            <h2>${dish.price}</h2>
            <button onClick={() => addtocart(dish)}>ADD GTO Cart</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Menu;
