import React from 'react';
import PropTypes from 'prop-types';
import VendorNavbar from './VendorNavbar';
import VendorMobileNavbar from './VendorMobileNavbar';

const VendorLayout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <div className="w-64 hidden lg:block  hidden lg:block bg-white shadow-md">
        <VendorNavbar />
      </div>

      <div className="w-full fixed bottom-0 lg:hidden bg-white shadow-md z-50">
        <VendorMobileNavbar />
      </div>

      <main className="flex-1 h-screen overflow-auto bg-gray-100 p-4">
        {children}
      </main>
    </div>
  );
};

VendorLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VendorLayout;
