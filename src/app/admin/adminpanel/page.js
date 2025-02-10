'use client';

import {useEffect, useState} from 'react';
import {generateClient} from '@aws-amplify/api';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {listProductshopcojawads} from '@/graphql/queries';
import {deleteProductshopcojawad} from '@/graphql/mutations';
import UpdateProductModal from '../updateproduct/page';
import ProductModal from '@/app/(screens)/productmodal/page';
import ProtectedRoute from '@/app/Protectedroute';
import {Spin} from 'antd';

const client = generateClient();

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.graphql({
          query: listProductshopcojawads
        });
        setProducts(response.data.listProductshopcojawads.items || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setSelectedProduct(null);
  };
  const deleteProduct = async (productId) => {
    try {
      await client.graphql({
        query: deleteProductshopcojawad,
        variables: {input: {id: productId}}
      });

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleOpenProductModal = () => {
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel - Products</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div key={product.id} className='bg-white shadow-md rounded-lg p-4 border border-gray-200'>
              <h2 className='text-lg font-semibold'>{product.name}</h2>
              <p className='text-gray-600'>
                {product.category} - {product.style}
              </p>

              <div className='mt-2'>
                <span className='font-semibold text-gray-800'>Images:</span>
                <div className='flex flex-wrap mt-2'>
                  {(product.images || []).map((img, index) => (
                    <StorageImage
                      key={index}
                      imgKey={img}
                      className='w-16 h-16 object-cover border rounded-md mr-2 mb-2'
                    />
                  ))}
                </div>
              </div>

              <div className='mt-2'>
                <span className='font-semibold text-gray-800'>Price:</span> ${product.price}
              </div>
              <div className='mt-1'>
                <span className='font-semibold text-gray-800'>New Price:</span>
                <span className={product.newPrice ? 'text-green-600' : 'text-gray-600'}>
                  ${product.newPrice || product.price}
                </span>
                {product.discount > 0 ? (
                  <span className='text-red-500'> (-{product.discount}%)</span>
                ) : (
                  <span className='text-gray-500'> No discount</span>
                )}
              </div>

              <p className='text-sm text-gray-500 mt-2'>{product.description}</p>
              <div className='mt-2'>
                <span className='text-sm font-medium'>Sizes:</span> {product.sizes?.join(', ')}
              </div>
              <div className='mt-2'>
                <span className='text-sm font-medium'>Colors:</span> {product.colors?.join(', ')}
              </div>
              <div className='mt-2'>
                <span className='text-sm font-medium'>Reviews:</span> {product.reviews?.items.length || 0}
              </div>
              <div className='text-xs text-gray-400 mt-2'>
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </div>

              <button
                onClick={() => setSelectedProduct(product)}
                className='mt-3 bg-blue-600 text-white py-1 px-4 rounded-md w-full'>
                Update
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className='mt-3 bg-none text-white py-1 px-4 rounded-md w-20 flex items-center justify-center'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='20' height='20' viewBox='0 0 100 100'>
                  <path
                    fill='#f37e98'
                    d='M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30'></path>
                  <path
                    fill='#f15b6c'
                    d='M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z'></path>
                  <path
                    fill='#1f212b'
                    d='M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z'></path>
                  <path
                    fill='#1f212b'
                    d='M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z'></path>
                  <path
                    fill='#1f212b'
                    d='M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z'></path>
                  <path
                    fill='#1f212b'
                    d='M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z'></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <UpdateProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdate={handleProductUpdate}
          />
        )}

        <div className='mt-6 flex justify-center items-center'>
          <button onClick={handleOpenProductModal} className='bg-green-600 text-white py-2 px-6 rounded-md'>
            Create Product Modal
          </button>
        </div>

        {showProductModal && <ProductModal onClose={handleCloseProductModal} />}
      </div>
    </ProtectedRoute>
  );
}
