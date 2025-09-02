import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu'
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ItemDetails from './pages/ItemDetails';
import Menu2 from './pages/Menu2';
import Menu3 from './pages/Menu3';
import ItemsPage from './pages/ItemsPage';
import MyOrders from './pages/MyOrders';
import AdminHome from './admin/AdminHome';
import UpdateItem from './admin/UpdateItem';
import AddItem from './admin/AddItem';

import { jwtDecode } from 'jwt-decode';
import AdminNavbar from './admin/AdminNavbar';
import UpdateOrderStatus from './admin/UpdateOrderStatus';
import OrderStatusSegregation from './admin/OrderStatusSegregation';
import PayPalButton from './pages/PayPalButton';
import Dashboard from './admin/Dashboard';
import OrderStatusAll from './admin/OrderStatusAll';
import CategoryItems from './Components/CategoryItems';
import Categories from './Components/Categories';
import PaymentPage from './Components/PaymentPage';
import CartPage from './Components/CartPage';
import AddCategory from './admin/AddCategory';
import CategoryPage from './admin/CategoryPage';
import AdminDashboard from './admin/AdminDashboard';
import AdminHomePage from './admin/AdminHomePage';
import SellerSignUp from './Seller/SellerSignUp';
import SellerSignIn from './Seller/SellerSignIn';
import SellerItems from './Seller/SellerItems';
import AddEditItem from './Seller/AddEditItem';
import AddItemSeller from './Seller/AddItemSeller';
import Updateitemseller from './Seller/Updateitemseller';
import SellerInformation from './admin/SellerInformation';
import SellerOrders from './Seller/SellerOrders';
import SellerNavbar from './Seller/SellerNavbar';
import SellerOrderStatus from './Seller/SellerOrderStatus';
import SellerUpdateOrderStatus from './Seller/SellerUpdateOrderStatus';
import UpdateOrderItemStatus from './Seller/UpdateOrderItemStatus';
import SellerDashboard from './Seller/SellerDashboard';
import SearchResults from './Components/SearchResults';
import UserList from './admin/UserList';
import SellerItemsDetails from './Seller/SellerItemsDetails';
import SellerItemDateRange from './Seller/SellerItemDateRange';
import UserOrderSearch from './admin/UserOrderSearch';
import SellerCategories from './Components/SellerCategories';
import SellerCategoryItems from './Components/SellerCategoryItems';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CouponManagement from './admin/CouponManagement';
import OfferedItemsAndCategories from './Components/OfferedItemsAndCategories';
import CategoryDiscountItems from './Components/CategoryDiscountItems';
import SellerOfferCategory from './Components/SellerOfferCategory';
import SellerDiscountedItems from './Components/SellerDiscountedItems';
import DiscountSlider from './Components/DiscountedItemsSlider';
import Favorites from './pages/Favorites';
import UserProfile from './pages/UserProfile';
import CategoryAdminitems from './admin/CategoryAdminitems';
import AdminSellerItems from './admin/AdminSellerItems';
import AdminSellerCategories from './admin/AdminSellerCategories';
import AdminItemDetails from './admin/AdminItemDetails';
import Footer from './pages/Footer';
import CartAlert from './Components/CartAlert';
import ItemStock from './Seller/ItemStock';
import SellerItemsInfo from './Seller/SellerItemsInfo';
import SellerProfile from './Seller/SellerProfile';
import ItemType from './Components/ItemType';
import ItemTypeItems from './Components/ItemTypeItems';
import AdressFormView from './pages/AdressFormView';
import SellerList from './admin/SellerList';
import SellersSummary from './admin/SellersSummary';
import AdminItemType from './admin/AdminItemType';
import AdminItemTypeItems from './admin/AdminItemTypeItems';
import ItemTypeOffers from './Components/ItemTypeOffers';
import ItemTypeOfferItems from './Components/ItemTypeOfferItems';
import AddReview from './pages/AddReview';
import ViewReview from './pages/ViewReview';
import RefundProgress from './pages/RefundProgress';
import RefundPrigressSeller from './Seller/RefundPrigressSeller';
import ComparePage from './pages/ComparePage';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const App = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const [tokens, setTokens] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [cartItemName, setCartItemName] = useState('');


  const adminRoutes = ['/admin', '/admin/*']; // Define admin routes here
  const sellerRoutes = ['/seller', '/seller/*']; // Define seller routes here

  const [role, setRole] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Invalid token:', error);
        console.log(role)
        setRole('USER')
      }
    }
  }, [token]);


  const fetchItemQuantity = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/${id}`);
      return response.data.quantity;
    } catch (error) {
      console.error('Error fetching item quantity:', error);
      return null;
    }
  };




  const addtocart = async (dish) => {
    
    const availableQuantity = await fetchItemQuantity(dish.id);
    if (availableQuantity !== null) {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === dish.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === dish.id && item.quantity < availableQuantity
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return availableQuantity > 0
            ? [...prevCart, { ...dish, quantity: 1 }]
            : prevCart;
        }
      });
    }
    setCartItemName(dish.name); // Set the name of the added item
    setShowAlert(true); // Show the alert
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  const clearcart = () => {
    setCart([]);

  }
  // Increase item quantity with quantity check
  const increaseQuantity = async (id) => {
    const availableQuantity = await fetchItemQuantity(id);
    setCart(prevCart => prevCart.map(item =>
      item.id === id && item.quantity < availableQuantity
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  // Decrease item quantity
  const decreaseQuantity = async (id) => {
    const availableQuantity = await fetchItemQuantity(id);
    setCart(prevCart => prevCart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    ));
  };


  useEffect(() => {
    console.log('Role updated:', role); // Log the role whenever it is updated
  }, [role]);

  const isAdminRoute = adminRoutes.some(route => location.pathname.startsWith(route));
  const isSellerRoute = sellerRoutes.some(route => location.pathname.startsWith(route));

  const queryClient = new QueryClient();

  return (
    <div>
      <CartAlert show={showAlert} itemName={cartItemName} onClose={() => setShowAlert(false)} name={"ADDED TO YOUR CART"}/>

      {isAdminRoute ? (
        <AdminNavbar />
      ) : isSellerRoute ? (
        <SellerNavbar />
      ) : (
        <Navbar cart={cart} />
      )}

      <div style={{ marginTop: "14vh" }}></div>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path='/' element={<Home addtocart={addtocart} />}></Route>
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} setCart={setCart} clearcart={clearcart} />}></Route>
          <Route path='/Menu' element={<Menu addtocart={addtocart} />}></Route>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='/About' element={<About />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path="/item/:id" element={<ItemDetails addtocart={addtocart} />} />
          <Route path='/Menu2' element={<Menu2 addtocart={addtocart} />}></Route>
          <Route path='/Menu3' element={<Menu3 addtocart={addtocart} />}></Route>
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryItems addtocart={addtocart} />} />
          <Route path='/cartpage' element={<CartPage cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} setCart={setCart} clearcart={clearcart} />}></Route>
          <Route path="/payment" element={<PaymentPage setCart={setCart} />} />
          <Route path="/search-results/:query?" element={<SearchResults addtocart={addtocart} />} />
          <Route path="/selle-categories" element={<SellerCategories />} />
          <Route path="/selle-categories-items/:sellerEmail" element={<SellerCategoryItems addtocart={addtocart} />} />
          <Route path="/offers" element={<OfferedItemsAndCategories />} />
          <Route path="/offers/:categoryId" element={<CategoryDiscountItems />} />
          <Route path="/sell-offers/:sellerName" element={<SellerDiscountedItems />} />
          <Route path="/sell-offers" element={<SellerOfferCategory />} />
          <Route path="/favorites" element={<Favorites addtocart={addtocart}/>} />
          <Route path="/details" element={<UserProfile/>} />
          <Route path="/itemtype" element={<ItemType />} />
          <Route path="/itemtype/:category" element={<ItemTypeItems addtocart={addtocart}/>} />
          <Route path="/adress-view" element={<AdressFormView/>} />
          <Route path="/items-offers" element={<ItemTypeOffers />} />
          <Route path="/items-offers-view/:category" element={<ItemTypeOfferItems addtocart={addtocart}/>} />
          <Route path="/add-review/:itemId" element={<AddReview/>} />
          <Route path="/view-review/:itemId" element={<ViewReview />} />
          <Route path="/RefundProgress/:itemId" element={<RefundProgress />} />
          <Route path="/compare/:itemId" element={<ComparePage />} />


          {/* <Route path="/search-results" element={<SearchResults addtocart={addtocart} />} /> */}

          {/* <Route path="/item-offers" element={<DiscountSlider addtocart={addtocart}/>} /> */}

          <Route path="/admin/homepage" element={<AdminHomePage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/update/:id" element={<UpdateItem />} />
          <Route path="/admin/add" element={<AddItem />} />
          <Route path='/admin/UpdateOrderStatus/:orderId2/:status2' element={<UpdateOrderStatus />} />
          <Route path='/admin/OrderStatusAll' element={<OrderStatusAll />} />
          <Route path='/admin/OrderStatusSegregation' element={<OrderStatusSegregation />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/addcategory" element={<AddCategory />} />
          <Route path="/admin/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/items/category/:categoryId" element={<CategoryPage />} />
          <Route path="/admin/seller-info" element={<SellerInformation />} />
          <Route path="/admin/user-info" element={<UserList />} />
          <Route path="/admin/user-order-info" element={<UserOrderSearch />} />
          <Route path="/admin/couponManagement" element={<CouponManagement />} />
          <Route path="/admin/category-items/category/:categoryId" element={<CategoryAdminitems/>} />
          <Route path="admin/selle-categories" element={<AdminSellerCategories />} />
          <Route path="admin/selle-items/:sellerEmail" element={<AdminSellerItems />} />
          <Route path="admin/items/:id" element={<AdminItemDetails/>} />
          <Route path="admin/selle-SellersSummary" element={<SellersSummary />} />
          <Route path="admin/selle-SellerList" element={<SellerList />} />
          <Route path="admin/item-type" element={<AdminItemType />} />
          <Route path="admin/item-type/:category" element={<AdminItemTypeItems />} />


          <Route path="/seller/sellerhome" element={<SellerItems />} />
          <Route path="/sell-signup" element={<SellerSignUp />} />
          <Route path="/sell-signin" element={<SellerSignIn setToken={setTokens} />} />
          {/* <Route path="/seller/sellerhome/seller/items/add" element={<AddEditItem isEdit={false} />} /> */}
          {/* <Route path="/seller/items/edit/:id" element={<AddEditItem isEdit={true} />} /> */}
          <Route path="/seller/items/edit/:id" element={<Updateitemseller />} />
          <Route path="/seller/items/add" element={<AddItemSeller />} />
          <Route path="/seller/SellerOrders" element={<SellerOrders />} />
          <Route path="/seller/SellerOrderStatus" element={<SellerOrderStatus />} />
          <Route path="/seller/SellerUpdateOrderStatus/:orderId2/:status2" element={<SellerUpdateOrderStatus />} />
          <Route path="/seller/UpdateOrderItemStatus/:orderId3/:status3/:orderId4" element={<UpdateOrderItemStatus />} />
          <Route path="/seller/Dashboard" element={<SellerDashboard />} />
          <Route path="/seller/item-details" element={<SellerItemsDetails />} />
          <Route path="/seller/items-stock" element={<ItemStock />} />
          <Route path="/seller/items-info/:id" element={<SellerItemsInfo />} />
          <Route path="/seller/seller-profile" element={<SellerProfile />} />
          <Route path="/seller/seller-RefundProgress/:itemId" element={<RefundPrigressSeller />} />


        </Routes>
      </QueryClientProvider>
     {/* Conditionally render footer only for non-admin and non-seller users */}
     {!isAdminRoute && !isSellerRoute && <Footer />}
    </div>
  );
}

export default App;