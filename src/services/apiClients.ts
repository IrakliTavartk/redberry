import axios from 'axios';

const personalToken = "f5d8988-8ce2-4b50-99f1-ee34112c4a6e";
const baseURL = 'https://momentum.redberryinternship.ge/api';


export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${personalToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
});


apiClient.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);