'use client';
import React from 'react';
import Link from 'next/link';
import {ABeeZee} from 'next/font/google';
// import DefaultSvg from './DefaultSvg';

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
      <div className='flex flex-col lg:flex-row justify-center mx-auto items-start w-full lg:h-full'>
        {/* Left Section: Text and Button */}
        <div className='w-full px-[16px]  py-10 lg:px-[103px] md:py-[60px] md:px-[30px] '>
          {/* Header Text */}
          <h1 className='text-black font-normal text-[36px] md:text-[64px]  lg:text-[64px] sm:text-[64px] break-words lg:w-full lg:h-full max-w-[577px] max-h-[173px] sm:w-full sm:h-full leading-[34px] sm:leading-[64px] text-left z-1'>
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
              <button className='bg-black text-white font-normal rounded-[500px] flex justify-center items-center w-full h-[52px] mt-[24px] sm:w-[210px] sm:h-[52px] sm:mt-[10px]'>
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

        <div className='w-full flex justify-center content-center relative'>
          <img
            className='relative max-w-[490px] max-h-[400px] sm:max-w-[577px] sm:max-h-[650px] object-cover object-top justify-center items-center'
            src='/file2.jpeg'
            alt='Hero Image'
          />
          {/* <DefaultSvg/> */}

          <svg
            className=' absolute 2xl:left-[100px] md:right-[700px] lg:left-[60px] left-[27px] lg:mt-[393px] mt-[137px] transform -translate-y-1/2 lg:w-[56px] lg:h-[56px] w-[44px] h-[44px] '
            viewBox='0 0 104 104'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z'
              fill='black'
            />
          </svg>

          <svg
            className='absolute lg:right-20 right-4 lg:h-[106px] lg:w-[106px] h-[76px] w-[76px] mt-[40px] lg:mt-[182px] transform -translate-y-1/2  object-cover object-top'
            viewBox='0 0 104 104'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z'
              fill='black'
            />
          </svg>
        </div>
      </div>

      <div className='bg-black p-10 sm:w-full flex items-center justify-center'>
        <div className='flex w-full flex-wrap lg:justify-between md:justify-center justify-center gap-5'>
          <img src='/versace.png' alt='Versace' className='sm:h-12 h-[23px]' />
          <img src='/zara.png' alt='Zara' className='sm:h-12 h-[23px]' />
          <img src='/gucci.png' alt='Gucci' className='sm:h-12 h-[23px]' />
          <img src='/prada.png' alt='Prada' className='sm:h-12 h-[23px]' />
          <img src='/calvinklein.png' alt='Calvin Klein' className='sm:h-12 h-[23px]' />
        </div>
      </div>
    </div>
  );
}
