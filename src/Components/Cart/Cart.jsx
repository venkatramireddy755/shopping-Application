import React, { useContext, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import CartDetails from './CartDetails';
import { ShopContext } from '../ShopContext/ShopContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, total, itemAmount } = useContext(ShopContext);
    const navigate = useNavigate();

    // State for promo code and discount
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');

    // Define valid promo codes and their discount values
    const validPromoCodes = {
        'SAVE10': 0.10,   // 10% discount
        'SAVE20': 0.20,   // 20% discount
        'FREESHIP': 0.05  // 5% discount (for example)
    };

    const handleCheckout = () => {
        const discountedTotal = total * (1 - discount);
        navigate('/checkout', { state: { totalAmount: discountedTotal } });
    };

    // Handle applying the promo code
    const applyPromoCode = () => {
        if (validPromoCodes[promoCode]) {
            setDiscount(validPromoCodes[promoCode]);
            setError('');
        } else {
            setError('Invalid promo code');
            setDiscount(0);  // Reset discount if the code is invalid
        }
    };

    // Calculate the discounted total
    const discountedTotal = total * (1 - discount);

    return (
        <div>
            <div className="cart_container">
                <div className="cart_left">
                    <div className="cart_header">
                        <h1>Shopping Cart</h1>
                        <h1>Items:({itemAmount})</h1>
                        <FiTrash2 onClick={clearCart} className='delete_cart' />
                    </div>
                    <div className="cart_header">
                        <span>Product Description</span>
                        <span>Quantity</span>
                        <span>Price</span>
                        <span>Total</span>
                    </div>
                    <div>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <CartDetails item={item} key={item.id} />
                            ))
                        ) : (
                            <p className='empty_cart_text'>Your cart is empty</p>
                        )}
                    </div>
                </div>
                <div className="cart_right">
                    <h2>Cart Summary</h2>
                    <div className="cart_summary">
                        <div className="summary_item">
                            <span>Item: </span>
                            <span>{itemAmount}</span>
                        </div>
                        <div className="summary_item">
                            <span>Subtotal :</span>
                            <span> ₹ {isNaN(total) ? 0 : total}</span>
                        </div>
                        <div className="summary_item">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary_item">
                            <span>Promo Code</span>
                            <input
                                type="text"
                                placeholder="Enter your code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button className='apply_btn' onClick={applyPromoCode}>Apply</button>
                        </div>
                        {error && <p className="promo_error">{error}</p>}
                        {discount > 0 && (
                            <div className="summary_item">
                                <span>Discount Applied:</span>
                                <span>- ₹ {(total * discount).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary_item total_cost">
                            <span>Total Cost :</span>
                            <span> ₹ {isNaN(discountedTotal) ? 0 : discountedTotal.toFixed(2)}</span>
                        </div>

                        {/* Checkout button */}
                        <button onClick={handleCheckout} className="checkout_btn">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


