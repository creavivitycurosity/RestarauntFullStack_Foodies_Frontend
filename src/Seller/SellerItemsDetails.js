import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SellerItemDateRange from './SellerItemDateRange';
import "./SellerItemsDetails.css"
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SellerItemsDetails = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [SellerId, setSellerId] = useState(0);
  const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 4; // Show 4 items per page

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   const fetchItems = async () => {
  //     const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     setSellerId(idresponse.data);
  //     console.log(idresponse.data)

  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${BASE_URL}/orders/seller-item-detail/${sellerEmail2}/${SellerId}`, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //       });
  //       setItems(response.data);
  //       console.log("data about each item" + response.data)
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchItems();
  //   console.log("Item Response DTOs:", items);

  // }, [SellerId]);

  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const idresponse = await axios.get(`${BASE_URL}/orders/seller-id/${sellerEmail2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSellerId(idresponse.data);
        console.log("Seller ID:", idresponse.data);
      } catch (error) {
        console.error("Error fetching SellerId:", error);
        setError(error.message);
      }
    };
    
    fetchSellerId();
  }, [sellerEmail2]);  // 🛠️ Only runs once on component mount

  useEffect(() => {
    if (SellerId === 0) return; // 🛠️ Don't fetch if SellerId is not set yet
  
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/orders/seller-item-detail/${sellerEmail2}/${SellerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setItems(response.data);
        console.log("Items Data:", response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [SellerId, sellerEmail2]);  // 🛠️ Runs when SellerId is set
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

   // Pagination logic
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
 
   const nextPage = () => {
     if (currentPage < Math.ceil(items.length / itemsPerPage)) {
       setCurrentPage(prev => prev + 1);
     }
   };
 
   const prevPage = () => {
     if (currentPage > 1) {
       setCurrentPage(prev => prev - 1);
     }
   };
 
   return (
     <div>
       <h1>Seller Item Details</h1>
       <div className="seller-items-container">
         {currentItems.map(item => (
           <div className="item-card" key={item.id}>
             <div className="item-card-header">
               <div className="item-name">{item.name}</div>
               <div className="item-price">${item.price}</div>
             </div>
             <div className="item-details">
               <div className="detail-item">
                 <span>Total Quantity</span>
                 {item.totalAmount / item.price}
               </div>
               <div className="detail-item">
                 <span>Total Orders</span>
                 {item.totalOrders}
               </div>
               <div className="detail-item">
                 <span>Total Amount</span>
                 {item.totalAmount}
               </div>
               <div className="detail-item">
                 <span>Orders Today</span>
                 {item.totalOrdersToday}
               </div>
               <div className="detail-item">
                 <span>Amount Today</span>
                 {item.totalAmountToday}
               </div>
               <div className="detail-item">
                 <span>Orders This Week</span>
                 {item.totalOrdersThisWeek}
               </div>
               <div className="detail-item">
                 <span>Amount This Week</span>
                 {item.totalAmountThisWeek}
               </div>
               <div className="detail-item">
                 <span>Orders This Month</span>
                 {item.totalOrdersThisMonth}
               </div>
               <div className="detail-item">
                 <span>Amount This Month</span>
                 {item.totalAmountThisMonth}
               </div>
             </div>
           </div>
         ))}
       </div>
 
       {/* Pagination Controls */}
       {/* <div className="pagination">
         <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
         <button onClick={nextPage} disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>Next</button>
       </div> */}
       {/* Pagination Controls */}
<div className="pagination">
  {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}
</div>
 
       {/* <hr />
       <SellerItemDateRange /> */}
     </div>
   );
 };
 
 export default SellerItemsDetails;



















// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const SellerItemsDetails = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [SellerId, setSellerId] = useState(0);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const sellerEmail2 = jwtDecode(localStorage.getItem('token')).sub;
//   const token = localStorage.getItem('token');

//   const fetchItems = useCallback(async () => {
//     setLoading(true);
//     try {
//       const idresponse = await axios.get(`http://localhost:8080/orders/seller-id/${sellerEmail2}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSellerId(idresponse.data);
  
//       // Wait for SellerId to be updated before making the API call
//       if (SellerId !== 0) {
//         const response = await axios.get(`http://localhost:8080/orders/seller-items`, {
//           params: {
//             sellerEmail: sellerEmail2,
//             sellerId: SellerId
//           },
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const itemsArray = response.data;
  
//         const itemResponses = await Promise.all(itemsArray.map(async (item) => {
//           const itemResponse = await axios.get(`http://localhost:8080/orders/seller-item-orders`, {
//             headers: { Authorization: `Bearer ${token}` },

//             params: {
//               sellerEmail: sellerEmail2,
//               sellerId: SellerId,
//               itemId: item.id,
//               startDate: startDate.toISOString().slice(0, 10),
//               endDate: endDate.toISOString().slice(0, 10)
//             }
//           });
//           return itemResponse.data;
//         }));
//         setItems(itemResponses);
//       }
//     } catch (error) {
//       console.error(error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [SellerId, startDate, endDate, token]);
//   useEffect(() => {
//     fetchItems();
//   }, [fetchItems]);

//   const itemsMemo = useMemo(() => items, [items]);


//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Seller Items</h1>
//       <input type="date" value={startDate.toISOString().slice(0, 10)} onChange={(e) => setStartDate(new Date(e.target.value))} />
//       <input type="date" value={endDate.toISOString().slice(0, 10)} onChange={(e) => setEndDate(new Date(e.target.value))} />
//       <ul>
//         {itemsMemo.map((item) => (
//           <li key={item.id}>
//             <h2>{item.name}</h2>
//             <br />
//             <p>Price: {item.price}</p>
//             <p>Description: {item.description}</p>
//             <p>Total Orders: {item.totalOrders}</p>
//             <p>Total Amount: {item.totalAmount}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SellerItemsDetails;