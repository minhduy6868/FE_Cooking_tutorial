// src/services/httpClient.ts
import axios from 'axios';

// Hàm để lấy token từ localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Tạo axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080', // Base URL của API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm token vào request headers nếu có
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
