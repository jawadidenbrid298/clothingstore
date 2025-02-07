'use client';

import React, {useState} from 'react';
import {FaEnvelope} from 'react-icons/fa';
import {generateClient} from 'aws-amplify/api';
import {sendEmail} from '@/graphql/mutations';
import InputField from '../../../../public/purecomponents/Inputfield';
import TextAreaField from '../../../../public/purecomponents/Textarea';
import {formFields} from './formconfig';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({success: false, message: 'All fields are required.'});
      return;
    }

    try {
      const client = generateClient();
      console.log('Form Data to be sent:', formData);

      const result = await client.graphql({
        query: sendEmail,
        variables: formData
      });

      console.log('Email sent successfully:', result);
      setStatus({success: true, message: 'Email sent successfully!'});
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({success: false, message: 'Error sending email. Please try again later.'});
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col sm:flex-row px-4 sm:px-8 md:px-16 py-8 pt-[50px]'>
      <div className='bg-white shadow-md p-8 rounded-lg w-full sm:w-1/3 mb-8 sm:mb-0'>
        <div className='mb-8'>
          <div className='flex items-center mb-4'>
            <img src='/svgs/contact/phone.svg' />
            <h3 className='text-lg pl-[16px] font-semibold'>Call To Us</h3>
          </div>
          <p className='text-sm text-gray-600 mb-2'>We are available 24/7, 7 days a week.</p>
          <p className='text-sm'>Phone: +8801611112222</p>
        </div>
        <hr className='border-gray-300 my-4' />
        <div>
          <div className='flex items-center mb-4'>
            <FaEnvelope className='text-black w-6 h-6 mr-4' />
            <h3 className='text-lg font-semibold'>Write To Us</h3>
          </div>
          <p className='text-sm text-gray-600 mb-2'>Fill out our form and we will contact you within 24 hours.</p>
          <p className='text-sm'>Emails: customer@exclusive.com</p>
          <p className='text-sm'>Emails: support@exclusive.com</p>
        </div>
      </div>
      <div className='w-full sm:w-2/3 bg-white shadow-md p-8 rounded-lg sm:ml-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {formFields.map((field) => (
              <InputField
                className='border border-gray-300 bg-[#F5F5F5] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                key={field.name}
                type={field.type}
                name={field.name}
                id={field.name}
                label=''
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            ))}
          </div>
          <TextAreaField
            className='border border-gray-300  bg-[#F5F5F5] rounded-lg px-4 py-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500'
            name='message'
            id='message'
            label=''
            value={formData.message}
            onChange={handleChange}
            placeholder='Your Message'
            required
          />
          <div className='flex justify-end'>
            <button type='submit' className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'>
              Send Message
            </button>
          </div>
        </form>

        {status && (
          <div className={`mt-4 p-4 ${status.success ? 'bg-green-200' : 'bg-red-200'} text-center`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
