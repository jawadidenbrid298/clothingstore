'use client';
import React, {useState} from 'react';

function Header() {
  // State to manage the visibility of the header
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle closing the header
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className='bg-black text-white flex justify-between items-center fixed top-0 left-0 w-full z-50 px-2 py-0.1'>
          {/* Left side: Centered Text */}
          <div className='flex justify-center items-center w-full'>
            <span className='text-sm sm:text-base md:text-lg font-medium'>
              Sign up and get 20% off your first order.{' '}
              <a href='/signup' className='underline text-yellow-400'>
                Sign Up Now
              </a>
            </span>
          </div>

          {/* Close Button (cross sign) */}
          <button onClick={handleClose} className='text-3xl font-bold text-white'>
            &times;
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
