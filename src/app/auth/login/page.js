'use client';

import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {signIn} from 'aws-amplify/auth'; // Importing signIn directly

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        // Use the signIn function from Amplify
        const {isSignedIn, nextStep} = await signIn({username: values.email, password: values.password});
        console.log('Login successful:', isSignedIn, nextStep);

        // If login is successful, store the session in sessionStorage
        sessionStorage.setItem('userSession', JSON.stringify({email: values.email, isSignedIn}));

        // Redirect to the product modal page using window.location
        window.location.href = '/productmodal';
      } catch (error) {
        console.error('Error signing in', error);
        setErrorMessage('Invalid credentials, please try again.');
      }
    }
  });

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F2F0F1]'>
      <div className='bg-[#F5F5F5] shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

        {errorMessage && <div className='bg-red-100 text-red-700 p-2 rounded mb-4'>{errorMessage}</div>}

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              placeholder='Enter your email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className={`w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : ''
              }`}
              placeholder='Enter your password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className='text-red-500 text-sm mt-1'>{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
              Login
            </button>
          </div>
        </form>

        <p className='text-sm text-center mt-4 text-gray-500'>
          Don't have an account?{' '}
          <a href='/auth/signup' className='text-blue-500 hover:underline'>
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
