'use client';
import React, {useState, useEffect} from 'react';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads} from '../../../graphql/queries';
import {ChevronRight, Menu, X} from 'lucide-react';
import {Slider} from 'antd';
import {categories, styles, colors, sizes, priceRange} from './data';

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  priceRange = [0, 200],
  handlePriceChange,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedStyle,
  setSelectedStyle,
  applyFilters,
  setProducts
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApplyFilters = async () => {
    console.log('Applying Filters...');
    console.log('Category:', selectedCategory);
    console.log('Price Range:', priceRange);
    console.log('Color:', selectedColor);
    console.log('Size:', selectedSize);
    console.log('Style:', selectedStyle);

    let variables = {
      filter: {
        and: [
          selectedCategory ? {category: {eq: selectedCategory}} : null,
          selectedColor ? {colors: {contains: selectedColor}} : null,
          selectedSize ? {sizes: {contains: selectedSize}} : null,
          selectedStyle ? {style: {eq: selectedStyle}} : null,
          {newPrice: {between: priceRange}}
        ].filter(Boolean)
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

      if (response.data?.listProductshopcojawads?.items) {
        setProducts(response.data.listProductshopcojawads.items);
      } else {
        setProducts([]);
      }

      setIsFilterOpen(false);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };
  return (
    <>
      {isMobile && !isFilterOpen && (
        <button
          onClick={() => setIsFilterOpen(true)}
          className='w-full py-2 px-4 bg-none text-white rounded-lg mt-4 flex justify-right items-right'>
          <img src='/svgs/filter/filter.svg' />
        </button>
      )}

      <div
        className={`w-full md:w-1/4 p-5 border rounded-lg bg-white transition-transform duration-300 fixed top-0 left-0 z-2000 
    ${isMobile ? (isFilterOpen ? 'translate-x-0' : '-translate-x-full') : 'relative'} 
    ${isMobile ? 'max-h-screen overflow-y-auto' : ''}`} // Make it scrollable
      >
        {isMobile && isFilterOpen && (
          <button
            onClick={() => setIsFilterOpen(false)}
            className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'>
            <X className='w-6 h-6' />
          </button>
        )}

        <h3 className='text-xl font-semibold mb-4'>Filters</h3>

        <div className='mb-6 z-2000'>
          <h4 className='font-semibold mb-2'>Select by Dress Style</h4>
          <div className='flex flex-col gap-2'>
            {styles.map((style) => (
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

        <div className='mb-6'>
          <label className='block mb-2 text-sm font-semibold'>Color</label>
          <div className='flex flex-wrap gap-2'>
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                style={{backgroundColor: color.toLowerCase(), cursor: 'pointer', position: 'relative'}}>
                {selectedColor === color && (
                  <span className='absolute inset-0 flex justify-center items-center'>
                    {/* Space for the check mark SVG */}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='mb-6'>
          <label className='block mb-2 text-sm font-semibold'>Size</label>
          <div className='flex flex-wrap gap-2'>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className='mb-6'>
          <h4 className='font-semibold mb-2'>Select by Dress Style</h4>
          <div className='flex flex-col gap-2'>
            {categories.map((category) => (
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

        <button onClick={handleApplyFilters} className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4'>
          Apply Filters
        </button>
      </div>

      {isMobile && isFilterOpen && (
        <div className='inset-0 bg-black opacity-50 z-30 mt-[300px]' onClick={() => setIsFilterOpen(false)} />
      )}
    </>
  );
};

export default Filters;
