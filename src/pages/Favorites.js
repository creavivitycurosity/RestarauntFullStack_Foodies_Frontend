// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     async function fetchFavorites() {
//       try {
//         // Retrieve the JWT token from local storage
//         const token = localStorage.getItem('token');

//         // Decode the JWT token to extract the email
//         const decodedToken = jwtDecode(token);
//         const email = decodedToken.sub;

//         // Send the email as a query parameter to the backend
//         const response = await axios.get(`${BASE_URL}/items`, {
//           params: { email }  // Pass email in the query string
//         });

//         // Set the favorite items in the state
//         setFavorites(response.data);
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     }

//     fetchFavorites();
//   }, []);

//   return (
//     <div className="favorites-page">
//       <h1>Your Favorites</h1>
//       <div className="favorite-items">
//         {favorites.map((favorite) => (
//           <div key={favorite.id}>
//             <img src={favorite.item.image} alt={favorite.item.name} />
//             <h2>{favorite.item.name}</h2>
//             <p>Price: ${favorite.item.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Favorites;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import styles from './Favorites.module.css'; // Import the CSS module
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Favorites({ addtocart }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [currentPage, setCurrentPage] = useState(1); // 🆕 Current page state
  const itemsPerPage = 4; // 🆕 Items per page
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFavorites() {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('token');

        // Decode the JWT token to extract the email
        const decodedToken = jwtDecode(token);
        const email = decodedToken.sub; // Use 'sub' or other field if 'email' is not present

        // Send the email as a query parameter to the backend
        const response = await axios.get(`${BASE_URL}/items`, {
          params: { email },  // send user email in request body
          headers: {
            Authorization: `Bearer ${token}`,
          }, // Pass email in the query string
        });

        // Set the favorite items in the state
        setLoading(false); // Data fetching is complete

        setFavorites(response.data);
      } catch (error) {
        setLoading(false); // Data fetching is complete

        console.error('Error fetching favorites:', error);
      }
    }





    fetchFavorites();
  }, []);

  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('token');

  // Decode the JWT token to extract the email
  const decodedToken = jwtDecode(token);
  const email = decodedToken.sub;
  async function fetchFavoritesbyuser(itemId) {
    try {
      await axios.delete(`${BASE_URL}/items/del/${itemId}`, {
        data: { email: email }, // Send email in request body
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally refetch favorites or update state
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.item.id !== itemId));


      //   fetchFavorites()
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }


  // Pagination logic 🆕
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favorites.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <>
    <div className={styles.favoritesPage}>
      <h1>Your Favorites</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
        <div className={styles.favoriteItems}>
          {favorites.length === 0 ? (
            <h2 className={styles.noitemsfoundz} >No Favorite items found</h2>
          ) : (
            <>
              {currentItems.map((favorite) => (
                <div key={favorite.id} className={styles.favoriteItem}  style={{ Width: '350px',overflow:"hidden" }}>
                  <img
                    src={`data:image/jpeg;base64,${favorite.item.image}`}
                    alt={favorite.item.name}
                    // style={{ Width: '300px', Height: '400px' }} // Adjust image size as needed
                  />
                  <h2>{favorite.item.name}</h2>
                  <p>Price: ${favorite.item.price}</p>
                  <button style={{ backgroundColor: "greenyellow" }} onClick={() => navigate(`/item/${favorite.item.id}`)}>GO TO ITEM</button>


                  <button style={{ backgroundColor: "orange" }} onClick={() => fetchFavoritesbyuser(favorite.item.id)}>
                    Remove from Favorites
                  </button>
                </div>
              ))}

         
            </>
          )}
        </div>





        </>
        
      )}
    </div>

     {/* 🆕 Pagination Controls */}
     <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? styles.active : ''}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

    </>
  );
}

export default Favorites;
