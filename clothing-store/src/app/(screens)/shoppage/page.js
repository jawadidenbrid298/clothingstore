'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useProduct} from '../../context/ProductContext';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads} from '../../../graphql/queries';
import {StorageImage} from '@aws-amplify/ui-react-storage';

const ProductFilterSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0.1, 100]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const {setProduct} = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const client = generateClient();
        const result = await client.graphql({
          query: listProductshopcojawads,
          variables: {limit: 100}
        });

        const productData = result.data.listProductshopcojawads.items || [];
        setProducts(productData);
        setFilteredProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceChange = (event) => {
    const newPriceRange = [...priceRange];
    newPriceRange[event.target.name === 'min' ? 0 : 1] = parseFloat(event.target.value);
    setPriceRange(newPriceRange);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by Category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }

    // Filter by Price Range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Filter by Color
    if (selectedColor) {
      filtered = filtered.filter((product) => product.colors.includes(selectedColor));
    }

    // Filter by Size
    if (selectedSize) {
      filtered = filtered.filter((product) => product.sizes.includes(selectedSize));
    }

    // Filter by Style
    if (selectedStyle) {
      filtered = filtered.filter((product) => product.style.toLowerCase().includes(selectedStyle.toLowerCase()));
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setProduct(product);
  };

  return (
    <div className='flex flex-col md:flex-row gap-10'>
      {/* Left Side Filters */}
      <div className='w-full md:w-1/4 p-5 border rounded-lg bg-white'>
        <h3 className='text-xl font-semibold mb-4'>Filters</h3>

        {/* Category Filter */}
        <div className='mb-6'>
          <h4 className='font-semibold mb-2'>Categories</h4>
          <div className='flex flex-col gap-2'>
            {['T-Shirts', 'Shorts', 'Shirts', 'Hoodies', 'Jeans'].map((category) => (
              <div
                key={category}
                onClick={() => handleCategoryChange(category)}
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
              value={priceRange[0]}
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
              value={priceRange[1]}
              onChange={handlePriceChange}
              className='w-1/2'
            />
          </div>
          <div className='flex justify-between text-sm'>
            <span>${priceRange[0].toFixed(2)}</span>
            <span>${priceRange[1].toFixed(2)}</span>
          </div>
        </div>

        {/* Color Filter */}
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-semibold'>Color</label>
          <div className='flex flex-wrap gap-2'>
            {['Red', 'Green', 'Blue', 'Black', 'White', 'Yellow', 'Pink', 'Purple', 'Gray'].map((color) => (
              <div
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                style={{backgroundColor: color.toLowerCase(), cursor: 'pointer'}}></div>
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
                onClick={() => handleSizeChange(size)}
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
                onClick={() => handleStyleChange(style)}
                className={`p-3 text-left cursor-pointer transform transition-transform duration-200 ${
                  selectedStyle === style ? 'text-blue-600 font-bold' : 'text-gray-600'
                } hover:scale-125`}>
                {style}
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filter Button */}
        <button onClick={applyFilters} className='w-full py-2 px-4 bg-blue-600 text-white rounded-lg mt-4'>
          Apply Filters
        </button>
      </div>

      {/* Right Side Products */}
      <div className='w-full md:w-3/4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='card bg-none p-5 rounded-lg'>
                {/* Updated Link with Product ID */}
                <Link href={`/category?id=${product.id}`} onClick={() => handleProductClick(product)}>
                  <StorageImage
                    className='w-[295px] h-[298px] object-cover rounded-md mb-4'
                    imgKey={product.images[0] || 'products/1737718292964_1.png'}
                    alt={product.name}
                  />
                  <h4 className='font-semibold sm:leading-[23.64px] sm:text-[20px] text-lg'>{product.name}</h4>
                  <p className='text-gray-600 mb-4'>
                    {product.colors.join(', ')} - {product.sizes.join(', ')}
                  </p>
                  <p className='text-xl font-bold'>${product.price.toFixed(2)}</p>
                </Link>
              </div>
            ))
          ) : (
            <div className='w-full text-center py-10 text-lg text-gray-600'>No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSection;
