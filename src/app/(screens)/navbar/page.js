'use client';
import React, {useState, useEffect} from 'react';
import {Search, ShoppingCart, User, Menu, X} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {getCurrentUser, signOut} from 'aws-amplify/auth';
import Link from 'next/link';
import {ABeeZee} from 'next/font/google';
import SearchBar from '@/app/components/searchbar/page';

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

  if (loading) return <div>Loading...</div>;

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
        <div className='mx-auto px-5 lg:px-[1px] xl:px-[100px] w-full h-[48px] pt-2 pb-6 z-10 justify-between '>
          <div className='flex items-center justify-between'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden z-50'>
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6 bg-white' />}
            </button>
            <div className='abeezee text-[32px] font-normal leading-[37.82px] text-left text-black'>
              <Link href='/'>SHOP.CO</Link>
            </div>

            <div className='hidden lg:flex gap-[24px] pl-[40px] h-[19px] items-center '>
              <Link
                href='/shoppage'
                className='abeezee text-[16px] w-full leading-[18.91px] text-black decoration-black'>
                Shop
              </Link>
              <Link href='/' className='abeezee text-[16px] w-full leading-[18.91px] text-black decoration-black'>
                OnSale
              </Link>
              <Link
                href='/featured'
                className='abeezee text-[16px] w-full leading-[18.91px] text-black decoration-black'>
                NewArrivals
              </Link>
              <Link href='#' className='abeezee text-[16px] leading-[18.91px] text-black decoration-black'>
                Brands
              </Link>
              <button
                onClick={() => handleNavigate('/admin/adminpanel')}
                className='abeezee text-[16px] leading-[18.91px] cursor-pointer text-black decoration-black'>
                AddProduct
              </button>
            </div>

            {/* Using the new SearchBar component */}
            <SearchBar />

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
              <div className='flex  items-center space-x-4 z-30'>
                <img
                  src='/svgs/navbar/cart.svg'
                  alt=''
                  className='h-[20.25px] w-[22.13px]'
                  onClick={() => handleNavigate('/cartPage')}
                />
                <div className='flex items-center'>
                  <button className='cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 1.875C9.99747 1.875 8.0399 2.46882 6.37486 3.58137C4.70981 4.69392 3.41206 6.27523 2.64572 8.12533C1.87939 9.97543 1.67888 12.0112 2.06955 13.9753C2.46023 15.9393 3.42454 17.7435 4.84055 19.1595C6.25656 20.5755 8.06066 21.5398 10.0247 21.9305C11.9888 22.3211 14.0246 22.1206 15.8747 21.3543C17.7248 20.5879 19.3061 19.2902 20.4186 17.6251C21.5312 15.9601 22.125 14.0025 22.125 12C22.122 9.3156 21.0543 6.74199 19.1562 4.84383C17.258 2.94567 14.6844 1.87798 12 1.875ZM7.45969 18.4284C7.98195 17.7143 8.66528 17.1335 9.45418 16.7331C10.2431 16.3327 11.1153 16.124 12 16.124C12.8847 16.124 13.7569 16.3327 14.5458 16.7331C15.3347 17.1335 16.0181 17.7143 16.5403 18.4284C15.2134 19.3695 13.6268 19.875 12 19.875C10.3732 19.875 8.78665 19.3695 7.45969 18.4284ZM9.375 11.25C9.375 10.7308 9.52896 10.2233 9.8174 9.79163C10.1058 9.35995 10.5158 9.0235 10.9955 8.82482C11.4751 8.62614 12.0029 8.57415 12.5121 8.67544C13.0213 8.77672 13.489 9.02673 13.8562 9.39384C14.2233 9.76096 14.4733 10.2287 14.5746 10.7379C14.6759 11.2471 14.6239 11.7749 14.4252 12.2545C14.2265 12.7342 13.8901 13.1442 13.4584 13.4326C13.0267 13.721 12.5192 13.875 12 13.875C11.3038 13.875 10.6361 13.5984 10.1438 13.1062C9.65157 12.6139 9.375 11.9462 9.375 11.25ZM18.1875 16.8694C17.4583 15.9419 16.5289 15.1914 15.4688 14.6737C16.1444 13.9896 16.6026 13.1208 16.7858 12.1769C16.9689 11.2329 16.8688 10.2558 16.498 9.36861C16.1273 8.4814 15.5024 7.72364 14.702 7.19068C13.9017 6.65771 12.9616 6.37334 12 6.37334C11.0384 6.37334 10.0983 6.65771 9.29797 7.19068C8.49762 7.72364 7.87275 8.4814 7.50198 9.36861C7.13121 10.2558 7.0311 11.2329 7.21424 12.1769C7.39739 13.1208 7.85561 13.9896 8.53125 14.6737C7.4711 15.1914 6.54168 15.9419 5.8125 16.8694C4.89661 15.7083 4.32614 14.3129 4.1664 12.8427C4.00665 11.3725 4.2641 9.88711 4.90925 8.55644C5.55441 7.22578 6.5612 6.10366 7.81439 5.31855C9.06757 4.53343 10.5165 4.11703 11.9953 4.11703C13.4741 4.11703 14.9231 4.53343 16.1762 5.31855C17.4294 6.10366 18.4362 7.22578 19.0814 8.55644C19.7265 9.88711 19.984 11.3725 19.8242 12.8427C19.6645 14.3129 19.094 15.7083 18.1781 16.8694H18.1875Z'
                        fill='black'
                      />
                    </svg>
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
            <div className='top-full left-0 right-0 bg-white border-b z-80'>
              <div className='flex relative flex-col py-4  bg-white z-1000'>
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
