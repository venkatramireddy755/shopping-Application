import React, { createContext, useState, useEffect } from 'react';
import { productsData } from '../../Data';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [username, setUser] = useState(null);
  const [total, setTotal] = useState(0);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      const priceAsNumber = parseFloat(currentItem.cost);
      if (isNaN(priceAsNumber)) {
        return accumulator;
      }
      return accumulator + priceAsNumber * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const newCart = cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: cartItem.amount - 1 };
          } else {
            return item;
          }
        });
        setCart(newCart);
      } else {
        removeFromCart(id);
      }
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        total,
        addToCart,
        cart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        username,
        setProducts,
        setUser, // Provide setUser to update user state
      }}
    >
      
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
