// import React, { useEffect, useState } from 'react';
// import './PaymentPage.css';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const PaymentPage = ({ setCart }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { cart, totalAmount } = location.state;
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   let email = null;
//   const token = localStorage.getItem('token');
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       email = decodedToken.sub;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//     }
//   }

//   const handlePaymentSuccess = async (order) => {
//     const paymentDetails = {
//       paymentId: order.id,
//       payerId: order.payer.payer_id,
//       user: { email: email },
//       product: cart.map(item => ({
//         id: item.id,
//         quantity: item.quantity,
//         name: item.name,
//         price: item.price
//       }))
//     };

//     try {
//       await axios.post('http://localhost:8080/paypal/execute-payment', paymentDetails, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setPaymentSuccess(true);

//       const orderDetails = {
//         paymentId: order.id,
//         payerId: order.payer.payer_id,
//         user: { email },
//         product: cart.map(item => ({
//           id: item.id,
//           quantity: item.quantity,
//           name: item.name,
//           price: item.price
//         }))
//       };

//       await axios.post('http://localhost:8080/orders/placeOrder', orderDetails, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });

//       alert('Payment successful and order placed!');
//       navigate('/my-orders');
//       setCart([]);
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Payment successful but failed to place order.');
//     }
//   };

//   return (
//     <div className="payment-page-container">
//       <h1>Checkout</h1>
//       <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
//       {!paymentSuccess && (
//         <PayPalScriptProvider options={{ "client-id": "AdWGAw4eqoJUeEaD6AIrODP1mJqqGO0V3YnHibYFYXdc2NzawpztOn4LZcZ18l6fy2kuR2NOI2RqKH6E" }}>
//           <PayPalButtons
//             key={totalAmount}
//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [{
//                   amount: { value: totalAmount.toFixed(2), currency_code: 'USD' },
//                 }],
//               });
//             }}
//             onApprove={async (data, actions) => {
//               const order = await actions.order.capture();
//               handlePaymentSuccess(order);
//             }}
//           />
//         </PayPalScriptProvider>
//       )}
//       {paymentSuccess && <p>Thank you for your purchase!</p>}

//       <div className="dummy-payment-gateways">
//         <button className="dummy-button">Credit Card</button>
//         <button className="dummy-button">Debit Card</button>
//         <button className="dummy-button">Net Banking</button>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;
import React, { useEffect, useState } from 'react';
import './PaymentPage.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PaymentPage = ({ setCart }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart, totalAmount, selectedAddress  } = location.state;
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    let email = null;
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            email = decodedToken.sub;
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    }
    const handlePaymentSuccess = async (order) => {
        const paymentDetails = {
            paymentId: order.id,
            payerId: order.payer.payer_id,
            user: { email: email },
            product: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                sellerName: item.sellerName, // Update to match the field used in the backend
                name: item.name,
                price: item.price,
            })),
            
            orderAddressId: selectedAddress.id  // Send selected address ID

            
        };



        try {
            await axios.post(`${BASE_URL}/orders/orders`, paymentDetails, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setPaymentSuccess(true);
            alert('Payment successful and order placed!');
            console.log(paymentDetails)
            navigate('/my-orders');
            setCart([]);
        } catch (error) {
            console.log(paymentDetails)

          console.log(order)
          console.log(cart.sellerId)
          console.log(cart);  // Inspect the structure of cart items
          console.log(cart.item);  // Inspect the structure of cart items

            console.error('Error placing order:', error);
            alert('Payment successful but failed to place order.');
        }
    };

    return (
        <div className="payment-page-container">
            <h1>Checkout</h1>
            <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
            {!paymentSuccess && (
                <PayPalScriptProvider options={{ "client-id": "AdWGAw4eqoJUeEaD6AIrODP1mJqqGO0V3YnHibYFYXdc2NzawpztOn4LZcZ18l6fy2kuR2NOI2RqKH6E" }}>
                    <PayPalButtons
                        key={totalAmount}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: { value: totalAmount.toFixed(2), currency_code: 'USD' },
                                }],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            handlePaymentSuccess(order);
                        }}
                    />
                </PayPalScriptProvider>
            )}
            {paymentSuccess && <h2>Thank you for your purchase!</h2>}
<br/>
            <div className="dummy-payment-gateways">
                <button className="dummy-button">Credit Card</button>
                <button className="dummy-button">Debit Card</button>
                <button className="dummy-button">Net Banking</button>
            </div>
        </div>
    );
}

export default PaymentPage;
