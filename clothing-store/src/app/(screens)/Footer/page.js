'use client';
import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import {Facebook, Instagram, Youtube, Twitter} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      {name: 'About', href: '#'},
      {name: 'Features', href: '#'},
      {name: 'Works', href: '#'},
      {name: 'Career', href: '#'}
    ],
    help: [
      {name: 'Customer Support', href: '/contact'}, // Link to /contact
      {name: 'Delivery Details', href: '#'},
      {name: 'Terms & Conditions', href: '#'},
      {name: 'Privacy Policy', href: '#'}
    ],
    faq: [
      {name: 'Account', href: '#'},
      {name: 'Manage Deliveries', href: '#'},
      {name: 'Orders', href: '#'},
      {name: 'Payments', href: '#'}
    ],
    resources: [
      {name: 'Free eBooks', href: '#'},
      {name: 'Development Tutorial', href: '#'},
      {name: 'How to - Blog', href: '#'},
      {name: 'Youtube Playlist', href: '#'}
    ]
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <footer className='bg-white pt-16 pb-8 px-4 md:px-8 mt-auto'>
        <div className='mx-auto'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
            {/* Brand Section */}
            <div className='md:col-span-1'>
              <h2 className='text-xl font-bold mb-4'>SHOP.CO</h2>
              <p className='text-gray-600 text-sm mb-6'>
                We have clothes that suit your style and which you're proud to wear. From women to men.
              </p>
              <div className='flex space-x-4'>
                <Facebook className='w-5 h-5 text-gray-600' />
                <Instagram className='w-5 h-5 text-gray-600' />
                <Youtube className='w-5 h-5 text-gray-600' />
                <Twitter className='w-5 h-5 text-gray-600' />
              </div>
            </div>

            {/* Links Sections */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:col-span-4'>
              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>COMPANY</h3>
                <ul className='space-y-2'>
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>HELP</h3>
                <ul className='space-y-2'>
                  {footerLinks.help.map((link) => (
                    <li key={link.name}>
                      {/* Corrected Link usage */}
                      <Link href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>FAQ</h3>
                <ul className='space-y-2'>
                  {footerLinks.faq.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-bold text-gray-900 uppercase mb-4'>RESOURCES</h3>
                <ul className='space-y-2'>
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className='text-sm text-gray-600 hover:text-gray-900'>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='mt-12 pt-8 border-t border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <p className='text-sm text-gray-600'>Shop.co © 2000-2023. All Rights Reserved</p>
              <div className='flex items-center space-x-4 mt-4 md:mt-0'>
                <img src='/payments/visa.png' alt='Visa' className='h-6' />
                <img src='/payments/mastercard.png' alt='Mastercard' className='h-6' />
                <img src='/payments/paypal.png' alt='PayPal' className='h-6' />
                <img src='/payments/applepay.png' alt='Apple Pay' className='h-6' />
                <img src='/payments/Gpay.png' alt='Google Pay' className='h-6' />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
