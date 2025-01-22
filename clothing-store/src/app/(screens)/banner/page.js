'use client';
import React from 'react';
import Image from 'next/image';

const categories = [
  {image: '/casual.png', alt: 'Casual Wear', span: 'col-span-1'},
  {image: '/formal.png', alt: 'Formal Wear', span: 'col-span-2'},
  {image: '/party.png', alt: 'Party Wear', span: 'col-span-2'},
  {image: '/gym.png', alt: 'Gym Wear', span: 'col-span-1'}
];

function Banner() {
  return (
    <div className='bg-[#ffff] px-[24px] sm:px-[64px] lg:px-[100px]'>
      {/* Headline */}
      <div className='bg-[#F0F0F0] py-24'>
        <h2 className='text-center text-3xl font-semibold mb-10'>BROWSE BY DRESS STYLE</h2>

        {/* Responsive Grid for Cards */}
        <div className='grid lg:grid-cols-6 grid-cols-1 gap-6 sm:w-full  mx-auto p-10'>
          {/* First Row */}
          <div className='lg:col-span-2 col-span-1'>
            <div className='relative w-full sm:h-[289px]  h-[190px] mx-auto'>
              <Image
                src={categories[0].image}
                alt={categories[0].alt}
                layout='fill'
                className='rounded-lg object-cover'
              />
            </div>
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <div className='relative  sm:h-[289px] w-full h-[190px] mx-auto'>
              <Image
                src={categories[1].image}
                alt={categories[1].alt}
                layout='fill'
                className='rounded-lg object-cover'
              />
            </div>
          </div>

          {/* Second Row */}
          <div className='lg:col-span-4 col-span-1'>
            <div className='relative  sm:h-[289px] w-full h-[190px] mx-auto'>
              <Image
                src={categories[2].image}
                alt={categories[2].alt}
                layout='fill'
                className='rounded-lg object-cover'
              />
            </div>
          </div>
          <div className='lg:col-span-2 col-span-1'>
            <div className='relative  sm:h-[289px] w-full h-[190px] mx-auto'>
              <Image
                src={categories[3].image}
                alt={categories[3].alt}
                layout='fill'
                className='rounded-lg object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
