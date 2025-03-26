import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PROFILE_PLACEHOLDER= "/ph.png"
const PROPERT_PLACEHOLDER="/pph.png"

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [vendorResponse, listingsResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/user/${vendorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3000/api/user/${vendorId}/listings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        console.log('Listings:', listingsResponse.data);
        setVendor(vendorResponse.data);
        setListings(listingsResponse.data);
      } catch (err) {
        console.error('Fetch Error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to fetch vendor data');
      } finally {
        setLoading(false);
      }
    };
    fetchVendorData();
  }, [vendorId]);

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    if (!str) return 'N/A'; // Handle null or undefined
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!vendor) return <div className="text-center p-4">Vendor not found</div>;


  const approvedRequests = listings.filter((listing) => listing.status.toLowerCase() === 'approved').length;
 

  // Capitalize the vendor's name
  const capitalizedName = capitalizeFirstLetter(vendor.name);

  return (
    <div className="p-6 bg-white rounded-xl lg:shadow-md max-w-7xl mx-auto mt-10">
      {/* Profile Picture and Name */}
      <div className="flex items-center gap-6 mb-8">
        {vendor.avatar && (
          <div className="flex-shrink-0">
            <img
              src={vendor.avatar || PROFILE_PLACEHOLDER}
              alt={`${capitalizedName}'s avatar`}
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
              onError={(e) => (e.target.src = PROFILE_PLACEHOLDER)}
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{capitalizedName}'s Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Vendor ID: {vendor.id}</p>
        </div>
      </div>

      {/* Personal Information Section */}
      <h2 className="text-xl font-semibold text-orange-500 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="w-full bg-gray-100 px-4 py-2 rounded-lg text-gray-900">
            {capitalizedName || 'N/A'}
          </div>
        </div>
      </div>

      {/* Rental Requests Section */}
      <h2 className="text-xl font-semibold text-orange-500 mb-4">Rental Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Approved Request</label>
          <div className="w-full bg-gray-100 px-4 py-2 rounded-lg text-gray-900">
            {approvedRequests.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <h2 className="text-xl font-semibold text-orange-500 mb-4">Property Details</h2>
      {listings.length === 0 ? (
        <p className="text-gray-500">No approved markets found for this vendor.</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-700 bg-gray-100 p-4 rounded-lg">
            <div className="col-span-1">Listing ID</div>
            <div className="col-span-1">Property Name</div>
            <div className="col-span-1">Location</div>
            <div className="col-span-1">Space Size</div>
            <div className="col-span-1">Property Type</div>
            <div className="col-span-1">Rental Price</div>
            <div className="col-span-1">Status</div>
          </div>
          {listings.map((listing) => {
            const imageSrc = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://via.placeholder.com/50';
            return (
              <div
                key={listing.requestId}
                className="grid grid-cols-7 gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm text-sm text-gray-900"
              >
                <div className="col-span-1">#{listing.requestId}</div>
                <div className="col-span-1 flex items-center gap-2">
                  <img
                    src={imageSrc || PROPERT_PLACEHOLDER}
                    alt={`${listing.marketName} image`}
                    className="w-10 h-10 rounded-md object-cover"
                    onError={(e) => (e.target.src = PROPERT_PLACEHOLDER)}
                  />
                  <span>{listing.marketName}</span>
                </div>
                <div className="col-span-1">{listing.location || 'N/A'}</div>
                <div className="col-span-1">{listing.spaceSize || 'N/A'} sq.ft</div>
                <div className="col-span-1">{listing.propertyType || 'N/A'}</div>
                <div className="col-span-1">${listing.rentalPrice || 'N/A'}</div>
                <div className="col-span-1">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      listing.status.toLowerCase() === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {listing.status === 'approved' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VendorProfile;