import React from 'react';
import SearchPage from '../SearchPage';

const vendorData = {
    name: 'Arora Guar',
    email: 'Timothy@gmail.com',
    phoneNumber: 'Timothy@gmail.com', // Note: The image shows an email here, but it should likely be a phone number
    property: {
        listingId: '#876364',
        propertyName: 'Retail Store',
        location: 'Cairo, Egypt',
        spaceSize: '500 sq.ft.',
        propertyType: 'Kiosk',
        rentalPrice: '$1,46,660',
        rentalRequest: true,
        status: 'Active',
    },
};

const VendorPropertyDetail = () => {
    return (
        <div className='lg:px-10'>
            <SearchPage />
            <div id="nunito-text"  className="bg-white  lg:mt-10 rounded-xl shadow-md p-6 min-h-screen">
                {/* Vendor Detail Section */}
                <div className="mb-6 mt-15 ">
                    <h2 className="text-lg font-semibold text-orange-500 mb-4">Vendor Detail</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Name</p>
                            <p className="text-sm text-gray-900 bg-gray-100 rounded-md px-4 py-3">
                                {vendorData.name}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Email</p>
                            <p className="text-sm text-gray-900 bg-gray-100 rounded-md px-4 py-3">
                                {vendorData.email}
                            </p>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Phone Number</p>
                            <p className="text-sm text-gray-900 bg-gray-100 rounded-md px-4 py-3">
                                {vendorData.phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Property Detail Section */}
                <div>
                    <h2 className="text-lg font-semibold text-orange-500 mb-4">Property Detail</h2>
                    <div className="overflow-x-auto custom-scrollbar lg:overflow-x-visible">
                        <div className="min-w-[900px]">
                            {/* Header Row */}
                            <div className="grid grid-cols-8 px-6 py-3 text-[10px] lg:text-[12px] text-gray-500 uppercase tracking-wider rounded-t-lg sticky top-0 z-10">
                                {[
                                    'Listing Id',
                                    'Property Name',
                                    'Location',
                                    'Space Size',
                                    'Property Type',
                                    'Rental Price',
                                    'Rental Request',
                                    'Status',
                                ].map((header, idx) => (
                                    <div key={idx} className="font-medium flex items-center justify-center">
                                        <p>{header}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Property Row */}
                            <div className="grid grid-cols-8 rounded-lg shadow-lg px-6 py-4 shadow-sm bg-gray-100">
                                <div className="flex items-center justify-center text-sm text-gray-900">
                                    {vendorData.property.listingId}
                                </div>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-full">
                                        <img
                                            src="https://via.placeholder.com/40"
                                            alt={vendorData.property.propertyName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-900">{vendorData.property.propertyName}</span>
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-900">
                                    {vendorData.property.location}
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-900">
                                    {vendorData.property.spaceSize}
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                                        {vendorData.property.propertyType}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-900">
                                    {vendorData.property.rentalPrice}
                                </div>
                                <div className="flex items-center justify-center">
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
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                        {vendorData.property.status}
                                    </span>
                                </div>
                            </div>
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
        </div>
    );
};

export default VendorPropertyDetail;