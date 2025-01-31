'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useProduct} from '../../context/ProductContext';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads, listReviewshops} from '../../../graphql/queries';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import Filters from '../Filters/page';
import {FaStar, FaRegStar, FaStarHalfAlt} from 'react-icons/fa';

const ProductFilterSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0.1, 100]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [ratings, setRatings] = useState({});
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

        fetchAllRatings(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const fetchAllRatings = async (products) => {
    const client = generateClient();
    const ratingsObj = {};

    for (const product of products) {
      try {
        const response = await client.graphql({
          query: listReviewshops,
          variables: {filter: {productID: {eq: product.id}}}
        });

        const reviews = response.data.listReviewshops.items;
        const ratingsArray = reviews.map((review) => review.rating);
        const averageRating =
          ratingsArray.length > 0 ? ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length : 0;

        ratingsObj[product.id] = averageRating;
      } catch (err) {
        console.error(`Error fetching rating for product ${product.id}:`, err);
        ratingsObj[product.id] = 0;
      }
    }

    setRatings(ratingsObj);
  };

  // Handle price range changes
  const handlePriceChange = (event) => {
    const newPriceRange = [...priceRange];
    newPriceRange[event.target.name === 'min' ? 0 : 1] = parseFloat(event.target.value);
    setPriceRange(newPriceRange);
  };

  // Set selected product to context
  const handleProductClick = (product) => {
    setProduct(product);
  };

  // Function to display stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className='flex text-yellow-500'>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col md:flex-row gap-10 px-[100px]'>
      {/* Left Side Filters */}
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        setProducts={setFilteredProducts}
      />

      <div className='w-full md:w-3/4 '>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='card w-full bg-none p-5 rounded-lg sm:items-start items-center'>
                <Link href={`/category?id=${product.id}`} onClick={() => handleProductClick(product)}>
                  <StorageImage
                    className='w-full h-[298px] object-cover rounded-[20px] mb-4'
                    imgKey={product.images[0] || 'products/1737718292964_1.png'}
                    alt={product.name}
                  />

                  <h4 className='font-semibold sm:leading-[23.64px] sm:text-[20px] text-lg'>{product.name}</h4>

                  <div className='flex items-center gap-1'>
                    {renderStars(ratings[product.id] || 0)}
                    <span className='text-gray-600 text-sm'>({ratings[product.id]?.toFixed(1) || '0.0'})</span>
                  </div>

                  <div className='mt-2'>
                    <span className='sm:text-[24px] text-[20px] font-semibold text-gray-800'>${product.newPrice}</span>

                    {product.price > 0 && product.discount > 0 && (
                      <>
                        <span className='text-gray-400 sm:text-[24px] text-[20px] pl-[10px] line-through mr-2'>
                          ${product.price}
                        </span>
                        <span className='px-2 py-1 bg-[pink] text-[#FF3333] text-[12px] font-semibold rounded-[62px]'>
                          {product.discount}%
                        </span>
                      </>
                    )}
                  </div>
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
