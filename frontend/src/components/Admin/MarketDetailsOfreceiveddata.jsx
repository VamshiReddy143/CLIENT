import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PROFILE_PLACEHOLDER = "/ph.png";
const PROPERTY_PLACEHOLDER = "/pph.png";

const MarketDetails = () => {
  const { marketId } = useParams();
  const navigate = useNavigate();
  const [market, setMarket] = useState(null);
  const [owner, setOwner] = useState(null); // New state for owner details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        // Fetch market details
        const marketResponse = await axios.get(`http://localhost:3000/api/markets/${marketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });

        const marketData = marketResponse.data;
        console.log('Raw market data:', marketData);

        const parseJSON = (value, defaultValue) => {
          if (Array.isArray(value)) {
            return value;
          }
          if (typeof value === 'string') {
            try {
              const parsed = JSON.parse(value);
              return Array.isArray(parsed) ? parsed : defaultValue;
            } catch (err) {
              console.error(`Error parsing JSON for market ${marketId}:`, err);
              return defaultValue;
            }
          }
          return defaultValue;
        };

        const parseHighlights = (value) => {
          const defaultHighlights = { spaceHighlights: [], heading2: [], heading3: [], heading4: [] };
          if (typeof value === 'object' && value !== null) {
            return { ...defaultHighlights, ...value };
          }
          if (typeof value === 'string') {
            try {
              const parsed = JSON.parse(value);
              return { ...defaultHighlights, ...parsed };
            } catch (err) {
              console.error(`Error parsing highlights for market ${marketId}:`, err);
              return defaultHighlights;
            }
          }
          return defaultHighlights;
        };

        // Fetch owner details using ownerId or email
        let ownerData = null;
        if (marketData.ownerId) {
          const ownerResponse = await axios.get(`http://localhost:3000/api/users/${marketData.ownerId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          ownerData = ownerResponse.data;
        } else if (marketData.email) {
          // Fallback: Fetch owner by email if ownerId is not available
          const ownerResponse = await axios.get(`http://localhost:3000/api/users?email=${marketData.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          ownerData = ownerResponse.data[0]; // Assuming the API returns an array
        }

        setMarket({
          ...marketData,
          services: parseJSON(marketData.services, []),
          images: parseJSON(marketData.images, []),
          videos: parseJSON(marketData.videos, []),
          highlights: parseHighlights(marketData.highlights),
        });

        setOwner(ownerData);
      } catch (err) {
        console.error('Error fetching market details:', err);
        let errorMessage = 'Failed to fetch market details';
        if (err.response?.status === 403) {
          errorMessage = 'Access denied: Admin privileges required.';
          localStorage.removeItem('token');
          navigate('/login');
        } else if (err.response?.status === 404) {
          errorMessage = 'Market not found.';
        } else {
          errorMessage = err.response?.data?.message || err.message;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketDetails();
  }, [marketId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No market data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl lg:shadow-lg p-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Market Details</h1>
          <button
            onClick={() => navigate('/admin/listings')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Back to Listings
          </button>
        </div>

        {/* Owner Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-l-4 border-orange-500 pl-4">Owner Information</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Owner Avatar */}
            <div className="flex-shrink-0">
              {owner?.id ? (
                <Link to={`/admin/market-owner/profile/${owner.id}`}>
                  <img
                    src={owner.avatar || PROFILE_PLACEHOLDER}
                    alt={market.ownerName}
                    className="h-36 w-36 rounded-full object-cover shadow-lg border-4 border-orange-100"
                  />
                </Link>
              ) : (
                <img
                  src={PROFILE_PLACEHOLDER}
                  alt={market.ownerName}
                  className="h-36 w-36 rounded-full object-cover shadow-lg border-4 border-orange-100"
                />
              )}
            </div>
            {/* Owner Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {owner?.id ? (
                  <Link to={`/admin/market-owner/profile/${owner.id}`}>
                    <h2 className="text-2xl font-semibold text-gray-800 hover:text-orange-500 transition">{market.ownerName}</h2>
                  </Link>
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-800">{market.ownerName}</h2>
                )}
             
              </div>
              <p className="text-sm text-gray-500 mb-4">Owner ID: #{owner?.id || 'N/A'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Address:</span>
                  <span className="text-gray-800">{market.location ? `${market.location}, ${market.city}` : 'No address'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-l-4 border-orange-500 pl-4">Market Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Market Name:</span>
              <span className="text-gray-800">{market.marketName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Type:</span>
              <span className="text-gray-800">{market.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Price ($/month):</span>
              <span className="text-gray-800">${market.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Size (sq. ft):</span>
              <span className="text-gray-800">{market.size}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Status:</span>
              <span className="bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm capitalize">{market.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Featured:</span>
              <span className="text-gray-800">{market.featured ? 'Yes' : 'No'}</span>
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="text-gray-600 font-medium">Services:</span>
              <ul className="list-disc list-inside text-gray-800 mt-1 pl-4">
                {market.services.length > 0 ? (
                  market.services.map((service, idx) => <li key={idx} className="text-gray-700">{service}</li>)
                ) : (
                  <li className="text-gray-700">No services listed</li>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-l-4 border-orange-500 pl-4">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['spaceHighlights', 'heading2', 'heading3', 'heading4'].map((key) => (
              <div key={key}>
                <span className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <ul className="list-disc list-inside text-gray-800 mt-1 pl-4">
                  {market.highlights[key].length > 0 ? (
                    market.highlights[key].map((point, idx) => <li key={idx} className="text-gray-700">{point}</li>)
                  ) : (
                    <li className="text-gray-700">No highlights</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Media */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-l-4 border-orange-500 pl-4">Media</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Images</h3>
            {market.images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {market.images.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`Market Image ${idx + 1}`}
                      className="w-full h-52 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found')}
                    />
                  
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No images available</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-600 mb-3">Videos</h3>
            {market.videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {market.videos.map((url, idx) => (
                  <video
                    key={idx}
                    src={url}
                    controls
                    className="w-full h-52 object-cover rounded-lg shadow-md"
                    onError={(e) => console.error(`Error loading video ${url}`)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No videos available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketDetails;