// src/store/authStore.js
import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  signupUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/api/register', userData);
      const { user, token } = response.data; // Expect user and token from backend
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, loading: false });
      return { user, token };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  loginUser: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const userResponse = await axios.get(`http://localhost:3000/api/user/${decoded.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = userResponse.data;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, loading: false });
      return { token, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logoutUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, error: null, loading: false });
  },

  checkAuth: async () => {
    set({ loading: true }); // Indicate auth check is in progress
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userResponse = await axios.get(`http://localhost:3000/api/user/${decoded.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data;
        localStorage.setItem('user', JSON.stringify(user)); // Update localStorage if user data changes
        set({ user, token, loading: false });
        return true; // Indicate success
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, loading: false });
        return false; // Indicate failure
      }
    } else {
      set({ loading: false });
      return false; // No token present
    }
  },
}));

// Optionally call checkAuth on store initialization (not always reliable in React)
useAuthStore.getState().checkAuth();

export default useAuthStore;