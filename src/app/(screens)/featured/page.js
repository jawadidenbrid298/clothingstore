'use client';
import React, {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {listProductshopcojawads, listReviewshops, Toprated} from '../../../graphql/queries';
import Link from 'next/link';
import {ABeeZee} from 'next/font/google';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const FeaturedPage = () => {
  const [products, setProducts] = useState({newArrivals: [], topSelling: []});
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
  const [showAllTopSelling, setShowAllTopSelling] = useState(false);
  const [nextToken, setNextToken] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const client = generateClient();
      try {
        const response = await client.graphql({
          query: listProductshopcojawads,
          variables: {
            filter,
            limit: 16,
            nextToken
          }
        });

        if (response.data && response.data.listProductshopcojawads) {
          let newProducts = response.data.listProductshopcojawads.items;

          const existingProductIds = new Set(products.newArrivals.map((product) => product.id));
          const uniqueNewProducts = newProducts.filter((product) => !existingProductIds.has(product.id));

          if (uniqueNewProducts.length > 0) {
            const sortedNewArrivals = uniqueNewProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            fetchAllRatings(uniqueNewProducts);

            setProducts((prevState) => ({
              newArrivals: [...prevState.newArrivals, ...sortedNewArrivals],
              topSelling: [...prevState.topSelling]
            }));
          }

          if (response.data.listProductshopcojawads.nextToken) {
            setNextToken(response.data.listProductshopcojawads.nextToken);
          } else {
            setNextToken(null);
          }
        } else {
          throw new Error('No data returned from the API');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching product data');
        setLoading(false);
        console.error('Error fetching product data:', error.message || error);
      }
    };

    if (nextToken !== null || !products.newArrivals.length) {
      fetchProducts();
    }
  }, [nextToken, filter, ratings]);

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
        const ratings = reviews.map((review) => review.rating);
        const averageRating = ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;

        ratingsObj[product.id] = averageRating;
      } catch (err) {
        console.error(`Error fetching rating for product ${product.id}:`, err);
        ratingsObj[product.id] = 0;
      }
    }

    setRatings((prevRatings) => ({...prevRatings, ...ratingsObj}));
  };

  const fetchTopRatedProducts = async () => {
    const client = generateClient();
    try {
      const topRatedResponse = await client.graphql({
        query: Toprated
      });

      console.log('Toprated Response:', topRatedResponse);

      const topRatedProducts = topRatedResponse.data.Toprated;

      if (topRatedProducts && topRatedProducts.length > 0) {
        const topProductIDs = topRatedProducts.map((product) => product.productID);
        console.log('Top Product IDs:', topProductIDs);

        const productDetails = await Promise.all(
          topProductIDs.map(async (productID) => {
            const response = await client.graphql({
              query: listProductshopcojawads,
              variables: {
                filter: {
                  id: {eq: productID}
                }
              }
            });

            console.log('Full Response for productID:', productID, response);

            if (
              !response ||
              !response.data ||
              !response.data.listProductshopcojawads ||
              response.data.listProductshopcojawads.items.length === 0
            ) {
              console.log(`No products found for ID: ${productID}`);
            }

            return response;
          })
        );

        console.log('All Product Details:', productDetails);

        console.log('Product Details:', productDetails);

        const topSellingProducts = productDetails.flatMap((response) => response.data.listProductshopcojawads.items);
        console.log('Top Selling Products:', topSellingProducts);

        setProducts((prevState) => ({
          newArrivals: prevState.newArrivals,
          topSelling: topSellingProducts
        }));
      } else {
        console.log('No top-rated products found.');
      }
    } catch (error) {
      setError('Error fetching top-rated products');
      console.error('Error fetching top-rated products:', error);
    }
  };

  useEffect(() => {
    fetchTopRatedProducts();
  }, [ratings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`bg-[#ffffff] py-8 ${abeezee.className}`}>
      <div className='container mx-auto px-4'>
        <div className='mb-8'>
          <h2 className='text-[32px] sm:text-[48px] text-gray-800 text-center'>NEW ARRIVALS</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {(showAllNewArrivals ? products.newArrivals : products.newArrivals.slice(0, 4)).map((product) => (
              <Link key={product.id} href={`/category?id=${product.id}`}>
                <div className='bg-white flex flex-col items-center sm:items-start justify-center mx-auto p-4 rounded-md cursor-pointer'>
                  <StorageImage
                    className='w-full h-[298px] object-cover rounded-[20px] mb-4'
                    imgKey={product.images[0] || 'products/1737718292964_1.png'}
                    alt={product.name}
                  />
                  <h3 className='text-lg font-medium text-gray-800'>{product.name}</h3>
                  <div className='flex items-center mt-2'>
                    <div className='flex items-center mt-2'>
                      {Array.from({length: 5}, (_, index) => (
                        <span
                          key={index}
                          className={
                            index < Math.floor(ratings[product.id] || 0) ? 'text-yellow-500' : 'text-gray-300'
                          }>
                          ★
                        </span>
                      ))}
                      <span className='text-gray-500 ml-2'>({ratings[product.id]?.toFixed(1) || 'No ratings'})</span>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <span className='sm:text-[24px] text-[20px] font-semibold text-gray-800'>${product.newPrice}</span>

                    {product.price > 0 && product.discount > 0 && (
                      <>
                        <span className='text-gray-400 sm:text-[24px] text-[20px] pl-[10px] line-through mr-2'>
                          ${product.price}
                        </span>
                        <span className='px-2 py-1 bg-[pink] text-[#FF3333] text-[12px] font-semibold rounded-full'>
                          {product.discount}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className='text-center mt-4'>
            <button
              onClick={() => setShowAllNewArrivals(!showAllNewArrivals)}
              className='bg-white text-black py-2 px-4 rounded-md'>
              {showAllNewArrivals ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>

        <div className='border-t-2' style={{borderColor: '#F2F0F1'}}></div>

        <div className='mt-8'>
          <h2 className='sm:text-[48px] text-[32px] text-black text-center'>TOP SELLING</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {(showAllTopSelling ? products.topSelling : products.topSelling.slice(0, 4)).map((product) => (
              <Link key={product.id} href={`/category?id=${product.id}`}>
                <div className='bg-white flex flex-col items-center sm:items-start justify-center mx-auto text-left p-4 rounded-md cursor-pointer'>
                  <StorageImage
                    className='w-full h-[298px] object-cover rounded-[20px] mb-4'
                    imgKey={product.images && product.images[0] ? product.images[0] : 'placeholder-image.png'}
                    alt={product.name}
                  />
                  <h3 className='text-[16px] sm:text-[20px] font-medium text-black'>{product.name}</h3>
                  <div className='flex items-center mt-2 gap-[5.31px]'>
                    <div className='flex items-center mt-2'>
                      {Array.from({length: 5}, (_, index) => (
                        <span
                          key={index}
                          className={
                            index < Math.floor(ratings[product.id] || 0) ? 'text-yellow-500' : 'text-gray-300'
                          }>
                          ★
                        </span>
                      ))}
                      <span className='text-gray-500 ml-2'>({ratings[product.id]?.toFixed(1) || 'No ratings'})</span>
                    </div>
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
                </div>
              </Link>
            ))}
          </div>
          <div className='text-center mt-4'>
            <button
              onClick={() => setShowAllTopSelling(!showAllTopSelling)}
              className='bg-white text-black py-2 px-4 rounded-md'>
              {showAllTopSelling ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
