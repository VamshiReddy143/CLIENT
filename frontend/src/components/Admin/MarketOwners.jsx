import React, { useState, useEffect } from 'react';
import SearchPage from '../SearchPage';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '@/store/authSlice';

function OwnersTable() {
  const [owners, setOwners] = useState([]);
  const [ownersLoading, setOwnersLoading] = useState(false);
  const [ownersError, setOwnersError] = useState(null);
  const { user } = useAuthStore();

  // Fetch all market owners with their listings count
  useEffect(() => {
    const fetchOwners = async () => {
      setOwnersLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get('http://localhost:3000/api/users', {
          params: { user_role: 'market_owner' },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setOwners(response.data);
        setOwnersLoading(false);
      } catch (err) {
        setOwnersError(err.message || 'Failed to fetch owners');
        setOwnersLoading(false);
      }
    };
    fetchOwners();
  }, []);

  // Define columns
  const columns = ['Owner ID', 'Owner Name', 'Total Listings', 'Status', 'View Details'];

  return (
    <div className="min-h-screen lg:bg-gray-100 px-4 lg:px-10 pb-20 md:pb-3">
      <SearchPage />
      <div className="mt-13">
        {/* Static Header (No Tabs) */}
        <div className="bg-white w-fit p-3 rounded-xl mb-6">
          <h2 className="font-medium text-orange-500 border-b-2 border-orange-500 pb-2">
            Market Owners
          </h2>
        </div>

        {/* Table with Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
          <div className="min-w-[700px]">
            {/* Header Row */}
            <div className="grid grid-cols-5 px-4 text-sm text-gray-500 rounded-t-lg py-3 sticky top-0 z-10 bg-white">
              {columns.map((header, idx) => (
                <div key={idx} className="font-medium flex gap-2 items-center">
                  <p>{header}</p>
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Rows */}
            {ownersLoading ? (
              <div className="text-center py-6 text-gray-500">Loading...</div>
            ) : ownersError ? (
              <div className="text-center py-6 text-red-500">{ownersError}</div>
            ) : owners.length > 0 ? (
              owners.map((owner) => (
                <div
                  key={owner.id}
                  className="grid grid-cols-5 items-center rounded-lg bg-white px-4 py-3 shadow-sm hover:bg-gray-50 mt-2"
                >
                  <Link to={`/admin/owner/${owner.id}`} className="text-sm">
                    #{owner.id}
                  </Link>
                  <Link to={`/admin/owner/${owner.id}`} className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <img
                        src={owner.avatar || 'https://media.istockphoto.com/id/512830984/photo/icon-man-on-a-white-background-3d-render.jpg?s=1024x1024&w=is&k=20&c=gywzOSiM5XZ-MrggZpDY2slglWuQuMIqQQ8ruz144vI='}
                        alt={owner.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm">{owner.name}</span>
                  </Link>
                  <div className="text-sm">{owner.total_listings}</div>
                  <div className="text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                      Active
                    </span>
                  </div>
                  <div>
                    <Link to={`/admin/owner/${owner.id}`}>
                      <button className="rounded-full p-1 hover:bg-gray-100">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z" fill="#F29339" />
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No market owners available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnersTable;