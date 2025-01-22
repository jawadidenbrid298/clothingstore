'use client';

import React from 'react';
import {FaPhoneAlt, FaEnvelope} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col sm:flex-row px-4 sm:px-8 md:px-16 py-8 pt-[323px]'>
      {/* Left Section: Contact Information */}
      <div className='bg-white shadow-md p-8 rounded-lg w-full sm:w-1/3 mb-8 sm:mb-0'>
        <div className='mb-8'>
          <div className='flex items-center mb-4'>
            <FaPhoneAlt className='text-black w-6 h-6 mr-4' />
            <h3 className='text-lg font-semibold'>Call To Us</h3>
          </div>
          <p className='text-sm text-gray-600 mb-2'>We are available 24/7, 7 days a week.</p>
          <p className='text-sm font-semibold'>Phone: +8801611112222</p>
        </div>
        <hr className='border-gray-300 my-4' />
        <div>
          <div className='flex items-center mb-4'>
            <FaEnvelope className='text-black w-6 h-6 mr-4' />
            <h3 className='text-lg font-semibold'>Write To Us</h3>
          </div>
          <p className='text-sm text-gray-600 mb-2'>Fill out our form and we will contact you within 24 hours.</p>
          <p className='text-sm'>Emails: customer@exclusive.com</p>
          <p className='text-sm'>Emails: support@exclusive.com</p>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className='w-full sm:w-2/3 bg-white shadow-md p-8 rounded-lg sm:ml-8'>
        <form className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <input
              type='text'
              placeholder='Your Name *'
              className='border border-gray-300 bg-[#F5F5F5] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <input
              type='email'
              placeholder='Your Email *'
              className='border border-gray-300  bg-[#F5F5F5] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            <input
              type='tel'
              placeholder='Your Phone *'
              className='border border-gray-300 bg-[#F5F5F5] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <textarea
            placeholder='Your Message'
            className='border border-gray-300  bg-[#F5F5F5] rounded-lg px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          {/* Aligning button to the right */}
          <div className='flex justify-end'>
            <button type='submit' className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
