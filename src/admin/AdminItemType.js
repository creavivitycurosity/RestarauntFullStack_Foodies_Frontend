

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Components/CategoryItems.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminItemType = () => {
  const [itemTypes, setItemTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItemTypes() {
      try {
        const response = await axios.get(`${BASE_URL}/items/items/veg-nonveg-with-random-images3`);
        setItemTypes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item types:', error);
        setLoading(false);
      }
    }

    fetchItemTypes();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>

         <div >
          <h2>VEG / NON-VEG</h2>
            <div className="categories">
          {itemTypes.map((type, index) => (
           <div
           key={type.categoryId}
           className="category-card"
           style={{ backgroundImage: `url(data:image/png;base64,${type.image})` }}
           onClick={() => navigate(`/admin/item-type/${type.categoryName.toLowerCase()}`)}
         >
           <div className="category-name">{type.categoryName}</div>
         </div>
          ))}
            </div>
            </div>


           



        </>


      )}
    </>
  );
};

export default AdminItemType;