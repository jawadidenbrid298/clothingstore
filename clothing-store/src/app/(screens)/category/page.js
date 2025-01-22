'use client';
import React, {useState, useEffect} from 'react';
import {useProduct} from '@/app/context/ProductContext'; // Import Product Context
import {useCart} from '@/context/cartcontext/page'; // Import Cart Context
import {useRouter} from 'next/navigation'; // Import useRouter for navigation
import {FaStar} from 'react-icons/fa';

const CategoryPage = () => {
  const {product} = useProduct(); // Get the product from context
  const {addToCart} = useCart(); // Get addToCart function from Cart Context
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedColor, setSelectedColor] = useState('Green');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('details'); // Track which section is active
  const router = useRouter(); // Initialize the router

  // Fetch reviews from reviews.json
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const reviewsResponse = await fetch('/reviews.json');
        const reviewsData = await reviewsResponse.json();
        console.log('reviews', reviewsData);
        setReviews(reviewsData); // Fetch all reviews
      } catch (error) {
        setError('Error fetching reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product]);

  // Fetch FAQs (static for this example)
  useEffect(() => {
    setFaqs([
      {question: 'What is the return policy?', answer: 'You can return the product within 30 days.'},
      {question: 'How do I track my order?', answer: 'You can track your order via our tracking page.'},
      {question: 'Is this product available in other colors?', answer: 'Yes, it is available in various colors.'}
    ]);
  }, []);

  // Store selected size and color in localStorage
  useEffect(() => {
    localStorage.setItem('selectedSize', selectedSize);
    localStorage.setItem('selectedColor', selectedColor);
  }, [selectedSize, selectedColor]);

  // Add to Cart: Use the addToCart function from Cart Context
  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor
    };
    addToCart(cartItem);
    alert('Product added to cart');
    router.push('/cart'); // Redirect to the cart page
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className='py-8 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Product Image and Details */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='flex flex-col items-center'>
            <div className='flex space-x-4'>
              {/* Displaying the first 3 images */}
              {product.images?.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={product.img}
                  alt={`Product image ${index + 1}`}
                  className='w-24 h-24 object-cover rounded-md'
                />
              ))}
            </div>
            {/* Main Large Image */}
            <img
              src={product.image}
              alt='Large product image'
              className='mt-4 w-[358px] h-[290px] sm:w-[444px] sm:h-[530px] lg:w-[400px] object-cover rounded-md'
            />
          </div>

          {/* Product Details */}
          <div>
            <h2 className='text-2xl font-semibold text-gray-800'>{product.name}</h2>
            <p className='text-lg font-medium text-gray-600 mt-2'>{product.description}</p>
            <div className='flex items-center mt-4'>
              <span className='text-xl font-semibold text-gray-800'>${product.price}</span>
              <span className='text-sm text-gray-500 ml-4 line-through'>${product.originalPrice}</span>
            </div>

            {/* Size Selection */}
            <div className='mt-4'>
              <h3 className='text-gray-700'>Choose Size</h3>
              <div className='flex space-x-4 mt-2'>
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className='mt-4'>
              <h3 className='text-gray-700'>Select Color</h3>
              <div className='flex space-x-4 mt-2'>
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    style={{backgroundColor: color}}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg' onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Navigation Links for Sections (Centered with Bar that Moves with Click) */}
        <div className='relative flex justify-center space-x-10 mb-8 pt-10 mt-[50px] sm:mt-[80px] pb-[21px] sm:pb-[24px]'>
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

        {/* Product Details Section */}
        {activeSection === 'details' && (
          <div className='mt-12'>
            <h3 className='text-2xl font-semibold mb-4'>Product Details</h3>
            <p>{product.details}</p>
          </div>
        )}

        {/* FAQs Section */}
        {activeSection === 'faqs' && (
          <div className='mt-12'>
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

        {/* Reviews Section */}
        {activeSection === 'reviews' && (
          <div className='mt-12'>
            <h3 className='text-2xl font-semibold mb-4'>Customer Reviews</h3>
            {loading ? (
              <p>Loading reviews...</p>
            ) : error ? (
              <p>{error}</p>
            ) : reviews.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {reviews.map((review, index) => (
                  <div key={index} className='border p-6 rounded-lg'>
                    <div className='stars text-yellow-400 mb-2'>
                      {Array.from({length: 5}, (_, i) => (
                        <FaStar key={i} className={i < review.rating ? 'inline' : 'inline text-gray-300'} />
                      ))}
                    </div>
                    <h3 className='text-lg font-bold'>{review.name}</h3>
                    <p className='text-gray-600 mt-2'>{review.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available for this product.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
