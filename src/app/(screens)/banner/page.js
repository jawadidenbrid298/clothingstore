'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Bannerdata from './data';

function Banner() {
  return (
    <div className='bg-[#ffff] px-[24px] sm:px-[64px] lg:px-[100px]'>
      <div className='bg-[#F0F0F0] py-24'>
        <h2 className='text-center text-3xl font-semibold mb-10'>BROWSE BY DRESS STYLE</h2>

        <div className='grid lg:grid-cols-5 grid-cols-1 gap-6 sm:w-full mx-auto p-10'>
          {Bannerdata.map((item, index) => {
            let colSpan = 'lg:col-span-2';
            if (index === 1 || index === 2) colSpan = 'lg:col-span-3';

            return (
              <div key={index} className={`${colSpan} col-span-1`}>
                <Link href={`/shoppage?category=${item.Bannerdata}`}>
                  <div className='relative sm:h-[289px] w-full h-[190px] mx-auto cursor-pointer'>
                    <Image src={item.image} alt={item.alt} layout='fill' className='rounded-xl object-cover' />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Banner;
