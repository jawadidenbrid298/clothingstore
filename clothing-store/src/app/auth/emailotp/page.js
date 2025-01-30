'use client';
import React, {useState, useEffect} from 'react';
import {confirmUserAttribute} from '@aws-amplify/auth'; // Import the method to confirm the attribute
import {useNavigate} from 'react-router-dom'; // Use navigate for redirection

const OtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    // Access the email from URL query
    const queryParams = new URLSearchParams(window.location.search);
    const emailFromUrl = queryParams.get('email');

    if (emailFromUrl) {
      setEmail(emailFromUrl); // If email is available in URL, set it
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

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const confirmationCode = otp.join('');

    if (confirmationCode.length !== 6) {
      setError('OTP must be 6 digits long');
      setIsSubmitting(false);
      return;
    }

    if (!email) {
      setError('Email is required to confirm attribute.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Step 1: Confirm the user attribute (email) with the OTP
      await confirmUserAttribute({
        userAttributeKey: 'email', // Specify that we're confirming the email attribute
        confirmationCode // OTP entered by the user
      });

      console.log('Email attribute confirmed successfully.');

      // Optionally, redirect to the profile page or another screen
      navigate('/profile'); // Assuming you're using react-router for navigation
    } catch (error) {
      console.error('Error confirming email attribute:', error);
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='otp-screen'>
      <h2>Enter OTP sent to {email}</h2>
      <form onSubmit={handleSubmitOtp}>
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
  );
};

export default OtpScreen;
