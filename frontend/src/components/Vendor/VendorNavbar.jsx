import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authSlice';

const VendorNavbar = () => {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  // Common styles for SVG icons
  const svgClass = "w-6 h-6 transition-colors duration-0 ease-in-out"; 

  return (
    <div className=" bg-white h-auto    lg:w-[280px] flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col items-center gap-10 p-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Placy <span className="text-orange-500">Market</span>
          </h1>
          <div className="flex flex-col gap-2 w-full">
            {/* Dashboard Link */}
            <NavLink
              to="/vendor"
              end
              className={({ isActive }) =>
                `relative group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ease-in-out ${isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-0 h-full  rounded-l-lg transition-all duration-300 ease-in-out ${
                      isActive ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-500'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute left-[-26px] top-0 rounded-r-[10px] h-full w-[20px] bg-orange-500 -translate-x-full transition-all duration-300 ease-in-out" />
                  )}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${svgClass} ${isActive ? 'fill-white' : 'fill-[#B8BED9] group-hover:fill-white'}`}
                  >
                    <path
                      d="M12.1797 27.6981V23.6211C12.1797 22.5804 13.0296 21.7367 14.0779 21.7367H17.9102C18.4136 21.7367 18.8964 21.9353 19.2524 22.2887C19.6084 22.6421 19.8084 23.1214 19.8084 23.6211V27.6981C19.8052 28.1308 19.9761 28.5468 20.2832 28.8539C20.5902 29.161 21.0081 29.3337 21.4439 29.3337H24.0584C25.2795 29.3368 26.4517 28.8575 27.3162 28.0014C28.1808 27.1454 28.6667 25.983 28.6667 24.7708V13.1561C28.6667 12.1769 28.2294 11.2481 27.4728 10.6199L18.5787 3.56815C17.0316 2.33174 14.8148 2.37166 13.3139 3.66296L4.62269 10.6199C3.83033 11.2296 3.35675 12.1612 3.33334 13.1561V24.7589C3.33334 27.2855 5.39652 29.3337 7.94157 29.3337H10.4964C11.4016 29.3337 12.1373 28.6086 12.1439 27.71L12.1797 27.6981Z"
                      fill="currentColor"
                    />
                  </svg>
                  <h2 className="text-lg lg:text-[15px] font-medium">Dashboard</h2>
                </>
              )}
            </NavLink>

            {/* Listings Link */}
            <NavLink
              to="/vendor/listings"
              className={({ isActive }) =>
                `relative group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ease-in-out ${isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-0 h-full  rounded-l-lg transition-all duration-300 ease-in-out ${
                      isActive ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-500'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute left-[-26px] top-0 rounded-r-[10px] h-full w-[20px] bg-orange-500 -translate-x-full transition-all duration-300 ease-in-out" />
                  )}
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${svgClass} ${isActive ? 'fill-white' : 'fill-[#B8BED9] group-hover:fill-white'}`}
                  >
                    <path
                      d="M21.0833 0H1.91667C1.40834 0 0.920823 0.201934 0.561379 0.561379C0.201934 0.920823 0 1.40834 0 1.91667V21.0833C0 21.5917 0.201934 22.0792 0.561379 22.4386C0.920823 22.7981 1.40834 23 1.91667 23H21.0833C21.5917 23 22.0792 22.7981 22.4386 22.4386C22.7981 22.0792 23 21.5917 23 21.0833V1.91667C23 1.40834 22.7981 0.920823 22.4386 0.561379C22.0792 0.201934 21.5917 0 21.0833 0ZM19.1667 18.2083H3.83333C3.57917 18.2083 3.33541 18.1074 3.15569 17.9276C2.97597 17.7479 2.875 17.5042 2.875 17.25C2.875 16.9958 2.97597 16.7521 3.15569 16.5724C3.33541 16.3926 3.57917 16.2917 3.83333 16.2917H19.1667C19.4208 16.2917 19.6646 16.3926 19.8443 16.5724C20.024 16.7521 20.125 16.9958 20.125 17.25C20.125 17.5042 20.024 17.7479 19.8443 17.9276C19.6646 18.1074 19.4208 18.2083 19.1667 18.2083ZM19.1667 12.4583H3.83333C3.57917 12.4583 3.33541 12.3574 3.15569 12.1776C2.97597 11.9979 2.875 11.7542 2.875 11.5C2.875 11.2458 2.97597 11.0021 3.15569 10.8224C3.33541 10.6426 3.57917 10.5417 3.83333 10.5417H19.1667C19.4208 10.5417 19.6646 10.6426 19.8443 10.8224C20.024 11.0021 20.125 11.2458 20.125 11.5C20.125 11.7542 20.024 11.9979 19.8443 12.1776C19.6646 12.3574 19.4208 12.4583 19.1667 12.4583ZM19.1667 6.70833H3.83333C3.57917 6.70833 3.33541 6.60737 3.15569 6.42764C2.97597 6.24792 2.875 6.00417 2.875 5.75C2.875 5.49583 2.97597 5.25208 3.15569 5.07236C3.33541 4.89263 3.57917 4.79167 3.83333 4.79167H19.1667C19.4208 4.79167 19.6646 4.89263 19.8443 5.07236C20.024 5.25208 20.125 5.49583 20.125 5.75C20.125 6.00417 20.024 6.24792 19.8443 6.42764C19.6646 6.60737 19.4208 6.70833 19.1667 6.70833Z"
                      fill="currentColor"
                    />
                  </svg>
                  <h2 className="text-lg lg:text-[15px] font-medium">Listings</h2>
                </>
              )}
            </NavLink>

            {/* Requests Link */}
            <NavLink
              to="/vendor/requests"
              className={({ isActive }) =>
                `relative group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ease-in-out ${isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-0 h-full  rounded-l-lg transition-all duration-300 ease-in-out ${
                      isActive ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-500'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute left-[-26px] top-0 rounded-r-[10px] h-full w-[20px] bg-orange-500 -translate-x-full transition-all duration-300 ease-in-out" />
                  )}
                  <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${svgClass} ${isActive ? 'fill-white' : 'fill-[#B8BED9] group-hover:fill-white'}`}
                  >
                    <path
                      d="M11.1942 18.2322C17.0071 18.2322 21.9126 19.1722 21.9126 22.7989C21.9126 26.427 16.9749 27.3337 11.1942 27.3337C5.38261 27.3337 0.475739 26.3937 0.475739 22.7669C0.475739 19.1389 5.41343 18.2322 11.1942 18.2322ZM11.1942 0.666992C15.132 0.666992 18.2871 3.80569 18.2871 7.72173C18.2871 11.6378 15.132 14.7778 11.1942 14.7778C7.2577 14.7778 4.10127 11.6378 4.10127 7.72173C4.10127 3.80569 7.2577 0.666992 11.1942 0.666992Z"
                      fill="currentColor"
                    />
                  </svg>
                  <h2 className="text-lg lg:text-[15px] font-medium">Requests</h2>
                </>
              )}
            </NavLink>

            {/* Settings Link */}
            <NavLink
              to="/vendor/settings"
              className={({ isActive }) =>
                `relative group flex gap-4 items-center p-4 rounded-xl transition-all duration-300 ease-in-out ${isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-orange-500 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-0 h-full  rounded-l-lg transition-all duration-300 ease-in-out ${
                      isActive ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-500'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute left-[-26px] top-0 rounded-r-[10px] h-full w-[20px] bg-orange-500 -translate-x-full transition-all duration-300 ease-in-out" />
                  )}
                  <svg
                    width="26"
                    height="28"
                    viewBox="0 0 26 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${svgClass} ${isActive ? 'fill-white' : 'fill-[#B8BED9] group-hover:fill-white'}`}
                  >
                    <path
                      d="M13.9562 0.666992C14.9645 0.666992 15.8774 1.22699 16.3816 2.05366C16.6269 2.45366 16.7904 2.94699 16.7495 3.46699C16.7223 3.86699 16.8449 4.26699 17.0629 4.64033C17.7578 5.77366 19.2976 6.20033 20.4967 5.56033C21.8457 4.78699 23.5489 5.25366 24.3256 6.57366L25.2386 8.14699C26.0289 9.46699 25.5928 11.1603 24.2302 11.9203C23.072 12.6003 22.6632 14.107 23.3582 15.2537C23.5762 15.6137 23.8215 15.9203 24.203 16.107C24.6799 16.3603 25.0478 16.7603 25.3067 17.1603C25.8109 17.987 25.77 19.0003 25.2794 19.8937L24.3256 21.4937C23.8215 22.347 22.8813 22.8803 21.9138 22.8803C21.4369 22.8803 20.9055 22.747 20.4694 22.4803C20.1152 22.2537 19.7064 22.1737 19.2703 22.1737C17.9214 22.1737 16.7904 23.2803 16.7495 24.6003C16.7495 26.1337 15.4959 27.3337 13.9289 27.3337H12.0758C10.4951 27.3337 9.24153 26.1337 9.24153 24.6003C9.21428 23.2803 8.08331 22.1737 6.73433 22.1737C6.28467 22.1737 5.87588 22.1737 5.53523 22.4803C5.09919 22.747 4.55415 22.8803 4.09086 22.8803C3.10978 22.8803 2.16958 22.347 1.66542 21.4937L0.725217 19.8937C0.221052 19.027 0.1938 17.987 0.697965 17.1603C0.915983 16.7603 1.32477 16.3603 1.78805 16.107C2.16958 15.9203 2.41485 15.6137 2.6465 15.2537C3.3278 14.107 2.91902 12.6003 1.7608 11.9203C0.411817 11.1603 -0.0242181 9.46699 0.75247 8.14699L1.66542 6.57366C2.45573 5.25366 4.14537 4.78699 5.50798 5.56033C6.69345 6.20033 8.2332 5.77366 8.92813 4.64033C9.14615 4.26699 9.26878 3.86699 9.24153 3.46699C9.21428 2.94699 9.36416 2.45366 9.62306 2.05366C10.1272 1.22699 11.0402 0.693659 12.0349 0.666992H13.9562ZM13.016 10.2403C10.8767 10.2403 9.14615 11.9203 9.14615 14.0137C9.14615 16.107 10.8767 17.7737 13.016 17.7737C15.1553 17.7737 16.8449 16.107 16.8449 14.0137C16.8449 11.9203 15.1553 10.2403 13.016 10.2403Z"
                      fill="currentColor"
                    />
                  </svg>
                  <h2 className="text-lg lg:text-[15px] font-medium">Settings</h2>
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex gap-4 absolute bottom-10 items-center ml-10 ">
          <button
            onClick={handleLogout}
            className="relative group flex gap-4 items-center p-3 rounded-lg text-gray-600 hover:bg-orange-100  transition-all duration-300 ease-in-out w-full"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${svgClass}  group-hover:fill-orange`}
            >
              <path
                d="M15.3236 2.66699C18.6337 2.66699 21.3333 5.32033 21.3333 8.58699V14.9737H13.1938C12.6105 14.9737 12.1492 15.427 12.1492 16.0003C12.1492 16.5603 12.6105 17.027 13.1938 17.027H21.3333V23.4003C21.3333 26.667 18.6337 29.3337 15.2965 29.3337H8.68991C5.36627 29.3337 2.66666 26.6803 2.66666 23.4137V8.60033C2.66666 5.32033 5.37984 2.66699 8.70348 2.66699H15.3236ZM24.7203 11.4006C25.1203 10.9873 25.7736 10.9873 26.1736 11.3873L30.0669 15.2673C30.2669 15.4673 30.3736 15.7206 30.3736 16.0006C30.3736 16.2673 30.2669 16.5339 30.0669 16.7206L26.1736 20.6006C25.9736 20.8006 25.7069 20.9073 25.4536 20.9073C25.1869 20.9073 24.9203 20.8006 24.7203 20.6006C24.3203 20.2006 24.3203 19.5473 24.7203 19.1473L26.8536 17.0273H21.3336V14.9739H26.8536L24.7203 12.8539C24.3203 12.4539 24.3203 11.8006 24.7203 11.4006Z"
                fill="#FF8126"
              />
            </svg>
            <h2 className="text-lg font-medium text-orange-600 group-hover:text-[#FF8126] transition-colors duration-300 ease-in-out">
              Logout
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorNavbar;