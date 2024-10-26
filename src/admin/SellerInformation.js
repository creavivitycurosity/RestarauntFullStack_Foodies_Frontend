// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./Sellerinfo.css";

// const SellerInformation = () => {
//     const [sellersInfo, setSellersInfo] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:8080/items/sellers-info')
//             .then(response => {
//                 setSellersInfo(response.data);
//                 console.log(response.data)
//             })
//             .catch(error => {
//                 console.error("There was an error fetching the sellers info!", error);
//             });
//     }, []);

//     return (
//         <div  className="table-container">
//             <h2>Seller's who have items</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Seller Name</th>
//                         <th>Total Items</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sellersInfo 
//                     .filter(seller => seller.sellerName)
//                     .map((seller, index) => (
//                         <tr key={index}>
//                             <td>{seller.sellerName}</td>
//                             <td>{seller.totalItems}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <br/>
//             <h2>NOTE :</h2>
//             <h2>Seller's who dont have any items created in database are not included in this list ,but they are included in total sellers count in dashboard</h2>

//         </div>
//     );
// };




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sellerinfo.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerInformation = () => {
    const [sellersInfo, setSellersInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sellerItems, setSellerItems] = useState([]);
    const [sellerOrders, setSellerOrders] = useState([]);
    const [currentPageSellers, setCurrentPageSellers] = useState(1);
    const [currentPageItems, setCurrentPageItems] = useState(1);
    const [currentPageOrders, setCurrentPageOrders] = useState(1);
    const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state

    const [itemsPerPage] = useState(2);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        setIsLoading(true);  // 🆕 Show loader

        axios.get(`${BASE_URL}/items/sellers-info`, { headers })
           .then(response => {
            setIsLoading(false);  // 🆕 Hide loader

                setSellersInfo(response.data);
                console.log(response.data);

            })
           .catch(error => {
            setIsLoading(false);  // 🆕 Hide loader

                console.error("There was an error fetching the sellers info!", error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchItems = () => {
      setIsLoading(true);  // 🆕 Show loader

        axios.get(`${BASE_URL}/items/seller/${searchQuery}`)
           .then(response => {
            setIsLoading(false);  // 🆕 Hide loader

                setSellerItems(response.data);
            })
           .catch(error => {
            setIsLoading(false);  // 🆕 Hide loader

                console.error("There was an error fetching the seller's items!", error);
            });
    };

    const handleSearchOrders = () => {
      setIsLoading(true);  // 🆕 Show loader

        axios.get(`${BASE_URL}/orders/orders/seller/${searchQuery}`)
           .then(response => {
            setIsLoading(false);  // 🆕 Hide loader

                setSellerOrders(response.data);
            })
           .catch(error => {
            setIsLoading(false);  // 🆕 Hide loader

                console.error("There was an error fetching the seller's orders!", error);
            });
    };

    const handleClear = () => {
        setSearchQuery('');
        setSellerItems([]);
        setSellerOrders([]);
    };

    const indexOfLastItemSellers = currentPageSellers * itemsPerPage;
    const indexOfFirstItemSellers = indexOfLastItemSellers - itemsPerPage;
    const currentSellers = sellersInfo.slice(indexOfFirstItemSellers, indexOfLastItemSellers);

    const indexOfLastItemItems = currentPageItems * itemsPerPage;
    const indexOfFirstItemItems = indexOfLastItemItems - itemsPerPage;
    const currentSellerItems = sellerItems.slice(indexOfFirstItemItems, indexOfLastItemItems);

    const indexOfLastItemOrders = currentPageOrders * itemsPerPage;
    const indexOfFirstItemOrders = indexOfLastItemOrders - itemsPerPage;
    const currentSellerOrders = sellerOrders.slice(indexOfFirstItemOrders, indexOfLastItemOrders);

    const paginateSellers = (pageNumber) => setCurrentPageSellers(pageNumber);
    const paginateItems = (pageNumber) => setCurrentPageItems(pageNumber);
    const paginateOrders = (pageNumber) => setCurrentPageOrders(pageNumber);

    return (
      <>

      <div className="table-container">
      <h2>Sellers with Items</h2>

      {isLoading ? (  // 🆕 Loader UI
          <div className="loader-container">

              <div className="loader"></div>
          </div>
      ) : (
      <>
        <div className="table-container">
          {/* <h2>Sellers with Items</h2> */}
          <div className="seller-card-container">
            {currentSellers
              .filter(seller => seller.sellerName)
              .map((seller, index) => (
                <div className="seller-card" key={index}>
                  <h3>{seller.sellerName}</h3>
                  <p>Restaurant: {seller.restaurantName}</p>
                  <p>Total Items: {seller.totalItems}</p>
                </div>
              ))}
          </div>
    
          {/* Pagination for Sellers */}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sellersInfo.length}
            paginate={paginateSellers}
            currentPage={currentPageSellers}
          />
    
          <h2>Search for a Seller:</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Enter seller email..."
          />
          <div className="search-buttonsq">
            {/* <button onClick={handleSearchItems}>Search Items</button> */}
            <button onClick={handleSearchOrders}>Search Orders</button>
            <button onClick={handleClear}>Clear</button>
          </div>
    
          {/* Display Seller Items if available */}
          {currentSellerItems.length > 0 && (
            <div>
              <h2>Seller's Items:</h2>
              <ul className="items-list">
                {currentSellerItems.map(item => (
                  <>
                  <li key={item.id}>{item.name}</li>
                  {/* <li style={{listStyle:"none"}} key={item.id}>{item.price}</li> */}
                  </>
                ))}
              </ul>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sellerItems.length}
                paginate={paginateItems}
                currentPage={currentPageItems}
              />
            </div>
          )}
    
          {/* Display Seller Orders if available */}
          {currentSellerOrders.length > 0 && (
            <div>
              <br/>
              <h2>Seller's Orders:</h2>
              <ul className="orders-list" style={{padding:"0px",margin:"0px"}}>
                {currentSellerOrders.map(order => (
                  <li key={order.id} style={{listStyle:"none"}}>
                    <h2>Order {order.id}</h2>
                    <p>Created at: {order.createdAt}</p>
                    <p>Total Amount: {order.totalAmount}</p>
                    <p>User Email: {order.userEmail}</p>
                    <ul>
                      {order.orderItems.map(orderItem => (
                        <li key={orderItem.id}>
                          <p>Item Name: {orderItem.name}</p>
                          <p>Price: {orderItem.price}</p>
                          <p>Quantity: {orderItem.quantity}</p>
                          <p>Status: {orderItem.status}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={sellerOrders.length}
                paginate={paginateOrders}
                currentPage={currentPageOrders}
              />
            </div>
          )}
        </div>
        </>
           )}
           </div>
           </>
      );
    };
    
    const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
      const pageNumbers = [];
    
      for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      return (
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'active' : ''}>
              <button onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      );
    };
    
    export default SellerInformation;



// export default SellerInformation;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Sellerinfo.css";

// const SellerInformation = () => {
//     const [sellersInfo, setSellersInfo] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sellerItems, setSellerItems] = useState([]);
//     const [sellerOrders, setSellerOrders] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         };
//         axios.get('http://localhost:8080/items/sellers-info', { headers })
//            .then(response => {
//                 setSellersInfo(response.data);
//                 console.log(response.data)
//             })
//            .catch(error => {
//                 console.error("There was an error fetching the sellers info!", error);
//             });
//     }, []);

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleSearchItems = () => {
//         axios.get(`http://localhost:8080/items/seller/${searchQuery}`)
//            .then(response => {
//                 setSellerItems(response.data);
//             })
//            .catch(error => {
//                 console.error("There was an error fetching the seller's items!", error);
//             });
//     };

//     const handleSearchOrders = () => {
//         axios.get(`http://localhost:8080/orders/orders/seller/${searchQuery}`)
//            .then(response => {
//                 setSellerOrders(response.data);
//             })
//            .catch(error => {
//                 console.error("There was an error fetching the seller's orders!", error);
//             });
//     };

//     const handleClear = () => {
//         setSearchQuery('');
//         setSellerItems([]);
//         setSellerOrders([]);
//     };

//     return (
//         <div className="table-container">
//         <h2>Sellers with Items</h2>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Seller Name</th>
//                     <th>Total Items</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {sellersInfo
//                     .filter(seller => seller.sellerName)
//                     .map((seller, index) => (
//                         <tr key={index}>
//                             <td>{seller.sellerName}</td>
//                             <td>{seller.totalItems}</td>
//                         </tr>
//                     ))}
//             </tbody>
//         </table>
//         <br />
//         <h2>Search for a Seller:</h2>
//         <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Enter seller name..."
//         />
//         <div className="search-buttonsq">
//             <button onClick={handleSearchItems}>Search Items</button>
//             <button onClick={handleSearchOrders}>Search Orders</button>
//             <button onClick={handleClear}>Clear</button>
//         </div>
//         <br />
//         {sellerItems.length > 0 && (
//             <div>
//                 <h2>Seller's Items:</h2>
//                 <ul>
//                     {sellerItems.map(item => (
//                         <li key={item.id}>{item.name}</li>
//                     ))}
//                 </ul>
//             </div>
//         )}
//         {sellerOrders.length > 0 && (
//             <div>
//                 <h2>Seller's Orders:</h2>
//                 <ul>
//                     {sellerOrders.map(order => (
//                         <li key={order.id}>
//                             <h3>Order {order.id}</h3>
//                             <p>Created at: {order.createdAt}</p>
//                             <p>Status: {order.status}</p>
//                             <p>Total Amount: {order.totalAmount}</p>
//                             <p>User Email: {order.userEmail}</p>
//                             <ul>
//                                 {order.orderItems.map(orderItem => (
//                                     <li key={orderItem.id}>
//                                         <p>Item Name: {orderItem.name}</p>
//                                         <p>Price: {orderItem.price}</p>
//                                         <p>Quantity: {orderItem.quantity}</p>
//                                         <p>Status: {orderItem.status}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         )}
//     </div>
// );
// };

// export default SellerInformation;