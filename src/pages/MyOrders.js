import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './MyOrders.css'; // Import CSS file
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Loader state
  const navigate = useNavigate();

  const ordersPerPage = 5;

  let email = null;
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.sub; // or decodedToken.username, depending on your token structure
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token'); // Remove the token from local storage
      localStorage.removeItem('refreshToken'); // Remove the token from local storage
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true); // 🆕 Show loader when fetching starts

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${BASE_URL}/orders/myOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        console.log(response.data)
        setIsLoading(false); // 🆕 Hide loader after fetching completes

        const reviewStatusMap = {};
        const reviewPromises = response.data.flatMap(order =>
          order.orderItems.map(async (item) => {
            if (item.id) {
              const hasReviewed = await hasUserReviewed(item.id);
              reviewStatusMap[item.id] = hasReviewed;
            }
          })
        );
  
        // Wait for all reviews to be checked before updating state
        await Promise.all(reviewPromises);
        setReviewStatus(reviewStatusMap);

      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false); // 🆕 Hide loader after fetching completes

      }
    };

    fetchOrders();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const cancelOrder = (orderId, itemId) => {
    const token = localStorage.getItem('token');  // Assuming you're storing the JWT token in localStorage
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    axios.put(`${BASE_URL}/orders/user/${orderId}/item/${itemId}/status`, null, { headers })
      .then(response => {
        console.log('Order cancelled successfully:', response.data);
        // Handle success (e.g., update UI to reflect order cancellation)
      })
      .catch(error => {
        console.error('Error response:', error.response.data, error.response.status);
        // Handle error (e.g., show error message to user)
      });
    // Update the local state to reflect the cancelled status
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? {
            ...order,
            orderItems: order.orderItems.map(item =>
              item.id === itemId
                ? { ...item, status: 'cancelled' } // Update item status
                : item
            )
          }
          : order
      )
    );
  };


  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);


  const hasUserReviewed = async (itemId) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
      const reviews = response.data.reviews;
      const userReviews = reviews.filter((review) => review.user.email === email);
      return userReviews.length > 0; // If user has a review for this item
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return false;
    }
  };


  const handleAddReview = (itemId) => {
    navigate(`/add-review/${itemId}`); // Redirect to review submission page
  };

  const handleViewReview = (itemId) => {
    navigate(`/view-review/${itemId}`); // Redirect to view review page
  };

  const trackRefund = (itemId) => {
    navigate(`/RefundProgress/${itemId}`); // Redirect to view review page
  };


  const [reviewStatus, setReviewStatus] = useState({}); // New state to hold review status

  

  return (
    <div className="orders-container1">
      <h1>My Orders</h1>

      {/* 🆕 Loader UI */}
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div> {/* Custom loader */}
          <h3> &nbsp; Loading orders...</h3>

        </div>
      ) : orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div>
          <div className="orders-grid1">
            <div className="order-header1">Order ID</div>
            <div className="order-header1">Order Info</div>
            <div className="order-header1">Item Name</div>
            <div className="order-header1">Item Price</div>
            <div className="order-header1">Item quantity</div>
            <div className="order-header1">Status</div>
            <div className="order-header1">Actions</div> {/* 🆕 New Actions Column */}

            {currentOrders.map(order => (
  <React.Fragment key={order.id}> {/* Use order.id directly */}
    <div className="order-item1">{order.id}</div>
    <div className="order-item1 dat">
      <p>Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</p>
      <br />
      <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
    </div>
    <div className="order-item1">
      <ul>
        {order.orderItems.map(item => (
          <li key={item.id || `item-${Math.random()}`}> {/* Use item.id or fallback to random */}
            <h3 style={{ cursor: "pointer" }} onClick={() => navigate(`/item/${item.id}`)}>{item.name}</h3>
          </li>
        ))}
      </ul>
    </div>

    <div className="order-item1">
      <ul>
        {order.orderItems.map(item => (
          <li key={`price-${item.id || `price-${Math.random()}`}`}> {/* Unique key with fallback */}
            <h3>${item.price}</h3>
          </li>
        ))}
      </ul>
    </div>

    <div className="order-item1">
      <ul>
        {order.orderItems.map(item => (
          <li key={`quantity-${item.id || `quantity-${Math.random()}`}`}> {/* Unique key with fallback */}
            <h3>Quantity: {item.quantity}</h3>
          </li>
        ))}
      </ul>
    </div>

    <div className="order-item1">
      <ul>
        {order.orderItems.map(item => (
          <li key={`status-${item.id || `status-${Math.random()}`}`}> {/* Unique key with fallback */}
            <h3> {item.status}</h3>
          </li>
        ))}
      </ul>
    </div>

    <div className="order-item1"> {/* Actions Column */}
      <ul>
        {order.orderItems.map(item => (
          <li key={`action-${item.id || `action-${Math.random()}`}`}> {/* Unique key with fallback */}
            {item.status === 'delivered' ? (
              reviewStatus[item.id] ? (
                <button
                  style={{ backgroundColor: '#007bff', color: 'whitesmoke' }}
                  onClick={() => handleViewReview(item.id)}
                >
                  View Review
                </button>
              ) : (
                <button
                  style={{ backgroundColor: '#007bff', color: 'whitesmoke' }}
                  onClick={() => handleAddReview(item.id)}
                >
                  Add Review
                </button>
              )
            ) : item.status === 'cancelled' ||
              item.status === 'cancelled by seller' ||
              item.status === 'cancelled by user' ? (
              <button style={{ backgroundColor: '#007bff', color: 'whitesmoke' }}
                onClick={() => trackRefund(item.id)}

              >
                Track Refund
              </button>
            ) : (
              <button
                style={{ backgroundColor: '#007bff', color: 'whitesmoke' }}
                onClick={() => cancelOrder(order.id, item.id)}
              >
                Cancel Order
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  </React.Fragment>
))}

          </div>
          <div className="pagination1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;


  // useEffect(() => { // working
  //   const timer = setTimeout(() => {
  //     window.scrollTo({
  //       top: 2000,
  //       behavior: 'smooth',
  //     });
  //   }, 100); // Adjust timeout if needed

  // }, [location,orders]);

  // useEffect(() => {  // working with speed control over scrolling also
  //   const smoothScrollTo = (targetPosition, duration) => {
  //     const startPosition = window.pageYOffset;
  //     const distance = targetPosition - startPosition;
  //     let startTime = null;

  //     const animation = currentTime => {
  //       if (startTime === null) startTime = currentTime;
  //       const timeElapsed = currentTime - startTime;
  //       const run = ease(timeElapsed, startPosition, distance, duration);
  //       window.scrollTo(0, run);
  //       if (timeElapsed < duration) requestAnimationFrame(animation);
  //     };

  //     const ease = (t, b, c, d) => {
  //       t /= d / 2;
  //       if (t < 1) return (c / 2) * t * t + b;
  //       t--;
  //       return (-c / 2) * (t * (t - 2) - 1) + b;
  //     };

  //     requestAnimationFrame(animation);
  //   };

  //   // Scroll to 1000px down from the top of the page with a duration of 1 second
  //   smoothScrollTo(1040, 1100);

  // }, [location,orders]);

//   return (
//     <div>
//       <h1>My Orders</h1>
//       {orders.length === 0 ? (
//         <p>You have no orders.</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order.id}>
//               <h2>Order #{order.id}</h2>
//               <p>Total Amount: ${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</p>
//               <p>Created At: {new Date(order.createdAt).toLocaleString()}</p> {/* Display the date and time */}
//               <ul>
//                 {order.orderItems.map(item => (
//                   <>
//                   <li key={item.id+2}>
//                     <p>{item.name} - Price: ${item.price}</p>
//                   </li>
//                   <li key={item.id+9}>
//                     <p> Quantity: {item.quantity}</p>
//                   </li>
//                   </>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

