import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchPage from '../SearchPage';
import useAuthStore from '@/store/authSlice';
import useMarketStore from '@/store/marketStore';
const PROFILE_PLACEHOLDER = "/ph.png"


const AdminVendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVendors, setTotalVendors] = useState(0);
  const limit = 10;

  const { token } = useAuthStore();
  const { searchQuery } = useMarketStore();

  const fetchVendors = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, user_role: 'vendor' },
      });
      const fetchedVendors = response.data.filter(user => user.user_role === 'vendor');
      setTotalVendors(fetchedVendors.length);
      setVendors(fetchedVendors);
      setTotalPages(Math.ceil(fetchedVendors.length / limit));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vendors:', err);
      setError('Failed to fetch vendors. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchVendors(page);
    }
  }, [page, token]);

  // Filter vendors based on searchQuery (by name)
  useEffect(() => {
    if (vendors.length > 0) {
      const filtered = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVendors(filtered.slice((page - 1) * limit, page * limit));
      setTotalPages(Math.ceil(filtered.length / limit));
    } else {
      setFilteredVendors([]);
    }
  }, [vendors, searchQuery, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 lg:px-10">
      <SearchPage />
      <div id="nunito-text" className="mt-13 pb-20 md:pb-0 space-y-3">
        <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-7 px-4 text-sm text-gray-500 rounded-t-lg py-3 sticky top-0 z-10">
              {['Vendor Id', 'Vendor Name', 'Email', 'Phone Number', 'Address', 'Status', 'Action'].map((header, idx) => (
                <div key={idx} className="font-medium flex gap-2 items-center">
                  <p>{header}</p>
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                  </svg>
                </div>
              ))}
            </div>

            {loading && (
              <div className="text-center py-6 text-gray-500">
                Loading vendors...
              </div>
            )}

            {error && (
              <div className="text-center py-6 text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && filteredVendors.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No vendors match your search.
              </div>
            )}
            {!loading && !error && filteredVendors.length > 0 && (
              <>
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="grid grid-cols-7 items-center rounded-lg bg-white px-4 py-3 shadow-sm hover:bg-gray-50 mt-2"
                  >
                    <div className="text-sm">#{vendor.id}</div>
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/vendor/profile/${vendor.id}`}>
                        <div className="h-8 w-8 overflow-hidden shadow-xl rounded-full">
                          <img
                            src={vendor.avatar || PROFILE_PLACEHOLDER}
                            alt={vendor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                      <Link to={`/admin/vendor/profile/${vendor.id}`}>
                        <span className="text-sm">{vendor.name}</span>
                      </Link>
                    </div>
                    <div className="text-sm truncate">
                      {vendor.email ? vendor.email : 'No email'}
                    </div>
                    <div className="text-sm truncate">
                      {vendor.phone ? vendor.phone : 'No mobile number'}
                    </div>
                    <div className="text-sm truncate">
                      {vendor.address ? vendor.address : 'No address'}
                    </div>
                    <div>
                      <span className="bg-green-200 p-2 rounded-full text-green-900">
                        Active
                      </span>
                    </div>
                    <div>
                      <Link to={`/admin/vendor/profile/${vendor.id}`}>
                        <button className="rounded-full p-1 hover:bg-gray-100">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z" fill="#F29339" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {!loading && !error && totalVendors > 10 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: thin;
          scrollbar-color: #f97316 transparent;
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

export default AdminVendorDashboard;