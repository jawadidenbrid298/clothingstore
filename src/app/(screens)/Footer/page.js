'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link'; // Import Link from next/link
import {Facebook, Instagram, Youtube, Twitter, Mail} from 'lucide-react';
import { footerLinks } from './data';
const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true after component is mounted on the client
  }, []);
  return (
    <div className='flex w-full flex-col mx-auto justify-center flex-1'>
      {/* Newsletter Section */}
      {isClient && (
        <div className='bg-black rounded-[20px] mb-[-60px] z-10 justify-between items-center text-white mt-20 py-[22px] sm:pl-[80px] pl-[17px] sm:mx-[100px] mx-[17px]'>
          <div className='flex flex-col lg:flex-row justify-none lg:justify-between  w-full '>
            {/* Grid item for text */}
            <div className='flex justify-center w-full'>
              <h2 className='mb-4 sm:text-[40px] text-[32px] leading-[46px] sm:w-full  font-ABeeZee'>
                STAY UP TO DATE ABOUT OUR LATEST OFFERS
              </h2>
            </div>

            {/* Grid item for input fields */}
            <div className='flex flex-col gap-4 w-full lg:w-[364px] mr-40 pr-20'>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='email'
                  placeholder='Enter your email address'
                  className=' pl-10 py-2 text-[16px] w-full leading-[18.91px] rounded-[62px] bg-[#FFFFFF] border lg:w-[340px] border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30'
                />
              </div>

              <button className='px-16 py-2 bg-[#FFFFFF] w-full text-[16px] leading-[18.91px] text-black rounded-[62px] font-semibold hover:bg-gray-200 whitespace-nowrap lg:w-[340px]'>
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className='bg-[#F0F0F0] pt-16 pb-8 px-4 md:px-8 mt-auto'>
        <div className='mx-auto'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mt-6'>
            {/* Brand Section */}
            <div className='md:col-span-1'>
              <h2 className='text-xl font-bold mb-4'>SHOP.CO</h2>
              <p className='text-gray-600 text-sm mb-6'>
                We have clothes that suit your style and which you're proud to wear. From women to men.
              </p>
              <div className='flex space-x-4'>
                <Facebook className='w-5 h-5 text-gray-600' />
                <Instagram className='w-5 h-5 text-gray-600' />
                <Youtube className='w-5 h-5 text-gray-600' />
                <Twitter className='w-5 h-5 text-gray-600' />
              </div>
            </div>

            {/* Links Sections */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:col-span-4'>
              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>COMPANY</h3>
                <ul className='space-y-2'>
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>HELP</h3>
                <ul className='space-y-2'>
                  {footerLinks.help.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>FAQ</h3>
                <ul className='space-y-2'>
                  {footerLinks.faq.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>RESOURCES</h3>
                <ul className='space-y-2'>
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          
          <div className='mt-12 pt-8 border-t border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <p className='text-sm text-gray-600'>Shop.co © 2000-2023. All Rights Reserved</p>
              <div className='flex items-center space-x-4 mt-4 md:mt-0'>
                <img src='/payments/visa.png' alt='Visa' className='h-6' />
                <img src='/payments/mastercard.png' alt='Mastercard' className='h-6' />
                <img src='/payments/paypal.png' alt='PayPal' className='h-6' />
                <img src='/payments/applepay.png' alt='Apple Pay' className='h-6' />
                <img src='/payments/Gpay.png' alt='Google Pay' className='h-6' />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
