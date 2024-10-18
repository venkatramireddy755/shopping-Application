import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccess.css'; // Import the CSS file

const PaymentSuccess = () => {
  return (
    <div className="payment-success"> {/* Add a specific class here */}
      <div className="container">
        <h1>Payment Successful!</h1>
        <p>Your payment was processed successfully.</p>
        <div className="link-container">
          <Link to="/" className="link">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
