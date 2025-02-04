'use client';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {listProductshopcojawads} from '../../../graphql/queries'; 
import {generateClient} from 'aws-amplify/api';
import {StorageImage} from '@aws-amplify/ui-react-storage';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const client = generateClient(); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (searchQuery.trim() === '') {
        setFilteredProducts([]);
        setIsDropdownOpen(false);
        return;
      }

     
      try {
        const result = await client.graphql({
          query: listProductshopcojawads,
          variables: {limit: 10} 
        });

        
        const filtered = result.data.listProductshopcojawads.items.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredProducts(filtered);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFilteredProducts([]);
        setIsDropdownOpen(false);
      }
    };

    const debounceTimeout = setTimeout(fetchFilteredProducts, 300); 

    return () => clearTimeout(debounceTimeout); t
  }, [searchQuery]);

  const handleProductClick = (product) => {
    router.push(`/category?id=${product.id}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className='relative hidden lg:flex ml-[40px] items-center mr-10 px-5 bg-[#F0F0F0] w-full max-w-[588px] h-[48px] rounded-[62px]'>
      <img src='/svgs/navbar/search.svg' className='w-[20.27px] h-[20.27px]' />
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search for products...'
        className='ml-2 outline-none w-[162px] h-[19px] bg-[#F0F0F0]'
      />

      {isDropdownOpen && filteredProducts.length > 0 && (
        <div className='absolute top-[52px] w-full bg-white border rounded-lg shadow-lg z-50'>
          <ul className='space-y-2 p-2'>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <button
                  onClick={() => handleProductClick(product)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg flex items-center space-x-2'>
                  <StorageImage
                    className='w-[40px] h-[40px] object-cover rounded-md'
                    imgKey={product.images[0] || 'defaultImage.png'}
                  />
                  <span>{product.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
