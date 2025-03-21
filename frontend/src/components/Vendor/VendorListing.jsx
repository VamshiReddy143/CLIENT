import React, { useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import SearchPage from '../SearchPage';


const tabs = ['All', 'Active', 'Rejected', 'Invoices'];

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
  {
    id: '#876365',
    name: 'Retail Store',
    owner: {
      name: 'James Mulican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    },
    space: '500 sq. ft.',
    rental: '$1,466',
    type: 'Kiosk',
    rating: 5.0,
    status: 'Rejected',
    invoice: 'N/A',
  },
];

// Dummy invoice data for the "Invoices" tab
const invoices = [
  {
    invoiceId: '#INV001',
    listingId: '#876364',
    ownerName: 'James Mulican',
    amount: '$1,466',
    dueDate: '2025-04-01',
    status: 'Pending',
  },
  {
    invoiceId: '#INV002',
    listingId: '#876364',
    ownerName: 'James Mulican',
    amount: '$1,466',
    dueDate: '2025-03-15',
    status: 'Overdue',
  },
  {
    invoiceId: '#INV003',
    listingId: '#876364',
    ownerName: 'James Mulican',
    amount: '$1,466',
    dueDate: '2025-02-01',
    status: 'Paid',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('All');

  // Filter listings based on the active tab (not applied to "Invoices" tab)
  const filteredListings = listings.filter((listing) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Invoices') return false; // Invoices tab will use separate data
    return listing.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div id="nunito-text" className="lg:bg-gray-100 min-h-screen lg:px-10">
      <div className="relative">
        <SearchPage  />

        <div className="rounded-xl mt-20">
          <div className="fixed  bg-white z-10 md:static md:bg-transparent">
            <div id="nunito-text" className="flex gap-8 bg-white w-fit rounded-xl px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 relative ${activeTab === tab
                    ? 'text-orange-600 font-medium'
                    : 'text-gray-500'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-16 md:pt-0 max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
            {/* Conditionally render the listings table or the invoices table */}
            {activeTab !== 'Invoices' ? (
              <>
                <div className="flex items-center text-sm text-gray-500 ml-4 pb-4">
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Listing ID</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>

                  </div>
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Listing Name</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  <div className="min-w-[192px] max-w-[192px] gap-2 flex items-center">
                    <p>Owner Name</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Space Size</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Rental Price</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Property Type</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                    <p>Rating</p>
                    <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                    </svg>
                  </div>
                  {/* Show Invoices and Status only in "All" tab */}
                  {activeTab === 'All' && (
                    <>
                      <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                        <p>Invoices</p>
                        <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                        </svg>
                      </div>
                      <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                        <p>Status</p>
                        <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                        </svg>
                      </div>
                    </>
                  )}
                  {/* Show Details column with eye icon in "Active" and "Rejected" tabs */}
                  {(activeTab === 'Active' || activeTab === 'Rejected') && (
                    <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                      <p>Details</p>
                      <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z" fill="#030229" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredListings.length > 0 ? (
                    filteredListings.map((listing, index) => (
                      <div
                        key={index}
                        className="flex w-fit items-center py-4 text-sm bg-white border border-gray-200 rounded-lg px-4"
                      >
                        <div className="min-w-[128px] max-w-[128px] text-gray-900">{listing.id}</div>
                        <div className="min-w-[128px] max-w-[128px] text-gray-900">{listing.name}</div>
                        <div className="min-w-[192px] max-w-[192px] flex items-center gap-2">
                          <img
                            src={listing.owner.avatar}
                            alt={listing.owner.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-gray-900">{listing.owner.name}</span>
                        </div>
                        <div className="min-w-[128px] max-w-[128px] text-gray-500">{listing.space}</div>
                        <div className="min-w-[128px] max-w-[128px] text-gray-500">{listing.rental}</div>
                        <div className="min-w-[128px] max-w-[128px]">
                          <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                            {listing.type}
                          </span>
                        </div>
                        <div className="min-w-[128px] max-w-[128px] flex items-center gap-1">
                          <span className="text-gray-500">{listing.rating}.0</span>
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
                        {/* Show Invoices and Status only in "All" tab */}
                        {activeTab === 'All' && (
                          <>
                            <div className="min-w-[128px] max-w-[128px]">
                              <span
                                className={`${listing.invoice === 'Paid'
                                  ? 'text-green-600'
                                  : listing.invoice === 'See Invoice'
                                    ? 'text-blue-500'
                                    : 'text-gray-500 italic'
                                  }`}
                              >
                                {listing.invoice}
                              </span>
                            </div>
                            <div className="min-w-[128px] max-w-[128px]">
                              <span
                                className={`px-3 py-1 rounded-full text-sm italic ${listing.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : listing.status === 'Rejected'
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-blue-50 text-blue-700'
                                  }`}
                              >
                                {listing.status}
                              </span>
                            </div>
                          </>
                        )}
                        {/* Show Details with eye icon in "Active" and "Rejected" tabs */}
                        {(activeTab === 'Active' || activeTab === 'Rejected') && (
                          <div className="min-w-[128px] max-w-[128px]">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M28.188 18.934C28.576 19.406 28.77 19.641 28.77 20C28.77 20.359 28.576 20.594 28.188 21.066C26.768 22.79 23.636 26 20 26C16.364 26 13.232 22.79 11.812 21.066C11.424 20.594 11.23 20.359 11.23 20C11.23 19.641 11.424 19.406 11.812 18.934C13.232 17.21 16.364 14 20 14C23.636 14 26.768 17.21 28.188 18.934Z" fill="#FFD412" />
                              <path d="M20 23C21.6569 23 23 21.6569 23 20C23 18.3431 21.6569 17 20 17C18.3431 17 17 18.3431 17 20C17 21.6569 18.3431 23 20 23Z" fill="white" />
                            </svg>

                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No listings found for this status.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
               <div className='mt-10 flex flex-col gap-1 text-[#858585] '>
                <p>Marketplace Name : Downtown Vendor Hub</p>
                <p>MarketOwner&apos;s Name : John Doe</p>
                <p>Email Address: john@gmailcom</p>
                <p>Invoice Number : (INV-2025001)</p>
                <p>Invoice Date : 23 -2 -2025</p>
                <p>Due Date : 15 - 3 - 2025</p>
               </div>
               <div className='mt-10 flex flex-col gap-1 text-[#858585]'>
                <p>Vendor Name:  John Doe</p>
                <p>Vendor Contact Email : timothy@gmail.com</p>
                <p>Vendor Phone Number : +971-348-34345</p>
                <p>Vendor Business Address : XYZ</p>
               </div>

               <div className='mt-10'>
                <h1 className='mt-8 mb-8 text-[1.5rem] font-semibold '>Space Highlights</h1>
                <div className='flex gap-10 text-[#858585]'>
                  <div >
                    <p>Fully Furnished</p>
                    <p>300 sq. ft.</p>
                    <p>Near Metro</p>
                  </div>

                  <div>
                    <p>Prime Location</p>
                    <p>High Foot Traffic</p>
                    <p>Flexible Lease</p>
                  </div>

                  <div>
                    <p>Business-Friendly</p>
                    <p>Easy Booking</p>
                    <p>24/7 Security</p>
                  </div>
                </div>
               </div>

               <div className='flex items-center gap-5'>
                <h1 className='text-black mt-8 mb-8 text-[1.5rem] font-semibold '>Total Price</h1>
                <h1 className='text-[#EA7A39] text-[1.5rem] font-semibold '>$1,466</h1>
               </div>

               <div className='pb-10'>
               <button className='bg-[#EA7A39] text-white h-[48px] w-[224px] rounded-xl '>
                Pay Now
               </button>
               </div>
              </>
            )}
          </div>
          
        </div>
      </div>
      <div className="h-20 md:h-0"></div>

      {/* Inline CSS for scrollbars */}
      <style >{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f97316 #e5e7eb;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 20px;
          height: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }

        /* Force scrollbar visibility */
        .custom-scrollbar {
          -ms-overflow-style: scrollbar;
          overflow-y: hidden;
        }
      `}</style>


    </div>


  );
}






export default App;