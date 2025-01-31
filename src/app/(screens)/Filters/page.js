'use client';
import React, {useState} from 'react';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads} from '../../../graphql/queries';
import {FaCheck} from 'react-icons/fa';

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange = [0, 100], // Default value to prevent undefined access
  handlePriceChange,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedStyle,
  setSelectedStyle,
  applyFilters,
  setProducts // Receive setProducts from parent
}) => {
  // Function to handle the application of filters
  const handleApplyFilters = async () => {
    console.log('Applying Filters...');
    console.log('Category:', selectedCategory);
    console.log('Price Range:', priceRange);
    console.log('Color:', selectedColor);
    console.log('Size:', selectedSize);
    console.log('Style:', selectedStyle);

    // Construct the GraphQL filter
    let variables = {
      filter: {
        and: [
          selectedCategory ? {category: {eq: selectedCategory}} : null,
          selectedColor ? {colors: {contains: selectedColor}} : null,
          selectedSize ? {sizes: {contains: selectedSize}} : null,
          selectedStyle ? {style: {eq: selectedStyle}} : null,
          {price: {between: priceRange}}
        ].filter(Boolean) // Remove null values
      },
      limit: 100
    };

    try {
      const client = generateClient();
      const response = await client.graphql({
        query: listProductshopcojawads,
        variables: variables
      });

      console.log('Filtered Products Response:', response);

      if (response.data && response.data.listProductshopcojawads.items) {
        const items = response.data?.listProductshopcojawads?.items || [];
        setProducts(items);
      } else {
        setProducts([]); // No products found, clear list
      }
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  return (
    <div className='w-full md:w-1/4 p-5 border rounded-lg bg-white'>
      <h3 className='text-xl font-semibold mb-4'>Filters</h3>

      {/* Category Filter */}
      <div className='mb-6'>
        <h4 className='font-semibold mb-2'>Categories</h4>
        <div className='flex flex-col gap-2'>
          {['T-Shirts', 'Shorts', 'Shirts', 'Hoodies', 'Jeans'].map((category) => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-3 text-left cursor-pointer transform transition-transform duration-200 ${
                selectedCategory === category ? 'text-blue-600 font-bold' : 'text-gray-600'
              } hover:scale-125`}>
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className='mb-6'>
        <label htmlFor='price-range' className='block mb-2 text-sm font-semibold'>
          Price Range
        </label>
        <div className='flex justify-between'>
          <input
            type='range'
            id='min-price'
            name='min'
            min='0.1'
            max='100'
            step='0.1'
            value={priceRange?.[0] ?? 0}
            onChange={handlePriceChange}
            className='w-1/2 mr-2'
          />
          <input
            type='range'
            id='max-price'
            name='max'
            min='0.1'
            max='100'
            step='0.1'
            value={priceRange?.[1] ?? 100}
            onChange={handlePriceChange}
            className='w-1/2'
          />
        </div>
        <div className='flex justify-between text-sm'>
          <span>${(priceRange?.[0] ?? 0).toFixed(2)}</span>
          <span>${(priceRange?.[1] ?? 100).toFixed(2)}</span>
        </div>
      </div>

      {/* Color Filter */}
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-semibold'>Color</label>
        <div className='flex flex-wrap gap-2'>
          {['Red', 'Green', 'Blue', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Gray'].map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
              style={{backgroundColor: color.toLowerCase(), cursor: 'pointer', position: 'relative'}}>
              {selectedColor === color && (
                <span className='absolute inset-0 flex justify-center items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='100'
                    height='100'
                    viewBox='0 0 32 32'
                    fill='white'>
                    <path d='M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L 29.71875 7.71875 Z'></path>
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className='mb-6'>
        <label className='block mb-2 text-sm font-semibold'>Size</label>
        <div className='flex gap-2'>
          {['Small', 'Medium', 'Large'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-blue-600 text-white' : 'bg-white'}`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style Filter */}
      <div className='mb-6'>
        <h4 className='font-semibold mb-2'>Select by Dress Style</h4>
        <div className='flex flex-col gap-2'>
          {['Casual', 'Party', 'Formal', 'Gym'].map((style) => (
            <div
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`p-3 text-left cursor-pointer transform transition-transform duration-200 ${
                selectedStyle === style ? 'text-blue-600 font-bold' : 'text-gray-600'
              } hover:scale-125`}>
              {style}
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filter Button */}
      <button onClick={handleApplyFilters} className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4'>
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
