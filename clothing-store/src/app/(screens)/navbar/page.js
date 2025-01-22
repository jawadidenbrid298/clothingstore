'use client';
import React, {useState} from 'react';
import {Search, ShoppingCart, User, Menu, X} from 'lucide-react';
import {useCart} from '@/context/cartcontext/page'; // Import Cart Context
import Link from 'next/link'; // Import Link for navigation

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {cartItems} = useCart(); // Get cart items from Cart Context
  const [isHovered, setIsHovered] = useState(false); // Track hover state for the cart preview

  // Mouse hover functions to show/hide the cart preview
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <nav className='bg-white py-8 border-b relative'>
      <div className=' mx-auto px-4'>
        <div className='flex items-center justify-between'>
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden'>
            {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>

          <div className='text-xl font-bold'>SHOP.CO</div>

          {/* Desktop Navigation Links */}
          <div className='hidden lg:flex space-x-6'>
            <a href='#' className='hover:text-gray-600'>
              Shop
            </a>
            <a href='#' className='hover:text-gray-600'>
              On Sale
            </a>
            <a href='#' className='hover:text-gray-600'>
              New Arrivals
            </a>
            <a href='#' className='hover:text-gray-600'>
              Brands
            </a>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Search Icon for Mobile */}
            <Search className='h-6 w-6 lg:hidden' />

            {/* Search Bar for Desktop */}
            <div className='hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64'>
              <Search className='w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search for products'
                className='bg-transparent ml-2 outline-none w-full'
              />
            </div>

            {/* Cart Icon with Hover Effect */}
            <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <ShoppingCart className='h-6 w-6 cursor-pointer' />
              {/* Cart Preview - Hover Effect */}
              {isHovered && (
                <div className='absolute top-full right-0 w-64 bg-white shadow-md p-4 rounded-lg mt-2'>
                  <h3 className='font-semibold mb-2'>Cart Preview</h3>
                  {cartItems.length > 0 ? (
                    cartItems.slice(0, 3).map((item, index) => (
                      <div key={index} className='flex items-center mb-2'>
                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover mr-2' />
                        <div className='flex flex-col'>
                          <span className='text-sm'>{item.name}</span>
                          <span className='text-xs text-gray-500'>{item.selectedSize}</span>
                          <span className='text-xs text-gray-500'>{item.selectedColor}</span>
                        </div>
                        <span className='ml-2 text-sm'>${item.price.toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                  {/* Link to Cart Page */}
                  <Link href='/cart'>
                    <button className='w-full py-2 px-4 bg-blue-500 text-white rounded-lg mt-4'>View Cart</button>
                  </Link>
                </div>
              )}
            </div>

            {/* User Icon */}
            <User className='h-6 w-6' />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='lg:hidden absolute top-full left-0 right-0 bg-white border-b z-50'>
            <div className='flex flex-col py-4'>
              <a href='#' className='px-4 py-2 hover:bg-gray-100'>
                Shop
              </a>
              <a href='#' className='px-4 py-2 hover:bg-gray-100'>
                On Sale
              </a>
              <a href='#' className='px-4 py-2 hover:bg-gray-100'>
                New Arrivals
              </a>
              <a href='#' className='px-4 py-2 hover:bg-gray-100'>
                Brands
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
