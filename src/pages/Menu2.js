// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Menu2.css';
// import Footer from './Footer';

// function Menu2({ addtocart }) {
//   const [dishes, setDishes] = useState([]);
//   const [filteredDishes, setFilteredDishes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:8080/items/allitems');
//         const imagesData = response.data;

//         const imagePromises = imagesData.map(async (imageInfo) => {
//           const { id } = imageInfo;
//           const imageResponse = await axios.get(`http://localhost:8080/items/images/${id}`, {
//             responseType: 'arraybuffer',
//           });
//           const base64String = await arrayBufferToBase64(imageResponse.data);
//           return { id, image: `data:image/png;base64,${base64String}`, name: imageInfo.name, price: imageInfo.price };
//         });

//         const imageUrls = await Promise.all(imagePromises);
//         setDishes(imageUrls);
//         setFilteredDishes(imageUrls); // Set filteredDishes to all items initially
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     }

//     fetchData();
//   }, []);

//   function arrayBufferToBase64(arrayBuffer) {
//     return new Promise((resolve, reject) => {
//       try {
//         const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
//         const reader = new FileReader();
//         reader.onload = () => {
//           const base64String = reader.result?.toString().split(',')[1];
//           resolve(base64String || '');
//         };
//         reader.onerror = (error) => {
//           console.error('Error reading array buffer:', error);
//           reject(error);
//         };
//         reader.readAsDataURL(blob);
//       } catch (error) {
//         console.error('Error converting array buffer to base64:', error);
//         reject(error);
//       }
//     });
//   }

//   const filterDishes = (price) => {
//     if (price === 'all') {
//       setFilteredDishes(dishes);
//     } else {
//       const filtered = dishes.filter(dish => dish.price === price);
//       setFilteredDishes(filtered);
//     }
//     setCurrentPage(1); // Reset to the first page after filtering
//   };

//   const indexOfLastDish = currentPage * itemsPerPage;
//   const indexOfFirstDish = indexOfLastDish - itemsPerPage;
//   const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredDishes.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <>
//       <div style={{ marginTop: "14vh" }}></div>
//       <div className="filter-buttons">
//         <button onClick={() => filterDishes(500)}>500p</button>
//         <button onClick={() => filterDishes(100)}>100p</button>
//         <button onClick={() => filterDishes('all')}>All</button>
//       </div>
//       <div className='cards21'>
//         {currentDishes.map((dish) => (
//           <div className='cards-img' key={dish.id}>
//             <div className='imgg2'>
//               <img src={dish.image} alt={dish.name} />  
//             </div>
//             <div>
//               <h2>{dish.name}</h2>
//               <h2>${dish.price}</h2>
//               <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className='pagination'>
//         {pageNumbers.map(number => (
//           <button key={number} onClick={() => paginate(number)} className='page-link'>
//             {number}
//           </button>
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Menu2;

//<h1>includes pagenation and filter and filter items displayed in another page</h1>

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Menu2.css';
import Footer from './Footer';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Menu2({ addtocart }) {
  const [dishes, setDishes] = useState([]);
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

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dishes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const filterItems = (price) => {
    const filteredDishes = price ? dishes.filter(dish => dish.price === price) : dishes;
    navigate('/items', { state: { filteredDishes } });
  };

  return (
    <>
      <div style={{ marginTop: "14vh" }} className="filter-buttons">

      <button onClick={() => filterItems(500)}>500p</button>
      <button onClick={() => filterItems(100)}>100p</button>
      <button onClick={() => filterItems(null)}>All</button>
      </div>
      <div className='cards21'>
        {currentDishes.map((dish) => (
          <div className='cards-img' key={dish.id}>
            <div className='imgg2'>
              <img src={dish.image} alt={dish.name} />  
            </div>
            <div>
            <h2>{dish.name}</h2>
            <h2>${dish.price}</h2>
            <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
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

export default Menu2;

