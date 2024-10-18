import React,{useContext} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ShopContext } from '../ShopContext/ShopContext'

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PxPmtRtgr7kjgRVSawDR08nd8PH1FX30wt2SfHfFVco4zHqNhBXdp0D6h5diknMQIja4wK0D7Q6nCsHYxwSKkjs003CmfjhSu');

const PaymentPage = () => {
  const{total}=useContext(ShopContext)
  const handleCheckout = async () => {
    const stripe = await stripePromise;  // Wait for the Stripe instance
    
    try {
      // Change the fetch URL to point to the backend server at localhost:8000
      const response = await fetch('http://localhost:8000/create-checkout-session', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Set content type to JSON
        },
        body: JSON.stringify({   
          total: total }),
      });
  
      if (!response.ok) {
        console.error('Error creating checkout session:', response.statusText);
        return;
      }
  
      const session = await response.json();  // Parse JSON response
      

      // Make sure stripe is initialized properly
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <img src="logo cropped.png" alt="company logo" width="200px" />
      <h1>Stripe Payment</h1>
      <p>Click below to proceed with payment.</p>
     
      <button style={styles.payBtn} onClick={handleCheckout}>
        Pay with Stripe
      </button>
    </div>
  );
};

// Styling
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  payBtn: {
    padding: '10px 20px',
    backgroundColor: '#6772e5',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease-out',
  },
  payBtnHover: {
    backgroundColor: '#5469d4',
    transform: 'scale(1.1)',
  },
};

export default PaymentPage;

