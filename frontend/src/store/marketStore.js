// src/store/marketStore.js
import { create } from 'zustand';
import axios from 'axios';

const useMarketStore = create((set) => ({
  markets: [],
  filters: { location: '', price: '', size: '', type: '', sizeMin: '', sizeMax: '', priceMin: '', priceMax: '' },
  loading: false,
  error: null,
  success: null,
  page: 1,
  featuredPage: 1,
  hasMore: true,
  hasMoreFeatured: true,
  selectedMarket: null, // Add this to store the selected market

  fetchMarkets: async (filters = {}, page = 1, limit = 5) => {
    set({ loading: true, error: null });
    try {
      let { sizeMin, sizeMax, priceMin, priceMax } = filters;
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
      const updatedFilters = { ...filters, sizeMin, sizeMax, priceMin, priceMax };
      console.log('Fetching with filters:', updatedFilters);

      const response = await axios.get('http://localhost:3000/api/markets', {
        params: { ...updatedFilters, page, limit },
      });
      const parsedMarkets = response.data.map(market => ({
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
      set({ error: 'Failed to fetch markets', loading: false, hasMore: false });
    }
  },



  fetchFeaturedMarkets: async (page = 1, limit = 3) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/api/markets', {
        params: { featured: true, page, limit }, // Filter by featured
      });
      const parsedMarkets = response.data.map(market => ({
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
      console.log('Fetched featured markets:', parsedMarkets);
    } catch (error) {
      console.error('Error fetching featured markets:', error);
      set({ error: 'Failed to fetch featured markets', loading: false, hasMoreFeatured: false });
    }
  },

  fetchMarketById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/market/${id}`);
      const fetchedMarket = {
        ...response.data,
        services: response.data.services ? JSON.parse(response.data.services) : [],
        images: response.data.images ? JSON.parse(response.data.images) : [],
        videos: response.data.videos ? JSON.parse(response.data.videos) : [],
        highlights: response.data.highlights ? JSON.parse(response.data.highlights) : {},
      };
      set({ selectedMarket: fetchedMarket, loading: false });
      console.log(fetchedMarket.highlights)
      return fetchedMarket;
    } catch (error) {
      console.error('Error fetching market by ID:', error);
      set({ error: 'Failed to fetch market', loading: false });
      return null;
    }
  },

  setFilters: (newFilters) => set((state) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    console.log('setFilters - Updated filters:', updatedFilters);
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

  createMarket: async (marketData) => {
    const token = localStorage.getItem('token');
    set({ loading: true, error: null, success: null });
    try {
      const response = await axios.post('http://localhost:3000/api/market', marketData, {
        headers: { 
          Authorization: token ? `Bearer ${token}` : undefined, 
          'Content-Type': 'application/json',
        },
      });
      const newMarket = {
        id: response.data.marketId,
        ...marketData,
        services: marketData.services || [],
        images: marketData.images || [],
        videos: marketData.videos || [],
        highlights: marketData.highlights ? JSON.parse(marketData.highlights) : {},
      };
      set((state) => ({
        markets: [...state.markets, newMarket],
        loading: false,
        success: 'Market created successfully',
      }));
    } catch (error) {
      console.error('Error creating market:', error);
      set({ error: `Failed to create market: ${error.response?.data?.message || error.message}`, loading: false });
    }
  },
}));

export default useMarketStore;