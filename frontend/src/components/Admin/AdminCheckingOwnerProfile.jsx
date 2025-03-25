import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchPage from '../SearchPage';
import axios from 'axios';
import useMarketStore from '@/store/marketStore';
import useAuthStore from '@/store/authSlice';

function AdminOwnerDetails() {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState(null);
  const [approvedMarkets, setApprovedMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { searchQuery } = useMarketStore();
  const { token } = useAuthStore();

  useEffect(() => {
    setApprovedMarkets([]);
    setOwner(null);
    setError(null);
    setLoading(true);

    let isMounted = true;

    const fetchOwnerData = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        console.log('Fetching owner with ID:', ownerId);
        const ownerResponse = await axios.get(`http://localhost:3000/api/user/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Owner response:', ownerResponse.data);
        if (isMounted) {
          setOwner(ownerResponse.data);
        }

        const marketsResponse = await axios.get(`http://localhost:3000/api/marketee`, {
          params: { ownerId, _t: Date.now() },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const parsedMarkets = marketsResponse.data.map((market) => {
          let parsedImages = [];
          try {
            parsedImages = market.images ? JSON.parse(market.images) : [];
          } catch (e) {
            console.error(`Error parsing images for market ${market.id}:`, e);
          }
          return {
            ...market,
            images: parsedImages,
          };
        });

        console.log('Parsed approved markets:', parsedMarkets);
        if (isMounted) {
          setApprovedMarkets(parsedMarkets);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching owner:', err.response || err);
        if (isMounted) {
          if (err.response && err.response.status === 404) {
            setError('Owner not found. Please check the owner ID and try again.');
          } else {
            setError(err.message || 'Failed to fetch owner data');
          }
          setLoading(false);
        }
      }
    };

    fetchOwnerData();

    return () => {
      isMounted = false;
      setApprovedMarkets([]);
      setLoading(false);
      setError(null);
      console.log(`Cleaned up for ownerId: ${ownerId}`);
    };
  }, [ownerId, token]);

  // Filter markets based on searchQuery (by property type OR market name)
  useEffect(() => {
    if (approvedMarkets.length > 0) {
      const filtered = approvedMarkets.filter((market) => {
        const searchLower = searchQuery.toLowerCase().trim();
        const typeMatch = market.type?.toLowerCase().trim().includes(searchLower);
        const marketNameMatch = market.marketName?.toLowerCase().trim().includes(searchLower);
        return typeMatch || marketNameMatch;
      });
      setFilteredMarkets(filtered);
    } else {
      setFilteredMarkets([]);
    }
  }, [approvedMarkets, searchQuery]);

  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  if (!owner) {
    return <div className="text-center py-6 text-gray-500">Owner not found.</div>;
  }

  const totalApprovedMarkets = filteredMarkets.length;
  const activeApprovedMarkets = filteredMarkets.filter((market) => market.status.toLowerCase() === 'available').length;

  console.log('Rendering filteredMarkets:', filteredMarkets);

  return (
    <div className="min-h-screen lg:bg-gray-100 bg:white lg:px-10">
      <SearchPage />
      <div id="nunito-text" className="bg-white p-4 rounded-xl mt-15 pb-15 lg:pb-10">
        <div className="mb-8">
          <h2 className="md:text-xl text-lg font-semibold text-[#FF8126] mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                value={owner.name || 'N/A'}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={owner.email || 'N/A'}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Phone Number</label>
              <input
                type="tel"
                value={owner.phone || 'N/A'}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:w-[67%] gap-4 mt-4">
            <div>
              <label className="block text-gray-600 mb-2">Address</label>
              <input
                type="text"
                value={owner.address || 'N/A'}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="md:text-xl text-lg font-semibold text-[#FF8126] mb-4">Approved Markets Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-2">Total Approved Markets</label>
              <input
                type="text"
                value={totalApprovedMarkets}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Active Approved Markets</label>
              <input
                type="text"
                value={activeApprovedMarkets}
                className="w-full bg-gray-100 rounded-md p-2.5"
                readOnly
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="md:text-xl text-lg font-semibold text-[#FF8126] mb-4">Approved Markets</h2>
          <div className="grid grid-cols-6 px-4 py-3 md:text-[12px] text-[10px] text-gray-500 uppercase tracking-wider rounded-t-lg">
            <div className="font-medium">Market ID</div>
            <div className="font-medium">Market Name</div>
            <div className="font-medium">Location</div>
            <div className="font-medium">Size</div>
            <div className="font-medium">Price</div>
            <div className="font-medium">Type</div>
          </div>
          {filteredMarkets.length > 0 ? (
            filteredMarkets.map((market, index) => (
              <div
                key={index}
                className="grid grid-cols-6 items-center rounded-lg lg:bg-gray-100 bg-white px-4 py-3 shadow-sm mt-2"
              >
                <div className="font-medium">{market.id ? `#${market.id}` : 'N/A'}</div>
                <div className="flex items-center gap-2">
                  {market.images && market.images.length > 1 && market.images[1] ? (
                    <img
                      src={market.images[1]}
                      alt={market.marketName || 'Market Image'}
                      className="h-8 w-8 rounded-md object-cover"
                      onError={(e) => (e.target.src = '/images/fallback.jpg')}
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">
                      N/A
                    </div>
                  )}
                  <span>{market.marketName || 'N/A'}</span>
                </div>
                <div>{market.location || 'N/A'}</div>
                <div>{market.size ? `${market.size} sq. ft.` : 'N/A'}</div>
                <div>{market.price ? `$${market.price}` : 'N/A'}</div>
                <div>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                    {market.type || 'N/A'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No approved markets match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOwnerDetails;