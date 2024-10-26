// import React, { useState, useEffect } from 'react';
// import '../pages/Cart.css';
// import { useNavigate } from 'react-router-dom';

// const CartPage = ({ cart = [], removeFromCart, increaseQuantity, decreaseQuantity, setCart, clearcart }) => {
//     const navigate = useNavigate();

//     const calculateTotal = (cart) => {
//       return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     };

//     const [totalAmount, setTotalAmount] = useState(calculateTotal(cart));

//     useEffect(() => {
//       setTotalAmount(calculateTotal(cart));
//     }, [cart]);

//     const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in initially

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setIsLoggedIn(false);
//         } else {
//             setIsLoggedIn(true);
//         }
//     }, [navigate]);

//     const handleCheckout = () => {
//       if (isLoggedIn) {
//           navigate('/payment', { state: { cart, totalAmount } });
//       } else {
//         window.alert("please sign in")
//           navigate('/signin');
//       }
//   };

//     return (
//       <div className="cpage">
//         <div className="cartname">
//           <h1>CART</h1>
//         </div>
//         {cart.length === 0 ? (
//           <p className="p">Your cart is empty.</p>
//         ) : (
//           <>
//             <button className="remove-button ps" onClick={clearcart}>CLEAR CART</button>
//             <div style={{ marginTop: "3vh" }}></div>
//             <div className="cartitems">
//               <ul>
//                 {cart.map(item => (
//                   <li key={item.id} className="cartdiv">
//                     <div className="cart-img">
//                       <img src={item.image} alt={item.name} width={50} height={50} />
//                     </div>
//                     <div>
//                       <h1>{item.name}</h1>
//                       <h3>Quantity: {item.quantity}</h3>
//                       <h3>Price: ₹{item.price}</h3>
//                       <button className="action-button" onClick={() => decreaseQuantity(item.id)}>-</button>
//                       <button className="action-button" onClick={() => increaseQuantity(item.id)}>+</button>
//                       <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="total">
//               <hr />
//               <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
//               <hr />
//               <button
//                 className="checkout-button"
//                 style={{ backgroundColor: "skyblue"}}
//                 // onClick={() => navigate('/payment', { state: { cart, totalAmount } })}
//                 onClick={handleCheckout}

//               >
//                 PROCEED TO CHECKOUT
//               </button>
//             </div>
//             <br />
//           </>
//         )}
//       </div>
//     );
//   }

