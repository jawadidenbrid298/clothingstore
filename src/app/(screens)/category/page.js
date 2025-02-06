'use client';

import React, {useState, useEffect, Suspense} from 'react';
import {useCart} from '@/context/cartcontext/page';
import {FaStar} from 'react-icons/fa';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {useSearchParams} from 'next/navigation';
import {getProductshopcojawad} from '../../../graphql/queries';
import {listReviewshops} from '../../../graphql/queries'; // Query to list reviews
import {generateClient} from '@aws-amplify/api';
import CreateReview from '../productreview/page';
import ProtectedRoute from '@/app/Protectedroute';
import {ABeeZee} from 'next/font/google';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Spin} from 'antd';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const CategoryPageContent = () => {
  const {addToCart, cartItems, updateCartItemQuantity} = useCart();
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [faqs, setFaqs] = useState([]);
  const [selectedColor, setSelectedColor] = useState('Green');
  const [activeSection, setActiveSection] = useState('details');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]); // State for reviews
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  useEffect(() => {
    console.log(cartItems); // Log to check cartItems
  }, [cartItems]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          setLoading(true);
          setError(null);

          const api = generateClient();
          const response = await api.graphql({
            query: getProductshopcojawad,
            variables: {id: productId}
          });

          setProductDetails(response.data.getProductshopcojawad);
        } catch (err) {
          setError('Product not found');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    const updateCartItemQuantity = (itemId, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? {...item, quantity: Math.max(newQuantity, 1)} // Ensure quantity doesn't go below 1
            : item
        )
      );
    };

    const fetchReviews = async () => {
      if (productId) {
        try {
          const api = generateClient();
          const response = await api.graphql({
            query: listReviewshops,
            variables: {filter: {productID: {eq: productId}}}
          });

          const reviews = response.data.listReviewshops.items;
          setReviews(reviews);

          // Calculate the average rating
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            setAverageRating(averageRating);
          } else {
            setAverageRating(0);
          }
        } catch (err) {
          setError('Failed to load reviews');
          console.error('Error fetching reviews:', err);
        }
      }
    };

    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const handleAddToCart = () => {
    if (!productDetails) {
      alert('Product details not available!');
      return;
    }

    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color!');
      return;
    }

    const cartItem = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      newPrice: productDetails.newPrice,
      selectedSize,
      selectedColor,
      image: productDetails.images?.[0] || 'default-image.jpg',
      quantity
    };

    addToCart(cartItem);
    alert('Product added to cart');
    window.location.href = '/cart';
  };

  useEffect(() => {
    // Predefined FAQs
    setFaqs([
      {question: 'What is the return policy?', answer: 'You can return the product within 30 days.'},
      {question: 'How do I track my order?', answer: 'You can track your order via our tracking page.'},
      {question: 'Is this product available in other colors?', answer: 'Yes, it is available in various colors.'}
    ]);
  }, []);

  const handleNewReview = async () => {
    // Refresh reviews after a new review is submitted
    try {
      const api = generateClient();
      const response = await api.graphql({
        query: listReviewshops,
        variables: {filter: {productID: {eq: productId}}}
      });
      console.log('response', response);
      setReviews(response.data.listReviewshops.items);
    } catch (err) {
      console.error('Error refreshing reviews:', err);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }
  if (error || !productDetails) return <div>{error || 'Product not found'}</div>;

  return (
    <div className={`py-8 bg-gray-50 ${abeezee.className} `}>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='flex lg:flex-row flex-col-reverse lg:space-x-4'>
            {/* Handle Image Previews */}
            <div className='flex lg:flex-col mt-3 sm:mt-0 lg:space-y-4 lg:mr-4 space-x-4 lg:space-x-0'>
              {(productDetails.images?.length > 1
                ? productDetails.images.slice(1, 4)
                : [productDetails.images[0] || 'default-image.jpg']
              ).map((img, index) => (
                <StorageImage
                  key={index}
                  className={`sm:w-[152px] lg:h-[167px] w-full h-[106px] object-cover rounded-[20px] cursor-pointer ${
                    selectedImage === img ? 'border-[1px] border-black' : ''
                  }`}
                  imgKey={img}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Large Image */}
            <StorageImage
              className='w-full h-[530px] max-w-[444px] object-cover bg-transparent border rounded-[20px]'
              imgKey={selectedImage || productDetails.images[0] || 'default-image.jpg'}
            />
          </div>

          <div>
            <h2 className='font-semibold text-gray-800 text-[24px] sm:text-[40px]'>{productDetails.name}</h2>

            <div className='flex items-center mb-[14px] sm:mb-[12px] mt-[12px] sm:mt-[14px]'>
              <div className='text-yellow-400 sm:gap-[7.1px]'>
                {Array.from({length: 5}, (_, i) => (
                  <FaStar key={i} className={i < averageRating ? 'inline' : 'inline text-gray-300'} />
                ))}
              </div>
              <span className='sm:w-[41px] sm:h[19px] text-normal sm:text-[16px] sm:leading-[18.91px] ml-2 text-gray-600'>
                ({averageRating}/5)
              </span>
            </div>

            <div className='flex sm:w-[77px] sm:h-[38px] items-center mb-[14px] sm:mb-[12px]'>
              <span className='sm:text-[32px] text-[24px] sm:leading-[37.82px] leading-[28.37px] font-semibold text-gray-800'>
                ${productDetails.newPrice.toFixed(2)}
              </span>

              {productDetails.price > 0 && productDetails.discount > 0 && (
                <>
                  <span className='sm:text-[32px] text-[24px] sm:leading-[37.82px] leading-[28.37px] text-gray-400 ml-4 line-through'>
                    ${productDetails.price.toFixed(2)}
                  </span>
                  <span className='sm:text-[16px] text-[12px] sm:leading-[20px] leading-[16px] px-2 py-1 bg-[pink] text-[#FF3333] font-semibold rounded-[62px] ml-4'>
                    {productDetails.discount}%
                  </span>
                </>
              )}
            </div>

            <p className='pt-[23px] sm:pt[28px] w-full leading-[20px] sm:text-[16px] text-[14px] sm:leading-[22px] font-medium text-[#00000099] mb-[25px] sm:mb-[23px]'>
              {productDetails.description}
            </p>

            <div className='mt-4'>
              <h4 className='font-semibold text-gray-800 mb-2'>Sizes:</h4>
              <div className='flex space-x-4 gap-[12px]'>
                {productDetails.sizes?.map((size, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded-[62px] ${
                      size === selectedSize ? 'bg-black text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-4'>
              <h4 className='font-semibold text-gray-800 mb-2'>Colors:</h4>
              <div className='flex space-x-4'>
                {productDetails.colors?.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full relative ${
                      color === selectedColor ? 'border-2 border-black' : ''
                    }`}
                    style={{backgroundColor: color}}
                    onClick={() => setSelectedColor(color)}>
                    {color === selectedColor && (
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
                  </button>
                ))}
              </div>
            </div>
            <div className='flex items-center'>
              {cartItems.length === 0 ? (
                <p>No items in the cart</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center mt-[51px] sm:mt-[50px] space-x-2 bg-gray-200 px-4 py-2 rounded-[62px]'>
                    <button
                      className='px-2 text-lg font-bold '
                      onClick={() => updateCartItemQuantity(item.id, item.quantity > 1 ? item.quantity - 1 : 1)} // Ensures quantity doesn't go below 1
                    >
                      -
                    </button>
                    <span className='font-semibold'>{item.quantity || 1}</span>{' '}
                    {/* Default quantity is 1 if undefined */}
                    <button
                      className='px-2 text-lg font-bold'
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} // Increase quantity
                    >
                      +
                    </button>
                  </div>
                ))
              )}
              <button
                className='mt-[51px] sm:mt-[50px] px-[24px] w-full ml-[24px] py-3 bg-black sm:text-[16px] text-white rounded-[62px]'
                onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links for Sections */}
        <div className='relative flex justify-center space-x-10 mb-8 pt-10 mt-10 pb-6'>
          <div className='absolute bottom-0 left-0 w-full h-1 bg-gray-300'></div>
          <button
            onClick={() => setActiveSection('details')}
            className={`relative text-gray-600 hover:text-gray-800 ${
              activeSection === 'details' ? 'font-semibold' : ''
            }`}>
            Product Details
            {activeSection === 'details' && <div className='absolute bottom-0 left-0 w-full h-1 bg-black'></div>}
          </button>
          <button
            onClick={() => setActiveSection('faqs')}
            className={`relative text-gray-600 hover:text-gray-800 ${activeSection === 'faqs' ? 'font-semibold' : ''}`}>
            FAQs
            {activeSection === 'faqs' && <div className='absolute bottom-0 left-0 w-full h-1 bg-black'></div>}
          </button>
          <button
            onClick={() => setActiveSection('reviews')}
            className={`relative text-gray-600 hover:text-gray-800 ${
              activeSection === 'reviews' ? 'font-semibold' : ''
            }`}>
            Reviews
            {activeSection === 'reviews' && <div className='absolute bottom-0 left-0 w-full h-1 bg-black'></div>}
          </button>
        </div>
        <div className='pt-[20px] float-right'>
          <CreateReview productID={productId} onReviewSubmit={handleNewReview} />
        </div>

        {activeSection === 'details' && (
          <div className='mt-12'>
            <h3 className='text-2xl font-semibold mb-4'>Product Details</h3>
            <p>{productDetails.description}</p>
          </div>
        )}
        {activeSection === 'faqs' && (
          <div className='mt-12 pt-[24px]'>
            <h3 className='text-2xl font-semibold mb-4'>Frequently Asked Questions</h3>
            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div key={index} className='p-4 bg-gray-100 rounded-lg'>
                  <h4 className='font-semibold'>{faq.question}</h4>
                  <p className='mt-2'>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === 'reviews' && (
          <div className='mt-12 pt-[24px]'>
            <h3 className='text-2xl font-semibold mb-4 px-[16px] sm:px-[100px]'>Customer Reviews</h3>
            {loading ? (
              <p>Loading reviews...</p>
            ) : error ? (
              <p>{error}</p>
            ) : reviews.length > 0 ? (
              <div className='grid grid-cols-1 lg:grid-cols-2 px-[16px] sm:px-[100px] gap-6'>
                {reviews.map((review, index) => (
                  <div key={index} className='border p-6 rounded-lg'>
                    <div className='stars text-yellow-400 mb-2'>
                      {Array.from({length: 5}, (_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'inline' : 'inline text-gray-300'} />
                      ))}
                    </div>
                    <h4 className='text-lg font-semibold'>{review.name}</h4>
                    <p>{review.comment}</p>
                    <p className='text-gray-500'> Posted: {new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPageContent />
    </Suspense>
  );
};
export default CategoryPage;
