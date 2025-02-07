import React from 'react';

const ShimmerPlaceholder = () => (
  <div className='bg-white flex flex-col items-center sm:items-start justify-center mx-auto p-4 rounded-md cursor-pointer animate-pulse'>
    <div className='bg-gray-300 w-full min-w-[300px] xl:min-w-[300px] h-[298px] rounded-[20px] mb-4'></div>
    <div className='bg-gray-300 w-32 h-6 mb-4'></div>
    <div className='bg-gray-300 w-24 h-4 mb-2'></div>
    <div className='flex items-center mt-2'>
      <div className='bg-gray-300 w-16 h-4 mr-2'></div>
    </div>
    <div className='mt-2 flex items-center'>
      <div className='bg-gray-300 w-24 h-6'></div>
    </div>
  </div>
);

export default ShimmerPlaceholder;
