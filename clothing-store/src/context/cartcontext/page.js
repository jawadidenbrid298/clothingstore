'use client';
import {createContext, useContext, useState} from 'react';

// Create Cart Context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === newItem.id);
      if (itemExists) {
        // If item already exists in cart, update quantity
        return prevItems.map((item) => (item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item));
      } else {
        return [...prevItems, {...newItem, quantity: 1}];
      }
    });
  };

  // Update item quantity
  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? {...item, quantity: Math.max(newQuantity, 1)} : item))
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{cartItems, addToCart, updateCartItemQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
