import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import Component from '../Piechart';
import { useNavigate, Link } from 'react-router-dom';
import useMarketStore from '@/store/marketStore';
import useAuthStore from '@/store/authSlice';
import axios from 'axios';

const MarketOwnerDashboard = () => {
  const navigate = useNavigate();
  const { markets, ownerRequests, fetchOwnerMarkets, fetchOwnerRequests, updateRequestStatus, loading, error } = useMarketStore();
  const { user } = useAuthStore();

  const [stats, setStats] = useState({
    totalMarketOwners: 0,
    totalVendors: 0,
    totalRequests: 0,
  });
  const [activeListings, setActiveListings] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    if (user && user.user_role === 'market_owner') {
      fetchOwnerMarkets(1, 10);
      fetchOwnerRequests();
      fetchStats();
    }
  }, [fetchOwnerMarkets, fetchOwnerRequests, user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please log in to access the dashboard');
      }

      const [marketOwnersResponse, vendorsResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/market/market-owners/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/api/market/vendors/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats((prevStats) => ({
        ...prevStats,
        totalMarketOwners: marketOwnersResponse.data.count,
        totalVendors: vendorsResponse.data.count,
      }));
    } catch (err) {
      console.error('Error fetching stats:', err);
      setStatsError(err.response?.data?.message || 'Failed to load stats');
      if (err.message === 'Please log in to access the dashboard') {
        navigate('/login');
      }
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    if (!loading && !error && markets.length > 0) {
      setStats((prevStats) => ({
        ...prevStats,
        totalRequests: markets.length,
      }));
      const availableMarkets = markets
        .filter((market) => market.status === 'available')
        .slice(0, 2);
      console.log('Active listings with locations:', availableMarkets.map(m => ({ id: m.id, location: m.location })));
      setActiveListings(availableMarkets);
    }
  }, [markets, loading, error]);

  useEffect(() => {
    if (!loading && !error && ownerRequests.length > 0) {
      setPendingRequests(ownerRequests);
    }
  }, [ownerRequests, loading, error]);

  const handleViewListing = (marketId) => {
    navigate(`/market/${marketId}`);
  };

  const handleImageError = (e) => {
    e.target.src = '/activelistingimg1.svg';
  };

  const handleActionClick = (requestId) => {
    setDropdownOpen(dropdownOpen === requestId ? null : requestId);
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await updateRequestStatus(requestId, status);
      setDropdownOpen(null);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (!user || user.user_role !== 'market_owner') {
    return <div className="text-center p-4">Access denied: Market owners only.</div>;
  }

  if (loadingStats) {
    return <div className="text-center py-10">Loading stats...</div>;
  }

  if (statsError) {
    return <div className="text-center py-10 text-red-500">{statsError}</div>;
  }

  console.log("activeListings", activeListings);

  return (
    <div className='lg:px-10'>
      <SearchPage />
      <div className='flex p-5 md:p-0 items-start gap-5 mt-10'>
        <div className='md:w-full lg:w-[60%]'>
          {/* Stats Section */}
          <div id='second' className='grid lg:grid-cols-2 grid-cols-2 gap-10 md:gap-5 lg:w-full'>
            <div className='lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4'>
              <div className='flex items-center bg-blue-100 p-4 rounded-full'>
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3754 0.0782767C13.9696 0.0782767 14.5629 0.162827 15.1269 0.353777C18.6026 1.49378 19.855 5.34128 18.8088 8.70428C18.2156 10.4228 17.2457 11.9913 15.9754 13.2728C14.157 15.0493 12.1616 16.6263 10.0137 17.9848L9.77825 18.1283L9.53341 17.9753C7.37794 16.6263 5.37124 15.0493 3.53594 13.2633C2.2741 11.9818 1.30325 10.4228 0.700579 8.70428C-0.363505 5.34128 0.888912 1.49378 4.40227 0.333827C4.67535 0.238827 4.95691 0.172327 5.23941 0.135277H5.35241C5.61702 0.0963267 5.87975 0.0782767 6.14341 0.0782767H6.24699C6.84025 0.0963267 7.41466 0.200827 7.97119 0.391777H8.02674C8.06441 0.409827 8.09266 0.429777 8.1115 0.447827C8.3196 0.515277 8.51641 0.591277 8.70475 0.695777L9.06258 0.857277C9.14904 0.9038 9.2461 0.974887 9.32998 1.03632C9.38312 1.07525 9.43097 1.1103 9.4675 1.13278C9.48286 1.14192 9.49848 1.15112 9.51423 1.16039C9.59497 1.20794 9.67908 1.25747 9.75 1.31233C10.7962 0.505777 12.0665 0.0687767 13.3754 0.0782767ZM15.8811 6.91742C16.2672 6.90697 16.5967 6.59442 16.625 6.19447V6.08142C16.6532 4.75047 15.8538 3.54492 14.6381 3.07942C14.252 2.94547 13.8282 3.15542 13.687 3.55442C13.5552 3.95342 13.7623 4.39042 14.1578 4.53197C14.7614 4.75997 15.1654 5.35942 15.1654 6.02347V6.05292C15.1475 6.27047 15.2125 6.48042 15.3443 6.64192C15.4762 6.80342 15.6739 6.89747 15.8811 6.91742Z"
                    fill="#5B93FF"
                  />
                </svg>
              </div>
              <div id="nunito-text" className='flex flex-col gap-1 items-start'>
                <h1 className='font-bold lg:text-[20.9px] font-800 leading-[100%]'>{stats.totalRequests}+</h1>
                <h1 className='text-[10px] lg:text-[16px] md:text-[17px]'>Total Listings</h1>
              </div>
            </div>

            <div className='lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4'>
              <div className='flex items-center bg-[#FFF7E1] p-4 rounded-full'>
                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 22.3377V18.5641C22 17.5075 21.8429 16.4509 21.2143 15.3943C20.5857 14.3377 19.8 13.432 18.7 12.8282C17.6 12.0735 15.2429 11.9226 14.1429 11.9226L11.6286 14.4886L12.5714 16.4509V20.9792L11 22.6396L9.42857 20.9792V16.4509L10.5286 14.4886L7.85714 11.9226C6.6 11.9226 4.24286 12.0735 3.14286 12.8282C2.04286 13.432 1.41429 14.3377 0.785714 15.3943C0.157143 16.4509 0 17.3565 0 18.5641V22.3377C0 22.3377 4.08571 23.998 11 23.998C17.9143 23.998 22 22.3377 22 22.3377ZM11 -0.00195312C8.01429 -0.00195312 6.28571 2.71503 6.75714 5.7339C7.22857 8.75276 8.8 10.866 11 10.866C13.2 10.866 14.7714 8.75276 15.2429 5.7339C15.7143 2.56409 13.9857 -0.00195312 11 -0.00195312Z"
                    fill="#FFD66B"
                  />
                </svg>
              </div>
              <div id="nunito-text" className='flex flex-col gap-1 items-start'>
                <h1 className='font-bold lg:text-[20.9px] font-800 leading-[100%]'>{stats.totalMarketOwners}+</h1>
                <h1 className='text-[10px] lg:text-[17px] md:text-[17px]'>Market Owners</h1>
              </div>
            </div>

            <div className='lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4'>
              <div className='flex items-center bg-[#FFF4F1] p-4 rounded-full'>
                <svg width="33" height="19" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.4997 0.300781C18.2646 0.300781 19.6939 1.71874 19.6939 3.46999C19.6939 5.22039 18.5587 7.93123 16.4997 7.93123C14.4397 7.93123 13.3045 5.22124 13.3045 3.46999C13.3045 1.71874 14.733 0.300781 16.4997 0.300781ZM6.35529 0.452431C7.80017 0.452431 8.97074 1.61336 8.97074 3.0476C8.97074 4.48013 8.04171 6.69918 6.35529 6.69918C4.66887 6.69918 3.73984 4.48013 3.73984 3.0476C3.73984 1.61336 4.90954 0.452431 6.35529 0.452431ZM26.6423 0.452431C25.1974 0.452431 24.0269 1.61336 24.0269 3.0476C24.0269 4.48013 24.9559 6.69918 26.6423 6.69918C28.3287 6.69918 29.2578 4.48013 29.2578 3.0476C29.2578 1.61336 28.0881 0.452431 26.6423 0.452431ZM22.8028 8.65691C24.0967 9.34233 25.0085 10.5735 25.2725 12.0669C25.4329 12.9734 25.6348 13.8713 25.8125 14.7752C25.8599 15.0176 26.0687 15.189 26.318 15.189H31.3927C31.881 15.189 32.3011 14.9953 32.6159 14.6269C32.9317 14.2577 33.055 13.8156 32.9756 13.3375C32.8005 12.2879 32.5392 11.1698 32.3891 10.3345C32.2347 9.44772 31.6498 8.74688 30.7898 8.42301L28.9671 7.69304C27.8672 7.25694 27.4696 8.45643 26.6475 8.45043C25.8082 8.44443 25.4148 7.25951 24.3167 7.6939C23.8224 7.89182 23.3178 8.08544 22.8218 8.28679C22.7459 8.31763 22.6976 8.38446 22.6933 8.46585C22.6898 8.54639 22.7303 8.61836 22.8028 8.65691ZM10.1957 8.65691C8.90087 9.34233 7.98909 10.5735 7.72513 12.0669C7.56468 12.9734 7.36283 13.8713 7.18513 14.7752C7.13768 15.0176 6.92893 15.189 6.67963 15.189H1.60486C1.11748 15.189 0.696524 14.9953 0.381669 14.6269C0.0659507 14.2577 -0.0574033 13.8156 0.02282 13.3375C0.197068 12.2879 0.458442 11.1698 0.608537 10.3345C0.762945 9.44772 1.3478 8.74688 2.20783 8.42301L4.03054 7.69304C5.13037 7.25694 5.52804 8.45643 6.35011 8.45043C7.18944 8.44443 7.58279 7.25951 8.68091 7.6939C9.17518 7.89182 9.67982 8.08544 10.1758 8.28679C10.2517 8.31763 10.3 8.38446 10.3043 8.46585C10.3078 8.54639 10.2673 8.61836 10.1957 8.65691ZM21.5641 10.0372C22.6156 10.433 23.329 11.2881 23.5188 12.3719C23.7017 13.3915 24.02 14.758 24.2339 16.0398C24.3314 16.6232 24.1804 17.1638 23.7957 17.6145C23.4101 18.0652 22.8968 18.3008 22.3008 18.3008H10.6968C10.1008 18.3008 9.58752 18.0652 9.20193 17.6145C8.8172 17.1638 8.66624 16.6232 8.76372 16.0406C8.97678 14.758 9.29595 13.3915 9.47883 12.3719C9.6686 11.2881 10.3828 10.433 11.4335 10.0372L13.6599 9.14528C15.0039 8.61236 15.4895 10.0783 16.4928 10.0706C17.5176 10.0637 17.9989 8.61493 19.3403 9.14613L21.5641 10.0372Z"
                    fill="#FF8F6B"
                  />
                </svg>
              </div>
              <div id="nunito-text" className='flex flex-col gap-1 items-start'>
                <h1 className='font-bold lg:text-[20.9px] font-800 leading-[100%]'>{stats.totalVendors}+</h1>
                <h1 className='text-[10px] lg:text-[17px] md:text-[17px]'>Total Vendors</h1>
              </div>
            </div>

            <div className='lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4'>
              <div className='flex items-center bg-violet-100 p-4 rounded-full'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.11879 2.04442C8.48197 2.04442 7.9402 2.48695 7.78813 3.0834H12.9017C12.7496 2.48695 12.2078 2.04442 11.571 2.04442H9.11879ZM14.3464 3.08358H16.2283C18.2243 3.08358 19.8496 4.72863 19.8496 6.74887C19.8496 6.74887 19.7926 7.60411 19.7736 8.79509C19.7717 8.88937 19.726 8.98172 19.651 9.03752C19.1938 9.37519 18.7756 9.65418 18.7376 9.67342C17.1598 10.7316 15.3263 11.4762 13.3731 11.8466C13.2457 11.8716 13.1202 11.8053 13.0556 11.6917C12.5081 10.7432 11.4854 10.1256 10.3449 10.1256C9.21189 10.1256 8.17967 10.7364 7.61604 11.686C7.55046 11.7976 7.4269 11.862 7.30048 11.838C5.36342 11.4666 3.52995 10.723 1.96167 9.68304L1.04921 9.0481C0.973171 9 0.925647 8.91342 0.925647 8.81722C0.897133 8.32659 0.849609 6.74887 0.849609 6.74887C0.849609 4.72863 2.47492 3.08358 4.47092 3.08358H6.34336C6.52395 1.68865 7.69303 0.601562 9.11874 0.601562H11.571C12.9967 0.601562 14.1658 1.68865 14.3464 3.08358ZM19.5266 10.876L19.4886 10.8953C17.5686 12.1844 15.259 13.0406 12.8352 13.3965C12.4931 13.4446 12.1509 13.2234 12.0559 12.877C11.8467 12.0882 11.1719 11.5687 10.364 11.5687H10.3545H10.3355C9.52759 11.5687 8.85275 12.0882 8.64365 12.877C8.5486 13.2234 8.20643 13.4446 7.86426 13.3965C5.44055 13.0406 3.13089 12.1844 1.21093 10.8953C1.20143 10.8856 1.10638 10.8279 1.03034 10.876C0.944797 10.9241 0.944797 11.0396 0.944797 11.0396L1.01133 15.9459C1.01133 17.9661 2.62714 19.6016 4.62314 19.6016H16.0669C18.0629 19.6016 19.6787 17.9661 19.6787 15.9459L19.7547 11.0396C19.7547 11.0396 19.7547 10.9241 19.6692 10.876C19.6216 10.8472 19.5646 10.8568 19.5266 10.876ZM11.0578 14.9069C11.0578 15.3109 10.7442 15.6284 10.345 15.6284C9.95526 15.6284 9.6321 15.3109 9.6321 14.9069V13.6659C9.6321 13.2714 9.95526 12.9443 10.345 12.9443C10.7442 12.9443 11.0578 13.2714 11.0578 13.6659V14.9069Z"
                    fill="#605BFF"
                  />
                </svg>
              </div>
              <div id="nunito-text" className='flex flex-col gap-1 items-start'>
                <h1 className='font-bold lg:text-[20.9px] font-800 leading-[100%]'>{pendingRequests.length}+</h1>
                <h1 className='text-[10px] lg:text-[17px] md:text-[17px]'>Recent Requests</h1>
              </div>
            </div>
          </div>

          {/* Active Listings Section (Mobile View) */}
          <div id="nunito-text" className='bg-white rounded-xl md:hidden mt-10'>
            <h1 className='font-bold text-[18px] mb-5 px-4 pt-4'>Active Listings</h1>
            {loading ? (
              <p className="text-gray-500 px-4">Loading active listings...</p>
            ) : error ? (
              <div className="text-red-500 px-4">
                <p>{error}</p>
                <button
                  onClick={() => fetchOwnerMarkets(1, 10)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : activeListings.length === 0 ? (
              <p className="text-gray-500 px-4 pb-4">No active listings available.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 px-4 pb-4">
                {activeListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-gray-50 rounded-lg shadow-sm p-3 sm:p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] flex-shrink-0">
                        <img
                          src={listing.images && listing.images.length > 0 ? listing.images[0] : '/activelistingimg1.svg'}
                          alt={listing.marketName}
                          className="w-full h-full object-cover rounded-md"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{listing.marketName}</h2>
                       
                        <div className="mt-1 sm:mt-2 flex items-center justify-between flex-wrap gap-2">
                          <span className="text-base sm:text-lg font-bold text-orange-500">${listing.price || 'N/A'}</span>
                          <div
                            onClick={() => handleViewListing(listing.id)}
                            className="text-xs sm:text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            View Details
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 flex-wrap gap-2">
                      <span>{listing.size ? `${listing.size} sq. ft.` : 'Size not specified'}</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                        {listing.type || 'Type not specified'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pie Chart Section (Mobile View) */}
          <div className='mt-7 lg:hidden md:flex block w-full'>
            <Component />
          </div>

          {/* Pending Requests Section (Desktop View) */}
          <div className="col-span-1 md:col-span-3 md:block hidden">
            <div id="nunito-text" className="bg-white rounded-xl py-8 mt-10">
              <div className="px-4">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">Pending Requests</h1>
                {loading ? (
                  <p className="text-gray-500">Loading pending requests...</p>
                ) : error ? (
                  <div className="text-red-500">
                    <p>{error}</p>
                    <button
                      onClick={() => fetchOwnerRequests()}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Retry
                    </button>
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <p className="text-gray-500">No pending requests available.</p>
                ) : (
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="max-h-[240px] overflow-y-auto overflow-x-auto custom-scrollbar">
                      <div className="min-w-[900px]">
                        <div className="grid grid-cols-6 px-6 py-3 text-[13px] text-gray-900 uppercase tracking-wider rounded-t-lg sticky top-0 z-10 bg-white">
                          {[
                            'Listing Id',
                            'Vendor Name',
                            'Listing Name',
                            'Space Size',
                            'Property Type',
                            'Rental Price',
                          ].map((header, idx) => (
                            <div key={idx} className="font-medium flex gap-2 items-center justify-center">
                              <p>{header}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2 mt-2">
                          {pendingRequests.map((request, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-6 rounded-lg bg-white px-6 py-4 shadow-sm hover:bg-gray-50"
                            >
                              <div className="flex items-center justify-center text-sm text-gray-900">
                                {`#${request.requestId}`}
                              </div>
                              <div className="flex items-center justify-start gap-3">
                                <Link to={`/vendor/listing/${request.vendorId}`}>
                                  <span className="text-sm ml-10 text-gray-900">{request.vendorName}</span>
                                </Link>
                              </div>
                              <div className="flex items-center justify-center text-sm text-gray-900">
                                {request.marketName}
                              </div>
                              <div className="flex items-center justify-center text-sm text-gray-900">
                                {`${request.spaceSize} sq.ft.`}
                              </div>
                              <div className="flex items-center justify-center">
                                <span className="px-3 py-1 inline-flex text-[12px] leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                                  {request.propertyType}
                                </span>
                              </div>
                              <div className="flex items-center justify-center text-sm text-gray-900">
                                {`$${request.rentalPrice}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Listings Section (Desktop View) */}
          <div id="nunito-text" className="bg-white w-full md:block hidden rounded-xl mt-7">
            <h1 className="font-bold text-[18px] mb-5 px-4 pt-4">Active Listings</h1>
            {loading ? (
              <p className="text-gray-500 px-4">Loading active listings...</p>
            ) : error ? (
              <div className="text-red-500 px-4">
                <p>{error}</p>
                <button
                  onClick={() => fetchOwnerMarkets(1, 10)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : activeListings.length === 0 ? (
              <p className="text-gray-500 px-4 pb-4">No active listings available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 px-4 pb-4">
                {activeListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-gray-50 rounded-lg shadow-sm p-3 sm:p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300 border border-gray-200"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] flex-shrink-0">
                        <img
                          src={listing.images && listing.images.length > 0 ? listing.images[0] : '/activelistingimg1.svg'}
                          alt={listing.marketName}
                          className="w-full h-full object-cover rounded-md"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{listing.marketName}</h2>
                        <div className="mt-1 sm:mt-2 flex items-center justify-between flex-wrap gap-2">
                          <span className="text-base sm:text-lg font-bold text-orange-500">${listing.price || 'N/A'}</span>
                          <div
                            onClick={() => handleViewListing(listing.id)}
                            className="text-xs sm:text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                          >
                            View
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 flex-wrap gap-2">
                      <span>{listing.size ? `${listing.size} sq. ft.` : 'Size not specified'}</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                        {listing.type || 'Type not specified'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart Section (Desktop View) */}
        <div className='flex flex-col items-center lg:block md:hidden hidden w-[40%]'>
          <Component />
        </div>
      </div>

      {/* Pending Requests Section (Mobile View) */}
      <div className="col-span-1 md:col-span-3 md:hidden block">
        <div id="nunito-text" className="bg-white rounded-xl py-8">
          <div className="px-4">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Pending Requests</h1>
            {loading ? (
              <p className="text-gray-500">Loading pending requests...</p>
            ) : error ? (
              <div className="text-red-500">
                <p>{error}</p>
                <button
                  onClick={() => fetchOwnerRequests()}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            ) : pendingRequests.length === 0 ? (
              <p className="text-gray-500">No pending requests available.</p>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="max-h-[240px] overflow-y-auto overflow-x-auto custom-scrollbar">
                  <div className="min-w-[900px]">
                    <div className="grid grid-cols-7 px-6 py-3 text-[12px] text-gray-500 uppercase tracking-wider rounded-t-lg sticky top-0 z-10 bg-white">
                      {[
                        'Listing Id',
                        'Vendor Name',
                        'Listing Name',
                        'Space Size',
                        'Rental Price',
                        'Property Type',
                        'Action',
                      ].map((header, idx) => (
                        <div key={idx} className="font-medium flex gap-2 items-center justify-center">
                          <p>{header}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 mt-2">
                      {pendingRequests.map((request, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-7 rounded-lg bg-white px-6 py-4 shadow-sm hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-center text-sm text-gray-900">
                            {`#${request.requestId}`}
                          </div>
                          <div className="flex items-center justify-start gap-3">
                            <Link to={`/vendor/listing/${request.vendorId}`}>
                              <span className="text-sm ml-10 text-gray-900">{request.vendorName}</span>
                            </Link>
                          </div>
                          <div className="flex items-center justify-center text-sm text-gray-900">
                            {request.marketName}
                          </div>
                          <div className="flex items-center justify-center text-sm text-gray-900">
                            {`${request.spaceSize} sq.ft.`}
                          </div>
                          <Link to={`/vendor/listing/${request.marketId}`}>
                            <div className="flex items-center justify-center">
                              <span className="px-3 py-1 inline-flex text-[10px] leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                                {request.propertyType}
                              </span>
                            </div>
                          </Link>
                          <div className="flex items-center italic justify-center">
                            <span className="text-sm text-red-600">
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-center relative">
                            <button className="text-orange-500 hover:text-orange-700 mr-2">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542-7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              className="text-orange-500 hover:text-orange-700"
                              onClick={() => handleActionClick(request.requestId)}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            {dropdownOpen === request.requestId && (
                              <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md z-10">
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                                  onClick={() => handleStatusUpdate(request.requestId, 'approved')}
                                >
                                  Approve
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => handleStatusUpdate(request.requestId, 'rejected')}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }

            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;  /* Vertical scrollbar width */
              height: 8px; /* Horizontal scrollbar height */
              display: none; /* Hide by default */
            }

            .custom-scrollbar:hover::-webkit-scrollbar {
              display: block; /* Show on hover */
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #f97316;
              border-radius: 10px;
              border: 2px solid transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #ea580c;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default MarketOwnerDashboard;