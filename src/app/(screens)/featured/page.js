'use client';
import React, {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {listProductshopcojawads, listReviewshops, Toprated} from '../../../graphql/queries';
import {ABeeZee} from 'next/font/google';
import ProductList from './Productlist';


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
  const [filter, setFilter] = useState(null);

  const fetchProducts = async () => {
    const client = generateClient();
    try {
      const response = await client.graphql({
        query: listProductshopcojawads,
        variables: {filter, limit: 12}
      });

      if (response.data && response.data.listProductshopcojawads) {
        setProducts((prevState) => ({
          newArrivals: response.data.listProductshopcojawads.items,
          topSelling: prevState.topSelling
        }));
      }
      setLoading(false);
    } catch (error) {
      setError('Error fetching product data');
      setLoading(false);
      console.error('Error fetching product data:', error.message || error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

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
        const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        ratingsObj[product.id] = averageRating;
      } catch (err) {
        console.error(`Error fetching rating for product ${product.id}:`, err);
        ratingsObj[product.id] = 0;
      }
    }
    setRatings((prevRatings) => ({...prevRatings, ...ratingsObj}));
  };

  useEffect(() => {
    if (products.newArrivals.length > 0) {
      fetchAllRatings(products.newArrivals);
    }
    if (products.topSelling.length > 0) {
      fetchAllRatings(products.topSelling);
    }
  }, [products]);

  const fetchTopRatedProducts = async () => {
    const client = generateClient();
    try {
      const topRatedResponse = await client.graphql({query: Toprated});
      const topRatedProducts = topRatedResponse.data.Toprated || [];
      const productIDs = topRatedProducts.map((product) => product.productID);
      const productDetails = await Promise.all(
        productIDs.map((productID) =>
          client.graphql({
            query: listProductshopcojawads,
            variables: {filter: {id: {eq: productID}}}
          })
        )
      );

      const topSellingProducts = productDetails.flatMap((response) => response.data.listProductshopcojawads.items);
      setProducts((prevState) => ({...prevState, topSelling: topSellingProducts}));
    } catch (error) {
      setError('Error fetching top-rated products');
      console.error('Error fetching top-rated products:', error);
    }
  };

  useEffect(() => {
    fetchTopRatedProducts();
  }, [ratings]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`bg-[#ffffff] py-8 ${abeezee.className}`}>
      <div className='container mx-auto px-4'>
        <ProductList
          title='NEW ARRIVALS'
          products={products.newArrivals}
          ratings={ratings}
          showAll={showAllNewArrivals}
          onToggleShowAll={() => setShowAllNewArrivals(!showAllNewArrivals)}
        />
        <div className='border-t-2' style={{borderColor: '#F2F0F1'}}></div>
        <ProductList
          title='TOP SELLING'
          products={products.topSelling}
          ratings={ratings}
          showAll={showAllTopSelling}
          onToggleShowAll={() => setShowAllTopSelling(!showAllTopSelling)}
        />
      </div>
    </div>
  );
};

export default FeaturedPage;
