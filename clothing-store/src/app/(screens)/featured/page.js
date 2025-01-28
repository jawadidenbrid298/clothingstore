'use client';
import React, {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api'; // Import generateClient
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {listProductshopcojawads, listReviewshops} from '../../../graphql/queries'; // Import GraphQL queries
import Link from 'next/link';
import {ABeeZee} from '@next/font/google';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const FeaturedPage = () => {
  const [products, setProducts] = useState({newArrivals: [], topSelling: []});
  const [ratings, setRatings] = useState({}); // Store average ratings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllNewArrivals, setShowAllNewArrivals] = useState(false);
  const [showAllTopSelling, setShowAllTopSelling] = useState(false);
  const [nextToken, setNextToken] = useState(null); // For pagination
  const [filter, setFilter] = useState(null);

  // Fetch products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      const client = generateClient();
      try {
        // Fetch products with limit set to 8 and nextToken for pagination
        const response = await client.graphql({
          query: listProductshopcojawads,
          variables: {
            filter,
            limit: 8, // Set limit to 8
            nextToken // Only pass nextToken if it's available
          }
        });

        if (response.data && response.data.listProductshopcojawads) {
          const newProducts = response.data.listProductshopcojawads.items;

          // Prevent duplication by checking if the product is already in state
          const existingProductIds = new Set(products.newArrivals.map((product) => product.id));
          const uniqueNewProducts = newProducts.filter((product) => !existingProductIds.has(product.id));

          if (uniqueNewProducts.length > 0) {
            // Sort new arrivals by creation date (assumes `createdAt` is available)
            const sortedNewArrivals = uniqueNewProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Fetch average ratings for all products
            fetchAllRatings(uniqueNewProducts);

            setProducts((prevState) => ({
              newArrivals: [...prevState.newArrivals, ...sortedNewArrivals],
              topSelling: [...prevState.topSelling] // Keep the existing top-selling products intact
            }));
          }

          // Sort top-selling products by ratings (highest rating first)
          const sortedTopSelling = [...products.topSelling, ...uniqueNewProducts].sort((a, b) => {
            const ratingA = ratings[a.id] || 0;
            const ratingB = ratings[b.id] || 0;
            return ratingB - ratingA; // Sort by descending rating
          });

          setProducts((prevState) => ({
            newArrivals: prevState.newArrivals,
            topSelling: sortedTopSelling // Update top-selling products only
          }));

          if (response.data.listProductshopcojawads.nextToken) {
            setNextToken(response.data.listProductshopcojawads.nextToken);
          } else {
            setNextToken(null); // No more data, stop further fetches
          }

          setLoading(false);
        } else {
          throw new Error('No data returned from the API');
        }
      } catch (error) {
        setError('Error fetching product data');
        setLoading(false);
        console.error('Error fetching product data:', error.message || error);
      }
    };

    // Trigger the fetch when nextToken is available or initially
    if (nextToken !== null || !products.newArrivals.length) {
      fetchProducts();
    }
  }, [nextToken, filter, ratings]);

  // Fetch average ratings for all products
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`bg-[#fffff] py-8 ${abeezee.className}`}>
      <div className='container mx-auto px-4'>
        {/* New Arrivals Section */}
        <div className='mb-8'>
          <h2 className='text-[32px] sm:text-[48px] text-gray-800 text-center'>NEW ARRIVALS</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {(showAllNewArrivals ? products.newArrivals : products.newArrivals.slice(0, 4)).map((product) => (
              <Link
                key={product.id}
                href={`/category?id=${product.id}`} // Navigate to CategoryPage with the product's ID as query param
              >
                <div className='bg-white flex flex-col items-start justify-center mx-auto p-4 rounded-md cursor-pointer'>
                  <StorageImage
                    className='w-[295px] h-[298px] object-cover rounded-[20px] mb-4'
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
                    <span className='text-black sm:text-[24px] text-[20px] mr-2'>${product.price}</span>
                    <span className='text-xl font-semibold text-gray-800'>${product.newPrice}</span>
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

        {/* Separator Line */}
        <div className='border-t-2' style={{borderColor: '#F2F0F1'}}></div>

        {/* Top Selling Section */}
        <div className='mt-8'>
          <h2 className='sm:text-[48px] text-[32px] text-black text-center'>TOP SELLING</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
            {(showAllTopSelling ? products.topSelling : products.topSelling.slice(0, 4)).map((product) => (
              <Link key={product.id} href={`/category?id=${product.id}`}>
                <div className='bg-white flex flex-col items-start justify-center mx-auto text-left p-4 rounded-md cursor-pointer'>
                  <StorageImage
                    className='w-[295px] h-[298px] object-cover rounded-[20px] mb-4'
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
                    <span className='text-black sm:text-[24px] text-[20px] mr-2'>${product.price}</span>
                    <span className='text-xl font-semibold text-gray-800'>${product.newPrice}</span>
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
