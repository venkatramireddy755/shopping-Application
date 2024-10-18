import React, { useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';
import axios from 'axios';
import './PaymentFailed.css'; // Import the CSS file

const PaymentFailed = () => {
  const { total } = useContext(ShopContext); // Get total from context

  const handleRetryPayment = async () => {
    try {
      const response = await axios.post('http://localhost:8000/create-checkout-session', {
        total: total,
      });

      console.log("Stripe session response:", response.data); // Log the response to check it

      // Make sure that the session ID is returned and valid
      if (response.data.id) {
        window.location.href = `https://checkout.stripe.com/pay/${response.data.id}`;
      } else {
        console.error('No session ID received from the server');
      }
    } catch (error) {
      console.error('Error creating Stripe session:', error);
    }
  };

  return (
    <div className="payment-failed"> {/* Add a specific class here */}
      <div className="container">
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed.</p>
        <div className="link-container">
          <button onClick={handleRetryPayment} className="link">Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
