import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchPage from '../SearchPage';
import useAuthStore from '@/store/authSlice';
import useMarketStore from '@/store/marketStore';

const PROFILE_PLACEHOLDER="/ph.png"

const VendorTable = () => {
  const { ownerRequests, fetchOwnerRequests, updateRequestStatus, loading, error } = useMarketStore();
  const { user } = useAuthStore();
  const { searchQuery } = useMarketStore();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    if (user && user.user_role === 'market_owner') {
      fetchOwnerRequests();
    }
  }, [fetchOwnerRequests, user]);

  useEffect(() => {
    if (ownerRequests && ownerRequests.length > 0) {
      let filtered = ownerRequests;

      if (activeTab !== 'All') {
        const statusMap = {
          Approved: 'approved',
          Rejected: 'rejected',
          Pending: 'pending',
        };
        filtered = ownerRequests.filter(
          (request) => request.status.toLowerCase() === statusMap[activeTab].toLowerCase()
        );
      }

      filtered = filtered.filter((request) =>
        request.vendorName?.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
      );

      filtered = filtered.map((request) => ({
        ...request,
        status: request.status || 'pending',
      }));

      console.log('Filtered requests:', filtered);
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests([]);
    }
  }, [ownerRequests, searchQuery, activeTab]);

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
  if (loading) return <div className="text-center p-4">Loading requests...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="lg:bg-gray-100 bg-white rounded-xl lg:px-10 pb-20 md:pb-5">
      <SearchPage />

      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="flex bg-white px-4 py-2 rounded-xl items-center lg:gap-5 gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] mt-4 font-medium uppercase tracking-wider ${
                activeTab === tab
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              } pb-2 focus:outline-none`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-8 px-6 py-3 md:text-[12px] text-[8px] text-gray-500 uppercase tracking-wider rounded-t-lg sticky top-0 z-10">
            {[
              'Listing Id',
              'Vendor Name',
              'Listing Name',
              'Space Size',
              'Rental Price',
              'Property Type',
              'Status',
              'Action',
            ].map((header, idx) => (
              <div key={idx} className="font-medium flex gap-2 items-center justify-center">
                <p>{header}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-2">
            {filteredRequests.length === 0 ? (
              <div className="text-center p-4">No requests match your search or selected tab.</div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.requestId}
                  className="grid grid-cols-8 rounded-lg bg-white px-6 py-4 shadow-sm hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    #{request.requestId}
                  </div>
                  <div className="flex items-center justify-start gap-3">
                    <Link to={`/vendor/${request.vendorId}`}>
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={
                            request.vendorAvatar ||
                            PROFILE_PLACEHOLDER
                          }
                          alt={request.vendorName}
                          className="h-full w-full object-cover"
                          onError={(e) =>
                            (e.target.src =
                              PROFILE_PLACEHOLDER)
                          }
                        />
                      </div>
                    </Link>
                    <Link to={`/vendor/${request.vendorId}`}>
                      <span className="text-sm text-gray-900">{request.vendorName}</span>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    {request.marketName}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    {`${request.spaceSize} sq.ft.`}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    {`$${request.rentalPrice}`}
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                      {request.propertyType}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span
                      className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-center relative">
                      <button className="text-orange-500 hover:text-orange-700 mr-2">
                    <Link to={`/market/${request.marketId}`}>
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
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                    </Link>
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
              ))
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #f97316 transparent; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar {
          opacity: 1;
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
        @media (min-width: 1024px) {
          .custom-scrollbar {
            overflow-x: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VendorTable;