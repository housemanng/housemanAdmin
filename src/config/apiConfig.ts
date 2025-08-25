import axios from 'axios';

//export const API_URL = "http://localhost:8080/api";
/// <reference types="vite/client" />

// Prefer a single env var for backend URL
let API_URL = import.meta.env.VITE_HOUSEMAN_API_URL || '';

// Fallback for local development
if (!API_URL) {
  API_URL = 'http://localhost:8080/api';
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - automatically log out
      console.log('Token expired or invalid. Logging out...');
      
      // Clear all auth data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      
      // Show user-friendly message
      if (typeof window !== 'undefined') {
        // Use SweetAlert2 if available, otherwise use alert
        if ((window as any).Swal) {
          (window as any).Swal.fire({
            icon: 'info',
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = '/adminlogin';
          });
        } else {
          alert('Your session has expired. Please log in again.');
          window.location.href = '/adminlogin';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
