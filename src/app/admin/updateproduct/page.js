'use client';

import React, {useState, useEffect} from 'react';
import {generateClient} from 'aws-amplify/api';
import {updateProductshopcojawad} from '../../../graphql/mutations';
import {uploadData} from 'aws-amplify/storage';
import {StorageImage} from '@aws-amplify/ui-react-storage';

const UpdateProductModal = ({product, onClose}) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    newPrice: '',
    discount: '',
    sizes: '',
    colors: '',
    description: '',
    images: [],
    category: '',
    ...product // Merge with the product if available
  });

  const [newImages, setNewImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setProductData({
      name: product.name || '',
      price: product.price || '',
      newPrice: product.newPrice || '',
      discount: product.discount || '',
      sizes: product.sizes ? product.sizes.join(', ') : '',
      colors: product.colors ? product.colors.join(', ') : '',
      description: product.description || '',
      images: product.images || [],
      category: product.category || ''
    });
  }, [product]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    // If discount is being changed, update the newPrice
    if (name === 'discount') {
      const discount = parseFloat(value) || 0;
      const price = parseFloat(productData.price) || 0;
      const newPrice = price - (price * discount) / 100;
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
        newPrice: newPrice.toFixed(2) // Update newPrice when discount is changed
      }));
    } else {
      setProductData((prevData) => ({...prevData, [name]: value}));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + productData.images.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }
    setNewImages([...newImages, ...files]);
  };

  const uploadImages = async (files) => {
    const uploadedKeys = [];
    for (const file of files) {
      const key = `products/${Date.now()}_${file.name}`;
      try {
        await uploadData({key, data: file});
        uploadedKeys.push(key);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}.`);
      }
    }
    return uploadedKeys;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedImages = [...productData.images];
    if (newImages.length > 0) {
      const uploadedKeys = await uploadImages(newImages);
      updatedImages = [...updatedImages, ...uploadedKeys];
    }

    const updatedProduct = {
      id: product.id,
      name: productData.name,
      category: productData.category,
      price: parseFloat(productData.price),
      newPrice: parseFloat(productData.newPrice),
      discount: parseFloat(productData.discount),
      sizes: productData.sizes.split(',').map((size) => size.trim()),
      colors: productData.colors.split(',').map((color) => color.trim()),
      description: productData.description,
      images: updatedImages
    };

    try {
      const client = generateClient();
      await client.graphql({
        query: updateProductshopcojawad,
        variables: {input: updatedProduct}
      });

      alert('Product updated successfully!');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              name='name'
              value={productData.name || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
              Price ($)
            </label>
            <input
              type='number'
              name='price'
              value={productData.price || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='discount' className='block text-sm font-medium text-gray-700'>
              Discount (%)
            </label>
            <input
              type='number'
              name='discount'
              value={productData.discount || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='newPrice' className='block text-sm font-medium text-gray-700'>
              New Price ($)
            </label>
            <input
              type='number'
              name='newPrice'
              value={productData.newPrice || ''}
              readOnly
              className='w-full mt-1 p-2 border rounded-md bg-gray-100'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              name='description'
              value={productData.description || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
              required
            />
          </div>

          <label className='block text-sm font-medium text-gray-700 mt-4'>Current Images:</label>
          <div className='flex space-x-2 mt-2'>
            {productData.images.map((img, index) => (
              <StorageImage key={index} imgKey={img} className='w-16 h-16 object-cover border rounded-md' />
            ))}
          </div>

          <div className='mb-4'>
            <label htmlFor='newImages' className='block text-sm font-medium text-gray-700'>
              Upload New Images (max 4)
            </label>
            <input
              type='file'
              multiple
              onChange={handleImageUpload}
              className='w-full mt-1 p-2 border rounded-md'
              accept='image/*'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='sizes' className='block text-sm font-medium text-gray-700'>
              Sizes (comma separated)
            </label>
            <input
              type='text'
              name='sizes'
              value={productData.sizes || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='colors' className='block text-sm font-medium text-gray-700'>
              Colors (comma separated)
            </label>
            <input
              type='text'
              name='colors'
              value={productData.colors || ''}
              onChange={handleChange}
              className='w-full mt-1 p-2 border rounded-md'
            />
          </div>

          {uploadProgress > 0 && <p className='text-sm text-gray-700 mt-2'>Upload Progress: {uploadProgress}%</p>}

          <div className='flex justify-end mt-4'>
            <button type='button' onClick={onClose} className='bg-gray-500 text-white py-2 px-4 rounded-md mr-2'>
              Cancel
            </button>
            <button type='submit' className='bg-black text-white py-2 px-4 rounded-md'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
