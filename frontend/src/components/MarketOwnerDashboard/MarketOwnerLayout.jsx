// src/components/MarketOwnerLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import MarketOwnerNavbar from './MarketOwnerNavbar';


const MarketOwnerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MarketOwnerNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

MarketOwnerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarketOwnerLayout;