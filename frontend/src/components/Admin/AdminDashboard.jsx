// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import Component from '../Piechart';
import { Graph } from '../Graph';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PROPERTY_PLACEHOLDER = "/pph.png"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalListings: 0,
    totalMarketOwners: 0,
    totalVendors: 0,
    totalRecentRequests: 0,
  });
  const [signupData, setSignupData] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please log in to access the dashboard');
        }

        const [statsResponse, requestsResponse, listingsResponse, signupResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/admin/recent-requests', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/admin/active-listings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/admin/user-signups', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log('Stats Response:', statsResponse.data);
        console.log('Signup Data Response:', signupResponse.data)
        console.log("admin recent requests", requestsResponse.data);

        setStats(statsResponse.data);
        setRecentRequests(requestsResponse.data);
        setActiveListings(listingsResponse.data);
        setSignupData(signupResponse.data);
      } catch (err) {
      
        setError(err.response?.data?.message || err.message || 'Failed to load dashboard data');
        if (err.message === 'Please log in to access the dashboard') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleViewListing = (marketId) => {
    navigate(`/market/${marketId}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
      <svg width="80" height="14" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[...Array(totalStars)].map((_, index) => (
          <path
            key={index}
            d="M7 0L8.5726 4.83717H13.6574L9.5423 7.82565L11.1149 12.6628L7 9.67435L2.8851 12.6628L4.4577 7.82565L0.342604 4.83717H5.4274L7 0Z"
            transform={`translate(${index * 16}, 0)`}
            fill={index < filledStars ? '#FFD66B' : '#E5E7EB'}
          />
        ))}
      </svg>
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="lg:px-10  mb-10 md:mb-0">
      <SearchPage />

      {/* Stats Section */}
      <div id="second" className="mt-10 grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-blue-100 p-4 rounded-full">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3754 0.0782767C13.9696 0.0782767 14.5629 0.162827 15.1269 0.353777C18.6026 1.49378 19.855 5.34128 18.8088 8.70428C18.2156 10.4228 17.2457 11.9913 15.9754 13.2728C14.157 15.0493 12.1616 16.6263 10.0137 17.9848L9.77825 18.1283L9.53341 17.9753C7.37794 16.6263 5.37124 15.0493 3.53594 13.2633C2.2741 11.9818 1.30325 10.4228 0.700579 8.70428C-0.363505 5.34128 0.888912 1.49378 4.40227 0.333827C4.67535 0.238827 4.95691 0.172327 5.23941 0.135277H5.35241C5.61702 0.0963267 5.87975 0.0782767 6.14341 0.0782767H6.24699C6.84025 0.0963267 7.41466 0.200827 7.97119 0.391777H8.02674C8.06441 0.409827 8.09266 0.429777 8.1115 0.447827C8.3196 0.515277 8.51641 0.591277 8.70475 0.695777L9.06258 0.857277C9.14904 0.9038 9.2461 0.974887 9.32998 1.03632C9.38312 1.07525 9.43097 1.1103 9.4675 1.13278C9.48286 1.14192 9.49848 1.15112 9.51423 1.16039C9.59497 1.20794 9.67908 1.25747 9.75 1.31233C10.7962 0.505777 12.0665 0.0687767 13.3754 0.0782767ZM15.8811 6.91742C16.2672 6.90697 16.5967 6.59442 16.625 6.19447V6.08142C16.6532 4.75047 15.8538 3.54492 14.6381 3.07942C14.252 2.94547 13.8282 3.15542 13.687 3.55442C13.5552 3.95342 13.7623 4.39042 14.1578 4.53197C14.7614 4.75997 15.1654 5.35942 15.1654 6.02347V6.05292C15.1475 6.27047 15.2125 6.48042 15.3443 6.64192C15.4762 6.80342 15.6739 6.89747 15.8811 6.91742Z"
                fill="#5B93FF"
              />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{stats.totalListings}+</h1>
            <h1 className="text-[10px] lg:text-[16px] md:text-[17px]">Total Listings</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-[#FFF7E1] p-4 rounded-full">
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 22.3377V18.5641C22 17.5075 21.8429 16.4509 21.2143 15.3943C20.5857 14.3377 19.8 13.432 18.7 12.8282C17.6 12.0735 15.2429 11.9226 14.1429 11.9226L11.6286 14.4886L12.5714 16.4509V20.9792L11 22.6396L9.42857 20.9792V16.4509L10.5286 14.4886L7.85714 11.9226C6.6 11.9226 4.24286 12.0735 3.14286 12.8282C2.04286 13.432 1.41429 14.3377 0.785714 15.3943C0.157143 16.4509 0 17.3565 0 18.5641V22.3377C0 22.3377 4.08571 23.998 11 23.998C17.9143 23.998 22 22.3377 22 22.3377ZM11 -0.00195312C8.01429 -0.00195312 6.28571 2.71503 6.75714 5.7339C7.22857 8.75276 8.8 10.866 11 10.866C13.2 10.866 14.7714 8.75276 15.2429 5.7339C15.7143 2.56409 13.9857 -0.00195312 11 -0.00195312Z"
                fill="#FFD66B"
              />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{stats.totalMarketOwners}+</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Market Owner</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-[#FFF4F1] p-4 rounded-full">
            <svg width="33" height="19" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4997 0.300781C18.2646 0.300781 19.6939 1.71874 19.6939 3.46999C19.6939 5.22039 18.5587 7.93123 16.4997 7.93123C14.4397 7.93123 13.3045 5.22124 13.3045 3.46999C13.3045 1.71874 14.733 0.300781 16.4997 0.300781ZM6.35529 0.452431C7.80017 0.452431 8.97074 1.61336 8.97074 3.0476C8.97074 4.48013 8.04171 6.69918 6.35529 6.69918C4.66887 6.69918 3.73984 4.48013 3.73984 3.0476C3.73984 1.61336 4.90954 0.452431 6.35529 0.452431ZM26.6423 0.452431C25.1974 0.452431 24.0269 1.61336 24.0269 3.0476C24.0269 4.48013 24.9559 6.69918 26.6423 6.69918C28.3287 6.69918 29.2578 4.48013 29.2578 3.0476C29.2578 1.61336 28.0881 0.452431 26.6423 0.452431ZM22.8028 8.65691C24.0967 9.34233 25.0085 10.5735 25.2725 12.0669C25.4329 12.9734 25.6348 13.8713 25.8125 14.7752C25.8599 15.0176 26.0687 15.189 26.318 15.189H31.3927C31.881 15.189 32.3011 14.9953 32.6159 14.6269C32.9317 14.2577 33.055 13.8156 32.9756 13.3375C32.8005 12.2879 32.5392 11.1698 32.3891 10.3345C32.2347 9.44772 31.6498 8.74688 30.7898 8.42301L28.9671 7.69304C27.8672 7.25694 27.4696 8.45643 26.6475 8.45043C25.8082 8.44443 25.4148 7.25951 24.3167 7.6939C23.8224 7.89182 23.3178 8.08544 22.8218 8.28679C22.7459 8.31763 22.6976 8.38446 22.6933 8.46585C22.6898 8.54639 22.7303 8.61836 22.8028 8.65691ZM10.1957 8.65691C8.90087 9.34233 7.98909 10.5735 7.72513 12.0669C7.56468 12.9734 7.36283 13.8713 7.18513 14.7752C7.13768 15.0176 6.92893 15.189 6.67963 15.189H1.60486C1.11748 15.189 0.696524 14.9953 0.381669 14.6269C0.0659507 14.2577 -0.0574033 13.8156 0.02282 13.3375C0.197068 12.2879 0.458442 11.1698 0.608537 10.3345C0.762945 9.44772 1.3478 8.74688 2.20783 8.42301L4.03054 7.69304C5.13037 7.25694 5.52804 8.45643 6.35011 8.45043C7.18944 8.44443 7.58279 7.25951 8.68091 7.6939C9.17518 7.89182 9.67982 8.08544 10.1758 8.28679C10.2517 8.31763 10.3 8.38446 10.3043 8.46585C10.3078 8.54639 10.2673 8.61836 10.1957 8.65691ZM21.5641 10.0372C22.6156 10.433 23.329 11.2881 23.5188 12.3719C23.7017 13.3915 24.02 14.758 24.2339 16.0398C24.3314 16.6232 24.1804 17.1638 23.7957 17.6145C23.4101 18.0652 22.8968 18.3008 22.3008 18.3008H10.6968C10.1008 18.3008 9.58752 18.0652 9.20193 17.6145C8.8172 17.1638 8.66624 16.6232 8.76372 16.0406C8.97678 14.758 9.29595 13.3915 9.47883 12.3719C9.6686 11.2881 10.3828 10.433 11.4335 10.0372L13.6599 9.14528C15.0039 8.61236 15.4895 10.0783 16.4928 10.0706C17.5176 10.0637 17.9989 8.61493 19.3403 9.14613L21.5641 10.0372Z"
                fill="#FF8F6B"
              />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{stats.totalVendors}+</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Total Vendors</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-violet-100 p-4 rounded-full">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.11879 2.04442C8.48197 2.04442 7.9402 2.48695 7.78813 3.0834H12.9017C12.7496 2.48695 12.2078 2.04442 11.571 2.04442H9.11879ZM14.3464 3.08358H16.2283C18.2243 3.08358 19.8496 4.72863 19.8496 6.74887C19.8496 6.74887 19.7926 7.60411 19.7736 8.79509C19.7717 8.88937 19.726 8.98172 19.651 9.03752C19.1938 9.37519 18.7756 9.65418 18.7376 9.67342C17.1598 10.7316 15.3263 11.4762 13.3731 11.8466C13.2457 11.8716 13.1202 11.8053 13.0556 11.6917C12.5081 10.7432 11.4854 10.1256 10.3449 10.1256C9.21189 10.1256 8.17967 10.7364 7.61604 11.686C7.55046 11.7976 7.4269 11.862 7.30048 11.838C5.36342 11.4666 3.52995 10.723 1.96167 9.68304L1.04921 9.0481C0.973171 9 0.925647 8.91342 0.925647 8.81722C0.897133 8.32659 0.849609 6.74887 0.849609 6.74887C0.849609 4.72863 2.47492 3.08358 4.47092 3.08358H6.34336C6.52395 1.68865 7.69303 0.601562 9.11874 0.601562H11.571C12.9967 0.601562 14.1658 1.68865 14.3464 3.08358ZM19.5266 10.876L19.4886 10.8953C17.5686 12.1844 15.259 13.0406 12.8352 13.3965C12.4931 13.4446 12.1509 13.2234 12.0559 12.877C11.8467 12.0882 11.1719 11.5687 10.364 11.5687H10.3545H10.3355C9.52759 11.5687 8.85275 12.0882 8.64365 12.877C8.5486 13.2234 8.20643 13.4446 7.86426 13.3965C5.44055 13.0406 3.13089 12.1844 1.21093 10.8953C1.20143 10.8856 1.10638 10.8279 1.03034 10.876C0.944797 10.9241 0.944797 11.0396 0.944797 11.0396L1.01133 15.9459C1.01133 17.9661 2.62714 19.6016 4.62314 19.6016H16.0669C18.0629 19.6016 19.6787 17.9661 19.6787 15.9459L19.7547 11.0396C19.7547 11.0396 19.7547 10.9241 19.6692 10.876C19.6216 10.8472 19.5646 10.8568 19.5266 10.876ZM11.0578 14.9069C11.0578 15.3109 10.7442 15.6284 10.345 15.6284C9.95526 15.6284 9.6321 15.3109 9.6321 14.9069V13.6659C9.6321 13.2714 9.95526 12.9443 10.345 12.9443C10.7442 12.9443 11.0578 13.2714 11.0578 13.6659V14.9069Z"
                fill="#605BFF"
              />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{stats.totalRecentRequests}+</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Recent Requests</h1>
          </div>
        </div>
      </div>

      {/* Active Listing Section (Mobile) */}
      <div className="col-span-1 md:hidden md:col-span-2">
        <div id="nunito-text" className="bg-white rounded-xl p-4 mt-4 md:mt-10 md:p-5 h-[400px] flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-700 mb-5 px-2">Active Listing</h1>
          {activeListings.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">No active listings available</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-6">
                {activeListings.map((listing, index) => (
                  <div key={index} className="flex sm:flex-row">
                    <div className="w-full sm:w-[150px]">
                      <img
                        src={listing.images && listing.images.length > 0 ? listing.images[0] : PROPERTY_PLACEHOLDER}
                        alt="activelistingimg"
                        className="w-[120px] h-auto rounded-xl"
                        onError={(e) => {
                          console.log(`Failed to load image: ${e.target.src}`);
                          e.target.src = PROPERTY_PLACEHOLDER;
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-start">
                        <h2 className="text-[15px] sm:w-[60%]">{listing.marketName}, {listing.location}</h2>
                        <div className="text-right">
                          <button
                            onClick={() => handleViewListing(listing.id)}
                            className="text-[#FF8126] text-[14px] focus:outline-none"
                          >
                            view
                          </button>
                          <div className="h-[1px] bg-[#FF8126] w-full" />
                        </div>
                      </div>
                      {renderStars(listing.rating)}
                      <div className="flex justify-between">
                        <h1 className="text-[#FF8126] text-[17px] font-bold">${listing.price.toLocaleString()}</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Graph and Pie Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
        <div className="md:col-span-3 bg-white w-full">
          <Graph data={signupData} />
        </div>
        <div className="md:col-span-2 bg-white w-full">
          <Component />
        </div>
      </div>

      {/* Pending Requests and Active Listings Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        {/* Pending Request Section */}
        <div className="col-span-1 md:col-span-3">
          <div id="nunito-text" className="bg-white rounded-xl py-8 mt-10 h-[400px] flex flex-col">
            <div className="px-4">
              <h1 className="text-2xl font-semibold text-gray-700 mb-4">Pending Request</h1>
              <div className="bg-white rounded-lg overflow-hidden flex-1">
                {recentRequests.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500">No pending requests available</p>
                  </div>
                ) : (
                  <div className="max-h-[240px] overflow-y-auto overflow-x-auto custom-scrollbar">
                    <table className="min-w-full divide-y divide-white">
                      <thead className="sticky top-0 bg-white">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                            Request ID
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                            Market Owner
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                            Listing Name
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                            Space Size
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentRequests.map((request, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm sm:px-6">{request.requestId}</td>
                            <td className="px-4 py-4 text-sm sm:px-6">{request.marketOwner}</td>
                            <td className="px-4 py-4 text-sm sm:px-6">{request.listingName}</td>
                            <td className="px-4 py-4 text-sm sm:px-6">{request.spaceSize}</td>
                            <td className="px-4 py-4 text-sm sm:px-6">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  request.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                Pending
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Listing Section (Desktop) */}
        <div className="hidden md:block md:col-span-2">
          <div id="nunito-text" className="bg-white rounded-xl p-4 mt-4 md:mt-10 md:p-5 h-[400px] flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-700 mb-5 px-2">Active Listing</h1>
            {activeListings.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">No active listings available</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col  gap-6">
                  {activeListings.map((listing, index) => (
                    <div key={index} className="flex gap-6 sm:flex-row">
                      <div className="w-full sm:w-[150px]">
                        <img
                          src={listing.images && listing.images.length > 0 ? listing.images[0] : PROPERTY_PLACEHOLDER}
                          alt="activelistingimg"
                          className="w-[120px] h-[100px] rounded-xl"
                          onError={(e) => {
                            console.log(`Failed to load image: ${e.target.src}`);
                            e.target.src = PROPERTY_PLACEHOLDER;
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between  items-start">
                        <div className=''>
                        <h2 className="lg:text-[12px] text-[10px] sm:w-[60%]">{listing.marketName}</h2>
                        <p className='ld:text-[12px] text-[9px] text-gray-600'>{listing.location}</p>
                        </div>

                          <div className="text-right">
                            <button
                              onClick={() => handleViewListing(listing.id)}
                              className="text-[#FF8126] text-[14px] focus:outline-none"
                            >
                              view
                            </button>
                            <div className="h-[1px] bg-[#FF8126] w-full" />
                          </div>
                        </div>
                      
                        <div className="flex justify-between">
                          <h1 className="text-[#FF8126] text-[17px] font-bold">${listing.price.toLocaleString()}</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;












