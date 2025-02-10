'use client';
import React from 'react';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import Link from 'next/link';

const ProductCard = ({product, rating, onClick}) => {
  return (
    <Link key={product.id} href={`/category?id=${product.id}`}>
      <div
        className='bg-white flex flex-col items-start justify-center mx-auto p-4 rounded-md cursor-pointer'
        onClick={onClick}>
        <StorageImage
          className='w-full min-w-[300px] xl:min-w-[300px] h-[298px] object-cover rounded-[20px] mb-4'
          imgKey={product.images[0] || 'products/1737718292964_1.png'}
          alt={product.name}
        />
        <h3 className='text-lg font-medium text-gray-800'>{product.name}</h3>
        <div className='flex items-center mt-2'>
          <div className='flex items-center mt-2'>
            {Array.from({length: 5}, (_, index) => (
              <span key={index} className={index < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
            <span className='text-gray-500 ml-2'>({rating?.toFixed(1) || 'No ratings'})</span>
          </div>
        </div>
        <div className='mt-2 flex'>
          <span className='sm:text-[24px] text-[20px]  font-semibold text-gray-800'>
            ${product.newPrice.toFixed(2)}
          </span>

          {product.price > 0 && product.discount > 0 && (
            <div className='flex items-center'>
              <>
                <p className='text-gray-400 sm:text-[24px] text-[20px] pl-[10px] line-through mr-2'>${product.price}</p>
                <p className='px-4   py-1 bg-[pink] text-[#FF3333] text-[12px] font-semibold rounded-full'>
                  {product.discount}%
                </p>
              </>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
