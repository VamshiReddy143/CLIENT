import React from 'react';
import SearchPage from '../SearchPage';

const listings = [
  {
    id: '#876364',
    name: 'Retail Store',
    owner: {
      name: 'James Mullican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    },
    spaceSize: '500 sq. ft.',
    rentalPrice: '$1,466',
    status: 'Pending',
  },
  {
    id: '#876365',
    name: 'Food Truck',
    owner: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    },
    spaceSize: '200 sq. ft.',
    rentalPrice: '$800',
    status: 'Active',
  },
  {
    id: '#876366',
    name: 'Pop-up Shop',
    owner: {
      name: 'Mike Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    },
    spaceSize: '300 sq. ft.',
    rentalPrice: '$1,000',
    status: 'Pending',
  },
  {
    id: '#876367',
    name: 'Retail Store',
    owner: {
      name: 'James Mullican',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80',
    },
    spaceSize: '500 sq. ft.',
    rentalPrice: '$1,466',
    status: 'Pending',
  },
];

function App() {
  return (
    <div className="min-h-screen lg:bg-gray-100 lg:px-10">
      <SearchPage />
      <div className="rounded-lg mt-10 mobile-scrollbar">
        {/* Table Header */}
        <div className="flex items-center text-sm  text-gray-500 px-6 py-3 sticky top-0 z-10 ">
          <div className="lg:min-w-[178px]   max-w-[177px] flex lg:gap-2 gap-20 items-center uppercase text-xs font-medium">
            <p>Listing Id</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Listing Name</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="lg:min-w-[240px] min-w-[192px] max-w-[192px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Owner Name</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Space Size</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Rental Price</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Status</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
          <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center uppercase text-xs font-medium">
            <p>Action</p>
            <svg width="6" height="5" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.7">
                <path
                  d="M2.4345 4.81539C2.4055 4.78714 2.2815 4.68047 2.1795 4.5811C1.538 3.99854 0.488 2.47881 0.1675 1.68339C0.116 1.56259 0.007 1.25718 0 1.09401C0 0.937652 0.036 0.788602 0.109 0.646371C0.211 0.46907 0.3715 0.326839 0.561 0.248904C0.6925 0.198734 1.086 0.120799 1.093 0.120799C1.5235 0.0428641 2.223 0 2.996 0C3.7325 0 4.4035 0.0428641 4.8405 0.106673C4.8475 0.11398 5.3365 0.191914 5.504 0.277155C5.81 0.433512 6 0.738919 6 1.06576V1.09401C5.9925 1.30687 5.8025 1.75451 5.7955 1.75451C5.4745 2.50706 4.476 3.99172 3.8125 4.58841C3.8125 4.58841 3.642 4.75645 3.5355 4.82952C3.3825 4.9435 3.193 5 3.0035 5C2.792 5 2.595 4.93619 2.4345 4.81539Z"
                  fill="#030229"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-4 p-4">
          {listings.map((listing, index) => (
            <div
              key={index}
              className="flex w-fit lg:w-full items-center py-4 text-sm bg-white rounded-lg px-4"
            >
              <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] text-gray-900">{listing.id}</div>
              <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] text-gray-900">{listing.name}</div>
              <div className="lg:min-w-[240px] min-w-[192px] max-w-[192px] flex items-center gap-2">
                <img
                  src={listing.owner.avatar}
                  alt={listing.owner.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-900">{listing.owner.name}</span>
              </div>
              <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px] text-gray-500">{listing.spaceSize}</div>
              <div className=" lg:min-w-[178px] min-w-[128px] max-w-[128px] text-gray-500">{listing.rentalPrice}</div>
              <div className="lg:min-w-[178px] min-w-[128px] max-w-[128px]">
                <span
                  className={`px-3 py-1 text-sm rounded-full italic ${
                    listing.status === 'Pending'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  {listing.status}
                </span>
              </div>
              <div className="min-w-[128px] max-w-[128px]">
                <button className="text-yellow-500 hover:text-yellow-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollbar Styling for Mobile Only */}
      <style>{`
        .mobile-scrollbar {
          overflow-y: auto;
          border-radius: 8px;
        }

        /* Mobile view (max-width: 768px) */
        @media (max-width: 768px) {
          .mobile-scrollbar {
            max-height: 400px;
            scrollbar-width: thin;
            scrollbar-color: #f97316 #e5e7eb;
          }

          .mobile-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .mobile-scrollbar::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }

          .mobile-scrollbar::-webkit-scrollbar-thumb {
            background: #f97316;
            border-radius: 4px;
            min-height: 40px;
          }

          .mobile-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #ea580c;
          }

          .mobile-scrollbar {
            -ms-overflow-style: scrollbar;
            overflow-y: scroll;
            scroll-behavior: smooth;
          }
        }

        /* Larger screens: Default browser scrollbar */
        @media (min-width: 769px) {
          .mobile-scrollbar {
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default App;