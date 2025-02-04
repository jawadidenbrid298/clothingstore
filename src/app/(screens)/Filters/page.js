'use client';
import React, {useState, useEffect} from 'react';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads} from '../../../graphql/queries';
import {ChevronRight, Menu, X} from 'lucide-react';
import {Slider} from 'antd';

import {FaCheck} from 'react-icons/fa';
import {FaTimes} from 'react-icons/fa';

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
  const [isMobile, setIsMobile] = useState(false); // For mobile screen detection
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter panel visibility

  // Function to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          {newPrice: {between: priceRange}}
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
    <>
      {/* Mobile Menu Toggle */}
      {/* Mobile filter button - SVG */}
      {isMobile && !isFilterOpen && (
        <button
          onClick={() => setIsFilterOpen(true)}
          className='w-full py-2 px-4 bg-none text-white rounded-lg mt-4 flex justify-center items-center'>
          <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.75 6.75V12.5C7.75 12.6989 7.67098 12.8897 7.53033 13.0303C7.38968 13.171 7.19891 13.25 7 13.25C6.80109 13.25 6.61032 13.171 6.46967 13.0303C6.32902 12.8897 6.25 12.6989 6.25 12.5V6.75C6.25 6.55109 6.32902 6.36032 6.46967 6.21967C6.61032 6.07902 6.80109 6 7 6C7.19891 6 7.38968 6.07902 7.53033 6.21967C7.67098 6.36032 7.75 6.55109 7.75 6.75ZM11.5 11C11.3011 11 11.1103 11.079 10.9697 11.2197C10.829 11.3603 10.75 11.5511 10.75 11.75V12.5C10.75 12.6989 10.829 12.8897 10.9697 13.0303C11.1103 13.171 11.3011 13.25 11.5 13.25C11.6989 13.25 11.8897 13.171 12.0303 13.0303C12.171 12.8897 12.25 12.6989 12.25 12.5V11.75C12.25 11.5511 12.171 11.3603 12.0303 11.2197C11.8897 11.079 11.6989 11 11.5 11ZM13 8.5H12.25V1.5C12.25 1.30109 12.171 1.11032 12.0303 0.96967C11.8897 0.829018 11.6989 0.75 11.5 0.75C11.3011 0.75 11.1103 0.829018 10.9697 0.96967C10.829 1.11032 10.75 1.30109 10.75 1.5V8.5H10C9.80109 8.5 9.61032 8.57902 9.46967 8.71967C9.32902 8.86032 9.25 9.05109 9.25 9.25C9.25 9.44891 9.32902 9.63968 9.46967 9.78033C9.61032 9.92098 9.80109 10 10 10H13C13.1989 10 13.3897 9.92098 13.5303 9.78033C13.671 9.63968 13.75 9.44891 13.75 9.25C13.75 9.05109 13.671 8.86032 13.5303 8.71967C13.3897 8.57902 13.1989 8.5 13 8.5ZM2.5 9C2.30109 9 2.11032 9.07902 1.96967 9.21967C1.82902 9.36032 1.75 9.55109 1.75 9.75V12.5C1.75 12.6989 1.82902 12.8897 1.96967 13.0303C2.11032 13.171 2.30109 13.25 2.5 13.25C2.69891 13.25 2.88968 13.171 3.03033 13.0303C3.17098 12.8897 3.25 12.6989 3.25 12.5V9.75C3.25 9.55109 3.17098 9.36032 3.03033 9.21967C2.88968 9.07902 2.69891 9 2.5 9ZM4 6.5H3.25V1.5C3.25 1.30109 3.17098 1.11032 3.03033 0.96967C2.88968 0.829018 2.69891 0.75 2.5 0.75C2.30109 0.75 2.11032 0.829018 1.96967 0.96967C1.82902 1.11032 1.75 1.30109 1.75 1.5V6.5H1C0.801088 6.5 0.610322 6.57902 0.46967 6.71967C0.329018 6.86032 0.25 7.05109 0.25 7.25C0.25 7.44891 0.329018 7.63968 0.46967 7.78033C0.610322 7.92098 0.801088 8 1 8H4C4.19891 8 4.38968 7.92098 4.53033 7.78033C4.67098 7.63968 4.75 7.44891 4.75 7.25C4.75 7.05109 4.67098 6.86032 4.53033 6.71967C4.38968 6.57902 4.19891 6.5 4 6.5ZM8.5 3.5H7.75V1.5C7.75 1.30109 7.67098 1.11032 7.53033 0.96967C7.38968 0.829018 7.19891 0.75 7 0.75C6.80109 0.75 6.61032 0.829018 6.46967 0.96967C6.32902 1.11032 6.25 1.30109 6.25 1.5V3.5H5.5C5.30109 3.5 5.11032 3.57902 4.96967 3.71967C4.82902 3.86032 4.75 4.05109 4.75 4.25C4.75 4.44891 4.82902 4.63968 4.96967 4.78033C5.11032 4.92098 5.30109 5 5.5 5H8.5C8.69891 5 8.88968 4.92098 9.03033 4.78033C9.17098 4.63968 9.25 4.44891 9.25 4.25C9.25 4.05109 9.17098 3.86032 9.03033 3.71967C8.88968 3.57902 8.69891 3.5 8.5 3.5Z'
              fill='black'
            />
          </svg>
        </button>
      )}

      {/* Close button (X) when the menu is open */}

      {/* Filter Panel */}
      <div
        className={`w-full md:w-1/4 p-5 border rounded-lg bg-white transition-transform duration-300 fixed top-0 left-0 z-40 ${
          isMobile ? (isFilterOpen ? 'translate-x-0' : '-translate-x-full') : 'relative'
        }`}>
        <h3 className='text-xl font-semibold mb-4'>Filters</h3>

        {/* Category Filter */}
        <div className='mb-6'>
          <h4 className='font-semibold mb-2'>Select by Dress Style</h4>
          <div className='flex flex-col gap-2'>
            {['Casual', 'Party', 'Formal', 'Gym', 'HOODIE'].map((style) => (
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

        {/* Price Range Filter */}
        <div className='mb-6'>
          <label htmlFor='price-range' className='block mb-2 text-sm font-semibold'>
            Price Range
          </label>
          <Slider
            range
            draggableTrack
            min={0}
            max={200}
            step={0.1}
            defaultValue={priceRange}
            onChange={handlePriceChange}
            value={priceRange}
          />
          <div className='flex justify-between text-sm'>
            <span>${priceRange?.[0]?.toFixed(2) ?? 0}</span>
            <span>${priceRange?.[1]?.toFixed(2) ?? 100}</span>
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
          <div className='flex flex-wrap gap-2'>
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
            {['Casual', 'Party', 'Formal', 'Gym'].map((category) => (
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

        {/* Apply Filter Button */}
        <button onClick={handleApplyFilters} className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4'>
          Apply Filters
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isMobile && isFilterOpen && (
        <div className='inset-0 bg-black opacity-50 z-30 mt-[300px]' onClick={() => setIsFilterOpen(false)} />
      )}
      {isMobile && (
        <button onClick={() => setIsFilterOpen(false)} className='text-gray-600'>
          <X className='w-6 h-6' />
        </button>
      )}
    </>
  );
};

export default Filters;
