import React, { useState, useEffect } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchPage from '../SearchPage';
import useAuthStore from '@/store/authSlice';
import useMarketStore from '@/store/marketStore';


const tabs = ['All', 'Active', 'Rejected'];

function VendorRequests() {
  const [activeTab, setActiveTab] = useState('All');
  const { requests, fetchRequests, loading, error, searchQuery } = useMarketStore(); // Fixed typo (fetchRequestss -> fetchRequests)
  const { user } = useAuthStore();
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    if (user && user.user_role === 'vendor') {
      console.log('Fetching requests for vendor:', user);
      fetchRequests();
    }
  }, [fetchRequests, user]);

  useEffect(() => {
    if (requests && requests.length > 0) {
      let filtered = requests;

      if (activeTab !== 'All') {
        filtered = requests.filter((request) => {
          if (activeTab === 'Active') return request.status.toLowerCase() === 'approved';
          if (activeTab === 'Rejected') return request.status.toLowerCase() === 'rejected';
          return false;
        });
      }

      filtered = filtered.filter((request) => {
        const searchLower = searchQuery.toLowerCase().trim();
        const nameMatch = request.marketName?.toLowerCase().trim().includes(searchLower);
        const typeMatch = request.propertyType?.toLowerCase().trim().includes(searchLower);
        return nameMatch || typeMatch;
      });

      console.log('Filtered requests:', filtered);
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests([]);
    }
  }, [requests, activeTab, searchQuery]);

  if (!user || user.user_role !== 'vendor') {
    return <div className="text-center p-4">Access denied: Vendors only.</div>;
  }
  if (loading) return <div className="text-center p-4">Loading requests...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div id="nunito-text" className="lg:bg-gray-100 min-h-screen lg:px-10">
      <div className="relative">
        <SearchPage />

        <div className="rounded-xl mt-20">
          <div className="fixed bg-white z-10 md:static md:bg-transparent">
            <div id="nunito-text" className="flex gap-8 bg-white w-fit rounded-xl px-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 relative ${activeTab === tab ? 'text-orange-600 font-medium' : 'text-gray-500'}`}
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
            {activeTab !== 'Invoices' ? (
              <>
                <div className="flex items-center text-sm text-gray-500 ml-4 pb-4">
                  <div className="min-w-[148px] max-w-[128px] flex gap-2 items-center">
                    <p>Request ID</p>
                    <ChevronDown size={12} />
                  </div>
                  <div className="min-w-[148px] max-w-[128px] flex gap-2 items-center">
                    <p>Market Name</p>
                    <ChevronDown size={12} />
                  </div>
                  <div className="min-w-[200px] max-w-[192px] gap-2 flex items-center">
                    <p>Owner Name</p>
                    <ChevronDown size={12} />
                  </div>
                  <div className="min-w-[148px] max-w-[128px] flex gap-2 items-center">
                    <p>Space Size</p>
                    <ChevronDown size={12} />
                  </div>
                  <div className="min-w-[148px] max-w-[128px] flex gap-2 items-center">
                    <p>Rental Price</p>
                    <ChevronDown size={12} />
                  </div>
                  <div className="min-w-[198px] max-w-[128px] flex gap-2 items-center">
                    <p>Property Type</p>
                    <ChevronDown size={12} />
                  </div>
                  {activeTab === 'All' && (
                    <>
                      <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                        <p>Status</p>
                        <ChevronDown size={12} />
                      </div>
                      <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                        <p>Details</p>
                        <ChevronDown size={12} />
                      </div>
                    </>
                  )}
                  {(activeTab === 'Active' || activeTab === 'Rejected') && (
                    <div className="min-w-[128px] max-w-[128px] flex gap-2 items-center">
                      <p>Details</p>
                      <ChevronDown size={12} />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request, index) => (
                      <div
                        key={index}
                        className="flex w-fit items-center py-4 text-sm bg-white border border-gray-200 rounded-lg px-4"
                      >
                        <div className="min-w-[148px] max-w-[128px] text-gray-900">{`#${request.requestId}`}</div>
                        <div className="min-w-[148px] max-w-[128px] text-gray-900">{request.marketName}</div>
                        <div className="min-w-[200px] max-w-[192px] flex items-center gap-2">
                          <img
                            src={request.ownerAvatar || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQIDBgEEB//EADAQAQACAQIEAwYGAwEAAAAAAAABAhEDBBUhMZIFQVMSFFFSYXETIzKRsdEiM0KB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP1oBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABL3ni1KTNdti9vO09I+yVq7jW1uerqWt9M8v2IV0/tQycjiPhET9m3S3GrozE6WpNfp5EK6kS9l4rW8xTcRFJnpaOkqnQAAAAAAAAAAAAAAAAAABK8Y3k0j8DSnFp/XMKucc56Q5TV1ba2rbUt1tOfsuDD6ACAAHnzzj4LPg27tevu+pOZj9MyjNmjq20dWmpXrWcg6oeRMTGY6S9RQAAAAAAAAAAAAAAAGrc5921sdfYtj9nLR05dMOtmPaiaz0mMOUvS2nqW07RiazMSuDEAQAABlp0tqXrp1jNrTEQDp9rn3bSz1/Drn9m15ERWsVjpHJ6igAAAAAAAAAAAAAAPJ6AZ5pPjO0n2veKc69L4/lTzOS05jE84nyByoqbzwu0TN9tGa/Jn+E21ZrOLVtWfhaFRiDKtbXmIpWbTPlEZB5iPjzVfBdrb2vedSMR0p9/iw2nhlpmNTdZiInlTz/APVev+OKxyiOkQVWwYRM55s4nMckAAAAAAAAAAAAAAAHz7re6G1j8y2b+VYjMyDfgmEXV8Y1Zn8rTrWPrzlpnxXd+V47YIOg9n6MbadL/rpW33jKDxTefPHbBxTefPHbCwWvc9tnMaFO1tpp0p+ila/aMIHFN588dsHFN588dsJCugwYc/xTefPHbD3iu89SO2Fgv4IjHJG0vGdSJ/M062+teU/0o7XeaG6/12/yjrW3WEH0gAAAAAAAAAAAA1bnWjb6F9W3P2Y5R8Z8gfJ4nv8A3ePwdLE6lo5zP/KHa02tmZmZnrOeZa03vNrzm0zmZYqgAAAAAAAA9iZiYtEzFo83j1Rd8M8Qncfla3+2Ok/NH9qDk63tS0XpMxas5iYdPttaNxoU1Y/6jnH1RW0BAAAAAAAAAS/HrzGjp08pnP7Kj4vENjO8nTxqxSK5ic1yDnoFXgt/Xr2ScFv69eyVRKFXgt/Xr2ScFv69eyQShV4Lf169knBb+vXskEoVeC39evZJwW/r17JBKFXgt/Xr2ScFv69eyQShV4Lf169knBb+vXskEuFnwLUzo6mn5VtmGrgup69eyX1+HbG2ztebakXi0RHKMA+4BFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q=='}
                            alt={request.ownerName || 'Unknown'}
                            className="w-8 h-8 rounded-full"
                            onError={(e) => (e.target.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABQIDBgEEB//EADAQAQACAQIEAwYGAwEAAAAAAAABAhEDBBUhMZIFQVMSFFFSYXETIzKRsdEiM0KB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP1oBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABL3ni1KTNdti9vO09I+yVq7jW1uerqWt9M8v2IV0/tQycjiPhET9m3S3GrozE6WpNfp5EK6kS9l4rW8xTcRFJnpaOkqnQAAAAAAAAAAAAAAAAAABK8Y3k0j8DSnFp/XMKucc56Q5TV1ba2rbUt1tOfsuDD6ACAAHnzzj4LPg27tevu+pOZj9MyjNmjq20dWmpXrWcg6oeRMTGY6S9RQAAAAAAAAAAAAAAAGrc5921sdfYtj9nLR05dMOtmPaiaz0mMOUvS2nqW07RiazMSuDEAQAABlp0tqXrp1jNrTEQDp9rn3bSz1/Drn9m15ERWsVjpHJ6igAAAAAAAAAAAAAAPJ6AZ5pPjO0n2veKc69L4/lTzOS05jE84nyByoqbzwu0TN9tGa/Jn+E21ZrOLVtWfhaFRiDKtbXmIpWbTPlEZB5iPjzVfBdrb2vedSMR0p9/iw2nhlpmNTdZiInlTz/APVev+OKxyiOkQVWwYRM55s4nMckAAAAAAAAAAAAAAAHz7re6G1j8y2b+VYjMyDfgmEXV8Y1Zn8rTrWPrzlpnxXd+V47YIOg9n6MbadL/rpW33jKDxTefPHbBxTefPHbCwWvc9tnMaFO1tpp0p+ila/aMIHFN588dsHFN588dsJCugwYc/xTefPHbD3iu89SO2Fgv4IjHJG0vGdSJ/M062+teU/0o7XeaG6/12/yjrW3WEH0gAAAAAAAAAAAA1bnWjb6F9W3P2Y5R8Z8gfJ4nv8A3ePwdLE6lo5zP/KHa02tmZmZnrOeZa03vNrzm0zmZYqgAAAAAAAA9iZiYtEzFo83j1Rd8M8Qncfla3+2Ok/NH9qDk63tS0XpMxas5iYdPttaNxoU1Y/6jnH1RW0BAAAAAAAAAS/HrzGjp08pnP7Kj4vENjO8nTxqxSK5ic1yDnoFXgt/Xr2ScFv69eyVRKFXgt/Xr2ScFv69eyQShV4Lf169knBb+vXskEoVeC39evZJwW/r17JBKFXgt/Xr2ScFv69eyQShV4Lf169knBb+vXskEuFnwLUzo6mn5VtmGrgup69eyX1+HbG2ztebakXi0RHKMA+4BFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==')}
                          />
                          <span className="text-gray-900">{request.ownerName || 'N/A'}</span>
                        </div>
                        <div className="min-w-[148px] max-w-[128px] text-gray-500">{`${request.spaceSize} sq. ft.`}</div>
                        <div className="min-w-[148px] max-w-[128px] text-gray-500">{`$${request.rentalPrice}`}</div>
                        <div className="min-w-[198px] max-w-[128px]">
                          <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                            {request.propertyType}
                          </span>
                        </div>
                        {activeTab === 'All' && (
                          <>
                            <div className="min-w-[128px] max-w-[128px]">
                              <span
                                className={`px-3 py-1 rounded-full text-sm italic ${request.status === 'approved'
                                  ? 'bg-green-50 text-green-700'
                                  : request.status === 'rejected'
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-blue-50 text-blue-700'
                                  }`}
                              >
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                            <div className="min-w-[128px] max-w-[128px]">
                              <Link to={`/market/${request.marketId}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M20.1885 10.934C20.5765 11.406 20.7705 11.641 20.7705 12C20.7705 12.359 20.5765 12.594 20.1885 13.066C18.7685 14.79 15.6365 18 12.0005 18C8.36447 18 5.23247 14.79 3.81247 13.066C3.42447 12.594 3.23047 12.359 3.23047 12C3.23047 11.641 3.42447 11.406 3.81247 10.934C5.23247 9.21 8.36447 6 12.0005 6C15.6365 6 18.7685 9.21 20.1885 10.934Z" fill="#FFD412" />
                                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white" />
                                </svg>

                              </Link>
                            </div>
                          </>
                        )}
                        {(activeTab === 'Active' || activeTab === 'Rejected') && (
                          <div className="min-w-[128px] max-w-[128px]">
                            <Link to={`/market/${request.marketId}`}>
                              {activeTab === 'Active' ? (
                                <div className="flex items-center">
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M9.51662 0.613575C9.88799 0.242695 10.3849 0.0244635 10.9092 0.00193531C11.4336 -0.0205929 11.9474 0.154219 12.3492 0.491881L12.4834 0.614625L14.4767 2.60684H17.2946C17.8237 2.60694 18.3333 2.80698 18.7212 3.16689C19.1092 3.52679 19.3468 4.01998 19.3864 4.54766L19.3927 4.70502V7.52287L21.386 9.51614C21.7572 9.88756 21.9756 10.3847 21.9981 10.9093C22.0207 11.4339 21.8457 11.9479 21.5077 12.3497L21.385 12.483L19.3917 14.4762V17.2941C19.3919 17.8234 19.1919 18.3333 18.832 18.7214C18.4721 19.1096 17.9787 19.3473 17.4509 19.387L17.2946 19.3923H14.4778L12.4845 21.3855C12.1131 21.7567 11.616 21.9751 11.0914 21.9977C10.5668 22.0202 10.0528 21.8452 9.6509 21.5072L9.51767 21.3855L7.5244 19.3923H4.7055C4.17616 19.3924 3.66631 19.1925 3.27816 18.8326C2.89002 18.4726 2.65227 17.9793 2.61257 17.4514L2.60732 17.2941V14.4762L0.614054 12.483C0.242881 12.1115 0.0244643 11.6145 0.00193389 11.0898C-0.0205965 10.5652 0.154397 10.0512 0.49236 9.64938L0.614054 9.51614L2.60732 7.52287V4.70502C2.60742 4.17586 2.80746 3.66627 3.16737 3.27835C3.52727 2.89043 4.02046 2.65283 4.54814 2.61314L4.7055 2.60684H7.52335L9.51662 0.613575Z" fill="#79AFED" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.227 7.83453L9.7747 12.2869L7.91991 10.4321C7.72306 10.2354 7.45613 10.1249 7.17784 10.125C6.89954 10.1251 6.63269 10.2357 6.43598 10.4326C6.23926 10.6295 6.12881 10.8964 6.12891 11.1747C6.129 11.453 6.23965 11.7198 6.4365 11.9165L8.95851 14.4385C9.06568 14.5458 9.19292 14.6308 9.33296 14.6888C9.47301 14.7469 9.62311 14.7767 9.7747 14.7767C9.92629 14.7767 10.0764 14.7469 10.2164 14.6888C10.3565 14.6308 10.4837 14.5458 10.5909 14.4385L15.7104 9.31794C15.9015 9.12008 16.0073 8.85508 16.0049 8.58001C16.0025 8.30494 15.8922 8.04182 15.6977 7.84731C15.5032 7.6528 15.24 7.54247 14.965 7.54008C14.6899 7.53769 14.4249 7.64343 14.227 7.83453Z" fill="#79AFED" />
                                  </svg>
                                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.1885 18.934C28.5765 19.406 28.7705 19.641 28.7705 20C28.7705 20.359 28.5765 20.594 28.1885 21.066C26.7685 22.79 23.6365 26 20.0005 26C16.3645 26 13.2325 22.79 11.8125 21.066C11.4245 20.594 11.2305 20.359 11.2305 20C11.2305 19.641 11.4245 19.406 11.8125 18.934C13.2325 17.21 16.3645 14 20.0005 14C23.6365 14 26.7685 17.21 28.1885 18.934Z" fill="#FFD412" />
                                    <path d="M20 23C21.6569 23 23 21.6569 23 20C23 18.3431 21.6569 17 20 17C18.3431 17 17 18.3431 17 20C17 21.6569 18.3431 23 20 23Z" fill="white" />
                                  </svg>
                                </div>
                              ) : (
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18.7856 1.21C18.0063 0.43669 16.9535 0.00190469 15.8556 4.17189e-07H6.67564C6.13237 -0.00024465 5.59447 0.107481 5.09319 0.316919C4.59191 0.526357 4.13726 0.83333 3.75564 1.22L3.67564 1.3L0.595644 5.51C0.206785 6.11381 0 6.81681 0 7.535C0 8.25319 0.206785 8.95619 0.595644 9.56L3.59564 13.73L3.67564 13.82C4.05809 14.2049 4.51312 14.51 5.01436 14.7177C5.51559 14.9254 6.05308 15.0316 6.59564 15.03H15.7956C16.8935 15.0281 17.9463 14.5933 18.7256 13.82C19.1105 13.4376 19.4156 12.9825 19.6233 12.4813C19.831 11.98 19.9372 11.4426 19.9356 10.9V4.13C19.9451 3.59161 19.8484 3.05663 19.6511 2.55561C19.4538 2.0546 19.1597 1.59736 18.7856 1.21ZM14.9156 9.42C15.0082 9.51324 15.0815 9.6238 15.1314 9.74537C15.1812 9.86694 15.2067 9.99714 15.2062 10.1285C15.2057 10.2599 15.1794 10.3899 15.1287 10.5112C15.078 10.6324 15.0039 10.7424 14.9106 10.835C14.8174 10.9276 14.7068 11.0009 14.5853 11.0507C14.4637 11.1006 14.3335 11.126 14.2021 11.1256C14.0707 11.1251 13.9407 11.0988 13.8195 11.048C13.6983 10.9973 13.5882 10.9232 13.4956 10.83L11.5956 8.93L9.70564 10.82C9.61306 10.9132 9.50302 10.9873 9.38181 11.038C9.26059 11.0888 9.13057 11.1151 8.99918 11.1156C8.86778 11.116 8.73758 11.0906 8.61601 11.0407C8.49444 10.9909 8.38388 10.9176 8.29064 10.825C8.1974 10.7324 8.12331 10.6224 8.0726 10.5012C8.02189 10.3799 7.99555 10.2499 7.99509 10.1185C7.99462 9.98714 8.02004 9.85694 8.0699 9.73537C8.11975 9.6138 8.19306 9.50324 8.28564 9.41L10.1856 7.52L8.28564 5.62C8.09867 5.4317 7.99415 5.17683 7.99509 4.91146C7.99603 4.6461 8.10234 4.39198 8.29064 4.205C8.47895 4.01802 8.73382 3.91351 8.99918 3.91444C9.26454 3.91538 9.51867 4.0217 9.70564 4.21L11.5956 6.1L13.4956 4.2C13.6826 4.0117 13.9367 3.90538 14.2021 3.90444C14.4675 3.90351 14.7223 4.00802 14.9106 4.195C15.0989 4.38198 15.2053 4.6361 15.2062 4.90146C15.2071 5.16683 15.1026 5.4217 14.9156 5.61L13.0156 7.52L14.9156 9.42Z" fill="#FC572E" />
                                </svg>
                              )}
                            </Link>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No requests match your search or selected tab.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mt-10 flex flex-col gap-1 text-[#858585]">
                  <p>Marketplace Name: Downtown Vendor Hub</p>
                  <p>MarketOwner's Name: John Doe</p>
                  <p>Email Address: john@gmail.com</p>
                  <p>Invoice Number: (INV-2025001)</p>
                  <p>Invoice Date: 23-02-2025</p>
                  <p>Due Date: 15-03-2025</p>
                </div>
                <div className="mt-10 flex flex-col gap-1 text-[#858585]">
                  <p>Vendor Name: John Doe</p>
                  <p>Vendor Contact Email: timothy@gmail.com</p>
                  <p>Vendor Phone Number: +971-348-34345</p>
                  <p>Vendor Business Address: XYZ</p>
                </div>
                <div className="mt-10">
                  <h1 className="mt-8 mb-8 text-[1.5rem] font-semibold">Space Highlights</h1>
                  <div className="flex gap-10 text-[#858585]">
                    <div>
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
                <div className="flex items-center gap-5">
                  <h1 className="text-black mt-8 mb-8 text-[1.5rem] font-semibold">Total Price</h1>
                  <h1 className="text-[#EA7A39] text-[1.5rem] font-semibold">$1,466</h1>
                </div>
                <div className="pb-10">
                  <button className="bg-[#EA7A39] text-white h-[48px] w-[224px] rounded-xl">
                    Pay Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export default VendorRequests;