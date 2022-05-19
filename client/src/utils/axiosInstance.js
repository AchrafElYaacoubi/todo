import axios from 'axios';
import { getApiBaseUrl } from './api';

const baseUrl = getApiBaseUrl();

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    contentType: 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.token) {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
