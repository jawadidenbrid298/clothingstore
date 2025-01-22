'use client';
import React, {useState} from 'react';
import {useCart} from '@/context/cartcontext/page';

const Cart = () => {
  const {cartItems, clearCart, updateCartItemQuantity} = useCart(); // Added updateCartItemQuantity
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Check and apply promo code
  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10); // Apply 10% discount for valid promo code
    } else {
      alert('Invalid promo code');
      setDiscount(0);
    }
  };

  // Calculate total price with discount
  const calculateTotal = () => {
    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total += 15; // Add $15 for shipping
    total -= (total * discount) / 100; // Apply discount
    return total;
  };

  return (
    <div className='flex flex-col md:flex-row bg-white p-6 rounded-md shadow-md'>
      {/* Left Side: Cart Items */}
      <div className='w-full md:w-2/3'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className='flex justify-between items-center mb-6'>
              {/* Left Side: Image, Name, Size, Color */}
              <div className='flex items-center'>
                <img src={item.image} alt={item.name} className='w-24 h-24 object-cover rounded-md mr-4' />
                <div className='flex flex-col'>
                  <span className='font-semibold'>{item.name}</span>
                  <span className='text-sm text-gray-600'>{item.selectedSize}</span>
                  <span className='text-sm text-gray-600'>{item.selectedColor}</span>
                </div>
              </div>
              {/* Quantity Selector */}
              <div className='flex items-center space-x-4'>
                <button
                  className='px-2 py-1 bg-gray-300 rounded'
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className='px-2 py-1 bg-gray-300 rounded'
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              {/* Right Side: Price */}
              <div className='flex items-center'>
                <span className='font-semibold text-lg'>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Price Calculation */}
      <div className='w-full md:w-1/3 mt-6 md:mt-0 md:ml-8'>
        <div className='flex flex-col bg-gray-100 p-6 rounded-md'>
          <h3 className='font-semibold text-lg mb-4'>Price Summary</h3>

          {/* Promo Code Section */}
          <div className='mb-4'>
            <label htmlFor='promo-code' className='block text-sm font-semibold'>
              Promo Code
            </label>
            <div className='flex items-center space-x-4'>
              <input
                type='text'
                id='promo-code'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className='w-full border p-2 rounded'
                placeholder='Enter promo code'
              />
              <button onClick={handleApplyPromo} className='px-4 py-2 bg-blue-500 text-white rounded'>
                Apply
              </button>
            </div>
            {discount > 0 && <div className='mt-2 text-green-600'>Promo applied: {discount}% discount</div>}
          </div>

          {/* Cart Price Breakdown */}
          <div className='mb-4'>
            <div className='flex justify-between'>
              <span>Total:</span>
              <span className='font-semibold'>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping:</span>
              <span className='font-semibold'>+$15.00</span>
            </div>
          </div>

          {/* Clear Cart Button */}
          {cartItems.length > 0 && (
            <button onClick={clearCart} className='mt-4 py-2 px-4 bg-red-500 text-white rounded-lg'>
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
