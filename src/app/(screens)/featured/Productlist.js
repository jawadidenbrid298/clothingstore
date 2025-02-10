'use client';

import React from 'react';
import ProductCard from './Productcard';
import ShimmerPlaceholder from '../../../../public/purecomponents/shimmerplaceholders';

const ProductList = ({title, products, ratings, showAll, onToggleShowAll}) => {
  return (
    <div>
      <h2 className='text-[32px] sm:text-[48px] text-gray-800 text-center mt-[73px]'>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[39px]'>
        {products.length === 0
          ? Array.from({length: 4}).map((_, index) => <ShimmerPlaceholder key={index} />)
          : (showAll ? products : products.slice(0, 4)).map((product) => (
              <ProductCard key={product.id} product={product} rating={ratings[product.id]} />
            ))}
      </div>
      <div className='text-center mt-4 mb-16'>
        <button
          onClick={onToggleShowAll}
          className='bg-white md:text-[16px] text-[14px] md:leading-[18.91px] leading-[16.55px] text-black md:py-[16.5px] py-[14.5px] md:px-[77.5px] px-[151.5px] border rounded-[62px]'>
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
