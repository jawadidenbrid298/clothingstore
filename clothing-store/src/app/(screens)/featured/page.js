'use client';
import React, {useState, useEffect} from 'react';
import {useProduct} from '@/app/context/ProductContext'; // Use ProductContext
import Link from 'next/link'; // Import Link component

const FeaturedPage = () => {
  const [products, setProducts] = useState({newArrivals: [], topSelling: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setProduct} = useProduct(); // Access setProduct from context

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching products');
        setLoading(false);
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function to handle product click and navigate to CategoryPage
  const handleProductClick = (product) => {
    setProduct(product); // Set the entire product object in context
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='bg-[#fffff] py-8'>
      <div className='container mx-auto px-4'>
        {/* New Arrivals Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold text-gray-800 text-center'>New Arrivals</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {products.newArrivals.map((product) => (
              <Link
                key={product.id}
                href='/category'
                passHref
                onClick={() => handleProductClick(product)} // Pass entire product object to context
              >
                <div className='bg-white p-4 rounded-md shadow-md cursor-pointer'>
                  <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-md mb-4' />
                  <h3 className='text-lg font-medium text-gray-800'>{product.name}</h3>
                  <div className='flex items-center mt-2'>
                    <span className='text-yellow-500'>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className='text-gray-500 ml-2'>({product.rating})</span>
                  </div>
                  <p className='text-xl font-semibold text-gray-800 mt-2'>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className='border-t-2' style={{borderColor: '#F2F0F1'}}></div>

        {/* Top Selling Section */}
        <div className='mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800 text-center'>Top Selling</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {products.topSelling.map((product) => (
              <Link
                key={product.id}
                href='/category'
                passHref
                onClick={() => handleProductClick(product)} // Pass entire product object to context
              >
                <div className='bg-white p-4 rounded-md shadow-md cursor-pointer'>
                  <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-md mb-4' />
                  <h3 className='text-lg font-medium text-gray-800'>{product.name}</h3>
                  <div className='flex items-center mt-2'>
                    <span className='text-yellow-500'>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className='text-gray-500 ml-2'>({product.rating})</span>
                  </div>
                  <p className='text-xl font-semibold text-gray-800 mt-2'>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
