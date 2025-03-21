import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import { TiCamera } from "react-icons/ti";
import useAuthStore from '../../store/authSlice'; // Import Zustand store
import toast, { Toaster } from 'react-hot-toast'; // Import Toaster for toast messages
import axios from 'axios';
import { Link } from 'react-router-dom';

const VendorSettings = () => {
  const { user } = useAuthStore(); // Get user from Zustand store
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    avatar: '',
    user_role: '',
  });
  const [newPassword, setNewPassword] = useState(''); // For password change
  const [imagePreview, setImagePreview] = useState(''); // For image preview
  const [loading, setLoading] = useState(false);

  // Initialize form data with user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        password: '********',
        avatar:
          user.avatar ||
          'https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/default-avatar.png',
        user_role: user.user_role || '',
      });
      setImagePreview(user.avatar || '');
    }
  }, [user]);

  // If no user is logged in, show the login prompt
  if (!user) {
    return (
      <div className="lg:px-10 lg:bg-gray-100 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Please Log In to Access Your Profile
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view or edit your profile. If you don&apos;t have an account, you
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection and preview
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Setting imagePreview to:', reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload using FormData and fetch
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', 'market'); // Your Cloudinary upload preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: uploadData }
        );
        const data = await response.json();
        console.log('Cloudinary response:', data); // Log the response
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
          toast.success('Profile picture uploaded!', {
            style: {
              background: '#4ade80',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '10px 20px',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4ade80',
            },
          });
        } else {
          throw new Error('No secure_url in Cloudinary response');
        }
      } catch (err) {
        console.error('Error uploading image:', err);
        toast.error('Failed to upload image', {
          style: {
            background: '#f87171',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '10px 20px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#f87171',
          },
        });
        return; // Exit if upload fails
      }
    }

    // Update formData with the first uploaded image URL
    if (uploadedUrls.length > 0) {
      setFormData((prev) => {
        console.log('Updating formData.avatar to:', uploadedUrls[0]);
        return { ...prev, avatar: uploadedUrls[0] };
      });
      setImagePreview(uploadedUrls[0]); // Update the preview with the Cloudinary URL
    }
  };

  // Handle form submission (update profile)
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log('Submitting form with avatar:', formData.avatar); // Log the avatar URL being sent
      await axios.put(
        `http://localhost:3000/api/user/${user.id}`,
        {
          name: formData.name,
          email: formData.email,
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

      // Update Zustand store
      useAuthStore.setState((state) => {
        const updatedUser = { ...state.user, ...formData };
        console.log('Updated user in Zustand store:', updatedUser);
        return { user: updatedUser };
      });

      toast.success('Profile updated successfully!', {
        style: {
          background: '#4ade80',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4ade80',
        },
      });
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile', {
        style: {
          background: '#f87171',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f87171',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!newPassword) {
      toast.error('Please enter a new password', {
        style: {
          background: '#f87171',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f87171',
        },
      });
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
      toast.success('Password updated successfully!', {
        style: {
          background: '#4ade80',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4ade80',
        },
      });
      setNewPassword('');
      setFormData((prev) => ({ ...prev, password: '********' }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password', {
        style: {
          background: '#f87171',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 20px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#f87171',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="nunito-text" className="lg:px-10 lg:bg-gray-100 bg-white">
      <Toaster position="top-right" />
      <SearchPage />
      <div className="min-h-screen mt-10 lg:px-10">
        <div className="mx-auto bg-white rounded-2xl shadow-sm  p-8">
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
            <div className="relative w-44 h-34 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={imagePreview || formData.avatar}
                alt="Profile"
                className="w-full h-full rounded-full object-cover "
                onError={(e) => {
                  console.error('Error loading image:', e);
                  e.target.src =
                    'https://res.cloudinary.com/your_cloud_name/image/upload/v1234567890/default-avatar.png'; // Fallback image
                }}
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center rounded-full  cursor-pointer">
                <div className="absolute inset-0   bg-opacity-50 backdrop-blur-sm rounded-full"/>
                <TiCamera className='z-50 h-10 w-8' />
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
            <div className="flex gap-8">
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative w-full lg:w-[510px]">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full lg:w-[510px] bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEditing ? 'cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                  className={`w-full lg:w-[238px] placeholder:text-gray-900  bg-[#F5F5F5] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEditing ? 'cursor-not-allowed' : ''
                  }`}
                />
                {isEditing && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
    </div>
  );
};

export default VendorSettings;