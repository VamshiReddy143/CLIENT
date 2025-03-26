import React, { useEffect } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchPage from '../SearchPage';
import useMarketStore from '@/store/marketStore';
import useAuthStore from '@/store/authSlice';

const PROPERTY_PLACEHOLDER = "/pph.png"

const VendorDashboard = () => {
  const { requests, fetchRequests, loading, error } = useMarketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      console.log('Fetching requests for vendor:', user);
      fetchRequests();
    }
  }, [fetchRequests, user]);

  if (!user || user.user_role !== 'vendor') {
    return <div className="text-center p-4">Access denied: Vendors only.</div>;
  }
  if (loading) return <div className="text-center p-4">Loading dashboard...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  // Calculate stats
  const totalListings = requests?.length;
  const approvedRequests = requests?.filter((r) => r.status === 'approved').length;
  const rejectedRequests = requests?.filter((r) => r.status === 'rejected').length;
  const pendingRequests = requests?.filter((r) => r.status === 'pending');

  // Filter active (approved) requests for "Active Listing"
  const activeRequests = requests?.filter((r) => r.status === 'approved');



  return (
    <div className="bg-white lg:bg-gray-100 p-4 lg:px-10 mb-10 lg:mb-0 md:mb-0">
      <SearchPage />

      <div id="second" className="mt-10 grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-blue-100 p-4 rounded-full">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3754 0.0782767C13.9696 0.0782767 14.5629 0.162827 15.1269 0.353777C18.6026 1.49378 19.855 5.34128 18.8088 8.70428C18.2156 10.4228 17.2457 11.9913 15.9754 13.2728C14.157 15.0493 12.1616 16.6263 10.0137 17.9848L9.77825 18.1283L9.53341 17.9753C7.37794 16.6263 5.37124 15.0493 3.53594 13.2633C2.2741 11.9818 1.30325 10.4228 0.700579 8.70428C-0.363505 5.34128 0.888912 1.49378 4.40227 0.333827C4.67535 0.238827 4.95691 0.172327 5.23941 0.135277H5.35241C5.61702 0.0963267 5.87975 0.0782767 6.14341 0.0782767H6.24699C6.84025 0.0963267 7.41466 0.200827 7.97119 0.391777H8.02674C8.06441 0.409827 8.09266 0.429777 8.1115 0.447827C8.3196 0.515277 8.51641 0.591277 8.70475 0.695777L9.06258 0.857277C9.14904 0.9038 9.2461 0.974887 9.32998 1.03632C9.38312 1.07525 9.43097 1.1103 9.4675 1.13278C9.48286 1.14192 9.49848 1.15112 9.51423 1.16039C9.59497 1.20794 9.67908 1.25747 9.75 1.31233C10.7962 0.505777 12.0665 0.0687767 13.3754 0.0782767ZM15.8811 6.91742C16.2672 6.90697 16.5967 6.59442 16.625 6.19447V6.08142C16.6532 4.75047 15.8538 3.54492 14.6381 3.07942C14.252 2.94547 13.8282 3.15542 13.687 3.55442C13.5552 3.95342 13.7623 4.39042 14.1578 4.53197C14.7614 4.75997 15.1654 5.35942 15.1654 6.02347V6.05292C15.1475 6.27047 15.2125 6.48042 15.3443 6.64192C15.4762 6.80342 15.6739 6.89747 15.8811 6.91742Z" fill="#5B93FF" />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{totalListings}</h1>
            <h1 className="text-[10px] lg:text-[16px] md:text-[17px]">Total Listings</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-[#FFF7E1] p-4 rounded-full">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.26918 1.44286C7.63236 1.44286 7.09059 1.88539 6.93852 2.48184H12.0521C11.9 1.88539 11.3582 1.44286 10.7214 1.44286H8.26918ZM13.4967 2.48201H15.3787C17.3747 2.48201 19 4.12707 19 6.14731C19 6.14731 18.943 7.00255 18.924 8.19353C18.9221 8.28781 18.8764 8.38016 18.8013 8.43596C18.3442 8.77363 17.926 9.05261 17.8879 9.07185C16.3102 10.1301 14.4767 10.8747 12.5235 11.2451C12.3961 11.2701 12.2706 11.2037 12.206 11.0902C11.6585 10.1416 10.6358 9.524 9.49525 9.524C8.36228 9.524 7.33006 10.1349 6.76643 11.0844C6.70085 11.196 6.57729 11.2605 6.45087 11.2364C4.51381 10.8651 2.68034 10.1214 1.11206 9.08147L0.1996 8.44654C0.123562 8.39844 0.076038 8.31186 0.076038 8.21566C0.0475238 7.72503 0 6.14731 0 6.14731C0 4.12707 1.62531 2.48201 3.62131 2.48201H5.49375C5.67434 1.08708 6.84342 0 8.26913 0H10.7214C12.1471 0 13.3162 1.08708 13.4967 2.48201ZM18.677 10.2745L18.639 10.2937C16.719 11.5828 14.4093 12.439 11.9856 12.795C11.6435 12.8431 11.3013 12.6218 11.2062 12.2755C10.9971 11.4866 10.3223 10.9671 9.5144 10.9671H9.50489H9.48588C8.67798 10.9671 8.00314 11.4866 7.79404 12.2755C7.69899 12.6218 7.35682 12.8431 7.01465 12.795C4.59094 12.439 2.28128 11.5828 0.361321 10.2937C0.351816 10.2841 0.256769 10.2264 0.18073 10.2745C0.0951877 10.3226 0.0951877 10.438 0.0951877 10.438L0.161721 15.3443C0.161721 17.3646 1.77753 19 3.77353 19H15.2172C17.2132 19 18.8291 17.3646 18.8291 15.3443L18.9051 10.438C18.9051 10.438 18.9051 10.3226 18.8195 10.2745C18.772 10.2456 18.715 10.2552 18.677 10.2745ZM10.2082 14.3053C10.2082 14.7094 9.89455 15.0268 9.49535 15.0268C9.10565 15.0268 8.78249 14.7094 8.78249 14.3053V13.0643C8.78249 12.6699 9.10565 12.3428 9.49535 12.3428C9.89455 12.3428 10.2082 12.6699 10.2082 13.0643V14.3053Z" fill="#FFD66B" />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{approvedRequests}</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Approved Requests</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-[#FFF4F1] p-4 rounded-full">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.26918 1.44286C7.63236 1.44286 7.09059 1.88539 6.93852 2.48184H12.0521C11.9 1.88539 11.3582 1.44286 10.7214 1.44286H8.26918ZM13.4967 2.48201H15.3787C17.3747 2.48201 19 4.12707 19 6.14731C19 6.14731 18.943 7.00255 18.924 8.19353C18.9221 8.28781 18.8764 8.38016 18.8013 8.43596C18.3442 8.77363 17.926 9.05261 17.8879 9.07185C16.3102 10.1301 14.4767 10.8747 12.5235 11.2451C12.3961 11.2701 12.2706 11.2037 12.206 11.0902C11.6585 10.1416 10.6358 9.524 9.49525 9.524C8.36228 9.524 7.33006 10.1349 6.76643 11.0844C6.70085 11.196 6.57729 11.2605 6.45087 11.2364C4.51381 10.8651 2.68034 10.1214 1.11206 9.08147L0.1996 8.44654C0.123562 8.39844 0.076038 8.31186 0.076038 8.21566C0.0475238 7.72503 0 6.14731 0 6.14731C0 4.12707 1.62531 2.48201 3.62131 2.48201H5.49375C5.67434 1.08708 6.84342 0 8.26913 0H10.7214C12.1471 0 13.3162 1.08708 13.4967 2.48201ZM18.677 10.2745L18.639 10.2937C16.719 11.5828 14.4093 12.439 11.9856 12.795C11.6435 12.8431 11.3013 12.6218 11.2062 12.2755C10.9971 11.4866 10.3223 10.9671 9.5144 10.9671H9.50489H9.48588C8.67798 10.9671 8.00314 11.4866 7.79404 12.2755C7.69899 12.6218 7.35682 12.8431 7.01465 12.795C4.59094 12.439 2.28128 11.5828 0.361321 10.2937C0.351816 10.2841 0.256769 10.2264 0.18073 10.2745C0.0951877 10.3226 0.0951877 10.438 0.0951877 10.438L0.161721 15.3443C0.161721 17.3646 1.77753 19 3.77353 19H15.2172C17.2132 19 18.8291 17.3646 18.8291 15.3443L18.9051 10.438C18.9051 10.438 18.9051 10.3226 18.8195 10.2745C18.772 10.2456 18.715 10.2552 18.677 10.2745ZM10.2082 14.3053C10.2082 14.7094 9.89455 15.0268 9.49535 15.0268C9.10565 15.0268 8.78249 14.7094 8.78249 14.3053V13.0643C8.78249 12.6699 9.10565 12.3428 9.49535 12.3428C9.89455 12.3428 10.2082 12.6699 10.2082 13.0643V14.3053Z" fill="#FF8F6B" />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{rejectedRequests}</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Rejected Requests</h1>
          </div>
        </div>

        <div className="lg:h-[110px] bg-white rounded-xl lg:p-3 flex items-center lg:gap-4 gap-4">
          <div className="flex items-center bg-red-100 p-4 rounded-full">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.26918 1.44286C7.63236 1.44286 7.09059 1.88539 6.93852 2.48184H12.0521C11.9 1.88539 11.3582 1.44286 10.7214 1.44286H8.26918ZM13.4967 2.48201H15.3787C17.3747 2.48201 19 4.12707 19 6.14731C19 6.14731 18.943 7.00255 18.924 8.19353C18.9221 8.28781 18.8764 8.38016 18.8013 8.43596C18.3442 8.77363 17.926 9.05261 17.8879 9.07185C16.3102 10.1301 14.4767 10.8747 12.5235 11.2451C12.3961 11.2701 12.2706 11.2037 12.206 11.0902C11.6585 10.1416 10.6358 9.524 9.49525 9.524C8.36228 9.524 7.33006 10.1349 6.76643 11.0844C6.70085 11.196 6.57729 11.2605 6.45087 11.2364C4.51381 10.8651 2.68034 10.1214 1.11206 9.08147L0.1996 8.44654C0.123562 8.39844 0.076038 8.31186 0.076038 8.21566C0.0475238 7.72503 0 6.14731 0 6.14731C0 4.12707 1.62531 2.48201 3.62131 2.48201H5.49375C5.67434 1.08708 6.84342 0 8.26913 0H10.7214C12.1471 0 13.3162 1.08708 13.4967 2.48201ZM18.677 10.2745L18.639 10.2937C16.719 11.5828 14.4093 12.439 11.9856 12.795C11.6435 12.8431 11.3013 12.6218 11.2062 12.2755C10.9971 11.4866 10.3223 10.9671 9.5144 10.9671H9.50489H9.48588C8.67798 10.9671 8.00314 11.4866 7.79404 12.2755C7.69899 12.6218 7.35682 12.8431 7.01465 12.795C4.59094 12.439 2.28128 11.5828 0.361321 10.2937C0.351816 10.2841 0.256769 10.2264 0.18073 10.2745C0.0951877 10.3226 0.0951877 10.438 0.0951877 10.438L0.161721 15.3443C0.161721 17.3646 1.77753 19 3.77353 19H15.2172C17.2132 19 18.8291 17.3646 18.8291 15.3443L18.9051 10.438C18.9051 10.438 18.9051 10.3226 18.8195 10.2745C18.772 10.2456 18.715 10.2552 18.677 10.2745ZM10.2082 14.3053C10.2082 14.7094 9.89455 15.0268 9.49535 15.0268C9.10565 15.0268 8.78249 14.7094 8.78249 14.3053V13.0643C8.78249 12.6699 9.10565 12.3428 9.49535 12.3428C9.89455 12.3428 10.2082 12.6699 10.2082 13.0643V14.3053Z" fill="#FF6B35" />
            </svg>
          </div>
          <div id="nunito-text" className="flex flex-col gap-1 items-start">
            <h1 className="font-bold lg:text-[20.9px] font-800 leading-[100%]">{pendingRequests?.length}</h1>
            <h1 className="text-[10px] lg:text-[17px] md:text-[17px]">Pending Requests</h1>
          </div>
        </div>
      </div>

      <div id="nunito-text" className="lg:w-[691px] bg-white rounded-xl lg:p-4 mt-10">
        <h1 className="font-bold lg:text-[18px] mb-5">Active Listing</h1>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {activeRequests?.length > 0 ? (
            activeRequests.slice(0, 2).map((request, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-sm p-4 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[100px] h-[100px] flex-shrink-0">
                    <img
                      src={request.images?.[0] || PROPERTY_PLACEHOLDER}
                      alt={request.marketName}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => (e.target.src = PROPERTY_PLACEHOLDER)}
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/market/${request.marketId}`}
                      className="text-lg font-semibold text-gray-800 hover:text-orange-500 transition-colors"
                    >
                      {request.marketName}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{request.location || 'Location not specified'}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-orange-500">${request.rentalPrice}</span>
                      <Link
                        to={`/market/${request.marketId}`}
                        className="text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center gap-1"
                      >
                        View
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 col-span-2">No active listings found.</div>
          )}
        </div>
      </div>

      <div id="nunito-text" className="bg-white rounded-xl py-8 mt-10 lg:mb-10">
        <div className="p-5">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">Pending Request</h1>

          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y divide-white">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Request ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Market Owner
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Listing Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Space Size
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Property Type
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                      Rental Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-white">
                  {pendingRequests?.length > 0 ? (
                    pendingRequests.map((request, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{request.requestId}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.ownerName || 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.marketName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.spaceSize} sq. ft.
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-orange-100 text-orange-500">
                            {request.propertyType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${request.rentalPrice}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No pending requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <style>{`
          .custom-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: thin; /* Firefox */
            scrollbar-color: #f97316 transparent; /* Firefox */
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 10px; /* Height of the horizontal scrollbar */
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; /* Background of the track */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #f97316; /* Orange color for the thumb */
            border-radius: 10px; /* Rounded edges */
            border: 2px solid transparent; /* Optional: adds padding effect */
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #ea580c; /* Slightly darker orange on hover */
          }
          @media (min-width: 1024px) {
            .custom-scrollbar {
              overflow-x: hidden; /* Hide scrollbar on larger screens */
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VendorDashboard;