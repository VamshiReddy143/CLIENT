import React from 'react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();

  // Determine the title based on the current route
  let pageTitle = 'Dashboard'; // Default title
  if (location.pathname === '/vendor') {
    pageTitle = 'Dashboard';
  } else if (location.pathname === '/vendor/listings') {
    pageTitle = 'Listings';
  } else if (location.pathname === '/vendor/requests') {
    pageTitle = 'Requests';
  } else if (location.pathname === '/vendor/settings') {
    pageTitle = 'Settings';
  }

  return (
    <div id="top" className="flex justify-between gap-5 items-center">
      <h1 className="lg:text-[30px] leading-[79px] font-700 font-bold">{pageTitle}</h1>
      <div className="flex gap-4 items-center">
        <div className="relative flex hidden lg:block items-center">
          <Search className="absolute left-4 mt-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search anything"
            className="lg:w-[540px] lg:h-[60px] border border-gray-200 bg-white pl-14 rounded-xl placeholder:text-gray-300 focus:outline-none"
          />
        </div>

        <div className="flex bg-white p-3 gap-2 rounded-xl items-center">
          <div>
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.2842 23.6375C9.95075 23.4965 14.0123 23.4965 14.6789 23.6375C15.2487 23.7691 15.8649 24.0767 15.8649 24.7481C15.8318 25.3873 15.4567 25.954 14.9386 26.3139C14.2668 26.8376 13.4783 27.1693 12.6541 27.2888C12.1982 27.3479 11.7503 27.3493 11.3104 27.2888C10.4848 27.1693 9.69632 26.8376 9.0258 26.3126C8.50634 25.954 8.13132 25.3873 8.09819 24.7481C8.09819 24.0767 8.71439 23.7691 9.2842 23.6375ZM12.0603 0.666992C14.8338 0.666992 17.667 1.98302 19.3499 4.16654C20.4418 5.57254 20.9427 6.9772 20.9427 9.16073V9.72877C20.9427 11.4033 21.3853 12.3904 22.3593 13.5278C23.0974 14.3657 23.3333 15.4414 23.3333 16.6084C23.3333 17.774 22.9503 18.8805 22.1831 19.7789C21.1786 20.8559 19.762 21.5434 18.3163 21.663C16.2212 21.8416 14.1248 21.992 12.0006 21.992C9.87508 21.992 7.78002 21.902 5.68496 21.663C4.2379 21.5434 2.82132 20.8559 1.81818 19.7789C1.05092 18.8805 0.666626 17.774 0.666626 16.6084C0.666626 15.4414 0.903828 14.3657 1.64061 13.5278C2.64507 12.3904 3.05852 11.4033 3.05852 9.72877V9.16073C3.05852 6.91811 3.61773 5.45168 4.76929 4.01614C6.48138 1.92259 9.22576 0.666992 11.941 0.666992H12.0603Z"
                fill="#637381"
              />
            </svg>
          </div>

          <div className="flex items-center gap-1">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">Timothy</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.246 7.08751C3.20733 7.04985 3.042 6.90762 2.906 6.77513C2.05067 5.99838 0.650667 3.97207 0.223333 2.91151C0.154667 2.75045 0.00933333 2.34324 0 2.12567C0 1.9172 0.048 1.71846 0.145333 1.52882C0.281333 1.29242 0.495333 1.10278 0.748 0.998864C0.923333 0.93197 1.448 0.828057 1.45733 0.828057C2.03133 0.724144 2.964 0.666992 3.99467 0.666992C4.97667 0.666992 5.87133 0.724144 6.454 0.809223C6.46333 0.818965 7.11533 0.922878 7.33867 1.03653C7.74667 1.24501 8 1.65222 8 2.088V2.12567C7.99 2.40948 7.73667 3.00633 7.72733 3.00633C7.29933 4.00974 5.968 5.98928 5.08333 6.78487C5.08333 6.78487 4.856 7.00893 4.714 7.10635C4.51 7.25832 4.25733 7.33366 4.00467 7.33366C3.72267 7.33366 3.46 7.24858 3.246 7.08751Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;