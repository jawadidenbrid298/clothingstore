'use client';
import React, {useState} from 'react';
import {generateClient} from 'aws-amplify/api';
import {uploadData} from 'aws-amplify/storage';
import {createProductshopcojawad} from '../../../graphql/mutations';
import SignOutButton from '@/app/auth/signout/page';
import ProtectedRoute from '@/app/Protectedroute';
import InputField from '../../../../public/purecomponents/Inputfield'; // Adjust the path
import TextAreaField from '../../../../public/purecomponents/Textarea';
import {formFields} from './configurationform'; // Adjust the path

const ProductModal = () => {
  const [productData, setProductData] = useState({
    category: '',
    style: '',
    name: '',
    price: '',
    newPrice: '0',
    sizes: '',
    discount: '0',
    colors: '',
    description: '',
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    const newData = {...productData, [name]: value};

    if (name === 'discountPercentage' && newData.discountPercentage && productData.price) {
      const discountPercentage = parseFloat(newData.discountPercentage);
      const originalPrice = parseFloat(productData.price);
      const newPrice = originalPrice - originalPrice * (discountPercentage / 100);

      newData.newPrice = newPrice.toFixed(2);
    }

    setProductData(newData);
  };

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
    if (!percentage) return price;
    const discount = (price * percentage) / 100;
    return price - discount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const discount = parseFloat(productData.discountPercentage) || 0;
    const newPrice = calculateNewPrice(parseFloat(productData.price), discount);

    const uploadedImageKeys = await uploadImages(productData.images);

    const newProduct = {
      name: productData.name,
      category: productData.category,
      style: productData.style,
      price: parseFloat(productData.price),
      newPrice: parseFloat(newPrice),
      discount: discount,
      sizes: productData.sizes.split(',').map((size) => size.trim()),
      colors: productData.colors.split(',').map((color) => color.trim()),
      description: productData.description,
      images: uploadedImageKeys
    };

    try {
      const client = generateClient();
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

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  return (
    modalVisible && (
      <ProtectedRoute>
        <div className='inset-0 bg-gray-800 z-60 bg-opacity-50 flex justify-center items-center' onClick={handleClose}>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
            <form onSubmit={handleSubmit}>
              {formFields.map((field) =>
                field.type == 'select' ? (
                  <InputField
                    className='w-full mt-1 p-2 border rounded-md'
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    value={productData[field.name]}
                    onChange={handleChange}
                    type={field.type}
                    options={field.options}
                    required={field.required}
                  />
                ) : field.type === 'textarea' ? (
                  <TextAreaField
                    className='w-full mt-1 p-2 border rounded-md'
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    value={productData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ) : (
                  <InputField
                    className='w-full mt-1 p-2 border rounded-md'
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    value={productData[field.name]}
                    onChange={handleChange}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    readOnly={field.readOnly}
                  />
                )
              )}
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
              {uploadProgress > 0 && (
                <div className='mb-4'>
                  <p className='text-sm text-gray-700'>Upload Progress: {uploadProgress}%</p>
                </div>
              )}

              <div>
                <button type='submit' className='w-full bg-black text-white py-2 rounded-lg'>
                  Save Product
                </button>
              </div>
            </form>
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
