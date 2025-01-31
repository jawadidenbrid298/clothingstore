'use client';

import React, {useState, useEffect} from 'react';
import {confirmSignUp} from 'aws-amplify/auth'; // Import confirmSignUp from AWS Amplify

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState(''); // State to hold the email

  useEffect(() => {
    // Get email from the URL query parameters (after the ? in the URL)
    const queryParams = new URLSearchParams(window.location.search);
    const emailFromUrl = queryParams.get('email'); // Get the email parameter

    if (emailFromUrl) {
      setEmail(emailFromUrl); // Set email to the state if it exists
    } else {
      setError('Email is missing. Please go back and try again.');
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6); // Only take the first 6 characters
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (!isNaN(pasteData[i])) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);

    // Set focus to the last filled input
    const lastIndex = Math.min(pasteData.length - 1, 5);
    document.getElementById(`otp-input-${lastIndex}`).focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const confirmationCode = otp.join('');
    console.log('Attempting to confirm sign-up with OTP:', confirmationCode);
    console.log('Email:', email);

    if (confirmationCode.length !== 6) {
      setError('OTP must be 6 digits long');
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      setError('Email is required to confirm sign-up.');
      setIsSubmitting(false);
      return;
    }

    try {
      const {isSignUpComplete, nextStep} = await confirmSignUp({
        username: email, // Pass the email as the username
        confirmationCode // OTP entered by the user
      });

      console.log('Sign-up confirmed successfully:', {isSignUpComplete, nextStep});

      // Optionally, redirect to login page after confirmation
      window.location.href = '/auth/login'; // Adjust this as needed
    } catch (error) {
      console.error('Error confirming sign-up:', error);
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F2F0F1]'>
      <div className='bg-[#F5F5F5] shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Enter OTP</h2>
        <form onSubmit={handleSubmit} className='space-y-6' onPaste={handlePaste}>
          <div className='flex justify-center space-x-2'>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className='w-12 h-12 text-center border rounded-md text-lg font-medium shadow-sm focus:ring-blue-500 focus:border-blue-500'
              />
            ))}
          </div>

          {error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}

          <button
            type='submit'
            className='w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={isSubmitting}>
            {isSubmitting ? 'Verifying OTP...' : 'Submit OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPInput;
