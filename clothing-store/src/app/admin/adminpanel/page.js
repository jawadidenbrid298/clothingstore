'use client';

import {useEffect, useState} from 'react';
import {generateClient} from '@aws-amplify/api';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {listProductshopcojawads} from '@/graphql/queries';
import UpdateProductModal from '../updateproduct/page';
import ProductModal from '@/app/(screens)/productmodal/page';
import ProtectedRoute from '@/app/Protectedroute';

const client = generateClient();

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false); // To manage the display of the ProductModal

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
    // Update the list of products with the updated product details
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setSelectedProduct(null); // Close the modal after update
  };

  const handleOpenProductModal = () => {
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  if (loading) {
    return <div className='text-center text-lg font-semibold'>Loading...</div>;
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

              {/* Display Small Thumbnails of All Images */}
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
                {product.discount && <span className='text-red-500'> (-{product.discount}%)</span>}
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

              {/* Update Button */}
              <button
                onClick={() => setSelectedProduct(product)}
                className='mt-3 bg-blue-600 text-white py-1 px-4 rounded-md w-full'>
                Update
              </button>
            </div>
          ))}
        </div>

        {/* Update Product Modal */}
        {selectedProduct && (
          <UpdateProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onUpdate={handleProductUpdate} // Pass the update function
          />
        )}

        {/* Button to Open ProductModal */}
        <div className='mt-6 flex justify-center items-center'>
          <button onClick={handleOpenProductModal} className='bg-green-600 text-white py-2 px-6 rounded-md'>
            Create Product Modal
          </button>
        </div>

        {/* Product Modal */}
        {showProductModal && <ProductModal onClose={handleCloseProductModal} />}
      </div>
    </ProtectedRoute>
  );
}
