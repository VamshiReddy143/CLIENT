// src/components/Navbar/MarketOwnerNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authSlice';

const MarketOwnerNavbar = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Market Owner Dashboard</h1>
        <div className="space-x-6">
          <Link to="/market-owner" className="hover:underline">Home</Link>
          <Link to="/market-owner/markets" className="hover:underline">My Markets</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MarketOwnerNavbar;