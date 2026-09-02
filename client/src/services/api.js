import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use env var in production
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiry / unauth globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't redirect if the error is from the login endpoint itself
      const isLoginRequest = error.config && error.config.url && error.config.url.includes('/auth/login');
      
      if (!isLoginRequest) {
        // Clear token and redirect to login if unauthorized
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
