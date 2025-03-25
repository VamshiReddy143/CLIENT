import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchPage from '../SearchPage';
import useMarketStore from '@/store/marketStore';
import useAuthStore from '@/store/authSlice';
import axios from 'axios';

const VendorTable = () => {
  const { ownerRequests, fetchOwnerRequests, loading, error } = useMarketStore();
  const { user } = useAuthStore();
  const { searchQuery } = useMarketStore();
  const [filteredVendors, setFilteredVendors] = useState([]);

  useEffect(() => {
    if (user && user.user_role === 'market_owner') {
      console.log('Fetching approved vendors for market owner:', user);
      fetchOwnerRequests();
    }
  }, [fetchOwnerRequests, user]);

  // Fetch vendor details (including avatar) for each unique vendorId
  useEffect(() => {
    const fetchVendorDetails = async () => {
      // Group approved requests by vendorId and collect initial data
      const vendorMap = new Map();
      ownerRequests?.forEach((request) => {
        if (request.status === 'approved') {
          const vendorId = request.vendorId;
          const vendorName = request.vendorName || 'Unknown Vendor';
          if (vendorMap.has(vendorId)) {
            const existing = vendorMap.get(vendorId);
            vendorMap.set(vendorId, {
              ...existing,
              totalListing: existing.totalListing + 1,
            });
          } else {
            vendorMap.set(vendorId, {
              vendorId,
              vendorName,
              totalListing: 1,
              status: 'Active',
            });
          }
        }
      });

      // Fetch avatar for each vendor
      const token = localStorage.getItem('token');
      const vendorDetailsPromises = Array.from(vendorMap.keys()).map(async (vendorId) => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/${vendorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { vendorId, avatar: response.data.avatar };
        } catch (err) {
          console.error(`Error fetching details for vendor ${vendorId}:`, err);
          return { vendorId, avatar: 'https://via.placeholder.com/150' }; // Fallback avatar
        }
      });

      const vendorDetails = await Promise.all(vendorDetailsPromises);

      // Update vendorMap with avatars
      vendorDetails.forEach(({ vendorId, avatar }) => {
        const vendor = vendorMap.get(vendorId);
        vendorMap.set(vendorId, { ...vendor, avatar });
      });

      // Convert Map to array of vendors
      const approvedVendors = Array.from(vendorMap.values()).map((vendor) => ({
        ...vendor,
        totalListing: vendor.totalListing.toString().padStart(2, '0'), // Format as '01', '02', etc.
      }));

      // Filter vendors by vendorName based on searchQuery
      const filtered = approvedVendors.filter((vendor) =>
        vendor.vendorName?.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
      );

      console.log('Approved vendors with avatars:', approvedVendors);
      console.log('Filtered vendors:', filtered);
      setFilteredVendors(filtered);
    };

    fetchVendorDetails();
  }, [ownerRequests, searchQuery]);

  if (!user || user.user_role !== 'market_owner') {
    return <div className="text-center p-4">Access denied: Market owners only.</div>;
  }

  if (loading) return <div className="text-center p-4">Loading vendors...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="lg:bg-gray-100 bg-white rounded-xl lg:px-10 pb-20 md:pb-5">
      <SearchPage />

      <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible mt-10">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 md:bg-gray-100 px-6 py-3 md:text-[12px] text-[8px] text-gray-500 uppercase tracking-wider rounded-t-lg sticky top-0 z-10">
            {['Vendor Id', 'Vendor Name', 'Total Listings', 'Status', 'View Details'].map((header, idx) => (
              <div key={idx} className="font-medium flex gap-2 items-center justify-center">
                <p>{header}</p>
                <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                    fill="#030229"
                  />
                </svg>
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-2">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor, index) => (
                <div
                  key={vendor.vendorId}
                  className="grid grid-cols-5 rounded-lg bg-white px-6 py-4 shadow-sm hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    #{vendor.vendorId}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img
                        src={vendor.avatar || 'https://via.placeholder.com/150'}
                        alt={vendor.vendorName}
                        className="h-full w-full object-cover"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                      />
                    </div>
                    <span className="text-sm text-gray-900">{vendor.vendorName}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-900">
                    {vendor.totalListing}
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-green-100 text-green-800">
                      {vendor.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link to={`/vendor/${vendor.vendorId}`}>
                      <button className="text-orange-500 hover:text-orange-700">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 col-span-5">
                No approved vendors match your search.
              </div>
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