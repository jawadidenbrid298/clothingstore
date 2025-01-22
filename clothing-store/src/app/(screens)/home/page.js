'use client';
import React from 'react';
import Link from 'next/link'; // Import Next.js Link component

export default function HeroSection() {
  return (
    <div className='flex flex-col bg-[#F2F0F1]'>
      {/* Mobile Menu */}
      {false && (
        <div className='  bg-white border-b z-50'>
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

      {/* Hero Section */}
      <div className='flex flex-col md:flex-row justify-center mx-auto items-start w-full max-h-[663px]'>
        {/* Left Section: Text and Button */}
        <div className='w-[100%] pt-[210px]  sm:w-[100%] pl-4 sm:pl-[100px] sm:pt-[103px] '>
          {/* Header Text */}
          <h1
            className='text-black w-[315px] h-[93px] sm:w-[577px] sm :h-[173px]  font-normal leading-8 sm:leading-[60px] md:leading-[72px] break-words text-4xl sm:text-6xl md:text-7xl'
            style={{
              fontFamily: 'ABeeZee',
              fontWeight: '400',
              lineHeight: '64px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none'
            }}>
            FIND CLOTHES <br />
            THAT MATCHES
            <br /> YOUR STYLE
          </h1>

          {/* Subtext */}
          <p
            className='text-gray-600 pt-[153px] sm:pt[404px] font-normal text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 italic mt-4 break-words'
            style={{
              width: '100%',
              fontFamily: 'ABeeZee',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '22px',
              textAlign: 'left',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
              opacity: 1
            }}>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
            and cater to your sense of style.
          </p>

          {/* Shop Now Button */}
          <div className='mt-4 py-[10px] sm:py-[100px]'>
            <Link className=' w-full ' href='/shoppage'>
              {' '}
              {/* Link to ProductFilterSection */}
              <button className='w-[210px] h-[52px] flex justify-center items-center bg-black text-white font-[ABeeZee] text-[16px] font-normal leading-[18.91px] text-left no-underline border-none cursor-pointer px-[54px] rounded-[500px]'>
                <p>Shop Now</p>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image (Responsive and Small Below Button on Small Screens) */}
        <div className='w-full flex justify-center'>
          <img
            className='max-w-[390px]   max-h-[448px] sm:max-w-[577px] sm:max-h-[680px]  object-cover object-top sm:order-none'
            src='/file.jpg'
            alt='Hero Image'
          />
        </div>
      </div>

      <div className='bg-black  p-10  sm:w-full flex items-center justify-center'>
        <div className='flex flex-wrap justify-center gap-10'>
          <img src='/versace.png' alt='Versace' className='h-12' />
          <img src='/zara.png' alt='Zara' className='h-12' />
          <img src='/gucci.png' alt='Gucci' className='h-12' />
          <img src='/prada.png' alt='Prada' className='h-12' />
          <img src='/calvinklein.png' alt='Calvin Klein' className='h-12' />
        </div>
      </div>
    </div>
  );
}
