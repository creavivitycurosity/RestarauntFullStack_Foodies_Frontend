// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Menu2.css';
// import Footer from './Footer';

// function Menu3({ addtocart }) {
//   const [dishes, setDishes] = useState([]);
//   const [filteredDishes, setFilteredDishes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   const [priceFilters, setPriceFilters] = useState([]);
//   const [nameFilters, setNameFilters] = useState([]);

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

//   const applyFilters = () => {
//     let filtered = dishes;

//     if (priceFilters.length > 0) {
//       filtered = filtered.filter(dish => priceFilters.includes(dish.price));
//     }

//     if (nameFilters.length > 0) {
//       filtered = filtered.filter(dish => nameFilters.includes(dish.name));
//     }

//     setFilteredDishes(filtered);
//     setCurrentPage(1); // Reset to the first page after filtering
//   };

//   const handlePriceChange = (price) => {
//     const newPriceFilters = priceFilters.includes(price)
//       ? priceFilters.filter(p => p !== price)
//       : [...priceFilters, price];
//     setPriceFilters(newPriceFilters);
//   };

//   const handleNameChange = (name) => {
//     const newNameFilters = nameFilters.includes(name)
//       ? nameFilters.filter(n => n !== name)
//       : [...nameFilters, name];
//     setNameFilters(newNameFilters);
//   };

//   useEffect(() => {
//     applyFilters();
//   }, [priceFilters, nameFilters]);

//   const indexOfLastDish = currentPage * itemsPerPage;
//   const indexOfFirstDish = indexOfLastDish - itemsPerPage;
//   const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredDishes.length / itemsPerPage); i++) {
//     pageNumbers.push(i);
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

//   return (
//     <>
//       <div style={{ marginTop: "14vh" }}></div>
//       <br/>
//       <h1>this menu3 js includes pagenation and multi filter .see menu2 js to show filtered items in another page</h1>

//       <div className="filter-buttons">
//         <button onClick={() => filterDishes(500)}>500p</button>
//         <button onClick={() => filterDishes(100)}>100p</button>
//         <button onClick={() => filterDishes('all')}>All</button>
//       </div>
//       <div className="filter-section">
//         <div>
//           <h3>Price:</h3>
//           <label>
//             <input
//               type="checkbox"
//               value={500}
//               onChange={() => handlePriceChange(500)}
//             />
//             500p
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value={100}
//               onChange={() => handlePriceChange(100)}
//             />
//             100p
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value={400}
//               onChange={() => handlePriceChange(400)}
//             />
//             100-400p
//           </label>
//         </div>
//         <div>
//           <h3>Name:</h3>
//           <label>
//             <input
//               type="checkbox"
//               value="Chicken Biriyani"
//               onChange={() => handleNameChange("Chicken Biriyani")}
//             />
//             Chicken Biriyani
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="Orange"
//               onChange={() => handleNameChange("Orange")}
//             />
//             Orange
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="Mutton Biriyani"
//               onChange={() => handleNameChange("Mutton Biriyani")}
//             />
//             Mutton Biriyani
//           </label>
//         </div>
//       </div>
//       <div className='cards21'>
//         {currentDishes.map((dish) => (
//           <div className='cards-img' key={dish.id}>
//             <div className='imgg2'>
//               <img src={dish.image} alt={dish.name} />  
//             </div>
//             <div>
//             <h2>{dish.name}</h2>
//             <h2>${dish.price}</h2>
//             <button onClick={() => addtocart(dish)}>ADD TO Cart</button>
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

// export default Menu3;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu3.css';
import Footer from './Footer';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Menu3({ addtocart }) {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [priceFilters, setPriceFilters] = useState([]);
  const [nameFilters, setNameFilters] = useState([]);
  const [activePriceButton, setActivePriceButton] = useState('all');

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
        setFilteredDishes(imageUrls); // Set filteredDishes to all items initially
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

  const applyFilters = () => {
    let filtered = dishes;

    if (priceFilters.length > 0) {
      filtered = filtered.filter(dish => priceFilters.includes(dish.price));
    }

    if (nameFilters.length > 0) {
      filtered = filtered.filter(dish => nameFilters.includes(dish.name));
    }

    setFilteredDishes(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handlePriceChange = (price) => {
    const newPriceFilters = priceFilters.includes(price)
      ? priceFilters.filter(p => p !== price)
      : [...priceFilters, price];
    setPriceFilters(newPriceFilters);
  };

  const handleNameChange = (name) => {
    const newNameFilters = nameFilters.includes(name)
      ? nameFilters.filter(n => n !== name)
      : [...nameFilters, name];
    setNameFilters(newNameFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [priceFilters, nameFilters]);

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDishes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const filterDishes = (price) => {
    setActivePriceButton(price);
    if (price === 'all') {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter(dish => dish.price === price);
      setFilteredDishes(filtered);
    }
    setCurrentPage(1); // Reset to the first page after filtering
  };

  return (
    <>
      <div style={{ marginTop: "14vh" }}></div>
      <br/>
      <h1>This Menu3.js includes pagination and multi-filter also within filters like 100 and 500 and orange at a time. See Menu2.js to show filtered items on another page.</h1>

      {/* <div className="filter-buttons0">
        <button
          onClick={() => filterDishes(500)}
          className={activePriceButton === 500 ? 'active' : ''}
        >
          500p
        </button>
        <button
          onClick={() => filterDishes(100)}
          className={activePriceButton === 100 ? 'active' : ''}
        >
          100p
        </button>
        <button
          onClick={() => filterDishes('all')}
          className={activePriceButton === 'all' ? 'active' : ''}
        >
          All
        </button>
      </div> */}
     
    <div className="filter-section00">
  <div className="filter-section01">
    <h3> Price:</h3>
    <button
      className={`filter-button01 ${priceFilters.includes(500) ? 'active' : ''}`}
      onClick={() => handlePriceChange(500)}
    >
      500p
    </button>
    <button
      className={`filter-button01 ${priceFilters.includes(100) ? 'active' : ''}`}
      onClick={() => handlePriceChange(100)}
    >
      100p
    </button>
    <button
      className={`filter-button01 ${priceFilters.includes(400) ? 'active' : ''}`}
      onClick={() => handlePriceChange(400)}
    >
      100-400p
    </button>
  </div>


  <div className="filter-section01">
    <h3>Name:</h3>
    <button
      className={`filter-button01 ${nameFilters.includes('Blackberry') ? 'active' : ''}`}
      onClick={() => handleNameChange('Blackberry')}
    >
      Blackberry
    </button>
    <button
      className={`filter-button01 ${nameFilters.includes('Orange') ? 'active' : ''}`}
      onClick={() => handleNameChange('Orange')}
    >
      Orange
    </button>
    <button
      className={`filter-button01 ${nameFilters.includes('Mutton Biriyani') ? 'active' : ''}`}
      onClick={() => handleNameChange('Mutton Biriyani')}
    >
      Mutton Biriyani
    </button>
  </div>
</div>

      <div className="cards210">
        {currentDishes.map((dish, index) => (
          <div className="cards-img0" key={index}>
            <div className="imgg20">
              <img src={dish.image} alt={dish.name} />
            </div>
            <div>
            <h1>{dish.name}</h1>
            <h2>price : {dish.price}</h2>
            <button onClick={() => addtocart(dish)}>Add to Cart</button>
            </div>

          </div>
        ))}
      </div>
      <div className="pagination0">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Menu3;



