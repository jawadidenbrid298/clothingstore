'use client';

import React from 'react';
import {FaPhoneAlt, FaEnvelope} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col sm:flex-row px-4 sm:px-8 md:px-16 py-8 pt-[50px]'>
      {/* Left Section: Contact Information */}
      <div className='bg-white shadow-md p-8 rounded-lg w-full sm:w-1/3 mb-8 sm:mb-0'>
        <div className='mb-8'>
          <div className='flex items-center mb-4'>
            <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <rect width='40' height='40' rx='20' fill='black' />
              <path
                d='M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <h3 className='text-lg pl-[16px] font-semibold'>Call To Us</h3>
          </div>
          <p className='text-sm  text-gray-600 mb-2'>We are available 24/7, 7 days a week.</p>
          <p className='text-sm '>Phone: +8801611112222</p>
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
