'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Use Link from next/link

const categories = [
  {image: '/casual.png', alt: 'Casual Wear', category: 'Casual'},
  {image: '/formal.png', alt: 'Formal Wear', category: 'Formal'},
  {image: '/party.png', alt: 'Party Wear', category: 'Party'},
  {image: '/gym.png', alt: 'Gym Wear', category: 'Gym'}
];

function Banner() {
  return (
    <div className='bg-[#ffff] px-[24px] sm:px-[64px] lg:px-[100px]'>
      {/* Headline */}
      <div className='bg-[#F0F0F0] py-24'>
        <h2 className='text-center text-3xl font-semibold mb-10'>BROWSE BY DRESS STYLE</h2>

        {/* Responsive Grid for Cards */}
        <div className='grid lg:grid-cols-6 grid-cols-1 gap-6 sm:w-full mx-auto p-10'>
          {/* First Row */}
          <div className='lg:col-span-2 col-span-1'>
            <Link href={`/shop?category=Casual`}>
              <div className='relative w-full sm:h-[289px] h-[190px] mx-auto cursor-pointer'>
                <Image
                  src={categories[0].image}
                  alt={categories[0].alt}
                  layout='fill'
                  className='rounded-xl object-cover'
                />
              </div>
            </Link>
          </div>
          <div className='lg:col-span-4 col-span-1'>
            <Link href={`/shoppage?category=Formal`}>
              <div className='relative sm:h-[289px] w-full h-[190px] mx-auto cursor-pointer'>
                <Image
                  src={categories[1].image}
                  alt={categories[1].alt}
                  layout='fill'
                  className='rounded-xl object-cover'
                />
              </div>
            </Link>
          </div>

          {/* Second Row */}
          <div className='lg:col-span-4 col-span-1'>
            <Link href={`/shoppage?category=Party`}>
              <div className='relative sm:h-[289px] lg:min-w-[656px] w-full h-[190px] mx-auto cursor-pointer'>
                <Image
                  src={categories[2].image}
                  alt={categories[2].alt}
                  layout='fill'
                  className='rounded-xl object-cover'
                />
              </div>
            </Link>
          </div>
          <div className='lg:col-span-2 col-span-1'>
            <Link href={`/shoppage?category=Gym`}>
              <div className='relative sm:h-[289px] w-full lg:max-w-[448px] h-[190px] mx-auto cursor-pointer'>
                <Image
                  src={categories[3].image}
                  alt={categories[3].alt}
                  layout='fill'
                  className='rounded-xl object-cover'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
