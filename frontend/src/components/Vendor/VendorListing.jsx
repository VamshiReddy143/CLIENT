import React, { useState } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';

const tabs = ['All', 'Active', 'Rejected', 'Pending'];

const listings = [
  {
    id: '#876364',
    name: 'Retail Store',
    owner: {
      name: 'James Mulican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    },
    space: '500 sq. ft.',
    rental: '$1,466',
    type: 'Kiosk',
    rating: 5.0,
    status: 'Pending',
    invoice: 'Pending',
  },
  {
    id: '#876364',
    name: 'Retail Store',
    owner: {
      name: 'James Mulican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    },
    space: '500 sq. ft.',
    rental: '$1,466',
    type: 'Kiosk',
    rating: 5.0,
    status: 'Pending',
    invoice: 'See Invoice',
  },
  {
    id: '#876364',
    name: 'Retail Store',
    owner: {
      name: 'James Mulican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    },
    space: '500 sq. ft.',
    rental: '$1,466',
    type: 'Kiosk',
    rating: 5.0,
    status: 'Active',
    invoice: 'Paid',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Listing</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search anything"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">Timothy</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <div className="flex gap-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 relative ${
                    activeTab === tab
                      ? 'text-blue-500 font-medium'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center text-sm text-gray-500 border-b pb-4">
              <div className="w-32">Listing Id <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Listing Name <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-48">Owner Name <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Space Size <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Rental Price <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Property Type <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Rating <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Invoices <ChevronDown className="inline w-4 h-4" /></div>
              <div className="w-32">Status <ChevronDown className="inline w-4 h-4" /></div>
            </div>

            <div className="divide-y">
              {listings.map((listing, index) => (
                <div key={index} className="flex items-center py-4 text-sm">
                  <div className="w-32 text-gray-900">{listing.id}</div>
                  <div className="w-32 text-gray-900">{listing.name}</div>
                  <div className="w-48 flex items-center gap-2">
                    <img
                      src={listing.owner.avatar}
                      alt={listing.owner.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-900">{listing.owner.name}</span>
                  </div>
                  <div className="w-32 text-gray-500">{listing.space}</div>
                  <div className="w-32 text-gray-500">{listing.rental}</div>
                  <div className="w-32">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                      {listing.type}
                    </span>
                  </div>
                  <div className="w-32 flex items-center gap-1">
                    <span className="text-gray-500">{listing.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="w-32">
                    <span
                      className={`${
                        listing.invoice === 'Paid'
                          ? 'text-green-600'
                          : listing.invoice === 'See Invoice'
                          ? 'text-blue-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {listing.invoice}
                    </span>
                  </div>
                  <div className="w-32">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        listing.status === 'Active'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;