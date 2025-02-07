'use client';
import React from 'react';
import Link from 'next/link';
import {brands, stats} from './data';

export default function HeroSection() {
  return (
    <div className='flex flex-col bg-[#F2F0F1]'>
      <div className='flex flex-col lg:flex-row justify-center mx-auto items-start w-full h-full'>
        <div className='w-full px-[16px] py-10 lg:pl-[103px] lg:pr-0 md:py-[60px] md:px-[103px]'>
          <h1 className='text-black font-normal text-[36px] md:text-[64px] lg:text-[64px] sm:text-[64px] break-words max-w-[577px] leading-[34px] sm:leading-[64px] text-left'>
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p className='text-gray-600 font-normal break-words mt-[20px] text-[14px] sm:text-[16px] sm:mt-[40px] w-[358px] sm:w-[545px] leading-[20px] sm:leading-[22px] text-left'>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
            and cater to your sense of style.
          </p>
          <div>
            <Link className='w-full' href='/shoppage'>
              <button className='bg-black text-white font-normal rounded-[500px] flex justify-center items-center w-full h-[52px] mt-[24px] sm:w-[210px] sm:h-[52px] sm:mt-[10px]'>
                <p>Shop Now</p>
              </button>
            </Link>
          </div>
          <div className='flex flex-col items-start w-full max-w-[611px] justify-between mt-[48px] leading-[22px]'>
            <div className='flex justify-between w-full'>
              {stats.map((stat, index) => (
                <div key={index} className='flex flex-col items-start'>
                  <p className='text-[24px] sm:text-[40px] font-bold'>{stat.value}</p>
                  <p className='text-sm text-gray-500 pt-[10px] sm:pt-[20px]'>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center content-center relative'>
          <img
            className='relative max-w-[490px] max-h-[400px] sm:max-w-[577px] sm:max-h-[650px] object-cover object-top'
            src='/file2.jpeg'
            alt='Hero Image'
          />
          <img
            className='absolute 2xl:left-[100px] md:right-[700px] lg:left-[60px] left-[27px] lg:mt-[393px] mt-[137px] transform -translate-y-1/2 lg:w-[56px] lg:h-[56px] w-[44px] h-[44px]'
            src='/svgs/hero/smallstar.svg'
          />
          <img
            className='absolute lg:right-20 right-4 lg:h-[106px] lg:w-[106px] h-[76px] w-[76px] mt-[40px] lg:mt-[182px] transform -translate-y-1/2'
            src='/svgs/hero/bigstar.svg'
          />
        </div>
      </div>

      <div className='bg-black p-10 sm:w-full flex items-center justify-center'>
        <div className='flex w-full flex-wrap lg:justify-between md:justify-center justify-center gap-5'>
          {brands.map((brand, index) => (
            <img key={index} src={brand.src} alt={brand.alt} className='sm:h-12 md:h-[30px] h-[23px]' />
          ))}
        </div>
      </div>
    </div>
  );
}
