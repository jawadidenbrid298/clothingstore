'use client';
import React from 'react';
import Link from 'next/link'; // Import Next.js Link component
import {ABeeZee} from '@next/font/google';

// Load ABeeZee font with vertical trim in mind
const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

export default function HeroSection() {
  return (
    <div className={`flex flex-col bg-[#F2F0F1] ${abeezee.className}`}>
      {/* Hero Section */}
      <div className='flex flex-col sm:flex-row justify-center mx-auto items-start w-full max-h-[663px]'>
        {/* Left Section: Text and Button */}
        <div className='w-full pt-[199px] sm:pt-[103px] pl-4 sm:pl-[100px]'>
          {/* Header Text */}
          <h1 className='text-black font-normal   text-[36px] sm:text-[64px] break-words w-[315px] h-[93px] sm:w-[577px] sm:h-[173px] leading-[34px] sm:leading-[64px] text-left'>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          {/* Paragraph */}
          <p className='text-gray-600 font-normal break-words mt-[20px] text-[14px] sm:text:[16px] sm:mt-[40px] w-[358px] h-[50px] sm:w-[545px] sm:h-[55px] leading-[20px] sm:leading-[22px] text-left'>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
            and cater to your sense of style.
          </p>

          {/* Shop Now Button */}
          <div>
            <Link className='w-full' href='/shoppage'>
              <button className='bg-black text-white font-normal rounded-[500px] flex justify-center items-center w-[358px] h-[52px] mt-[24px] sm:w-[210px] sm:h-[52px] sm:mt-[10px]'>
                <p>Shop Now</p>
              </button>
            </Link>
          </div>
          <div className='flex flex-col items-start w-full max-w-[611px] h-[67px] justify-between mt-[48px] leading-[22px] '>
            <div className='flex justify-between w-full'>
              {/* 200+ Section */}
              <div className='flex flex-col items-center w-[118px] h-[44px] sm:w-[157px] sm:h-[67px]'>
                <p className='text-[24px] sm:text-[40px] leading:[28.37px] sm:leading:[47.28px] font-bold'>200+</p>
                <p className='text-sm text-gray-500 pt-[10px] sm:pt-[20px]  leading:[22px]'>International Brands</p>
              </div>
              {/* 2,000+ Section */}
              <div className='flex flex-col items-center w-[118px] h-[44px] sm:w-[170px] sm:h-[67px]'>
                <p className='text-[24px] sm:text-[40px] leading:[28.37px] sm:leading:[47.28px] font-bold'>2,000+</p>
                <p className='text-sm text-gray-500 pt-[10px] sm:pt-[20px] leading:[22px]'>High-Quality Products</p>
              </div>
              {/* 30,000+ Section */}
              <div className='flex flex-col items-center  w-[118px] h-[44px] sm:w-[156px] sm:h-[67px]'>
                <p className='text-[24px] sm:text-[40px] leading:[28.37px] sm:leading:[47.28px] font-bold'>30,000+</p>
                <p className='text-sm text-gray-500 pt-[10px] sm:pt-[20px] leading:[22px]'>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className='w-full flex justify-center'>
          <img
            className='max-w-[390px] max-h-[448px] sm:max-w-[577px] sm:max-h-[680px] object-cover object-top'
            src='/file.jpg'
            alt='Hero Image'
          />
        </div>
      </div>

      {/* Brand Logos Section */}
      <div className='bg-black p-10 sm:w-full flex items-center justify-center'>
        <div className='flex flex-wrap justify-center gap-10'>
          <img src='/versace.png' alt='Versace' className='h-12' />
          <img src='/zara.png' alt='Zara' className='h-12' />
          <img src='/gucci.png' alt='Gucci' className='h-12' />
          <img src='/prada.png' alt='Prada' className='h-12' />
          <img src='/calvinklein.png' alt='Calvin Klein' className='h-12' />
        </div>
      </div>

      {/* New Section Below Shop Button */}
    </div>
  );
}
