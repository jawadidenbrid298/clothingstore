'use client';

import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {signUp} from 'aws-amplify/auth'; // Import Cognito signUp function

const SignUpCard = () => {
  // Formik initialization with validation schema
  const formik = useFormik({
    initialValues: {
      email: '', // Email for sign-up
      password: '' // Password for sign-up
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      const {email, password} = values;

      try {
        console.log('Attempting to sign up with:', {email, password});

        // Call the signUp function
        const {user, nextStep, isSignUpComplete} = await signUp({
          username: email, // Use email as username
          password,
          options: {
            userAttributes: {
              email // Only email here, no phone_number
            },
            autoSignIn: true // Automatically sign in after successful sign up
          }
        });

        console.log('Sign-up successful!');
        console.log('User:', user);
        console.log('Next step:', nextStep);
        console.log('Is sign-up complete:', isSignUpComplete);

        // Redirect to OTP page with email as a query parameter
        window.location.href = `/auth/otp?email=${encodeURIComponent(email)}`; // Pass the email in the URL
      } catch (error) {
        console.error('Error signing up:', error.message || error);
        if (error.code === 'UsernameExistsException') {
          // Handle case where username already exists
          alert('An account with this email already exists. Please try logging in.');
        } else {
          // General error handling
          alert('Error signing up. Please try again.');
        }
      }
    }
  });

  return (
    <div className='flex bg-[#F2F0F1] justify-center items-center min-h-screen'>
      <div className='bg-[#F5F5F5] shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`w-full mt-1 p-2 border rounded-md shadow-sm outline-none ${
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

          {/* Password Field */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className={`w-full mt-1 p-2 border rounded-md shadow-sm outline-none ${
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
            <button type='submit' className='w-full bg-black text-white py-2 rounded-lg'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
