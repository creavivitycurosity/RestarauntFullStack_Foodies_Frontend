
import React, { useState,useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Cart = ({ cart = [], removeFromCart, increaseQuantity, decreaseQuantity ,setCart,clearcart}) => {
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const calculateTotal = (cart) => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const [totalAmount, setTotalAmount] = useState(calculateTotal(cart));

  useEffect(() => {
    setTotalAmount(calculateTotal(cart));
  }, [cart]);

  let email = null;
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.sub;
      console.log(email);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  const handlePaymentSuccess = async (order) => {
    console.log('Order details:', order);
    //   if (!token) {
    //     window.alert('Please log in or sign up to proceed with checkout.');
    //     navigate('/signin'); // Redirect to the login page
    //     return;
    //   }
  // Disable automatic capture
  // order.createOrder = () => {
  //   return Promise.resolve('fake-order-id');
  // };

    const paymentDetails = {
      paymentId: order.id,
      payerId: order.payer.payer_id,
      user: {
        email: email
      },
      product: cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        name: item.name,
        price: item.price
      }))
    };

    try {
      await axios.post('http://localhost:8080/paypal/execute-payment', paymentDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPaymentSuccess(true);
              const order2 = {
              paymentId: order.id,
               payerId: order.payer.payer_id,
                user: {
                  email,
                },
                product: cart.map(item => ({
                  id: item.id,
                  quantity: item.quantity, // Include quantity here
                  name:item.name,
                  price:item.price
                })),
              };
        
              console.log('Request payload:', order); // Log the request payload
              console.log('Request payload:', order.id); // Log the request payload
              console.log('Request payload:', order.payer.payer_id); // Log the request payload

              const response = await axios.post('http://localhost:8080/orders/placeOrder', order2, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
      alert('Payment successful and order placed!');
      navigate('/my-orders');
      setCart([]);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Payment successful but failed to place order.');
    }
  };

  return (
    <div className='cpage'>
      <div className='cartname'>
        <h1>CART</h1>
      </div>
      {cart.length === 0 ? (
        <p className='p'>Your cart is empty.</p>
      ) : (
        <>
          <button  className="remove-button ps" onClick={clearcart}>CLEAR CART</button>
          <div style={{ marginTop: "3vh" }}></div>
          <div className='cartitems'>
            <ul>
              {cart.map(item => (
                <li key={item.id} className='cartdiv'>
                  <div className='cart-img'>
                    <img src={item.image} alt={item.name} width={50} height={50} />
                  </div>
                  <div>
                    <h1>{item.name}</h1>
                    <h3>Quantity: {item.quantity}</h3>
                    <h3>Price: ₹{item.price}</h3>
                    <button className="action-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button className="action-button" onClick={() => increaseQuantity(item.id)}>+</button>
                    <button  className="remove-button" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='total'>
            <hr />
            <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
            <hr />
            {!paymentSuccess && (
              <PayPalScriptProvider options={{ "client-id":"AdWGAw4eqoJUeEaD6AIrODP1mJqqGO0V3YnHibYFYXdc2NzawpztOn4LZcZ18l6fy2kuR2NOI2RqKH6E"}}>
                <PayPalButtons
                  key={totalAmount} // Force re-render by updating key
                  createOrder={(data, actions) => {
                    // if (!token) {
                    //   window.alert('Please log in or sign up to proceed with checkout.');
                    //   navigate('/signin'); // Redirect to the login page
                    //   return actions.order.cancel(); // Cancel the order
                    // }
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalAmount.toFixed(2),
                          currency_code: 'USD'
                        },
                      }],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    handlePaymentSuccess(order);
                  }} 
                  //  onError={(err) => {
                  //   console.error('PayPal error:', err);

                  //   // Handle the error or cancel the order if needed
                  // }}
                />
              </PayPalScriptProvider>
            )}
            {paymentSuccess && <p></p>}
            {paymentSuccess && <p>Thank you for your purchase!</p>}
          </div>
          <br />
        </>
      )}
    </div>
  );
}

export default Cart;

