import React, { useState } from 'react';
import './CheckoutPage.css';
import { useLocation } from 'react-router-dom';
import PaymentPage from '../PaymentPage/PaymentPage';
import { Link} from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  
  const [form, setForm] = useState({
    name: '',
    address: '',
    contactNumber: '',
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Order placed:', form, 'Total Amount:', totalAmount);
    setIsOrderPlaced(true); 

    // Stripe session creation
    try {
      const response = await fetch('http://localhost:8000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total: totalAmount }),
      });
      
      if (!response.ok) throw new Error('Session creation failed');
      
      const session = await response.json();
      window.location.href = session.url;  // Redirect to Stripe checkout
      
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <div className='checkout-container'>
      {isOrderPlaced ? (
        <PaymentPage totalAmount={totalAmount} />
      ) : (
        <div>
          <h1>Checkout</h1>
          <h3>Total Amount: ₹{totalAmount}</h3>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contact Number: </label>
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            <Link to="/create-checkout-session">
            <button type="submit">Place Order</button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;






 