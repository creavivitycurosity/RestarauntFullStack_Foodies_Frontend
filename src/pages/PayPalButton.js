// PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PayPalButton = ({ amount, onSuccess }) => {
    console.log('PayPalButton component is being rendered');

  return (
    <PayPalScriptProvider options={{ "client-id": "AdWGAw4eqoJUeEaD6AIrODP1mJqqGO0V3YnHibYFYXdc2NzawpztOn4LZcZ18l6fy2kuR2NOI2RqKH6E" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency: 'USD'
              },
            }],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Order details:', order); // Log the order details

          const paymentDetails = {
            paymentID: data.orderID,
            payerID: data.payerID
          };
          await axios.post(`${BASE_URL}/paypal/execute-payment`, paymentDetails, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          onSuccess(order);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
