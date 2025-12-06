import axios from 'axios';

// API base URL - matches your Go backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Backend response format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (using X-Auth-Token header as per backend)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and format transformation
apiClient.interceptors.response.use(
  (response) => {
    // Extract data from backend's response format
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

