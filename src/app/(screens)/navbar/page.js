'use client';
import React, {useState, useEffect} from 'react';
import {Menu, X} from 'lucide-react';
import {getCurrentUser, signOut} from 'aws-amplify/auth';
import Link from 'next/link';
import {NAV_LINKS, USER_DROPDOWN} from './data';
import SearchBar from '@/components/searchbar/page';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserInfo(user);
          setIsLoggedIn(true);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
      await signOut({global: true});
      setIsLoggedIn(false);
      setUserInfo(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <div>
      <nav className='py-3 border-b bg-white'>
        <div className='mx-auto px-5 lg:px-[1px] xl:px-[100px] w-full h-[48px] pt-2 pb-6 z-10 justify-between '>
          <div className='flex items-center justify-between'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden z-50'>
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6 bg-white' />}
            </button>
            <div className='abeezee text-[32px] font-normal leading-[37.82px] text-left text-black'>
              <Link href='/'>SHOP.CO</Link>
            </div>

            <div className='hidden lg:flex gap-[24px] pl-[40px] h-[19px] items-center '>
              {NAV_LINKS.map(({label, path, isButton}) =>
                isButton ? (
                  <button
                    key={label}
                    onClick={() => (window.location.href = path)}
                    className='abeezee text-[16px] leading-[18.91px] cursor-pointer text-black decoration-black'>
                    {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    href={path}
                    className='abeezee text-[16px] w-full leading-[18.91px] text-black decoration-black'>
                    {label}
                  </Link>
                )
              )}
            </div>

            <SearchBar />

            {!isLoggedIn ? (
              <div className='flex space-x-4'>
                <button onClick={() => (window.location.href = '/auth/login')} className='text-black'>
                  Login
                </button>
                <button onClick={() => (window.location.href = '/auth/signup')} className='text-black'>
                  Sign Up
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-4 z-30'>
                <img
                  src='/svgs/navbar/cart.svg'
                  alt=''
                  className='h-[20.25px] w-[22.13px]'
                  onClick={() => (window.location.href = '/cartPage')}
                />
                <div className='flex items-center'>
                  <button className='cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img src='/svgs/navbar/1.svg' />
                  </button>

                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50'>
                      <ul className='space-y-2 p-2'>
                        {USER_DROPDOWN.map(({label, path, action}) => (
                          <li key={label}>
                            {action === 'logout' ? (
                              <button
                                onClick={handleLogout}
                                className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg'>
                                {label}
                              </button>
                            ) : (
                              <button
                                onClick={() => (window.location.href = path)}
                                className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg'>
                                {label}
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {isMenuOpen && (
            <div className='top-full left-0 right-0 bg-white border-b z-80'>
              <div className='flex relative flex-col py-4 bg-white'>
                {NAV_LINKS.map(({label, path}) => (
                  <Link key={label} href={path} className='px-4 py-2 hover:bg-gray-100'>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
