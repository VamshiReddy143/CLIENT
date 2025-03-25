import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import { TiCamera } from "react-icons/ti";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/authSlice';

const defaultAvatar =
  'https://imgs.search.brave.com/GaCzNP9tEe6BCjo8HXaR6llOdnsLodGlGxYnFAhGsHA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvdW5r/bm93bi01MTIucG5n';

const MOSettings = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    avatar: '',
    user_role: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '********',
        avatar: user.avatar || defaultAvatar,
        user_role: user.user_role || '',
      });
      setImagePreview(user.avatar || defaultAvatar);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="lg:px-10 lg:bg-gray-100 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please Log In to Access Your Profile
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view or edit your profile. If you don't have an account, you
            can sign up now to get started!
          </p>
          <Link to="/signup">
            <button className="px-6 py-3 bg-[#FF7A3D] text-white rounded-lg hover:bg-[#ff6a2a] transition-colors">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true); // Start loading
    const uploadedUrls = [];

    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', 'market');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: uploadData }
        );
        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          throw new Error('No secure_url in Cloudinary response');
        }
      } catch (err) {
        console.error('Error uploading image:', err);
        toast.error('Failed to upload image');
        setLoading(false); // Stop loading on error
        return;
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev) => ({ ...prev, avatar: uploadedUrls[0] }));
      setImagePreview(uploadedUrls[0]);
    }
    setLoading(false); // Stop loading on success
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/user/${user.id}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          avatar: formData.avatar,
          user_role: formData.user_role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      useAuthStore.setState((state) => ({
        user: { ...state.user, ...formData, password: state.user.password },
      }));

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/api/user/${user.id}/password`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Password updated successfully!');
      setNewPassword('');
      setFormData((prev) => ({ ...prev, password: '********' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="nunito-text" className="lg:px-10 lg:bg-gray-100 bg-white">
      <Toaster position="top-right" />
      <SearchPage />
      <div className="min-h-screen mt-10 lg:px-10">
        <div className="mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSubmit();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={loading}
              className={`px-4 py-2 bg-[#FF7A3D] text-white rounded-lg hover:bg-[#ff6a2a] transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Picture */}
          <div className="mb-8 relative w-34 h-34 flex ml-[30%] lg:ml-0 items-center justify-center">
            <div className="relative w-40 h-33 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={imagePreview || formData.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => (e.target.src = defaultAvatar)}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-full">
                  <svg
                    className="animate-spin h-8 w-8 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h-8z"
                    />
                  </svg>
                </div>
              )}
              {isEditing && !loading && (
                <label className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer">
                  <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm rounded-full" />
                  <TiCamera className="z-50 h-10 w-8" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageSelect(e);
                      handleFileUpload(e);
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name and Email Row */}
            <div className="flex gap-8 flex-col lg:flex-row">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full lg:w-[238px] bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !isEditing ? 'cursor-not-allowed' : ''
                    }`}
                  />
                  {isEditing && (
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.95942 13.2439L11.7933 4.40645C12.1647 3.92988 12.2967 3.3789 12.1729 2.81788C12.0656 2.30787 11.752 1.82293 11.2816 1.45505L10.1343 0.543716C9.13566 -0.250569 7.89765 -0.16696 7.18785 0.744378L6.42028 1.74016C6.32124 1.86474 6.346 2.04868 6.4698 2.14901C6.4698 2.14901 8.40936 3.70414 8.45063 3.73758C8.58268 3.86299 8.68173 4.03021 8.70649 4.23087C8.74775 4.62384 8.47539 4.99172 8.07097 5.04188C7.88114 5.06696 7.69957 5.00844 7.56751 4.89975L5.52891 3.27773C5.42987 3.20332 5.28131 3.2192 5.19877 3.31954L0.353997 9.59021C0.0403655 9.98317 -0.0669294 10.4932 0.0403655 10.9865L0.659374 13.6703C0.692388 13.8125 0.81619 13.9128 0.964752 13.9128L3.68839 13.8794C4.1836 13.871 4.64579 13.6452 4.95942 13.2439ZM8.7701 12.4072H13.2113C13.6446 12.4072 13.997 12.7642 13.997 13.2032C13.997 13.643 13.6446 13.9991 13.2113 13.9991H8.7701C8.3368 13.9991 7.98438 13.643 7.98438 13.2032C7.98438 12.7642 8.3368 12.4072 8.7701 12.4072Z"
                          fill="#FF8126"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full lg:w-[238px] bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !isEditing ? 'cursor-not-allowed' : ''
                    }`}
                  />
                  {isEditing && (
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.95942 13.2439L11.7933 4.40645C12.1647 3.92988 12.2967 3.3789 12.1729 2.81788C12.0656 2.30787 11.752 1.82293 11.2816 1.45505L10.1343 0.543716C9.13566 -0.250569 7.89765 -0.16696 7.18785 0.744378L6.42028 1.74016C6.32124 1.86474 6.346 2.04868 6.4698 2.14901C6.4698 2.14901 8.40936 3.70414 8.45063 3.73758C8.58268 3.86299 8.68173 4.03021 8.70649 4.23087C8.74775 4.62384 8.47539 4.99172 8.07097 5.04188C7.88114 5.06696 7.69957 5.00844 7.56751 4.89975L5.52891 3.27773C5.42987 3.20332 5.28131 3.2192 5.19877 3.31954L0.353997 9.59021C0.0403655 9.98317 -0.0669294 10.4932 0.0403655 10.9865L0.659374 13.6703C0.692388 13.8125 0.81619 13.9128 0.964752 13.9128L3.68839 13.8794C4.1836 13.871 4.64579 13.6452 4.95942 13.2439ZM8.7701 12.4072H13.2113C13.6446 12.4072 13.997 12.7642 13.997 13.2032C13.997 13.643 13.6446 13.9991 13.2113 13.9991H8.7701C8.3368 13.9991 7.98438 13.643 7.98438 13.2032C7.98438 12.7642 8.3368 12.4072 8.7701 12.4072Z"
                          fill="#FF8126"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Phone and Address Row */}
            <div className="flex gap-8 flex-col lg:flex-row">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full lg:w-[238px] bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !isEditing ? 'cursor-not-allowed' : ''
                    }`}
                    placeholder="Enter phone number"
                  />
                  {isEditing && (
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.95942 13.2439L11.7933 4.40645C12.1647 3.92988 12.2967 3.3789 12.1729 2.81788C12.0656 2.30787 11.752 1.82293 11.2816 1.45505L10.1343 0.543716C9.13566 -0.250569 7.89765 -0.16696 7.18785 0.744378L6.42028 1.74016C6.32124 1.86474 6.346 2.04868 6.4698 2.14901C6.4698 2.14901 8.40936 3.70414 8.45063 3.73758C8.58268 3.86299 8.68173 4.03021 8.70649 4.23087C8.74775 4.62384 8.47539 4.99172 8.07097 5.04188C7.88114 5.06696 7.69957 5.00844 7.56751 4.89975L5.52891 3.27773C5.42987 3.20332 5.28131 3.2192 5.19877 3.31954L0.353997 9.59021C0.0403655 9.98317 -0.0669294 10.4932 0.0403655 10.9865L0.659374 13.6703C0.692388 13.8125 0.81619 13.9128 0.964752 13.9128L3.68839 13.8794C4.1836 13.871 4.64579 13.6452 4.95942 13.2439ZM8.7701 12.4072H13.2113C13.6446 12.4072 13.997 12.7642 13.997 13.2032C13.997 13.643 13.6446 13.9991 13.2113 13.9991H8.7701C8.3368 13.9991 7.98438 13.643 7.98438 13.2032C7.98438 12.7642 8.3368 12.4072 8.7701 12.4072Z"
                          fill="#FF8126"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full lg:w-[238px] bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      !isEditing ? 'cursor-not-allowed' : ''
                    }`}
                  />
                  {isEditing && (
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.95942 13.2439L11.7933 4.40645C12.1647 3.92988 12.2967 3.3789 12.1729 2.81788C12.0656 2.30787 11.752 1.82293 11.2816 1.45505L10.1343 0.543716C9.13566 -0.250569 7.89765 -0.16696 7.18785 0.744378L6.42028 1.74016C6.32124 1.86474 6.346 2.04868 6.4698 2.14901C6.4698 2.14901 8.40936 3.70414 8.45063 3.73758C8.58268 3.86299 8.68173 4.03021 8.70649 4.23087C8.74775 4.62384 8.47539 4.99172 8.07097 5.04188C7.88114 5.06696 7.69957 5.00844 7.56751 4.89975L5.52891 3.27773C5.42987 3.20332 5.28131 3.2192 5.19877 3.31954L0.353997 9.59021C0.0403655 9.98317 -0.0669294 10.4932 0.0403655 10.9865L0.659374 13.6703C0.692388 13.8125 0.81619 13.9128 0.964752 13.9128L3.68839 13.8794C4.1836 13.871 4.64579 13.6452 4.95942 13.2439ZM8.7701 12.4072H13.2113C13.6446 12.4072 13.997 12.7642 13.997 13.2032C13.997 13.643 13.6446 13.9991 13.2113 13.9991H8.7701C8.3368 13.9991 7.98438 13.643 7.98438 13.2032C7.98438 12.7642 8.3368 12.4072 8.7701 12.4072Z"
                          fill="#FF8126"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative w-full lg:w-[238px]">
                <input
                  type="password"
                  name="password"
                  value={isEditing ? newPassword : formData.password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isEditing}
                  placeholder="••••••••••••••"
                  className={`w-full lg:w-[238px] placeholder:text-gray-900 bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEditing ? 'cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.95942 13.2439L11.7933 4.40645C12.1647 3.92988 12.2967 3.3789 12.1729 2.81788C12.0656 2.30787 11.752 1.82293 11.2816 1.45505L10.1343 0.543716C9.13566 -0.250569 7.89765 -0.16696 7.18785 0.744378L6.42028 1.74016C6.32124 1.86474 6.346 2.04868 6.4698 2.14901C6.4698 2.14901 8.40936 3.70414 8.45063 3.73758C8.58268 3.86299 8.68173 4.03021 8.70649 4.23087C8.74775 4.62384 8.47539 4.99172 8.07097 5.04188C7.88114 5.06696 7.69957 5.00844 7.56751 4.89975L5.52891 3.27773C5.42987 3.20332 5.28131 3.2192 5.19877 3.31954L0.353997 9.59021C0.0403655 9.98317 -0.0669294 10.4932 0.0403655 10.9865L0.659374 13.6703C0.692388 13.8125 0.81619 13.9128 0.964752 13.9128L3.68839 13.8794C4.1836 13.871 4.64579 13.6452 4.95942 13.2439ZM8.7701 12.4072H13.2113C13.6446 12.4072 13.997 12.7642 13.997 13.2032C13.997 13.643 13.6446 13.9991 13.2113 13.9991H8.7701C8.3368 13.9991 7.98438 13.643 7.98438 13.2032C7.98438 12.7642 8.3368 12.4072 8.7701 12.4072Z"
                        fill="#FF8126"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {isEditing && newPassword && (
                <button
                  onClick={handlePasswordChange}
                  disabled={loading}
                  className={`mt-2 px-4 py-2 bg-[#FF7A3D] text-white rounded-lg hover:bg-[#ff6a2a] transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Update Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '16px',
          },
          success: {
            style: {
              background: '#4caf50',
              color: '#fff',
              border: '1px solid #388e3c',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4caf50',
            },
          },
          error: {
            style: {
              background: '#f44336',
              color: '#fff',
              border: '1px solid #d32f2f',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#f44336',
            },
          },
        }}
      />
    </div>
  );
};

export default MOSettings;