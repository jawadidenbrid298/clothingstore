'use client';
import React, {useState, useEffect} from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));
    console.log('Form Submitted and Saved:', formData);
    alert('Profile information saved successfully!');
  };

  return (
    <div className='pt-[363px] bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='col-span-1'>
            <div className='bg-white shadow-md rounded-lg p-6'>
              <h2 className='text-lg font-semibold mb-4'>Manage My Account</h2>
              <ul className='text-gray-600 space-y-2'>
                <li className='font-medium text-black'>My Profile</li>
                <li>Address Book</li>
                <li>My Payment Options</li>
              </ul>
              <h2 className='text-lg font-semibold mt-6 mb-4'>My Orders</h2>
              <ul className='text-gray-600 space-y-2'>
                <li>My Returns</li>
                <li>My Cancellations</li>
              </ul>
              <h2 className='text-lg font-semibold mt-6 mb-4'>My Wishlist</h2>
            </div>
          </div>

          {/* Profile Form */}
          <div className='col-span-1 lg:col-span-3 bg-white shadow-md rounded-lg p-8'>
            <h2 className='text-2xl font-semibold mb-6'>Edit Your Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <input
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  type='text'
                  name='address'
                  placeholder='Address'
                  value={formData.address}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <h3 className='text-lg font-semibold mb-4'>Password Changes</h3>
              <div className='space-y-4 mb-6'>
                <input
                  type='password'
                  name='currentPassword'
                  placeholder='Current Password'
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  type='password'
                  name='newPassword'
                  placeholder='New Password'
                  value={formData.newPassword}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm New Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full p-3 bg-[#F5F5F5] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex justify-between items-center'>
                <button type='button' className='text-gray-600 hover:text-black transition'>
                  Cancel
                </button>
                <button type='submit' className='bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
