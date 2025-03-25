import React from 'react'
import SearchPage from '../SearchPage'

const VendorNotifications = () => {
    return (
        <div className='lg:px-10'>
            <SearchPage />

            <div className='bg-white lg:p-10  shadow p-1 mt-10 rounded-xl'>
                <h2>Pending Payment</h2>
                <div className='lg:flex lg:gap-25 gap-5 mt-10 grid grid-cols-4 '>
                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Listing Id</p>
                            <h2 className='text-black lg:text-[17px] text-[12px]'>#876364</h2>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Listing Name</p>
                            <h2 className='text-black lg:text-[17px] text-[12px]'>Retail Space</h2>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Owner Name</p>
                            <h2 className='text-black lg:text-[17px] text-[12px]'>John Doe</h2>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Space Size</p>
                            <h2 className='text-black lg:text-[17px] text-[12px]'>500 sq. ft</h2>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Property Type</p>
                            <h2 className='text-[#FF8126] bg-orange-100 lg:text-[17px] text-[12px] p-2 rounded-xl text-center'>Kiosk</h2>
                        </div>
                    </div>


                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Rental Price</p>
                            <h2 className='text-black lg:text-[17px] text-[12px]'>$1,46,660</h2>
                        </div>
                    </div>


                    <div className='flex'>
                        <div className='flex flex-col lg:gap-7 gap-4'>
                            <p className='text-[#B5B1B1] lg:text-[15px] text-[10px]'>Action</p>
                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.4922 13.9324C21.7777 14.2798 21.9205 14.4527 21.9205 14.7169C21.9205 14.981 21.7777 15.1539 21.4922 15.5013C20.4473 16.7699 18.1426 19.1319 15.4671 19.1319C12.7915 19.1319 10.4868 16.7699 9.44194 15.5013C9.15643 15.1539 9.01367 14.981 9.01367 14.7169C9.01367 14.4527 9.15643 14.2798 9.44194 13.9324C10.4868 12.6638 12.7915 10.3018 15.4671 10.3018C18.1426 10.3018 20.4473 12.6638 21.4922 13.9324Z" fill="#FFD412" />
                                <path d="M15.4671 16.9249C16.6863 16.9249 17.6746 15.9365 17.6746 14.7173C17.6746 13.4981 16.6863 12.5098 15.4671 12.5098C14.2479 12.5098 13.2595 13.4981 13.2595 14.7173C13.2595 15.9365 14.2479 16.9249 15.4671 16.9249Z" fill="white" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorNotifications