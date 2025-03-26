import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useMarketStore from '@/store/marketStore';

const PROFILE_PLACEHOLDER = "/ph.png";

function AdminApproveTable() {
  const [activeTab, setActiveTab] = useState('All');
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showActions, setShowActions] = useState(null);

  const { searchQuery } = useMarketStore();

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoading(true);
      setError(null);
      setMarkets([]);

      let status;
      if (activeTab === 'All') status = undefined;
      else if (activeTab === 'Approved') status = 'available';
      else if (activeTab === 'Rejected') status = 'rejected';
      else if (activeTab === 'Pending') status = 'pending';

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        console.log('Token being sent:', token);
        console.log(`Fetching markets with status: ${status}`);
        const response = await axios.get('http://localhost:3000/api/markets', {
          params: { status, page: 1, limit: 10 },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        });

        console.log('Markets fetched successfully:', response.data);

        const parsedMarkets = response.data.map((market) => {
          const parseJSON = (value, defaultValue) => {
            try {
              return value ? JSON.parse(value) : defaultValue;
            } catch (err) {
              console.error(`Error parsing JSON for market ${market.id}:`, err);
              return defaultValue;
            }
          };

          return {
            ...market,
            services: parseJSON(market.services, []),
            images: parseJSON(market.images, []),
            videos: parseJSON(market.videos, []),
            highlights: parseJSON(market.highlights, { spaceHighlights: [], heading2: [], heading3: [], heading4: [] }),
          };
        });

        setMarkets(parsedMarkets);
      } catch (err) {
        console.error('Error fetching markets:', err);
        let errorMessage = 'Failed to fetch markets';
        if (err.response) {
          if (err.response.status === 403) {
            errorMessage = 'Access denied: You must be an admin to view this page. Please log in again.';
            localStorage.removeItem('token');
            window.location.href = '/login';
          } else if (err.response.status === 500) {
            errorMessage = 'Server error: Unable to fetch markets. Please try again later.';
          } else {
            errorMessage = err.response.data?.message || err.message;
          }
        } else if (err.code === 'ECONNABORTED') {
          errorMessage = 'Request timed out. Please check your server and try again.';
        } else {
          errorMessage = err.message;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [activeTab]);

  useEffect(() => {
    if (markets.length > 0) {
      const filtered = markets.filter((market) => {
        const searchLower = searchQuery.toLowerCase();
        const typeMatch = market.type?.toLowerCase().includes(searchLower);
        const ownerNameMatch = market.ownerName?.toLowerCase().includes(searchLower);
        return typeMatch || ownerNameMatch;
      });
      setFilteredMarkets(filtered);
    } else {
      setFilteredMarkets([]);
    }
  }, [markets, searchQuery]);

  const approveMarket = async (marketId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      await axios.put(
        `http://localhost:3000/api/markets/${marketId}/status`,
        { status: 'available' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMarkets((prevMarkets) =>
        prevMarkets.map((market) =>
          market.id === marketId ? { ...market, status: 'available' } : market
        )
      );
      toast.success('Market approved successfully');
    } catch (err) {
      console.error('Error approving market:', err);
      toast.error('Failed to approve market');
    }
  };

  const rejectMarket = async (marketId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      await axios.put(
        `http://localhost:3000/api/markets/${marketId}/status`,
        { status: 'rejected' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMarkets((prevMarkets) =>
        prevMarkets.map((market) =>
          market.id === marketId ? { ...market, status: 'rejected' } : market
        )
      );
      toast.success('Market rejected successfully');
    } catch (err) {
      console.error('Error rejecting market:', err);
      toast.error('Failed to reject market');
    }
  };

  const columns = activeTab === 'Invoices'
    ? ['Listing ID', 'Listing Name', 'Owner Name', 'Rental Price', 'Status', 'Action']
    : ['Listing ID', 'Owner Name', 'Space Size', 'Rental Price', 'Property Type', 'Status', 'Action'];

  return (
    <div className="min-h-screen lg:bg-gray-100 px-4 lg:px-10 mb-20 md:mb-3">
      <SearchPage />
      <div className="mt-13">
        <div className="flex bg-white w-fit p-3 rounded-xl gap-5 md:gap-7 mb-6">
          {['All', 'Approved', 'Rejected', 'Pending'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium pb-2 ${
                activeTab === tab
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading && <div className="text-gray-500 mb-4">Loading...</div>}

        <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
          <div className="min-w-[800px]">
            <div
              className={`grid ${
                activeTab === 'Invoices' ? 'grid-cols-6' : 'grid-cols-7'
              } px-4 text-sm text-gray-500 rounded-t-lg py-3 sticky top-0 z-10 bg-white`}
            >
              {columns.map((header, idx) => (
                <div key={idx} className="font-medium flex gap-2 items-center">
                  <p>{header}</p>
                  <svg
                    width="6"
                    height="5"
                    viewBox="0 0 6 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                      fill="#030229"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market, index) => (
                <div
                  key={index}
                  className={`grid ${
                    activeTab === 'Invoices' ? 'grid-cols-6' : 'grid-cols-7'
                  } items-center rounded-lg bg-white px-4 py-3 shadow-sm hover:bg-gray-50 mt-2`}
                >
                  <div className="text-sm">#{market.id}</div>
                  {activeTab === 'Invoices' ? (
                    <>
                      <div className="text-sm">{market.marketName}</div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                   
                          <img
                            src={PROFILE_PLACEHOLDER}
                            alt={market.ownerName}
                            className="h-full w-full  object-cover"
                          />
                   
                        </div>
                        <span className="text-sm">{market.ownerName}</span>
                      </div>
                      <div className="text-sm">{market.price}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-500">{market.status}</span>
                      </div>
                      <div className="flex gap-2">
                        {market.status === 'sent' ? (
                          <>
                            <button className="rounded-full p-1 hover:bg-gray-100">
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.3"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.51662 0.613575C9.88799 0.242695 10.3849 0.0244635 10.9092 0.00193531C11.4336 -0.0205929 11.9474 0.154219 12.3492 0.491881L12.4834 0.614625L14.4767 2.60684H17.2946C17.8237 2.60694 18.3333 2.80698 18.7212 3.16689C19.1092 3.52679 19.3468 4.01998 19.3864 4.54766L19.3927 4.70502V7.52287L21.386 9.51614C21.7572 9.88756 21.9756 10.3847 21.9981 10.9093C22.0207 11.4339 21.8457 11.9479 21.5077 12.3497L21.385 12.483L19.3917 14.4762V17.2941C19.3919 17.8234 19.1919 18.3333 18.832 18.7214C18.4721 19.1096 17.9787 19.3473 17.4509 19.387L17.2946 19.3923H14.4778L12.4845 21.3855C12.1131 21.7567 11.616 21.9751 11.0914 21.9977C10.5668 22.0202 10.0528 21.8452 9.6509 21.5072L9.51767 21.3855L7.5244 19.3923H4.7055C4.17616 19.3924 3.66631 19.1925 3.27816 18.8326C2.89002 18.4726 2.65227 17.9793 2.61257 17.4514L2.60732 17.2941V14.4762L0.614054 12.483C0.242881 12.1115 0.0244643 11.6145 0.00193389 11.0898C-0.0205965 10.5652 0.154397 10.0512 0.49236 9.64938L0.614054 9.51614L2.60732 7.52287V4.70502C2.60742 4.17586 2.80746 3.66627 3.16737 3.27835C3.52727 2.89043 4.02046 2.65283 4.54814 2.61314L4.7055 2.60684H7.52335L9.51662 0.613575Z"
                                  fill="#79AFED"
                                />
                                <path
                                  d="M15.5 7.5L10 13L7.5 10.5"
                                  stroke="#79AFED"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <Link to={`/admin/market/${market.id}`}>
                              <button className="rounded-full p-1 hover:bg-gray-100">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z"
                                    fill="#F29339"
                                  />
                                  <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <button className="rounded-full p-2 hover:bg-gray-100">
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 13.3333V8.33333L6.66667 6.66667L0 5V0L15.8333 6.66667L0 13.3333Z"
                                  fill="#59E974"
                                />
                              </svg>
                            </button>
                            <Link to={`/admin/market/${market.id}`}>
                              <button className="rounded-full p-1 hover:bg-gray-100">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z"
                                    fill="#F29339"
                                  />
                                  <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                    <Link to={`/admin/market/${market.id}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <img
                            src={market.ownerAvatar || PROFILE_PLACEHOLDER}
                            alt={market.ownerName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{market.ownerName}</span>
                      </div>
                      </Link>
                      <div className="text-sm">{market.size} sq. ft.</div>
                      <div className="text-sm">${market.price}</div>
                      <div>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                          {market.type}
                        </span>
                      </div>
                      <div className="text-sm">{market.status}</div>
                      <div className="flex gap-2 relative">
                        {market.status === 'pending' ? (
                          <>
                            <button
                              className="rounded-full p-1 hover:bg-gray-100"
                              onClick={() =>
                                setShowActions(showActions === market.id ? null : market.id)
                              }
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.5858 0.585786C14.3668 -0.195262 15.6332 -0.195262 16.4142 0.585786L19.4142 3.58579C20.1953 4.36683 20.1953 5.63317 19.4142 6.41421L7.82843 18H1V11.1716L13.5858 0.585786Z"
                                  fill="#F29339"
                                />
                              </svg>
                            </button>
                            {showActions === market.id && (
                              <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg p-2 z-20">
                                <button
                                  onClick={() => {
                                    approveMarket(market.id);
                                    setShowActions(null);
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 text-green-500 hover:bg-gray-100 w-full text-left"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M13.3333 4L6 11.3333L2.66667 8"
                                      stroke="#22C55E"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    rejectMarket(market.id);
                                    setShowActions(null);
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 4L4 12M4 4L12 12"
                                      stroke="#EF4444"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Reject
                                </button>
                              </div>
                            )}
                            <Link to={`/admin/market/${market.id}`}>
                              <button className="rounded-full p-1 hover:bg-gray-100">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z"
                                    fill="#F29339"
                                  />
                                  <path
                                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </>
                        ) : (
                          <Link to={`/market/${market.id}`}>
                            <button className="rounded-full p-1 hover:bg-gray-100">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z"
                                  fill="#F29339"
                                />
                                <path
                                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </Link>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              !loading && (
                <div className="text-center py-6 text-gray-500">
                  No markets match your search for this status.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApproveTable;