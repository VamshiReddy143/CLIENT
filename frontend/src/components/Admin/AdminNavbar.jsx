// src/components/Navbar/AdminNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authSlice';

const AdminNavbar = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="space-x-6">
          <Link to="/admin" className="hover:underline">Home</Link>
          <Link to="/admin/users" className="hover:underline">Manage Users</Link>
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

export default AdminNavbar;