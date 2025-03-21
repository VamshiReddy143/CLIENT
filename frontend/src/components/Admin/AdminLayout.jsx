// src/components/AdminLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AdminNavbar from './AdminNavbar';


const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;