// import React from 'react';
// import './Cart.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode'; // Ensure correct import

// const Cart = ({ cart = [], removeFromCart, increaseQuantity, decreaseQuantity, setCart }) => {
//   const navigate = useNavigate();

//   const calculateTotal = () => {
//     return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   };

//   let email = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       email = decodedToken.sub; // or decodedToken.username, depending on your token structure
//       console.log(email);
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token'); // Remove the token from local storage
//       localStorage.removeItem('refreshToken'); // Remove the refresh token from local storage
//     }
//   }

//   const handleCheckout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         window.alert('Please log in or sign up to proceed with checkout.');
//         navigate('/signin'); // Redirect to the login page
//         return;
//       }
//       const order = {
//         user: {
//           email,
//         },
//         product: cart.map(item => ({
//           id: item.id,
//           quantity: item.quantity, // Include quantity here
//         })),
//       };

//       console.log('Request payload:', order); // Log the request payload

//       const response = await axios.post('http://localhost:8080/orders/placeOrder', order, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       // Handle successful response
//       console.log('Order placed successfully:', response.data);
//       setCart([]); // Clear the cart after successful order
//       window.alert("ORDER WAS SUCCESSFULLY CREATED ")
//       navigate('/my-orders'); // Navigate to orders page or any other desired page

//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginTop: "17vh" }}></div>
//       <div className='cartname'>
//         <h1>CART</h1>
//       </div>
//       {cart.length === 0 ? (
//         <p className='p'>Your cart is empty.</p>
//       ) : (
//         <>
//           <div style={{ marginTop: "3vh" }}></div>
//           <div className='cartitems'>
//             <ul>
//               {cart.map(item => (
//                 <li key={item.id} className='cartdiv'>
//                   <div className='cart-img'>
//                     <img src={item.image} alt={item.name} width={50} height={50} />
//                   </div>
//                   <div>
//                     <h1>{item.name}</h1>
//                     <h3>Quantity: {item.quantity}</h3>
//                     <h3>Price: ${item.price}</h3>
//                     <button className="large-button" onClick={() => decreaseQuantity(item.id)}>-</button>
//                     <button className="large-button" onClick={() => increaseQuantity(item.id)}>+</button>
//                     <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className='total'>
//             <hr/>
//             <h2>  &nbsp; &nbsp; Total: ${calculateTotal().toFixed(2)}</h2>
//             <hr/>
//             &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; 
//             <button className='paynow' onClick={handleCheckout}><b>PAY NOW</b></button>
//           </div>
//           <br></br>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;




  // const handleCheckout = async (details) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       window.alert('Please log in or sign up to proceed with checkout.');
  //       navigate('/signin'); // Redirect to the login page
  //       return;
  //     }
  //     const order = {
  //       user: {
  //         email,
  //       },
  //       product: cart.map(item => ({
  //         id: item.id,
  //         quantity: item.quantity, // Include quantity here
  //       })),
  //       paymentDetails: details // Add payment details here
  //     };

  //     console.log('Request payload:', order); // Log the request payload

  //     const response = await axios.post('http://localhost:8080/orders/placeOrder', order, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // Handle successful response
  //     console.log('Order placed successfully:', response.data);
  //     setCart([]); // Clear the cart after successful order
  //     window.alert("ORDER WAS SUCCESSFULLY CREATED");
  //     navigate('/my-orders'); // Navigate to orders page or any other desired page

  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //   }
  // };

  // const handleCheckout = async (details) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       window.alert('Please log in or sign up to proceed with checkout.');
  //       navigate('/signin'); // Redirect to the login page
  //       return;
  //     }
  //     const order = {
  //       user: {
  //         email,
  //       },
  //       product: cart.map(item => ({
  //         id: item.id,
  //         quantity: item.quantity, // Include quantity here
  //       })),
  //       paymentDetails: details // Add payment details here
  //     };

  //     console.log('Request payload:', order); // Log the request payload

  //     const response = await axios.post('http://localhost:8080/orders/placeOrder', order, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // Get the payment ID and payer ID from the response
  //     const paymentId = response.data.paymentId;
  //     const payerId = response.data.payerId;

  //     // Redirect to the new endpoint to verify the payment status
  //     const paymentStatusResponse = await axios.post('http://localhost:8080/paypal/check-payment-status', {
  //       paymentId,
  //       payerId,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // Check if the payment is successful
  //     if (paymentStatusResponse.data === 'Payment is successful') {
  //       // Payment is successful, clear the cart and redirect to the order summary page
  //       cart = [];
  //       navigate('/orders/summary');
  //     } else {
  //       // Payment is not successful, display an error message
  //       window.alert('Payment failed. Please try again.');
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the checkout process
  //     console.error(error);
  //     window.alert('An error occurred during checkout. Please try again.');
  //   }
  // };


