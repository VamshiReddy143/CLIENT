import React, { useEffect } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import SearchPage from '../SearchPage';
import useMarketStore from '@/store/marketStore';
import useAuthStore from '@/store/authSlice';

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

  // Default image
  const defaultImage = 'https://images.unsplash.com/photo-1466112928291-0903b80a9466?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D';

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
        <div className="lg:flex grid lg:gap-15 gap-5">
          {activeRequests?.length > 0 ? (
            activeRequests.slice(0, 2).map((request, index) => (
              <div key={index} className="flex gap-5 mb-4 lg:mb-0">
                <div className="lg:w-[150px] lg:h-[120px] h-[100px] w-[200px] object-cover">
                  <img
                    src={request.images?.[0] || defaultImage}
                    alt={request.marketName}
                    className="lg:w-full lg:h-full w-[150px] h-[120px] object-cover rounded-xl"
                    onError={(e) => (e.target.src = defaultImage)}
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-full w-[50%]">
                  {/* Wrap marketName in a Link to navigate to the market details page */}
                  <Link
                    to={`/market/${request.marketId}`} // Adjust the route as per your app's structure
                    className="w-full text-[15px] text-gray-900 hover:text-orange-500 transition-colors"
                  >
                    {request.marketName}
                  </Link>
                  <svg width="80" height="14" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7899 8.27345C11.6054 8.44914 11.5206 8.70322 11.5627 8.9524L12.196 12.3962C12.2494 12.6881 12.1241 12.9834 11.8754 13.1521C11.6318 13.3271 11.3076 13.3481 11.0419 13.2081L7.88666 11.5912C7.77695 11.5338 7.65513 11.503 7.53046 11.4995H7.33739C7.27043 11.5093 7.20489 11.5303 7.14504 11.5625L3.98908 13.1871C3.83306 13.2641 3.65639 13.2914 3.48327 13.2641C3.06153 13.1857 2.78013 12.7909 2.84923 12.3745L3.48327 8.9307C3.5253 8.67942 3.44053 8.42394 3.25601 8.24545L0.683512 5.79561C0.468365 5.59053 0.393563 5.28255 0.491875 5.00467C0.587337 4.72748 0.83098 4.5252 1.1252 4.4797L4.66587 3.97503C4.93516 3.94774 5.17168 3.78675 5.29279 3.54876L6.85296 0.405973C6.89 0.335978 6.93773 0.271582 6.99544 0.216986L7.05955 0.167989C7.09304 0.131591 7.13151 0.101493 7.17425 0.0769949L7.2519 0.0489967L7.37301 0H7.67294C7.9408 0.0272982 8.17661 0.184788 8.29986 0.419972L9.88069 3.54876C9.99467 3.77765 10.2162 3.93654 10.472 3.97503L14.0126 4.4797C14.3119 4.5217 14.5619 4.72468 14.6609 5.00467C14.7543 5.28535 14.6738 5.59333 14.4543 5.79561L11.7899 8.27345Z" fill="#FFD66B" />
                    <path d="M27.9384 8.27345C27.7539 8.44914 27.6691 8.70322 27.7111 8.9524L28.3444 12.3962C28.3979 12.6881 28.2725 12.9834 28.0239 13.1521C27.7802 13.3271 27.4561 13.3481 27.1903 13.2081L24.0351 11.5912C23.9254 11.5338 23.8036 11.503 23.6789 11.4995H23.4858C23.4189 11.5093 23.3533 11.5303 23.2935 11.5625L20.1375 13.1871C19.9815 13.2641 19.8048 13.2914 19.6317 13.2641C19.21 13.1857 18.9286 12.7909 18.9977 12.3745L19.6317 8.9307C19.6737 8.67942 19.589 8.42394 19.4045 8.24545L16.8319 5.79561C16.6168 5.59053 16.542 5.28255 16.6403 5.00467C16.7358 4.72748 16.9794 4.5252 17.2736 4.4797L20.8143 3.97503C21.0836 3.94774 21.3201 3.78675 21.4412 3.54876L23.0014 0.405973C23.0384 0.335978 23.0862 0.271582 23.1439 0.216986L23.208 0.167989C23.2415 0.131591 23.2799 0.101493 23.3227 0.0769949L23.4003 0.0489967L23.5215 0H23.8214C24.0892 0.0272982 24.325 0.184788 24.4483 0.419972L26.0291 3.54876C26.1431 3.77765 26.3647 3.93654 26.6204 3.97503L30.1611 4.4797C30.4603 4.5217 30.7104 4.72468 30.8094 5.00467C30.9027 5.28535 30.8222 5.59333 30.6028 5.79561L27.9384 8.27345Z" fill="#FFD66B" />
                    <path d="M44.0907 8.27345C43.9062 8.44914 43.8214 8.70322 43.8635 8.9524L44.4968 12.3962C44.5502 12.6881 44.4248 12.9834 44.1762 13.1521C43.9326 13.3271 43.6084 13.3481 43.3427 13.2081L40.1874 11.5912C40.0777 11.5338 39.9559 11.503 39.8312 11.4995H39.6382C39.5712 11.5093 39.5057 11.5303 39.4458 11.5625L36.2899 13.1871C36.1338 13.2641 35.9572 13.2914 35.7841 13.2641C35.3623 13.1857 35.0809 12.7909 35.15 12.3745L35.7841 8.9307C35.8261 8.67942 35.7413 8.42394 35.5568 8.24545L32.9843 5.79561C32.7691 5.59053 32.6943 5.28255 32.7927 5.00467C32.8881 4.72748 33.1318 4.5252 33.426 4.4797L36.9666 3.97503C37.2359 3.94774 37.4725 3.78675 37.5936 3.54876L39.1537 0.405973C39.1908 0.335978 39.2385 0.271582 39.2962 0.216986L39.3603 0.167989C39.3938 0.131591 39.4323 0.101493 39.475 0.0769949L39.5527 0.0489967L39.6738 0H39.9737C40.2416 0.0272982 40.4774 0.184788 40.6006 0.419972L42.1815 3.54876C42.2955 3.77765 42.517 3.93654 42.7728 3.97503L46.3134 4.4797C46.6126 4.5217 46.8627 4.72468 46.9617 5.00467C47.055 5.28535 46.9745 5.59333 46.7551 5.79561L44.0907 8.27345Z" fill="#FFD66B" />
                    <path d="M60.2392 8.27345C60.0546 8.44913 59.9699 8.70322 60.0119 8.9524L60.6452 12.3962C60.6987 12.6881 60.5733 12.9834 60.3246 13.1521C60.081 13.3271 59.7569 13.3481 59.4911 13.2081L56.3359 11.5912C56.2262 11.5338 56.1043 11.503 55.9797 11.4995H55.7866C55.7196 11.5093 55.6541 11.5303 55.5943 11.5625L52.4383 13.1871C52.2823 13.2641 52.1056 13.2914 51.9325 13.2641C51.5107 13.1857 51.2293 12.7909 51.2984 12.3745L51.9325 8.9307C51.9745 8.67942 51.8897 8.42394 51.7052 8.24545L49.1327 5.79561C48.9176 5.59053 48.8428 5.28255 48.9411 5.00467C49.0366 4.72748 49.2802 4.5252 49.5744 4.4797L53.1151 3.97503C53.3844 3.94774 53.6209 3.78675 53.742 3.54876L55.3022 0.405973C55.3392 0.335978 55.387 0.271582 55.4447 0.216985L55.5088 0.167989C55.5423 0.131591 55.5807 0.101493 55.6235 0.0769949L55.7011 0.0489967L55.8222 0H56.1222C56.39 0.0272982 56.6258 0.184788 56.7491 0.419972L58.3299 3.54876C58.4439 3.77765 58.6654 3.93654 58.9212 3.97503L62.4619 4.4797C62.7611 4.5217 63.0111 4.72468 63.1102 5.00467C63.2035 5.28535 63.123 5.59333 62.9036 5.79561L60.2392 8.27345Z" fill="#FFD66B" />
                    <path opacity="0.4" d="M76.3915 8.27345C76.207 8.44914 76.1222 8.70322 76.1642 8.9524L76.7976 12.3962C76.851 12.6881 76.7256 12.9834 76.477 13.1521C76.2333 13.3271 75.9092 13.3481 75.6435 13.2081L72.4882 11.5912C72.3785 11.5338 72.2567 11.503 72.132 11.4995H71.939C71.872 11.5093 71.8064 11.5303 71.7466 11.5625L68.5906 13.1871C68.4346 13.2641 68.2579 13.2914 68.0848 13.2641C67.6631 13.1857 67.3817 12.7909 67.4508 12.3745L68.0848 8.9307C68.1269 8.67942 68.0421 8.42394 67.8576 8.24545L65.2851 5.79561C65.0699 5.59053 64.9951 5.28255 65.0934 5.00467C65.1889 4.72748 65.4325 4.5252 65.7268 4.4797L69.2674 3.97503C69.5367 3.94774 69.7732 3.78675 69.8943 3.54876L71.4545 0.405973C71.4916 0.335978 71.5393 0.271582 71.597 0.216986L71.6611 0.167989C71.6946 0.131591 71.7331 0.101493 71.7758 0.0769949L71.8535 0.0489967L71.9746 0H72.2745C72.5424 0.0272982 72.7782 0.184788 72.9014 0.419972L74.4822 3.54876C74.5962 3.77765 74.8178 3.93654 75.0735 3.97503L78.6142 4.4797C78.9134 4.5217 79.1635 4.72468 79.2625 5.00467C79.3558 5.28535 79.2753 5.59333 79.0559 5.79561L76.3915 8.27345Z" fill="#FFD66B" />
                  </svg>
                  <div className="flex justify-between mr-10">
                    <h1 className="text-[#FF8126] text-[17px] font-bold">${request.rentalPrice}</h1>
                    <Link
                      to={`/market/${request.marketId}`}             
                    >
                      <div>
                        <p className="text-[#FF8126] lg:text-[14px]">view</p>
                        <div className="h-[1px] bg-[#FF8126]" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No active listings found.</div>
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