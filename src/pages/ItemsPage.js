import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu2.css';
import Footer from './Footer';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ItemsPage({ addtocart }) {
  const location = useLocation();
  const { filteredDishes } = location.state || { filteredDishes: [] };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfFirstDish + itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredDishes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div style={{ marginTop: "14vh" }}></div>
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

export default ItemsPage;
