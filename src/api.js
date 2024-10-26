// src/api.js

import axios from 'axios';

// Use the environment variable for the base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log('API Base URL:', API_BASE_URL); // Add this line

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Item Controller API calls
export const getAllItems = () => api.get('/items/allitems');
export const getItemImage = (id) => api.get(`/items/images/${id}`, { responseType: 'arraybuffer' });
export const searchItems = (query) => api.get('/items/search', { params: { query } });
export const getItemById = (id) => api.get(`/items/${id}`);
export const getItemsByName = (name) => api.get(`/items/name/${name}`);
export const deleteItemById = (id) => api.delete(`/items/delete/${id}`);
export const getCategories = () => api.get('/items/categories');
export const getCategoriesWithRandomImages = () => api.get('/items/categories-with-random-images');
export const getCategoryList = () => api.get('/items/get/category');
export const getItemsByCategory = (categoryId) => api.get(`/items/category/${categoryId}`);
export const addCategory = (name) => api.post('/items/admin/add-category', { name });
export const addNewItem = (item) => api.post('/items/admin/addnew', item);
export const editItem = (id, item) => api.put(`/items/admin/edit/${id}`, item);
export const featureItem = (id, featured) => api.put(`/items/admin/feature/${id}`, { featured });
export const getFeaturedItems = () => api.get('/items/featured');
export const updateDiscount = (id, discountPercentage) => api.put(`/items/update-discount/${id}`, { discountPercentage });
export const removeDiscount = (id) => api.put(`/items/remove-discount/${id}`);
export const getSellerItems = () => api.get('/items/seller');
export const getSellerItemsByEmail = (sellerEmail) => api.get(`/items/seller/${sellerEmail}`);
export const getSellerItemsByRestaurantName = (restaurantName) => api.get(`/items/seller/name/${restaurantName}`);
export const addSellerItem = (item) => api.post('/items/add-seller-item', item);
export const updateSellerItem = (id, item) => api.put(`/items/update-seller-item/${id}`, item);
export const deleteSellerItem = (id) => api.delete(`/items/delete-seller-item/${id}`);
export const getSellerItemById = (id) => api.get(`/items/seller-item/${id}`);
export const addNewSellerItem = (item) => api.post('/items/seller/addnew', item);
export const editSellerItem = (id, item) => api.put(`/items/seller/edit/${id}`, item);
export const getTotalUniqueSellers = () => api.get('/items/total-unique-sellers');
export const getTotalSellers = () => api.get('/items/total-sellers');
export const getSellersInfo = () => api.get('/items/sellers-info');
export const getSellerCategoriesWithRandomImages = () => api.get('/items/seller-categories-with-random-images');
export const getReviewsForItem = (itemId) => api.get(`/items/reviews/item/${itemId}`);
export const addOrUpdateReview = (itemId, reviewRequest) => api.post(`/items/item/${itemId}`, reviewRequest);
export const getNewItemReviews = (itemId) => api.get(`/items/new/item/${itemId}`);

// Order Controller API calls
export const createOrder = (orderRequest) => api.post('/orders/orders', orderRequest);
export const getOrdersForSeller = (sellerEmail) => api.get(`/orders/orders/seller/${sellerEmail}`);
export const updateOrderStatus = (orderId, statusUpdate) => api.put(`/orders/seller/${orderId}/status`, statusUpdate, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const updateOrderStatus2 = (orderId, statusUpdate) => api.put(`/orders/seller/${orderId}/status2`, statusUpdate, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const updateOrderItemStatusForUser = (orderId, itemId) => api.put(`/orders/user/${orderId}/item/${itemId}/status`, {}, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const updateOrderItemStatusForSeller = (orderId, itemId, statusUpdate) => api.put(`/orders/seller/${orderId}/item/${itemId}/status`, statusUpdate, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const getOrderItemStatus = (orderId, itemId) => api.get(`/orders/order/${orderId}/item/${itemId}/status`, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const placeOrder = (orderRequest) => api.post('/orders/placeOrder', orderRequest, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const getSellerIdByEmail = (sellerEmail) => api.get(`/orders/seller-id/${sellerEmail}`);
export const getAllOrders = () => api.get('/orders/allOrders2');
export const getOrdersForSellers = (sellerEmail) => api.get(`/orders/seller/allOrders/${sellerEmail}`);
export const getMyOrders = () => api.get('/orders/myOrders', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const getTotalAmount = () => api.get('/orders/totalAmount');
export const getSellerTotalAmount = (sellerEmail, sellerId) => api.get(`/orders/sellerTotalAmount/totalAmount/${sellerEmail}/${sellerId}`);
// export const getAllUsers = () => api.get('/allUsers');
export const updateOrderStatusWithToken = (orderId, statusUpdate) => api.put(`/orders/${orderId}/status`, statusUpdate, {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const getAllOrdersForUser = () => api.get('/orders/allOrders', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
});
export const getWeeklyOrders = () => api.get('/orders/weeklyOrders');
export const getSellerWeeklyOrders = (sellerEmail, sellerId) => api.get(`/orders/sellerweeklyOrders/weeklyOrders/${sellerEmail}/${sellerId}`);
export const getMonthlyOrders = () => api.get('/orders/monthlyOrders');
export const getSellerMonthlyOrders = (sellerEmail, sellerId) => api.get(`/orders/sellermonthlyOrders/monthlyOrders/${sellerEmail}/${sellerId}`);
export const getTodayOrders = () => api.get('/orders/todayOrders');
export const getSellerTodayOrders = (sellerEmail, sellerId) => api.get(`/orders/sellertodayOrders/todayOrders/${sellerEmail}/${sellerId}`);
export const getCustomOrders = (startDate, endDate) => api.get('/orders/customOrders', { params: { startDate, endDate } });
export const getCount = (startDate, endDate) => api.get('/orders/count', { params: { startDate, endDate } });
export const getSellerItemDetail = (sellerEmail, sellerId) => api.get(`/orders/seller-item-detail/${sellerEmail}/${sellerId}`);
export const getSellerItemDetailsWithWeekEnd = (sellerEmail, sellerId) => api.get(`/orders/seller-item-detailss/${sellerEmail}/${sellerId}`);
export const getSellerItemDetailDateRange = (sellerEmail, sellerId, startDate, endDate) => api.get(`/orders/seller-item-detail-date-range/${sellerEmail}/${sellerId}`, { params: { startDate, endDate } });

// User Controller API calls
export const getAllUsers = () => api.get('/api/users');
export const toggleUserStatus = (id, enabled) => api.put(`/api/users/${id}/status`, null, {
  params: { enabled }
});
export const deleteUserById = (id) => api.delete(`/api/users/${id}`);
export const getUserOrdersByEmail = (email) => api.get(`/api/users/orders/${email}`);
export const getUserImageByEmail = (email) => api.get(`/api/users/image`, {
  params: { email },
  responseType: 'arraybuffer'
});

// Coupon Controller API calls
export const applyCoupon = (couponRequest) => api.post('/orders/apply', couponRequest);
export const createCoupon = (coupon) => api.post('/orders/create', coupon);
export const deleteCouponById = (id) => api.delete(`/orders/delete/${id}`);
export const getCouponById = (id) => api.get(`/orders/${id}`);
export const getCouponByName = (couponName) => api.get(`/orders/byname/${couponName}`);
export const getAllCoupons = () => api.get('/orders/all');

export default api;
