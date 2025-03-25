import React from 'react';
import PropTypes from 'prop-types';

import AdminNavbar from './AdminNavbar';
import AdminMobileNavbar from './AdminMobileNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="h-screen lg:bg-gray-100 bg-white  flex">
      <div className="w-64 hidden h-auto lg:block  hidden lg:block bg-white shadow-md">
        <AdminNavbar />
      </div>

      <div className="w-full fixed bottom-0 lg:hidden bg-white shadow-md z-50">
        <AdminMobileNavbar />
      </div>

      <main className="flex-1  overflow-auto lg:bg-gray-100 p-4">
        {children}
      </main>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
