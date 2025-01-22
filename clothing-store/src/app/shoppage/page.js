'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link'; // Import Next.js Link component
import {useProduct} from '../context/ProductContext'; // Import your ProductContext

const ProductFilterSection = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on user input
  const [priceRange, setPriceRange] = useState([0.1, 100]); // Initial price range
  const [selectedColor, setSelectedColor] = useState(''); // Selected color filter
  const [selectedSize, setSelectedSize] = useState(''); // Selected size filter
  const {setProduct} = useProduct(); // Get the setProduct function from context

  useEffect(() => {
   
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data?.newArrivals || []); // Ensure it's always an array
        setFilteredProducts(data?.newArrivals || []); // Initialize filtered products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle price range change
  const handlePriceChange = (event) => {
    const newPriceRange = [...priceRange];
    newPriceRange[event.target.name === 'min' ? 0 : 1] = parseFloat(event.target.value);
    setPriceRange(newPriceRange);
  };

  // Handle color filter change
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Handle size filter change
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Apply filters to products
  const applyFilters = () => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1]);

    // Filter by color
    if (selectedColor) {
      filtered = filtered.filter((product) => product.colors.includes(selectedColor));
    }

    // Filter by size
    if (selectedSize) {
      filtered = filtered.filter((product) => product.sizes.includes(selectedSize));
    }

    setFilteredProducts(filtered);
  };

  // Set selected product in context and navigate to the category page
  const handleProductClick = (product) => {
    setProduct(product); // Set the selected product in context
  };

  return (
    <div className='flex flex-col md:flex-row gap-10'>
      {/* Left Side Filters */}
      <div className='w-full md:w-1/4 p-5 border rounded-lg bg-white'>
        <h3 className='text-xl font-semibold mb-4'>Filters</h3>

        {/* Price Range Filter */}
        <div className='mb-4'>
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
        <div className='mb-4'>
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
        <div className='mb-4'>
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
              <div key={product.id} className='card bg-white p-5 rounded-lg shadow-md'>
                <Link href='/category' onClick={() => handleProductClick(product)}>
                  <img src={product.image} alt={product.name} className='w-full h-48 object-cover mb-4' />
                  <h4 className='font-semibold text-lg'>{product.name}</h4>
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