// export default CartPage;
import React, { useState, useEffect } from 'react';
import '../pages/Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CgSmileSad } from "react-icons/cg";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CartPage = ({ cart = [], removeFromCart, increaseQuantity, decreaseQuantity, setCart, clearcart }) => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const calculateTotal = (cart) => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const [totalAmount, setTotalAmount] = useState(calculateTotal(cart));

    useEffect(() => {
        setTotalAmount(calculateTotal(cart));
    }, [cart]);

    // Fetch user addresses on mount
    useEffect(() => {

        const token = localStorage.getItem('token');
        let email
        if (token) {

            const decodedToken = jwtDecode(token);
            email = decodedToken.sub;


        }

        console.log(email)
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/users/me?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAddresses(response.data.addresses);
                console.log(response.data.addresses)
                if (response.data.addresses.length === 1) {
                    setSelectedAddress(response.data.addresses[0]);
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };
        fetchAddresses();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    const handleCheckout = () => {
        if (isLoggedIn) {
            if (addresses.length === 0) {
                alert("Please add an address in your profile.");
                navigate('/details');
            } else {
                setShowAddressModal(true);
            }
        } else {
            window.alert("please sign in")
            navigate('/signin');
        }
    };
    console.log(cart); // Check if restaurantName is present



    const handleProceedToPayment = () => {
        if (!selectedAddress) {
            alert("Please select an address to proceed.");
            return;
        }

        setShowAddressModal(false);
        navigate('/payment', { state: { cart, totalAmount, selectedAddress } });
    };




    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        const fetchQuantities = async () => {
            const quantities = {};
            for (const item of cart) {
                try {
                    const response = await axios.get(`${BASE_URL}/items/${item.id}`);
                    quantities[item.id] = response.data.quantity;
                } catch (error) {
                    console.error('Error fetching item quantity:', error);
                }
            }
            setItemQuantities(quantities);
        };
        fetchQuantities();
    }, [cart]);

    const getStockMessage = (item) => {
        const availableQuantity = itemQuantities[item.id];
        if (availableQuantity === undefined) return '';

        if (item.quantity > availableQuantity) {
            return `Out of stock! Only ${availableQuantity} available.`;
        } else if (item.quantity === availableQuantity) {
            return `Last item in stock!`;
        }
        return '';
    };




    // Add this inside CartPage.js
    const [couponCode, setCouponCode] = useState('');
    const [couponAmount, setCouponAmount] = useState(0);

    const handleApplyCoupon = async () => {
        try {
            const token = jwtDecode(localStorage.getItem('token'));
            const response = await axios.post(`${BASE_URL}/orders/apply`, {
                couponName: couponCode,
                userEmail: token.sub,
            });

            // Extract the discount amount from the response message
            const message = response.data;
            const match = message.match(/Discount: (\d+(\.\d+)?)/);
            if (match) {
                const discountAmount = parseFloat(match[1]);
                if (!isNaN(discountAmount)) {
                    setCouponAmount(discountAmount);
                    setTotalAmount((prev) => Math.max(prev - discountAmount, 0)); // Ensure totalAmount is not negative
                    setCouponCode('')
                } else {
                    alert('Invalid coupon amount received.');
                }
            } else {
                alert('Coupon applied but discount amount could not be extracted.');
            }

            alert('Coupon applied successfully');
        } catch (error) {
            alert('Failed to apply coupon: ' + (error.response?.data || error.message));
        }
    };






    return (
        <div className="cart-page-wrapper">
            <div className="cpage">
                <div className="cartname" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>CART</h1> &nbsp; &nbsp; <FaShoppingCart size={30} />
                </div>
                {cart.length === 0 ? (
                    <> <div className='new-cart' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >Your cart is empty. </h2><h2 style={{ color: "black" }}><CgSmileSad size={30} /></h2></div></>

                ) : (
                    <>
                        <button className="remove-button ps" onClick={clearcart}>CLEAR CART</button>
                        <div style={{ marginTop: "3vh" }}></div>
                        <div className="cartitems">
                            <ul>
                                {cart.map(item => (

                                    <li key={item.id} className="cartdiv">
                                        <div className="cart-img">
                                            <img
                                                src={item.image.startsWith('data:image') ? item.image : `data:image/png;base64,${item.image}`}
                                                alt={item.name}
                                                width={50}
                                                height={50}
                                            />                                        </div>
                                        <div>
                                            <h1>{item.name}</h1>
                                            <h3 style={{ color: getStockMessage(item) !== '' ? 'red' : 'inherit' }}>
                                                Quantity: {item.quantity} {getStockMessage(item) && `(${getStockMessage(item)})`}
                                            </h3>
                                            {/* <h3>Quantity: {item.quantity}</h3> */}
                                            <h3>Price: ₹{item.price}</h3>
                                            <h3>Restaurant: {item.restaurantName}</h3> {/* This should display restaurantName */}

                                            <button className="action-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                                            <button className="action-button" onClick={() => increaseQuantity(item.id)}>+</button>
                                            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {isLoggedIn && (

                            <div className="coupon-section" >
                                <input
                                    type="text"
                                    placeholder="Enter Coupon"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    size={24}
                                />
                                <button style={{ backgroundColor: "greenyellow" }} onClick={handleApplyCoupon}>Apply Coupon</button>
                            </div>

                        )}



                        <div className="total">
                            <hr />
                            <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
                            <hr />
                            <button
                                className="checkout-button"
                                style={{ backgroundColor: "skyblue" }}
                                onClick={handleCheckout}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                        <br />



                        {showAddressModal && (
                                <div className="modal-overlay"> {/* Add the overlay */}

                            <div className="modal">
                                <h2>Select Address</h2>
                                <button className="close-button" onClick={() => setShowAddressModal(false)}>X</button> {/* Close Button */}
                                {addresses.map(address => (
                                    <div key={address.id}>
                                        <input
                                            type="radio"
                                            name="selectedAddress"
                                            value={address.id}
                                            checked={selectedAddress && selectedAddress.id === address.id}
                                            onChange={() => setSelectedAddress(address)}
                                        />
                                        <label>{`${address.street}, ${address.city}, ${address.state}, ${address.pincode}`}</label>
                                    </div>
                                ))}
                              <button style={{backgroundColor:"aquamarine",color:"black"}} onClick={() => navigate('/details')}>Add Another Address</button>
<br/>
<br/>

                                <button onClick={handleProceedToPayment}>Proceed to Payment</button>

                            </div>
                            </div>

                        )}






                    </>



                )}
            </div>






        </div>

    );
}

export default CartPage;
