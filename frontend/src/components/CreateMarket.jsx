// src/components/CreateMarket.jsx
import React, { useState } from 'react';

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../lib/translations";
import useMarketStore from '../store/marketStore';

const CreateMarket = () => {
  const { createMarket, loading, error, success } = useMarketStore();
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    marketName: '',
    location: '',
    city: '',
    price: '',
    size: '',
    type: '',
    services: '',
    images: [],
    videos: [],
    status: 'available',
    rating: '',
    featured: false,
    highlights: {
      spaceHighlights: [],
      heading2: [],
      heading3: [],
      heading4: [],
    },
  });

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
  ];

  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', 'market');

      try {
        const endpoint = type === 'images' ? 'image' : 'video';
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${endpoint}/upload`,
          { method: 'POST', body: uploadData }
        );
        const data = await response.json();
        if (data.secure_url) uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error(`Error uploading ${type}:`, err);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...uploadedUrls],
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const marketData = {
      ...formData,
      services: formData.services ? formData.services.split(',').map((s) => s.trim()) : [],
      price: parseInt(formData.price, 10) || 0,
      size: parseInt(formData.size, 10) || 0,
      rating: formData.rating ? parseInt(formData.rating, 10) : null,
      location: formData.city ? `${formData.location}, ${formData.city}` : formData.location,
      highlights: JSON.stringify(formData.highlights), // Ensure this is included
    };
    console.log('Submitting market data:', marketData); // Debug log
    await createMarket(marketData);

    if (!error) {
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        marketName: '',
        location: '',
        city: '',
        price: '',
        size: '',
        type: '',
        services: '',
        images: [],
        videos: [],
        status: 'available',
        rating: '',
        featured: false,
        highlights: {
          spaceHighlights: [],
          heading2: [],
          heading3: [],
          heading4: [],
        },
      });
    }
  };

  // Rest of the form JSX remains unchanged
  return (
    <div className="p-[2rem] max-w-[800px] mx-auto">
      <h1 className="text-[2rem] font-bold mb-[1.5rem]">Create a Market</h1>
      {error && <p className="text-red-500 mb-[1rem]">{error}</p>}
      {success && <p className="text-green-500 mb-[1rem]">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-[1rem]">
        <div>
          <label className="block text-[1rem] font-semibold">Owner Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Market Name</label>
          <input
            type="text"
            value={formData.marketName}
            onChange={(e) => setFormData({ ...formData, marketName: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Exact Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">City (Optional)</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
          >
            <option value="">Select City (Optional)</option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Price ($/month)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Size (sq. ft)</label>
          <input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
            required
          >
            <option value="">Select Type</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Services (comma-separated, optional)</label>
          <input
            type="text"
            value={formData.services}
            onChange={(e) => setFormData({ ...formData, services: e.target.value })}
            className="w-full p-[0.5rem] border rounded"
          />
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Images (Optional)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'images')}
            className="w-full p-[0.5rem] border rounded"
          />
          {formData.images.length > 0 && (
            <ul className="list-disc ml-[1.5rem] mt-[0.5rem]">
              {formData.images.map((url, idx) => (
                <li key={idx}><a href={url} target="_blank" rel="noopener noreferrer">Image {idx + 1}</a></li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">Videos (Optional)</label>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'videos')}
            className="w-full p-[0.5rem] border rounded"
          />
          {formData.videos.length > 0 && (
            <ul className="list-disc ml-[1.5rem] mt-[0.5rem]">
              {formData.videos.map((url, idx) => (
                <li key={idx}><a href={url} target="_blank" rel="noopener noreferrer">Video {idx + 1}</a></li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-[1rem] font-semibold">{t.Space_Highlights} Points</label>
          {formData.highlights.spaceHighlights.map((point, idx) => (
            <input
              key={idx}
              type="text"
              value={point}
              onChange={(e) => handlePointsChange('spaceHighlights', idx, e.target.value)}
              className="w-full p-[0.5rem] border rounded mb-[0.5rem]"
              placeholder={`Point ${idx + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addPointField('spaceHighlights')}
            className="text-[#FF8126] underline"
          >
            Add Point
          </button>
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">{t.heading2} Points</label>
          {formData.highlights.heading2.map((point, idx) => (
            <input
              key={idx}
              type="text"
              value={point}
              onChange={(e) => handlePointsChange('heading2', idx, e.target.value)}
              className="w-full p-[0.5rem] border rounded mb-[0.5rem]"
              placeholder={`Point ${idx + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addPointField('heading2')}
            className="text-[#FF8126] underline"
          >
            Add Point
          </button>
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">{t.heading3} Points</label>
          {formData.highlights.heading3.map((point, idx) => (
            <input
              key={idx}
              type="text"
              value={point}
              onChange={(e) => handlePointsChange('heading3', idx, e.target.value)}
              className="w-full p-[0.5rem] border rounded mb-[0.5rem]"
              placeholder={`Point ${idx + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addPointField('heading3')}
            className="text-[#FF8126] underline"
          >
            Add Point
          </button>
        </div>
        <div>
          <label className="block text-[1rem] font-semibold">{t.heading4} Points</label>
          {formData.highlights.heading4.map((point, idx) => (
            <input
              key={idx}
              type="text"
              value={point}
              onChange={(e) => handlePointsChange('heading4', idx, e.target.value)}
              className="w-full p-[0.5rem] border rounded mb-[0.5rem]"
              placeholder={`Point ${idx + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={() => addPointField('heading4')}
            className="text-[#FF8126] underline"
          >
            Add Point
          </button>
        </div>

        <div>
          <label className="block text-[1rem] font-semibold">Featured</label>
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
          />
          <span>Mark as Featured</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FF8126] text-white px-4 py-2 rounded-lg"
        >
          {loading ? 'Creating...' : 'Create Market'}
        </button>
      </form>
    </div>
  );
};

export default CreateMarket;