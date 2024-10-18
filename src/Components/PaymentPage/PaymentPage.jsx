// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import styled from "styled-components";

// const PaymentContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
  
//   background-color: #f9f9f9;
// `;

// const PaymentForm = styled.form`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 300px;
// `;

// const SuccessMessage = styled.div`
//   text-align: center;
//   background-color: #e9ffe9;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   width: 300px;

//   h1 {
//     color: green;
//   }

//   p {
//     font-size: 18px;
//     color: #333;
//   }
// `;

// const InputField = styled.div`
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;

//   &:hover {
//     background-color: #218838;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   font-size: 12px;
// `;

// const PaymentPage = () => {
    
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const onSubmit = (data) => {
//     setTotalAmount(data.amount);
//     setIsPaymentSuccessful(true);
//   };

//   return (<div>

//     <h1>Payment</h1>
//     <PaymentContainer>
        

//       {isPaymentSuccessful ? (
//         <SuccessMessage>
//           <h1>Your order is successfully placed!</h1>
//           <p>Thank you for shopping with us. Your order total is ₹{totalAmount}.</p>
//         </SuccessMessage>
//       ) : (
//         <PaymentForm onSubmit={handleSubmit(onSubmit)}>
         

//           <InputField>
//             <Label>Cardholder Name</Label>
//             <Input 
//               type="text"
//               {...register("cardholderName", { required: true })} 
//             />
//             {errors.cardholderName && <ErrorMessage>Name is required</ErrorMessage>}
//           </InputField>

//           <InputField>
//             <Label>Card Number</Label>
//             <Input 
//               type="text"
//               {...register("cardNumber", { required: true, minLength: 16, maxLength: 16 })} 
//             />
//             {errors.cardNumber && <ErrorMessage>Enter a valid 16-digit card number</ErrorMessage>}
//           </InputField>

//           <InputField>
//             <Label>Expiration Date</Label>
//             <Input 
//               type="text"
//               placeholder="MM/YY"
//               {...register("expiryDate", { required: true })} 
//             />
//             {errors.expiryDate && <ErrorMessage>Expiry date is required</ErrorMessage>}
//           </InputField>

//           <InputField>
//             <Label>CVV</Label>
//             <Input 
//               type="text" placeholder="Enter a valid 3-digit CVV"
//               {...register("cvv", { required: true, minLength: 3, maxLength: 3 })} 
//             />
//             {errors.cvv && <ErrorMessage>Enter a valid 3-digit CVV</ErrorMessage>}
//           </InputField>

//           <InputField>
//             <Label>Amount</Label>
//             <Input 
//               type="number"
//               {...register("amount", { required: true, min: 1 })} 
//             />
//             {errors.amount && <ErrorMessage>Amount is required</ErrorMessage>}
//           </InputField>

//           <Button type="submit">Pay Now</Button>
//         </PaymentForm>
//       )}
//     </PaymentContainer>
//     </div>
//   );
// };

// export default PaymentPage;





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

