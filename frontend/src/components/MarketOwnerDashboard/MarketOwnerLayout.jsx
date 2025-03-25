import React from 'react';
import PropTypes from 'prop-types';

import MarketOwnerNavbar from './MarketOwnerNavbar';
import MOmobileNavbar from './MOmobileNavbar';

const MarketOwnerLayout = ({ children }) => {
  return (
    <div className="h-[100vh] flex">
      <div className="w-64 h-screen hidden lg:block   bg-white shadow-md">
        <MarketOwnerNavbar />
      </div>

      <div className="w-full fixed bottom-0 lg:hidden block bg-white shadow-md z-50">
        <MOmobileNavbar />
      </div>

      <main className="flex-1 mb-20 lg:mb-5 md:pb-20  overflow-auto lg:bg-gray-100 p-4">
        {children}
      </main>
    </div>
  );
};

MarketOwnerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarketOwnerLayout;
