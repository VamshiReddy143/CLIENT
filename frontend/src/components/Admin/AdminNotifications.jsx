import React from 'react';
import SearchPage from '../SearchPage';

function PendingRequests() {
  // Sample data for Pending Requests
  const pendingRequests = [
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    { requestId: '#876364', listingName: 'Retail Space', vendorName: 'Sarah Ahmed', marketOwner: 'Jhon Doe', spaceSize: '500 sq. ft.', propertyType: 'Kiosk', rentalPrice: '$146,660' },
    
  ];

  return (
    <div className="min-h-screen bg-gray-100 lg:px-10 pb-20 md:pb-3">
      <SearchPage />
      {/* Pending Requests Section */}
      <div className="mt-10 ">
        <h2 className="md:text-xl text-lg font-semibold  text-[#FF8126] mb-4">Pending Requests</h2>
        {/* Table with Horizontal Scroll on Mobile */}
        <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 px-4 text-sm text-gray-600 rounded-t-lg py-3 sticky top-0 z-10 ">
              <div>Request ID</div>
              <div>Listing Name</div>
              <div>Vendor Name</div>
              <div>Market Owner</div>
              <div>Space Size</div>
              <div>Property Type</div>
              <div>Rental Price</div>
              <div>Action</div>
            </div>
            {/* Request Rows */}
            {pendingRequests.map((request, index) => (
              <div
                key={index}
                className="grid grid-cols-8 items-center rounded-lg bg-white px-4 py-3 shadow-sm mt-2"
              >
                <div className="font-medium">{request.requestId}</div>
                <div>{request.listingName}</div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src={`https://images.unsplash.com/photo-1524492926121-4723520d78d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ4fHx8ZW58MHx8fHx8`}
                      alt={request.vendorName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm">{request.vendorName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src={`https://images.unsplash.com/photo-1484517186945-df8151a1a871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ3fHx8ZW58MHx8fHx8`}
                      alt={request.marketOwner}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm">{request.marketOwner}</span>
                </div>
                <div>{request.spaceSize}</div>
                <div>
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs">
                    {request.propertyType}
                  </span>
                </div>
                <div>{request.rentalPrice}</div>
                <div className="flex gap-2">
                  {/* Approve Button */}
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.51662 0.613575C9.88799 0.242695 10.3849 0.0244635 10.9092 0.00193531C11.4336 -0.0205929 11.9474 0.154219 12.3492 0.491881L12.4834 0.614625L14.4767 2.60684H17.2946C17.8237 2.60694 18.3333 2.80698 18.7212 3.16689C19.1092 3.52679 19.3468 4.01998 19.3864 4.54766L19.3927 4.70502V7.52287L21.386 9.51614C21.7572 9.88756 21.9756 10.3847 21.9981 10.9093C22.0207 11.4339 21.8457 11.9479 21.5077 12.3497L21.385 12.483L19.3917 14.4762V17.2941C19.3919 17.8234 19.1919 18.3333 18.832 18.7214C18.4721 19.1096 17.9787 19.3473 17.4509 19.387L17.2946 19.3923H14.4778L12.4845 21.3855C12.1131 21.7567 11.616 21.9751 11.0914 21.9977C10.5668 22.0202 10.0528 21.8452 9.6509 21.5072L9.51767 21.3855L7.5244 19.3923H4.7055C4.17616 19.3924 3.66631 19.1925 3.27816 18.8326C2.89002 18.4726 2.65227 17.9793 2.61257 17.4514L2.60732 17.2941V14.4762L0.614054 12.483C0.242881 12.1115 0.0244643 11.6145 0.00193389 11.0898C-0.0205965 10.5652 0.154397 10.0512 0.49236 9.64938L0.614054 9.51614L2.60732 7.52287V4.70502C2.60742 4.17586 2.80746 3.66627 3.16737 3.27835C3.52727 2.89043 4.02046 2.65283 4.54814 2.61314L4.7055 2.60684H7.52335L9.51662 0.613575Z"
                        fill="#79AFED"
                      />
                      <path
                        d="M15.5 7.5L10 13L7.5 10.5"
                        stroke="#79AFED"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {/* Reject Button */}
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <svg width="15" height="13" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.007 1.72046C13.4335 1.15142 12.6588 0.83148 11.851 0.830078H5.09586C4.69609 0.829898 4.30028 0.909168 3.93141 1.06328C3.56255 1.2174 3.22799 1.44328 2.94718 1.72781L2.88831 1.78668L0.621898 4.88461C0.335756 5.32892 0.183594 5.84622 0.183594 6.3747C0.183594 6.90318 0.335756 7.42048 0.621898 7.8648L2.82944 10.9333L2.88831 10.9995C3.16973 11.2827 3.50457 11.5072 3.8734 11.6601C4.24224 11.8129 4.63774 11.891 5.03699 11.8899H11.8068C12.6147 11.8885 13.3894 11.5686 13.9628 10.9995C14.246 10.7181 14.4706 10.3833 14.6234 10.0144C14.7762 9.64559 14.8544 9.25008 14.8532 8.85083V3.86913C14.8602 3.47296 14.789 3.0793 14.6438 2.71062C14.4986 2.34195 14.2822 2.00549 14.007 1.72046ZM11.1593 7.76178C11.2274 7.83039 11.2813 7.91174 11.318 8.0012C11.3547 8.09066 11.3734 8.18647 11.3731 8.28315C11.3727 8.37984 11.3533 8.47551 11.316 8.56471C11.2787 8.6539 11.2242 8.73488 11.1556 8.803C11.087 8.87113 11.0056 8.92508 10.9162 8.96176C10.8267 8.99844 10.7309 9.01715 10.6342 9.01681C10.5375 9.01647 10.4418 8.99708 10.3526 8.95977C10.2634 8.92245 10.1825 8.86793 10.1144 8.79932L8.71624 7.40121L7.32548 8.79197C7.25736 8.86057 7.17638 8.91509 7.08719 8.95241C6.99799 8.98973 6.90232 9.00911 6.80563 9.00945C6.70894 9.00979 6.61314 8.99109 6.52368 8.9544C6.43422 8.91772 6.35287 8.86377 6.28426 8.79565C6.21565 8.72752 6.16113 8.64654 6.12381 8.55735C6.0865 8.46815 6.06711 8.37248 6.06677 8.27579C6.06643 8.17911 6.08514 8.0833 6.12182 7.99384C6.15851 7.90438 6.21245 7.82303 6.28058 7.75442L7.67869 6.36366L6.28058 4.96555C6.14299 4.82699 6.06608 4.63944 6.06677 4.44418C6.06746 4.24891 6.14569 4.06191 6.28426 3.92432C6.42282 3.78674 6.61036 3.70983 6.80563 3.71052C7.0009 3.71121 7.1879 3.78944 7.32548 3.928L8.71624 5.31876L10.1144 3.92064C10.2519 3.78208 10.4389 3.70385 10.6342 3.70316C10.8295 3.70247 11.017 3.77938 11.1556 3.91697C11.2941 4.05455 11.3724 4.24155 11.3731 4.43682C11.3738 4.63208 11.2968 4.81963 11.1593 4.95819L9.76114 6.36366L11.1593 7.76178Z" fill="#FC572E" />
                    </svg>
                  </button>
                  {/* View Details Button */}
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z" fill="#F29339" />
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #f97316 transparent; /* Firefox */
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 8px; /* Horizontal scrollbar height */
          opacity: 0;
          transition: opacity 0.3s;
        }

        .custom-scrollbar:hover::-webkit-scrollbar {
          opacity: 1;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #f97316;
          border-radius: 10px;
          border: 2px solid transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #ea580c;
        }

        @media (min-width: 1024px) {
          .custom-scrollbar {
            overflow-x: visible !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PendingRequests;