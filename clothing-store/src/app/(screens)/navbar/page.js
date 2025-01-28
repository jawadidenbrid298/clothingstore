'use client';
import React, {useState, useEffect} from 'react';
import {Search, ShoppingCart, User, Menu, X} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {getCurrentUser, signOut} from 'aws-amplify/auth';
import Link from 'next/link';
import {ABeeZee} from '@next/font/google';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserInfo(user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    currentSession();
  }, []);

  if (loading) return <div>Loading...</div>; // or a loading spinner

  const handleNavigate = (path) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      await signOut({global: true});
    } catch (error) {
      console.log('error signing out: ', error);
    }

    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <div>
      <nav className='py-3 border-b bg-white'>
        <div className='mx-auto px-[100px] w-full h-[48px] gap-[40px] pt-2 pb-6 z-10'>
          <div className='flex items-center justify-between'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden'>
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
            <div className='abeezee text-[32px] font-normal leading-[37.82px] text-left text-black'>
              <Link href='/'>SHOP.CO</Link>
            </div>

            <div className='hidden lg:flex gap-[24px] pl-[40px] w-full h-[19px]'>
              <Link href='/' className='abeezee text-[16px] leading-[18.91px] text-black decoration-black'>
                On Sale
              </Link>
              <Link href='/featured' className='abeezee text-[16px] leading-[18.91px] text-black decoration-black'>
                New Arrivals
              </Link>
              <Link href='#' className='abeezee text-[16px] leading-[18.91px] text-black decoration-black'>
                Brands
              </Link>
              <button
                onClick={() => handleNavigate('/productmodal')}
                className='abeezee text-[16px] leading-[18.91px] cursor-pointer text-black decoration-black'>
                Add Product
              </button>
            </div>

            <div className='hidden lg:flex mx-[40px] items-center bg-[#F0F0F0] w-full h-[48px] rounded-[62px]'>
              <img src='/svgs/navbar/search.svg' className='w-[20.27px] h-[20.27px]' />
              <input
                type='text'
                placeholder='Search for products...'
                className='ml-2 outline-none w-[162px] h-[19px]'
              />
            </div>

            {!isLoggedIn && (
              <div className='flex space-x-4'>
                <button onClick={() => handleNavigate('/auth/login')} className='text-black'>
                  Login
                </button>
                <button onClick={() => handleNavigate('auth/signup')} className='text-black'>
                  Sign Up
                </button>
              </div>
            )}

            {isLoggedIn && userInfo && (
              <div className='flex items-center space-x-4 z-30'>
                <img
                  src='/svgs/navbar/cart.svg'
                  alt=''
                  className='h-[20.25px] w-[22.13px]'
                  onClick={() => handleNavigate('/cartPage')}
                />
                <div className='relative'>
                  <button className='cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img src='/svgs/navbar/account.svg' alt='' className='h-[20.25px] w-[20.25px]' />
                  </button>

                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50'>
                      <ul className='space-y-2 p-2'>
                        <li>
                          <button
                            onClick={() => handleNavigate('/profile')}
                            className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg'>
                            Account Settings
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleNavigate('/contact')}
                            className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg'>
                            Contact Form
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg'>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className=' top-full left-0 right-0 bg-white border-b z-50'>
              <div className='flex flex-col py-4 z-60 bg-white'>
                <Link href='/shoppage' className='px-4 py-2 hover:bg-gray-100'>
                  Shop
                </Link>
                <Link href='#' className='px-4 py-2 hover:bg-gray-100'>
                  On Sale
                </Link>
                <Link href='/featured' className='px-4 py-2 hover:bg-gray-100'>
                  New Arrivals
                </Link>
                <Link href='#' className='px-4 py-2 hover:bg-gray-100'>
                  Brands
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
