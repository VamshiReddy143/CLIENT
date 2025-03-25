import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import { Link } from 'react-router-dom';
import useMarketStore from '@/store/marketStore';

const ListingTable = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { markets, loading, error, fetchOwnerMarkets, searchQuery } = useMarketStore();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchOwnerMarkets(1, 10); // Fetch first page with a limit of 10
  }, [fetchOwnerMarkets]);

  useEffect(() => {
    if (markets && markets.length > 0) {
      let filtered = markets;

      if (activeTab !== 'All') {
        const statusMap = {
          Approved: 'available',
          Rejected: 'rejected',
          Pending: 'pending',
        };
        filtered = markets.filter((listing) => listing.status === statusMap[activeTab]);
      }

      filtered = filtered.filter((listing) => {
        const searchLower = searchQuery.toLowerCase().trim();
        const nameMatch = listing.marketName?.toLowerCase().trim().includes(searchLower);
        const typeMatch = listing.type?.toLowerCase().trim().includes(searchLower); // Changed propertyType to type
        return nameMatch || typeMatch;
      });

      console.log('Filtered data:', filtered);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [markets, activeTab, searchQuery]);

  return (
    <div className="bg-white md:bg-white lg:bg-gray-100 rounded-xl lg:px-10">
      <SearchPage />

      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="flex bg-white px-4 py-2 rounded-xl items-center lg:gap-5 gap-2">
          {['All', 'Approved', 'Rejected', 'Pending'].map((tab) => (
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
        <div className="flex gap-2">
          <Link to="/create-market">
            <button className="bg-[#FF8126] text-white text-[10px] lg:text-[17px] px-2 py-2 font-medium md:px-4 md:py-2 lg:px-4 lg:py-3 rounded-lg hover:bg-orange-500 focus:outline-none">
              + Add Listing
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 px-6 py-3 md:text-[12px] text-[10px] text-gray-500 uppercase tracking-wider rounded-t-lg sticky top-0 z-10">
            {[
              'Listing Id',
              'Listing Name',
              'Space Size',
              'Rental Price',
              'Property Type',
              'Status',
              'Action',
            ].map((header, idx) => (
              <div key={idx} className="font-medium flex items-center justify-center">
                <p>{header}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <div className="space-y-2 mt-2">
              {filteredData && filteredData.length === 0 ? (
                <div className="text-center py-4">No listings match your search or selected tab.</div>
              ) : (
                filteredData?.map((listing) => (
                  <div
                    key={listing.id} // Use listing.id for uniqueness
                    className="grid grid-cols-7 rounded-lg bg-white px-6 py-4 shadow-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-center text-sm text-gray-900">
                      #{listing.id}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-900">
                      {listing.marketName}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-900">
                      {listing.size} sq.ft. {/* Changed spaceSize to size */}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-900">
                      ${listing.price} {/* Changed rentalPrice to price */}
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                        {listing.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span
                        className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${
                          listing.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : listing.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : listing.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      {/* Edit Icon (Pencil) */}
                      <Link to={`/edit-market/${listing.id}`}>
                        <button className="text-gray-500 hover:text-gray-700">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 3.17157L15 6.17157M10 17.1716H18M2 13.1716L1 17.1716L5 16.1716L16.586 4.58557C16.9609 4.21052 17.1716 3.7019 17.1716 3.17157C17.1716 2.64124 16.9609 2.13263 16.586 1.75757L16.414 1.58557C16.0389 1.21063 15.5303 1 15 1C14.4697 1 13.9611 1.21063 13.586 1.58557L2 13.1716Z"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </Link>
                      {/* Conditional Action Icon */}
                      {listing.status === 'available' ? (
                        <Link to={`/market/${listing.id}`}>
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z"
                                fill="#FFD412"
                              />
                              <path
                                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </Link>
                      ) : listing.status === 'pending' ? (
                        <span className="text-yellow-500">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 14H9V16H11V14ZM11 4H9V12H11V4Z"
                              fill="#FBBF24"
                            />
                          </svg>
                        </span>
                      ) : listing.status === 'rejected' ? (
                        <span className="text-red-500">
                          <svg
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7856 1.21C18.0063 0.43669 16.9535 0.00190469 15.8556 4.17189e-07H6.67564C6.13237 -0.00024465 5.59447 0.107481 5.09319 0.316919C4.59191 0.526357 4.13726 0.83333 3.75564 1.22L3.67564 1.3L0.595644 5.51C0.206785 6.11381 0 6.81681 0 7.535C0 8.25319 0.206785 8.95619 0.595644 9.56L3.59564 13.73L3.67564 13.82C4.05809 14.2049 4.51312 14.51 5.01436 14.7177C5.51559 14.9254 6.05308 15.0316 6.59564 15.03H15.7956C16.8935 15.0281 17.9463 14.5933 18.7256 13.82C19.1105 13.4376 19.4156 12.9825 19.6233 12.4813C19.831 11.98 19.9372 11.4426 19.9356 10.9V4.13C19.9451 3.59161 19.8484 3.05663 19.6511 2.55561C19.4538 2.0546 19.1597 1.59736 18.7856 1.21ZM14.9156 9.42C15.0082 9.51324 15.0815 9.6238 15.1314 9.74537C15.1812 9.86694 15.2067 9.99714 15.2062 10.1285C15.2057 10.2599 15.1794 10.3899 15.1287 10.5112C15.078 10.6324 15.0039 10.7424 14.9106 10.835C14.8174 10.9276 14.7068 11.0009 14.5853 11.0507C14.4637 11.1006 14.3335 11.126 14.2021 11.1256C14.0707 11.1251 13.9407 11.0988 13.8195 11.048C13.6983 10.9973 13.5882 10.9232 13.4956 10.83L11.5956 8.93L9.70564 10.82C9.61306 10.9132 9.50302 10.9873 9.38181 11.038C9.26059 11.0888 9.13057 11.1151 8.99918 11.1156C8.86778 11.116 8.73758 11.0906 8.61601 11.0407C8.49444 10.9909 8.38388 10.9176 8.29064 10.825C8.1974 10.7324 8.12331 10.6224 8.0726 10.5012C8.02189 10.3799 7.99555 10.2499 7.99509 10.1185C7.99462 9.98714 8.02004 9.85694 8.0699 9.73537C8.11975 9.6138 8.19306 9.50324 8.28564 9.41L10.1856 7.52L8.28564 5.62C8.09867 5.4317 7.99415 5.17683 7.99509 4.91146C7.99603 4.6461 8.10234 4.39198 8.29064 4.205C8.47895 4.01802 8.73382 3.91351 8.99918 3.91444C9.26454 3.91538 9.51867 4.0217 9.70564 4.21L11.5956 6.1L13.4956 4.2C13.6826 4.0117 13.9367 3.90538 14.2021 3.90444C14.4675 3.90351 14.7223 4.00802 14.9106 4.195C15.0989 4.38198 15.2053 4.6361 15.2062 4.90146C15.2071 5.16683 15.1026 5.4217 14.9156 5.61L13.0156 7.52L14.9156 9.42Z"
                              fill="#FC572E"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
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

export default ListingTable;