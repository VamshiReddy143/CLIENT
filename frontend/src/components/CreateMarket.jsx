import React, { useState, useRef } from 'react';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import useMarketStore from '../store/marketStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateMarket = () => {
  const { createMarket, loading, error, success } = useMarketStore();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    marketName: '',
    location: '',
    city: '',
    customCity: '',
    price: '',
    size: '',
    type: '',
    services: '',
    images: [],
    videos: [],
    status: 'pending',
    rating: '',
    featured: false,
    highlights: {
      spaceHighlights: [],
      heading2: [],
      heading3: [],
      heading4: [],
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading

  const typeOptions = [
    'Retail Spaces',
    'Food Court Spaces',
    'Kiosk',
    'Storage/Warehouse',
    'Event Space',
  ];

  const cityOptions = [
    'Cairo (Egypt)',
    'Algiers (Algeria)',
    'Casablanca (Morocco)',
    'Tunis (Tunisia)',
    'Tripoli (Libya)',
    'Other',
  ];

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }));
  };

  const removeFile = (index, type) => {
    setFormData((prev) => {
      const updatedFiles = [...prev[type]];
      const fileToRemove = updatedFiles[index];
      URL.revokeObjectURL(fileToRemove.preview);
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [type]: updatedFiles,
      };
    });
  };

  const handlePointsChange = (heading, index, value) => {
    setFormData((prev) => {
      const updatedPoints = [...prev.highlights[heading]];
      updatedPoints[index] = value;
      return {
        ...prev,
        highlights: {
          ...prev.highlights,
          [heading]: updatedPoints,
        },
      };
    });
  };

  const addPointField = (heading) => {
    setFormData((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [heading]: [...prev.highlights[heading], ''],
      },
    }));
  };

  const deletePointField = (heading, index) => {
    setFormData((prev) => {
      const updatedPoints = [...prev.highlights[heading]];
      updatedPoints.splice(index, 1);
      return {
        ...prev,
        highlights: {
          ...prev.highlights,
          [heading]: updatedPoints,
        },
      };
    });
  };

  const uploadToCloudinary = async (file, resourceType) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', uploadPreset);
    uploadFormData.append('resource_type', resourceType);
    uploadFormData.append('folder', 'markets');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        uploadFormData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(`Error uploading ${resourceType} to Cloudinary:`, error);
      throw new Error(`Failed to upload ${resourceType}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    console.log('Submitting formData:', formData);

    const toastId = toast.loading('Starting market creation process...');

    try {
      // Check authentication
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to create a market', { id: toastId });
        setIsSubmitting(false);
        window.location.href = '/login';
        return;
      }

      // Upload images to Cloudinary concurrently
      toast.loading('Uploading images...', { id: toastId });
      const imageUploadPromises = formData.images.map(item => uploadToCloudinary(item.file, 'image'));
      const imageUrls = await Promise.all(imageUploadPromises);
      toast.success('Images uploaded successfully!', { id: toastId });

      // Upload videos to Cloudinary concurrently
      let videoUrls = [];
      if (formData.videos.length > 0) {
        toast.loading('Uploading videos...', { id: toastId });
        const videoUploadPromises = formData.videos.map(item => uploadToCloudinary(item.file, 'video'));
        videoUrls = await Promise.all(videoUploadPromises);
        toast.success('Videos uploaded successfully!', { id: toastId });
      }

      // Prepare market data with Cloudinary URLs
      const marketData = {
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        marketName: formData.marketName,
        location: formData.location,
        city: formData.city === 'Other' ? formData.customCity : formData.city,
        price: parseInt(formData.price, 10) || 0,
        size: parseInt(formData.size, 10) || 0,
        type: formData.type,
        services: formData.services ? formData.services.split(',').map(s => s.trim()) : [],
        status: 'pending',
        rating: formData.rating ? parseInt(formData.rating, 10) : null,
        featured: formData.featured,
        highlights: formData.highlights,
        images: imageUrls,
        videos: videoUrls,
      };

      // Send market data to the backend
      toast.loading('Submitting market data to server...', { id: toastId });
      const response = await axios.post('http://localhost:3000/api/market', marketData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Market submitted for approval!', { id: toastId });
      console.log('Market created:', response.data);

      // Reset form
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        marketName: '',
        location: '',
        city: '',
        customCity: '',
        price: '',
        size: '',
        type: '',
        services: '',
        images: [],
        videos: [],
        status: 'pending',
        rating: '',
        featured: false,
        highlights: {
          spaceHighlights: [],
          heading2: [],
          heading3: [],
          heading4: [],
        },
      });

      setIsSubmitting(false);
      setTimeout(() => {
        navigate('/market-owner');
      }, 2000);
    } catch (err) {
      console.error('Error submitting market:', err);
      toast.error(`Failed to create market: ${err.message}`, { id: toastId });
      setIsSubmitting(false);
    }
  };

  const CustomSelect = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    React.useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={selectRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-[#EEEEEE] rounded-lg cursor-pointer flex justify-between items-center transition-all duration-300 hover:bg-gray-200"
        >
          <span className={value ? 'text-gray-800' : 'text-gray-500'}>{value || placeholder}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="p-3 text-gray-800 cursor-pointer transition-all duration-200 hover:bg-orange-500 hover:text-white"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex flex-col lg:px-[20em] bg-white'>
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl lg:max-w-6xl flex flex-col to-gray-800 min-h-screen text-white">
        <h1 className="text-3xl sm:text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
          Upload
        </h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          {/* Owner Details Section */}
          <div className="p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Owner Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="Enter Your Phone Number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Market Details Section */}
          <div className="p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Market Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Market Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.marketName}
                  onChange={(e) => setFormData({ ...formData, marketName: e.target.value })}
                  className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Enter Your Market Name"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="Enter the Complete Location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    value={formData.city}
                    onChange={(value) => setFormData({ ...formData, city: value, customCity: value === 'Other' ? formData.customCity : '' })}
                    options={cityOptions}
                    placeholder="Select City"
                  />
                  {formData.city === 'Other' && (
                    <input
                      type="text"
                      value={formData.customCity}
                      onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                      className="w-full p-3 mt-2 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder="Enter your city"
                      required
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price ($/month) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Enter the Price"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Space Size (sq. ft) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Enter the Space Size"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Market Type <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  value={formData.type}
                  onChange={(value) => setFormData({ ...formData, type: value })}
                  options={typeOptions}
                  placeholder="Select Type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Services (comma-separated) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                  placeholder="Enter the Services (max 9)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Media Upload</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-25 h-23 bg-gray-200 rounded-full">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-base font-medium text-gray-600 mb-1">
                      Upload Photos <span className="text-red-500">*</span>
                    </label>
                    <label className="w-full p-3 bg-gray-200 rounded-lg cursor-pointer text-gray-500 text-base text-center">
                      Select a Photo
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'images')}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {formData.images.map((item, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={item.preview}
                          alt={`Preview ${idx}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeFile(idx, 'images')}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-25 h-23 bg-gray-200 rounded-full">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="block text-base font-medium text-gray-600 mb-1">
                      Upload a Video (Optional)
                    </label>
                    <label className="w-full p-3 bg-gray-200 rounded-lg cursor-pointer text-gray-500 text-base text-center">
                      Select a Video
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'videos')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {formData.videos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {formData.videos.map((item, idx) => (
                      <div key={idx} className="relative">
                        <video
                          src={item.preview}
                          className="w-full h-32 object-cover rounded-lg"
                          controls
                        />
                        <button
                          onClick={() => removeFile(idx, 'videos')}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Highlights</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.Space_Highlights} Points</label>
                {formData.highlights.spaceHighlights.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointsChange('spaceHighlights', idx, e.target.value)}
                      className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder={`Point ${idx + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => deletePointField('spaceHighlights', idx)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPointField('spaceHighlights')}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Add Point +
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.heading2} Points</label>
                {formData.highlights.heading2.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointsChange('heading2', idx, e.target.value)}
                      className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder={`Point ${idx + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => deletePointField('heading2', idx)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPointField('heading2')}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Add Point +
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.heading3} Points</label>
                {formData.highlights.heading3.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointsChange('heading3', idx, e.target.value)}
                      className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder={`Point ${idx + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => deletePointField('heading3', idx)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPointField('heading3')}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Add Point +
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t.heading4} Points</label>
                {formData.highlights.heading4.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointsChange('heading4', idx, e.target.value)}
                      className="w-full p-3 bg-[#EEEEEE] rounded-lg text-black placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder={`Point ${idx + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => deletePointField('heading4', idx)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPointField('heading4')}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  Add Point +
                </button>
              </div>
            </div>
          </div>

          {/* Featured Section */}
          <div className="p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-orange-500 mb-4">Featured</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-5 w-5 text-orange-500 border-gray-600 rounded focus:ring-orange-500 bg-gray-700"
              />
              <label className="ml-2 text-sm font-medium text-gray-600">Mark as Featured</label>
            </div>
          </div>

          {/* Submit Button with Loading Indicator */}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-[#FF8126] text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting || loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              'Submit for Approval'
            )}
          </button>
        </form>
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

export default CreateMarket;