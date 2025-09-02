
import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './MyOrders.css';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewStatus, setReviewStatus] = useState({}); // holds review status per item
  const navigate = useNavigate();

  const ordersPerPage = 4;
  let email = null;
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.sub; // Adjust based on your token structure
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(`${BASE_URL}/orders/myOrders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
        setIsLoading(false);

        const reviewStatusMap = {};
        const reviewPromises = response.data.flatMap(order =>
          order.orderItems.map(async (item) => {
            if (item.id) {
              const hasReviewed = await hasUserReviewed(item.id);
              reviewStatusMap[item.id] = hasReviewed;
            }
          })
        );
        await Promise.all(reviewPromises);
        setReviewStatus(reviewStatusMap);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const hasUserReviewed = async (itemId) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/new/item/${itemId}`);
      const reviews = response.data.reviews;
      const userReviews = reviews.filter(review => review.user.email === email);
      return userReviews.length > 0;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return false;
    }
  };

  const handleAddReview = (itemId) => {
    navigate(`/add-review/${itemId}`);
  };

  const handleViewReview = (itemId) => {
    navigate(`/view-review/${itemId}`);
  };

  const trackRefund = (itemId) => {
    navigate(`/RefundProgress/${itemId}`);
  };

  const cancelOrder = (orderId, itemId) => {
    const token = localStorage.getItem('token');
    axios.put(`${BASE_URL}/orders/user/${orderId}/item/${itemId}/status`, null, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    })
      .then(response => console.log('Order cancelled successfully:', response.data))
      .catch(error => console.error('Error cancelling order:', error));
    
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? {
              ...order,
              orderItems: order.orderItems.map(item =>
                item.id === itemId ? { ...item, status: 'cancelled' } : item
              )
            }
          : order
      )
    );
  };

  // Pagination logic
  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orders-containerz1">
      <h1 className="orders-titlez1">My Orders</h1>

      {isLoading ? (
        <div className="loader-containerz1">
          <div className="loaderz1"></div>
          <h3>Loading orders...</h3>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-ordersz1">
          <img src="/empty-order.svg" alt="No orders" />
          <p>No orders found. Start shopping!</p>
        </div>
      ) : (

        <>
        <div className="orders-listz1">
          {currentOrders.map(order => (
            <div key={order.id} className="order-cardz1">
              <div className="order-headerz1">
                <div className="order-metaz1">
                  <span className="order-idz1">Order #{order.id}</span>
                  <span className="order-datez1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-totalz1">
                  Total: ₹{order.totalAmount?.toFixed(2) || '0.00'}
                </div>
              </div>

              <div className="order-itemsz1">
                {order.orderItems.map(item => {
                  // Default to empty string if item.status is null
                  const statusText = item.status || "";
                  const statusClass = statusText.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={item.id} className="item-rowz1">
                      <div className="item-infoz1">
                        {/* <img 
                          src={`data:image/png;base64,${item.image}`} 
                          alt={item.name} 
                          className="item-imagez1"
                          onClick={() => navigate(`/item/${item.id}`)}
                        /> */}
                        <div className="item-detailsz1">
                          <h3 onClick={() => navigate(`/item/${item.id}`)}>
                            {item.name}
                          </h3>
                          <div className="item-specsz1">
                            <span>₹{item.price}</span>
                            <span>Qty: {item.quantity}</span>
                            <span className={`status-badgez1 ${statusClass}`}>
                            <b>Status :</b>  {item.status || "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="item-actionsz1">
                        {statusText === 'delivered' ? (
                          reviewStatus[item.id] ? (
                            <button 
                              className="action-btnz1 view-reviewz1"
                              onClick={() => handleViewReview(item.id)}
                            >
                              <span>📝</span> View Review
                            </button>
                          ) : (
                            <button
                              className="action-btnz1 add-reviewz1"
                              onClick={() => handleAddReview(item.id)}
                            >
                              <span>⭐</span> Add Review
                            </button>
                          )
                        ) : (['cancelled', 'cancelled by seller', 'cancelled by user'].includes(statusText)) ? (
                          <button 
                            className="action-btnz1 track-refundz1"
                            onClick={() => trackRefund(item.id)}
                          >
                            <span>💸</span> Track Refund
                          </button>
                        ) : (
                          <button
                            className="action-btnz1 cancel-orderz1"
                            onClick={() => cancelOrder(order.id, item.id)}
                          >
                            <span>✖️</span> Cancel Item &nbsp;&nbsp;
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

         
        </div>

<div className="paginationz1">
{Array.from({ length: totalPages }, (_, index) => (
  <button
    key={index + 1}
    onClick={() => handlePageChange(index + 1)}
    className={`page-btnz1 ${currentPage === index + 1 ? 'active' : ''}`}
  >
    {index + 1}
  </button>
))}
</div>
</>
      )}
    </div>
  );
};

export default MyOrders;
