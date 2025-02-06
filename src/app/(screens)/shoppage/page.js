'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useProduct} from '../../context/ProductContext';
import {generateClient} from '@aws-amplify/api';
import {listProductshopcojawads, listReviewshops, getTotalProducts} from '../../../graphql/queries';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import Filters from '../Filters/page';
import {FaStar, FaRegStar, FaStarHalfAlt} from 'react-icons/fa';
import {Spin} from 'antd';

const ProductFilterSection = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0.1, 100]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [ratings, setRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [nextToken, setNextToken] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const {setProduct} = useProduct();

  const limit = 12;

  useEffect(() => {
    fetchTotalProducts();
    fetchProducts(1);
  }, []);

  const fetchTotalProducts = async () => {
    try {
      const client = generateClient();
      const result = await client.graphql({query: getTotalProducts});

      console.log('GraphQL API Response:', result);

      if (result?.data?.getTotalProducts) {
        setTotalProducts(result.data.getTotalProducts.totalProducts);
      } else {
        console.error('Unexpected response structure:', result);
      }
    } catch (error) {
      console.error('Error fetching total products:', error);
    }
  };

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const client = generateClient();
      const result = await client.graphql({
        query: listProductshopcojawads,
        variables: {limit, nextToken: page === 1 ? null : nextToken}
      });

      const productData = result.data.listProductshopcojawads.items || [];
      setProducts(productData);
      setFilteredProducts(productData);
      setNextToken(result.data.listProductshopcojawads.nextToken);

      fetchAllRatings(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className='flex flex-col lg:flex-row sm:pt-[70px] pt-[51px] gap-10 md:px-[50px] lg:px-[50px] px-[20px]'>
      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        handlePriceChange={setPriceRange}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        setProducts={setFilteredProducts}
      />

      <div className='w-full'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Spin size='large' />
          </div>
        ) : (
          <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[10px]'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className='card w-full bg-none rounded-lg sm:items-start items-center'>
                  <Link href={`/category?id=${product.id}`} onClick={() => setProduct(product)}>
                    <StorageImage
                      className='w-full h-[298px] object-cover rounded-[20px] mb-4'
                      imgKey={product?.images[0] || 'products/1737718292964_1.png'}
                      alt={product.name}
                    />

                    <h4 className='font-semibold sm:leading-[23.64px] sm:text-[20px] text-lg'>{product.name}</h4>

                    <div className='flex items-center gap-1'>
                      {[...Array(Math.floor(ratings[product.id] || 0))].map((_, i) => (
                        <FaStar key={`full-${i}`} className='text-yellow-500' />
                      ))}
                      {(ratings[product.id] || 0) % 1 >= 0.5 && <FaStarHalfAlt className='text-yellow-500' />}
                      {[...Array(5 - Math.ceil(ratings[product.id] || 0))].map((_, i) => (
                        <FaRegStar key={`empty-${i}`} className='text-yellow-500' />
                      ))}
                      <span className='text-gray-600 text-sm'>({ratings[product.id]?.toFixed(1) || '0.0'})</span>
                    </div>

                    <div className='mt-2'>
                      <span className='sm:text-[24px] text-[20px] font-semibold text-gray-800'>
                        ${product.newPrice.toFixed(2)}
                      </span>

                      {product.price > 0 && product.discount > 0 && (
                        <>
                          <span className='text-gray-400 sm:text-[24px] text-[20px] pl-[10px] line-through mr-2'>
                            ${product.price.toFixed(2)}
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
        )}

        {/* Pagination */}
        <div className='flex justify-center mt-6 flex-col items-center'>
          <p className='text-gray-600 mb-2'>
            Showing {products.length} of {totalProducts} products
          </p>
          <div className='flex gap-2'>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === page ? 'bg-[#F2F0F1] text-black' : 'bg-none text-black'
                }`}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterSection;
