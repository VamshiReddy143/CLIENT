import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authSlice';
import useMarketStore from '@/store/marketStore';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { requests, setSearchQuery } = useMarketStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  console.log('Current path:', location.pathname);
  console.log('Current user:', user);

  const notificationRoute = user?.user_role === 'admin'
    ? '/admin/notifications'
    : user?.user_role === 'market_owner'
    ? '/marketowner/notifications'
    : user?.user_role === 'vendor'
    ? '/vendor/notifications'
    : '/';
  console.log('Notification route:', notificationRoute);

  let pageTitle = 'Dashboard';
  let searchPlaceholder = 'Search';

  if (location.pathname === '/vendor') {
    pageTitle = 'Dashboard';
    searchPlaceholder = 'Search requests';
  } else if (location.pathname === '/vendor/listings') {
    pageTitle = 'Listings';
    searchPlaceholder = 'Search listings';
  } else if (location.pathname === '/vendor/requests') {
    pageTitle = 'Requests';
    searchPlaceholder = 'Search requests';
  } else if (location.pathname === '/vendor/settings') {
    pageTitle = 'Settings';
    searchPlaceholder = 'Search settings';
  } else if (location.pathname === '/vendor/notifications') {
    pageTitle = 'Notifications';
    searchPlaceholder = 'Search notifications';
  } else if (location.pathname === '/admin/vendors') {
    pageTitle = 'Vendors';
    searchPlaceholder = 'Search vendors';
  } else if (location.pathname === '/admin/marketowners') {
    pageTitle = 'Market Owners';
    searchPlaceholder = 'Search market owners';
  } else if (location.pathname === '/admin/listings') {
    pageTitle = 'Listing';
    searchPlaceholder = 'Search markets'; // Updated to "Search markets"
  } else if (location.pathname === '/admin/settings') {
    pageTitle = 'Settings';
    searchPlaceholder = 'Search settings';
  } else if (location.pathname.startsWith('/admin/owner/')) {
    pageTitle = 'Market Owner Profile';
    searchPlaceholder = 'Search markets';
  }
  else if (location.pathname.startsWith('/admin/marketowners')) {
    pageTitle = ' Owner Details';
    searchPlaceholder = 'Search markets';
  }

  const defaultAvatar =
    'https://imgs.search.brave.com/GaCzNP9tEe6BCjo8HXaR6llOdnsLodGlGxYnFAhGsHA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvdXNlci1waWN0/dXJlcy8xMDAvdW5r/bm93bi01MTIucG5n';

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value);
  };


 

  return (
    <div>
      <div id="top" className="flex justify-between gap-5 items-center">
        <h1 className="lg:text-[30px] leading-[79px] font-700 font-bold">{pageTitle}</h1>
        <div className="flex gap-4 items-center">
          <div className="relative hidden lg:block items-center">
            <Search className="absolute left-4 mt-4 text-gray-400" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={handleSearch}
              className="lg:w-[540px] lg:h-[60px] border border-gray-200 bg-white pl-14 pr-10 rounded-xl placeholder:text-gray-300 focus:outline-none "
            />
         
          </div>

          <div className="flex bg-white p-3 gap-2 rounded-xl items-center">
            <Link to={notificationRoute}>
              <div className='mr-4'>
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.2842 23.6375C9.95075 23.4965 14.0123 23.4965 14.6789 23.6375C15.2487 23.7691 15.8649 24.0767 15.8649 24.7481C15.8318 25.3873 15.4567 25.954 14.9386 26.3139C14.2668 26.8376 13.4783 27.1693 12.6541 27.2888C12.1982 27.3479 11.7503 27.3493 11.3104 27.2888C10.4848 27.1693 9.69632 26.8376 9.0258 26.3126C8.50634 25.954 8.13132 25.3873 8.09819 24.7481C8.09819 24.0767 8.71439 23.7691 9.2842 23.6375ZM12.0603 0.666992C14.8338 0.666992 17.667 1.98302 19.3499 4.16654C20.4418 5.57254 20.9427 6.9772 20.9427 9.16073V9.72877C20.9427 11.4033 21.3853 12.3904 22.3593 13.5278C23.0974 14.3657 23.3333 15.4414 23.3333 16.6084C23.3333 17.774 22.9503 18.8805 22.1831 19.7789C21.1786 20.8559 19.762 21.5434 18.3163 21.663C16.2212 21.8416 14.1248 21.992 12.0006 21.992C9.87508 21.992 7.78002 21.902 5.68496 21.663C4.2379 21.5434 2.82132 20.8559 1.81818 19.7789C1.05092 18.8805 0.666626 17.774 0.666626 16.6084C0.666626 15.4414 0.903828 14.3657 1.64061 13.5278C2.64507 12.3904 3.05852 11.4033 3.05852 9.72877V9.16073C3.05852 6.91811 3.61773 5.45168 4.76929 4.01614C6.48138 1.92259 9.22576 0.666992 11.941 0.666992H12.0603Z"
                    fill="#637381"
                  />
                </svg>
              </div>
            </Link>

            <div className="relative flex items-center gap-3">
              <img
                src={user?.avatar || defaultAvatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => (e.target.src = defaultAvatar)}
              />
              <span className="text-gray-700">{user?.name || 'User'}</span>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.246 7.08751C3.20733 7.04985 3.042 6.90762 2.906 6.77513C2.05067 5.99838 0.650667 3.97207 0.223333 2.91151C0.154667 2.75045 0.00933333 2.34324 0 2.12567C0 1.9172 0.048 1.71846 0.145333 1.52882C0.281333 1.29242 0.495333 1.10278 0.748 0.998864C0.923333 0.93197 1.448 0.828057 1.45733 0.828057C2.03133 0.724144 2.964 0.666992 3.99467 0.666992C4.97667 0.666992 5.87133 0.724144 6.454 0.809223C6.46333 0.818965 7.11533 0.922878 7.33867 1.03653C7.74667 1.24501 8 1.65222 8 2.088V2.12567C7.99 2.40948 7.73667 3.00633 7.72733 3.00633C7.29933 4.00974 5.968 5.98928 5.08333 6.78487C5.08333 6.78487 4.856 7.00893 4.714 7.10635C4.51 7.25832 4.25733 7.33366 4.00467 7.33366C3.72267 7.33366 3.46 7.24858 3.246 7.08751Z"
                    fill="black"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-[999] right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 top-10">
                  <Link
                    to="/vendor/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>

                  <Link to={"/login"}>
                  <button
                   
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex lg:hidden items-center mt-4">
        <Search className="absolute left-4 text-gray-400" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchInput}
          onChange={handleSearch}
          className="lg:w-[542px] lg:h-[56px] w-full h-[50px] border border-gray-200 bg-white pl-14 pr-10 rounded-xl placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
      </div>
    </div>
  );
};

export default SearchPage;