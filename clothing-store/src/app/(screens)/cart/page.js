'use client';
import React, {useState} from 'react';
import {useCart} from '@/context/cartcontext/page';
import {StorageImage} from '@aws-amplify/ui-react-storage'; // Import StorageImage

const Cart = () => {
  const {cartItems, clearCart, updateCartItemQuantity} = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  console.log(cartItems);

  // Check and apply promo code
  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(10); // Apply 10% discount for valid promo code
    } else if (promoCode === 'MC20') {
      setDiscount(20); // Apply 20% discount for valid promo code
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

  const handleCheckout = () => {
    alert(`Checkout successful! Total amount: $${calculateTotal().toFixed(2)}`);
  };

  return (
    <div className='flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 bg-white rounded-md shadow-md'>
      {/* Left Side: Cart Items */}
      <div className='w-full md:w-2/3 bg-white p-6 rounded-md shadow-sm'>
        <h2 className='text-2xl font-semibold mb-4'>Your cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className='flex justify-between items-center border-b pb-4 mb-4'>
              {/* Left: Image & Details */}
              <div className='flex items-center space-x-4'>
                <StorageImage
                  className='w-[124px] h-[124px] object-cover bg-transparent border rounded-md'
                  imgKey={item.image || 'UserAvatar.png'} // Replacing img tag with StorageImage
                />
                <div>
                  <span className='font-semibold'>{item.name}</span>
                  <div className='text-sm text-gray-500'>
                    <p>Size: {item.selectedSize}</p>
                    <p>Color: {item.selectedColor}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className='flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md'>
                <button
                  className='px-2 text-lg font-bold'
                  onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span className='font-semibold'>{item.quantity}</span>
                <button
                  className='px-2 text-lg font-bold'
                  onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              {/* Price */}
              <span className='font-semibold text-lg'>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Order Summary */}
      <div className='w-full md:w-1/3 bg-white p-6 rounded-md shadow-md'>
        <h3 className='font-semibold text-lg mb-4'>Order Summary</h3>

        <div className='flex justify-between mb-2'>
          <span>Subtotal</span>
          <span className='font-semibold'>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
        </div>

        {/* Discount */}
        <div className='flex justify-between mb-2'>
          <span className='text-red-500'>Discount ({discount}%)</span>
          <span className='text-red-500'>
            -${((cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 15) * discount) / 100}
          </span>
        </div>

        <div className='flex justify-between mb-4'>
          <span>Delivery Fee</span>
          <span>+$15</span>
        </div>

        <div className='flex justify-between text-xl font-semibold border-t pt-4'>
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>

        {/* Promo Code Input */}
        <div className='mt-4'>
          <label className='block text-sm font-semibold'>Add promo code</label>
          <div className='flex items-center space-x-2 mt-1'>
            <input
              type='text'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className='w-full p-2 bg-gray-200 rounded-md'
              placeholder='Enter promo code'
            />
            <button onClick={handleApplyPromo} className='bg-black text-white px-4 py-2 rounded-[62px]'>
              Apply
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className='w-full mt-6 py-3 bg-black text-white text-lg rounded-[62px] flex items-center justify-center'>
          Go to Checkout →
        </button>

        {/* Clear Cart Button */}
        {cartItems.length > 0 && (
          <button
            onClick={() => {
              clearCart();
              alert('Cart cleared');
            }}
            className='w-full mt-4 py-2 bg-black text-white rounded-[62px]'>
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
