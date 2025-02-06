'use client';
import React, {useState, useEffect} from 'react';
import {Menu, X} from 'lucide-react';
import {getCurrentUser, signOut} from 'aws-amplify/auth';
import Link from 'next/link';
import {ABeeZee} from 'next/font/google';
import SearchBar from '@/components/searchbar/page';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

const NAV_LINKS = [
  {label: 'Shop', path: '/shoppage'},
  {label: 'OnSale', path: '/'},
  {label: 'NewArrivals', path: '/featured'},
  {label: 'Brands', path: '#'},
  {label: 'AddProduct', path: '/admin/adminpanel', isButton: true}
];

const USER_DROPDOWN = [
  {label: 'Account Settings', path: '/profile'},
  {label: 'Contact Form', path: '/contact'},
  {label: 'Logout', action: 'logout'}
];

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
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 1.875C9.99747 1.875 8.0399 2.46882 6.37486 3.58137C4.70981 4.69392 3.41206 6.27523 2.64572 8.12533C1.87939 9.97543 1.67888 12.0112 2.06955 13.9753C2.46023 15.9393 3.42454 17.7435 4.84055 19.1595C6.25656 20.5755 8.06066 21.5398 10.0247 21.9305C11.9888 22.3211 14.0246 22.1206 15.8747 21.3543C17.7248 20.5879 19.3061 19.2902 20.4186 17.6251C21.5312 15.9601 22.125 14.0025 22.125 12C22.122 9.3156 21.0543 6.74199 19.1562 4.84383C17.258 2.94567 14.6844 1.87798 12 1.875ZM7.45969 18.4284C7.98195 17.7143 8.66528 17.1335 9.45418 16.7331C10.2431 16.3327 11.1153 16.124 12 16.124C12.8847 16.124 13.7569 16.3327 14.5458 16.7331C15.3347 17.1335 16.0181 17.7143 16.5403 18.4284C15.2134 19.3695 13.6268 19.875 12 19.875C10.3732 19.875 8.78665 19.3695 7.45969 18.4284Z'
                        fill='black'
                      />
                    </svg>
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