// Cart.js
// import React, { useState, useEffect } from 'react';
// import './Cart.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Ensure correct import
// import PayPalButton from './PayPalButton';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const Cart = ({ cart = [], removeFromCart, increaseQuantity, decreaseQuantity, setCart }) => {
//   const navigate = useNavigate();
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const calculateTotal = () => {
//     return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   };

//   let email = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       email = decodedToken.sub; // or decodedToken.username, depending on your token structure
//       console.log(email);
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token'); // Remove the token from local storage
//       localStorage.removeItem('refreshToken'); // Remove the refresh token from local storage
//     }
//   }



//   const handlePaymentSuccess = async (order) => {
//     console.log('Order details:', order); // Log the order details

//     const paymentDetails = {
//       paymentID: order.id,
//       payerID: order.payer.payer_id
//     };

//     try {
//       await axios.post('http://localhost:8080/paypal/execute-payment', paymentDetails, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setPaymentSuccess(true);
     
//       alert('Payment successful and order placed!');

//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Payment successful but failed to place order.');
//     }
//   };


//   return (
//     <div>
//       <div style={{ marginTop: "17vh" }}></div>
//       <div className='cartname'>
//         <h1>CART</h1>
//       </div>
//       {cart.length === 0 ? (
//         <p className='p'>Your cart is empty.</p>
//       ) : (
//         <>
//           <div style={{ marginTop: "3vh" }}></div>
//           <div className='cartitems'>
//             <ul>
//               {cart.map(item => (
//                 <li key={item.id} className='cartdiv'>
//                   <div className='cart-img'>
//                     <img src={item.image} alt={item.name} width={50} height={50} />
//                   </div>
//                   <div>
//                     <h1>{item.name}</h1>
//                     <h3>Quantity: {item.quantity}</h3>
//                     <h3>Price: ₹{item.price}</h3>
//                     <button className="large-button" onClick={() => decreaseQuantity(item.id)}>-</button>
//                     <button className="large-button" onClick={() => increaseQuantity(item.id)}>+</button>
//                     <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className='total'>
//             <hr />
//             <h2>  &nbsp; &nbsp; Total: ₹{calculateTotal().toFixed(2)}</h2>
//             <hr />
//             {/* <PayPalButton amount={calculateTotal().toFixed(2)} onSuccess={handleCheckout} /> */}
//             {/* <button className='paynow' onClick={handleCheckout}><b>PAY NOW</b></button> */}
//             {!paymentSuccess && (
//               <PayPalScriptProvider options={{ "client-id": "AdWGAw4eqoJUeEaD6AIrODP1mJqqGO0V3YnHibYFYXdc2NzawpztOn4LZcZ18l6fy2kuR2NOI2RqKH6E" }}>
//                 <PayPalButtons
//                   createOrder={(data, actions) => {
//                     return actions.order.create({
//                       purchase_units: [{
//                         amount: {
//                           value: calculateTotal().toFixed(2),
//                           currency_code: 'USD'
//                         },
//                       }],
//                     });
//                   }}
//                   onApprove={async (data, actions) => {
//                     const order = await actions.order.capture();
//                     handlePaymentSuccess(order);
//                   }}
//                 />
//               </PayPalScriptProvider>
//             )}

//             {paymentSuccess && <p>Thank you for your purchase!</p>}
//           </div>
//           <br />
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;

// 