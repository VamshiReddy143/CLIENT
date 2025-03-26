


import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuthStore from './authSlice';

const useMarketStore = create((set) => ({
  markets: [],
  pendingMarkets: [],
  vendorRequests: [],
  ownerRequests: [],
  filters: { location: '', price: '', size: '', type: '', sizeMin: '', sizeMax: '', priceMin: '', priceMax: '' },
  loading: false,
  error: null,
  success: null,
  page: 1,
  featuredPage: 1,
  hasMore: true,
  hasMoreFeatured: true,
  selectedMarket: null,
  searchQuery: '',
  fetchMarkets: async (filters = {}, page = 1, limit = 5) => {
    set({ loading: true, error: null });
    try {
      let { sizeMin, sizeMax, priceMin, priceMax, sort } = filters;
      if (!sizeMin && !sizeMax && filters.size) {
        const sizeRange = filters.size.split(' - ');
        sizeMin = sizeRange[0] || '';
        sizeMax = sizeRange[1] || '';
      }
      if (!priceMin && !priceMax && filters.price) {
        const priceRange = filters.price.split(' - ');
        priceMin = priceRange[0] || '';
        priceMax = priceRange[1] || '';
      }
      const updatedFilters = { ...filters, sizeMin, sizeMax, priceMin, priceMax, status: 'available', sort };
      console.log('Fetching with filters:', updatedFilters);
  
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to view markets');
        window.location.href = '/login';
        return;
      }
  
      const response = await axios.get('http://localhost:3000/api/markets', {
        params: { ...updatedFilters, page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response in fetchMarkets:', response.data);
      const parsedMarkets = response.data.map((market) => ({
        ...market,
        services: market.services ? JSON.parse(market.services) : [],
        images: market.images ? JSON.parse(market.images) : [],
        videos: market.videos ? JSON.parse(market.videos) : [],
        highlights: market.highlights ? JSON.parse(market.highlights) : { spaceHighlights: [], heading2: [], heading3: [], heading4: [] },
      }));
  
      set((state) => ({
        markets: page === 1 ? parsedMarkets : [...state.markets, ...parsedMarkets],
        loading: false,
        page,
        hasMore: parsedMarkets.length === limit,
      }));
    } catch (error) {
      console.error('Error fetching markets:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        set({ error: 'Failed to fetch markets', loading: false, hasMore: false });
        toast.error('Failed to fetch markets');
      }
    }
  },


  fetchOwnerRequests: async () => {
    const token = localStorage.getItem('token');
    const ownerId = useAuthStore.getState().user?.id;
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/api/owner-requests', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { ownerId },
      });
      const parsedRequests = response.data.map((request) => ({
        ...request,
        images: request.images ? JSON.parse(request.images) : [],
      }));
      set({ ownerRequests: parsedRequests, loading: false });
      return parsedRequests;
    } catch (error) {
      console.error('Error fetching owner requests:', error);
      set({
        error: `Failed to fetch owner requests: ${error.response?.data?.message || error.message}`,
        loading: false,
      });
      toast.error('Failed to fetch owner requests')
      throw error;
    }
  },

  fetchMarketsByStatus: async (status, page = 1, limit = 10) => {
    console.log(`Starting fetchMarketsByStatus with status: ${status}, page: ${page}, limit: ${limit}`);
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        throw new Error('No authentication token found. Please log in again.');
      }
      console.log('Token being sent:', token);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('Request timed out after 10 seconds');
        controller.abort();
      }, 10000);

      console.log('Making API request to /api/markets');
      const response = await axios.get('http://localhost:3000/api/markets', {
        params: { status, page, limit },
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API request successful, response:', response.data);
      clearTimeout(timeoutId);

      const parsedMarkets = response.data.map((market) => {
        const parseJSON = (value, defaultValue) => {
          try {
            return value ? JSON.parse(value) : defaultValue;
          } catch (err) {
            console.error(`Error parsing JSON for market ${market.id}:`, err);
            return defaultValue;
          }
        };

        return {
          ...market,
          services: parseJSON(market.services, []),
          images: parseJSON(market.images, []),
          videos: parseJSON(market.videos, []),
          highlights: parseJSON(market.highlights, { spaceHighlights: [], heading2: [], heading3: [], heading4: [] }),
        };
      });

      set((state) => ({
        pendingMarkets: page === 1 ? parsedMarkets : [...state.pendingMarkets, ...parsedMarkets],
        loading: false,
        page,
        hasMore: parsedMarkets.length === limit,
      }));
      console.log('fetchMarketsByStatus completed successfully');
    } catch (error) {
      console.error(`Error in fetchMarketsByStatus with status ${status}:`, error);
      let errorMessage = `Failed to fetch markets with status ${status}`;
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'Access denied: You must be an admin to view this page. Please log in again.';
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error: Unable to fetch markets. Please try again later.';
        } else {
          errorMessage = error.response.data?.message || error.message;
        }
      } else if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again later.';
      } else {
        errorMessage = error.message;
      }
      set({
        error: errorMessage,
        loading: false,
        hasMore: false,
      });
      toast.error(errorMessage);
    }
  },

  // fetchOwnerMarkets: async (page = 1, limit = 10) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       toast.error('Please log in to view your listings');
  //       throw new Error('No authentication token found. Please log in again.');
  //     }

  //     const response = await axios.get('http://localhost:3000/api/markets/owner', {
  //       params: { page, limit },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const parsedMarkets = response.data.map((market) => ({
  //       ...market,
  //       services: market.services ? JSON.parse(market.services) : [],
  //       images: market.images ? JSON.parse(market.images) : [],
  //       videos: market.videos ? JSON.parse(market.videos) : [],
  //       highlights: market.highlights ? JSON.parse(market.highlights) : { spaceHighlights: [], heading2: [], heading3: [], heading4: [] },
  //     }));

  //     set((state) => ({
  //       markets: page === 1 ? parsedMarkets : [...state.markets, ...parsedMarkets],
  //       loading: false,
  //       page,
  //       hasMore: parsedMarkets.length === limit,
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching owner markets:', error);
  //     let errorMessage = 'Failed to fetch owner markets';
  //     if (error.response) {
  //       if (error.response.status === 403) {
  //         errorMessage = 'Access denied: You must be a market owner to view this page.';
  //       } else if (error.response.status === 401) {
  //         errorMessage = 'Session expired. Please log in again.';
  //         localStorage.removeItem('token');
  //         window.location.href = '/login';
  //       } else {
  //         errorMessage = error.response.data?.message || error.message;
  //       }
  //     }
  //     set({
  //       error: errorMessage,
  //       loading: false,
  //       hasMore: false,
  //     });
  //     toast.error(errorMessage);
  //   }
  // },

  approveMarket: async (marketId) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      await axios.put(
        `http://localhost:3000/api/markets/${marketId}/status`,
        { status: 'available' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      set((state) => ({
        pendingMarkets: state.pendingMarkets.map((market) =>
          market.id === marketId ? { ...market, status: 'available' } : market
        ),
        success: 'Market approved successfully',
        loading: false,
      }));
      toast.success('Market approved successfully!');
    } catch (error) {
      console.error('Error approving market:', error);
      set({
        error: `Failed to approve market: ${error.response?.data?.message || error.message}`,
        loading: false,
      });
      toast.error('Failed to approve market');
    }
  },

  rejectMarket: async (marketId) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      await axios.put(
        `http://localhost:3000/api/markets/${marketId}/status`,
        { status: 'rejected' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      set((state) => ({
        pendingMarkets: state.pendingMarkets.map((market) =>
          market.id === marketId ? { ...market, status: 'rejected' } : market
        ),
        success: 'Market rejected successfully',
        loading: false,
      }));
      toast.success('Market rejected successfully!');
    } catch (error) {
      console.error('Error rejecting market:', error);
      set({
        error: `Failed to reject market: ${error.response?.data?.message || error.message}`,
        loading: false,
      });
      toast.error('Failed to reject market');
    }
  },

  createMarket: async (marketData) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      const response = await axios.post('http://localhost:3000/api/markets', marketData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          'Content-Type': 'application/json',
        },
      });
      set({ loading: false, success: 'Market submitted for approval' });
      toast.success('Market submitted for approval!');
      return response.data;
    } catch (error) {
      console.error('Error creating market:', error);
      set({ error: `Failed to create market: ${error.response?.data?.message || error.message}`, loading: false });
      toast.error('Failed to create market');
      throw error;
    }
  },

  fetchFeaturedMarkets: async (page = 1, limit = 3) => {
    set({ loading: true, error: null });
    try {

      const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      throw new Error('No authentication token found');
    }
      const response = await axios.get('http://localhost:3000/api//featuredmarkets', {
        params: { featured: true, page, limit, status: 'available' },
      });
      const parsedMarkets = response.data.map((market) => ({
        ...market,
        services: market.services ? JSON.parse(market.services) : [],
        images: market.images ? JSON.parse(market.images) : [],
        videos: market.videos ? JSON.parse(market.videos) : [],
        highlights: market.highlights ? JSON.parse(market.highlights) : { spaceHighlights: [], heading2: [], heading3: [], heading4: [] },
      }));
      set((state) => ({
        featuredMarkets: page === 1 ? parsedMarkets : [...state.featuredMarkets, ...parsedMarkets],
        loading: false,
        featuredPage: page,
        hasMoreFeatured: parsedMarkets.length === limit,
      }));
    } catch (error) {
      console.error('Error fetching featured markets:', error);
      set({ error: 'Failed to fetch featured markets', loading: false, hasMoreFeatured: false });
    }
  },

  fetchMarketById: async (marketId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ error: 'Please log in to access this market', loading: false });
      toast.error('Please log in to access this market');
      window.location.href = '/login'; // Redirect to login page
      throw new Error('No token provided');
    }
  
    set({ loading: true, error: null, selectedMarket: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/market/${marketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ selectedMarket: response.data, loading: false });
      return response.data;
    } catch (error) {
      console.error('Error fetching market by ID:', error);
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: `Failed to fetch market: ${errorMessage}`, loading: false });
      if (error.response?.status === 403 || error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },

  sendRequest: async (requestData) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      const response = await axios.post('http://localhost:3000/api/request', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ loading: false, success: 'Request sent successfully' });
      toast.success('Request sent successfully!');
      return response.data;
    } catch (error) {
      console.error('Error sending request:', error);
      set({
        error: `Failed to send request: ${error.response?.data?.message || error.message}`,
        loading: false,
      });
      toast.error('Failed to send request');
    }
  },


  
  fetchRequests: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched Requests:', response.data);
      set({ requests: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching requests:', error);
      set({
        error: error.response?.data?.message || error.message || 'Failed to fetch requests',
        loading: false,
      });
    }
  },


  fetchRequestss: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('http://localhost:3000/api/requests', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched Requests:', response.data);
      set({ requests: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching requests:', error);
      set({
        error: error.response?.data?.message || error.message || 'Failed to fetch requests',
        loading: false,
      });
    }
  },

  // fetchRequestss: async () => {
  //   const token = localStorage.getItem('token');
  //   const vendorId = useAuthStore.getState().user?.id;
  //   set({ loading: true, error: null });

  //   console.log('Token being sent in fetchRequests:', token);

  //   if (!token) {
  //     const errorMessage = 'No authentication token found. Please log in.';
  //     set({ error: errorMessage, loading: false });
  //     toast.error(errorMessage);
  //     window.location.href = '/login';
  //     return;
  //   }

  //   if (!vendorId) {
  //     const errorMessage = 'Vendor ID not found. Please log in as a vendor.';
  //     set({ error: errorMessage, loading: false });
  //     toast.error(errorMessage);
  //     window.location.href = '/login';
  //     return;
  //   }

  //   try {
  //     const response = await axios.get('http://localhost:3000/api/requests', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       params: { vendorId },
  //     });

  //     console.log('fetchRequests response:', response.data);

  //     if (!Array.isArray(response.data)) {
  //       throw new Error('Unexpected response format: Expected an array of requests');
  //     }

  //     const parsedRequests = response.data.map((request) => {
  //       let images = request.images || [];
  //       return {
  //         ...request,
  //         images,
  //       };
  //     });

  //     set({ vendorRequests: parsedRequests, loading: false });
  //     return parsedRequests;
  //   } catch (error) {
  //     console.error('Error fetching vendor requests:', error);

  //     let errorMessage = 'Failed to fetch vendor requests';
  //     if (error.response) {
  //       if (error.response.status === 401) {
  //         errorMessage = 'Session expired. Please log in again.';
  //         localStorage.removeItem('token');
  //         window.location.href = '/login';
  //       } else if (error.response.status === 400) {
  //         errorMessage = error.response.data.message || 'Invalid request';
  //       } else {
  //         errorMessage = error.response.data?.message || error.message;
  //       }
  //     } else {
  //       errorMessage = error.message;
  //     }

  //     set({ error: errorMessage, loading: false });
  //     toast.error(errorMessage);
  //     throw error;
  //   }
  // },



  // Fetch requests for a specific vendor



  // fetchAllRequests: async () => {
  //   set({ loading: true, error: null });
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) throw new Error('No token found');

  //     const response = await axios.get('http://localhost:3000/api/admin/requests', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     console.log('Fetched All Requests for Admin:', response.data);
  //     set({ requests: response.data, loading: false });
  //   } catch (error) {
  //     console.error('Error fetching all requests for admin:', error);
  //     set({
  //       error: error.response?.data?.message || error.message || 'Failed to fetch all requests',
  //       loading: false,
  //     });
  //   }
  // },


  updateMarket: async (marketId, marketData) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      const response = await axios.put(
        `http://localhost:3000/api/market/${marketId}`,
        { ...marketData, status: 'pending' }, // Force status to 'pending' for admin approval
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      set({ loading: false, success: 'Market updated and submitted for approval' });
      toast.success('Market updated and submitted for approval!');
      return response.data;
    } catch (error) {
      console.error('Error updating market:', error);
      set({ error: `Failed to update market: ${error.response?.data?.message || error.message}`, loading: false });
      toast.error('Failed to update market');
      throw error;
    }
  },



  fetchOwnerMarkets: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      console.log('Starting fetchOwnerMarkets with token:', token);
      if (!token) {
        toast.error('Please log in to view your listings');
        throw new Error('No authentication token found. Please log in again.');
      }
  
      console.log('Sending request to /markets/owner');
      const response = await axios.get('http://localhost:3000/api/markets/owner', {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response received from /markets/owner:', response.data);
  
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format from server');
      }
  
      if (response.data.length === 0) {
        console.log('No markets returned from server');
        set({ markets: [], loading: false, hasMore: false });
        toast.info('No markets found for your account');
        return;
      }
  
      const parsedMarkets = response.data.map((market) => {
        console.log('Parsing market:', market);
        return {
          ...market,
          services: typeof market.services === 'string' ? JSON.parse(market.services) : (market.services || []),
          images: typeof market.images === 'string' ? JSON.parse(market.images) : (market.images || []),
          videos: typeof market.videos === 'string' ? JSON.parse(market.videos) : (market.videos || []),
          highlights: typeof market.highlights === 'string' ? JSON.parse(market.highlights) : (market.highlights || { spaceHighlights: [], heading2: [], heading3: [], heading4: [] }),
        };
      });
  
      set((state) => ({
        markets: page === 1 ? parsedMarkets : [...state.markets, ...parsedMarkets],
        loading: false,
        page,
        hasMore: parsedMarkets.length === limit,
      }));
    } catch (error) {
      console.error('Error in fetchOwnerMarkets:', error);
      console.log('Error response:', error.response?.data);
      let errorMessage = 'Failed to fetch owner markets';
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = 'Access denied: You must be a market owner to view this page.';
        } else if (error.response.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          errorMessage = error.response.data?.message || error.message;
        }
      }
      set({
        error: errorMessage,
        loading: false,
        hasMore: false,
      });
      toast.error(errorMessage);
    }
  },


  updateRequestStatus: async (requestId, status) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null });
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/request/${requestId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      set((state) => ({
        vendorRequests: state.vendorRequests?.map((req) =>
          req.requestId === requestId ? { ...req, status } : req
        ),
        ownerRequests: state.ownerRequests?.map((req) =>
          req.requestId === requestId ? { ...req, status } : req
        ),
        loading: false,
        success: 'Status updated successfully',
      }));
      toast.success('Status updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Error updating request status:', error);
      set({
        error: `Failed to update status: ${error.response?.data?.message || error.message}`,
        loading: false,
      });
      toast.error('Failed to update status');
      throw error;
    }
  },

  setFilters: (newFilters) => set((state) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    return {
      filters: updatedFilters,
      page: 1,
      markets: [],
      hasMore: true,
    };
  }),

  setSizeRange: (size) => set((state) => ({
    filters: { ...state.filters, size },
    page: 1,
    markets: [],
    hasMore: true,
  })),

  setPriceRange: (price) => set((state) => ({
    filters: { ...state.filters, price },
    page: 1,
    markets: [],
    hasMore: true,
  })),

  setLocation: (location) => set((state) => ({
    filters: { ...state.filters, location },
    page: 1,
    markets: [],
    hasMore: true,
  })),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useMarketStore;