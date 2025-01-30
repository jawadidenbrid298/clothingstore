'use client';

import React, {useState} from 'react';
import {generateClient} from 'aws-amplify/api';
import {uploadData} from 'aws-amplify/storage';
import {createProductshopcojawad} from '../../../graphql/mutations';
import SignOutButton from '@/app/auth/signout/page';
import ProtectedRoute from '@/app/Protectedroute'; // Adjust the import path based on your project structure

const ProductModal = () => {
  const [productData, setProductData] = useState({
    category: '',
    name: '',
    price: '',
    newPrice: '',
    sizes: '',
    discount: '',
    colors: '',
    description: '',
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    const {name, value} = e.target;
    const newData = {...productData, [name]: value};

    // Calculate new price when discount percentage is updated
    if (name === 'discountPercentage' && newData.discountPercentage && productData.price) {
      const discountPercentage = parseFloat(newData.discountPercentage);
      const originalPrice = parseFloat(productData.price);
      const newPrice = originalPrice - originalPrice * (discountPercentage / 100);

      newData.newPrice = newPrice.toFixed(2); // Save the new price with 2 decimal places
    }

    setProductData(newData);
  };

  // Handle file selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + productData.images.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);

    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files]
    }));
  };

  // Upload images and return their paths
  const uploadImages = async (files) => {
    const uploadedKeys = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const key = `products/${Date.now()}_${file.name}`;
      try {
        await uploadData({
          key,
          data: file,
          options: {
            onProgress: ({transferredBytes, totalBytes}) => {
              if (totalBytes) {
                setUploadProgress(Math.round((transferredBytes / totalBytes) * 100));
              }
            }
          }
        });
        uploadedKeys.push(key);
      } catch (error) {
        console.error(`Error uploading image ${file.name}:`, error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }
    return uploadedKeys;
  };
  const calculateNewPrice = (price, percentage) => {
    if (!percentage) return price; // If no percentage, return the original price
    const discount = (price * percentage) / 100;
    return price - discount;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the new price based on the discount percentage
    const discount = parseFloat(productData.discountPercentage) || 0;
    const newPrice = calculateNewPrice(parseFloat(productData.price), discount);

    // Upload images and get their keys
    const uploadedImageKeys = await uploadImages(productData.images);

    // Create product object
    const newProduct = {
      name: productData.name,
      category: productData.category,
      newPrice: parseFloat(newPrice), // Store only newPrice
      discount: discount,
      sizes: productData.sizes.split(',').map((size) => size.trim()),
      colors: productData.colors.split(',').map((color) => color.trim()),
      description: productData.description,
      images: uploadedImageKeys
    };

    // Only add `price` if discount is greater than 0
    if (discount > 0) {
      newProduct.price = parseFloat(productData.price);
    }

    try {
      const client = generateClient(); // Initialize the client
      const response = await client.graphql({
        query: createProductshopcojawad,
        variables: {input: newProduct}
      });

      if (response.data) {
        alert('Product created successfully!');
        setProductData({
          category: '',
          name: '',
          price: '',
          newPrice: '',
          discount: '',
          sizes: '',
          colors: '',
          description: '',
          images: []
        });
        setImagePreviews([]);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };

  // Close the modal when clicked outside
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false); // Close the modal
    }
  };

  return (
    modalVisible && (
      <ProtectedRoute>
        <div className='inset-0 bg-gray-800 z-60 bg-opacity-50 flex justify-center items-center' onClick={handleClose}>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              {/* Category */}
              <div className='mb-4'>
                <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
                  Category
                </label>
                <select
                  id='category'
                  name='category'
                  value={productData.category}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  required>
                  <option value=''>Select a category</option>
                  <option value='Casual'>Casual</option>
                  <option value='Formal'>Formal</option>
                  <option value='Party'>Party</option>
                  <option value='Gym'>Gym</option>
                </select>
              </div>

              {/* Product Name */}
              <div className='mb-4'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Product Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={productData.name}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  required
                />
              </div>

              {/* Price */}
              <div className='mb-4'>
                <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                  Price ($)
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={productData.price}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='discountPercentage' className='block text-sm font-medium text-gray-700'>
                  Discount Percentage
                </label>
                <input
                  type='number'
                  id='discount'
                  name='discountPercentage'
                  value={productData.discountPercentage || ''}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  placeholder='e.g., 50'
                />
              </div>

              {/* Display New Price after Calculation */}
              <div className='mb-4'>
                <label htmlFor='newPrice' className='block text-sm font-medium text-gray-700'>
                  New Price (calculated)
                </label>
                <input
                  type='number'
                  id='newPrice'
                  name='newPrice'
                  value={productData.newPrice}
                  readOnly
                  className='w-full mt-1 p-2 border rounded-md'
                  placeholder='e.g., 10'
                />
              </div>

              {/* Sizes */}
              <div className='mb-4'>
                <label htmlFor='sizes' className='block text-sm font-medium text-gray-700'>
                  Sizes (comma-separated)
                </label>
                <input
                  type='text'
                  id='sizes'
                  name='sizes'
                  value={productData.sizes}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  placeholder='e.g., Small, Medium, Large'
                  required
                />
              </div>

              {/* Colors */}
              <div className='mb-4'>
                <label htmlFor='colors' className='block text-sm font-medium text-gray-700'>
                  Colors (comma-separated)
                </label>
                <input
                  type='text'
                  id='colors'
                  name='colors'
                  value={productData.colors}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  placeholder='e.g., Red, Blue, Green'
                  required
                />
              </div>

              {/* Description */}
              <div className='mb-4'>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={productData.description}
                  onChange={handleChange}
                  className='w-full mt-1 p-2 border rounded-md'
                  rows='4'
                  placeholder='Enter product description'
                  required
                />
              </div>

              {/* Image Upload */}
              <div className='mb-4'>
                <label htmlFor='images' className='block text-sm font-medium text-gray-700'>
                  Upload Images (max 4)
                </label>
                <input
                  type='file'
                  id='images'
                  name='images'
                  multiple
                  onChange={handleImageUpload}
                  className='w-full mt-1 p-2 border rounded-md'
                  accept='image/*'
                />
                {imagePreviews.length > 0 && (
                  <div className='mt-4 grid grid-cols-2 gap-2'>
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className='w-[80px] h-[80px] border rounded-md'
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploadProgress > 0 && (
                <div className='mb-4'>
                  <p className='text-sm text-gray-700'>Upload Progress: {uploadProgress}%</p>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button type='submit' className='w-full bg-black text-white py-2 rounded-lg'>
                  Save Product
                </button>
              </div>
            </form>

            {/* Sign Out Button */}
            <div className='mt-4'>
              <SignOutButton />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  );
};

export default ProductModal;
