import axios from 'axios';

// Base instances for the different microservices based on port numbers
const authApi = axios.create({
  baseURL: 'http://localhost:4001/api/auth',
});

const kycApi = axios.create({
  baseURL: 'http://localhost:4002/api/kyc',
});

const documentApi = axios.create({
  baseURL: 'http://localhost:4003/api/documents',
});

const adminApi = axios.create({
  baseURL: 'http://localhost:4004/api/admin',
});

// Helper to get tokens
const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');
const setTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
};

// Add Authorization header to all requests
const setupRequestInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
};

[authApi, kycApi, documentApi, adminApi].forEach(setupRequestInterceptor);

// Handle 401 Unauthorized for token refresh
const setupResponseInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401 and we haven't already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error('No refresh token available');
          
          // Request new token
          const res = await axios.post('http://localhost:4001/api/auth/refresh-token', {
            refreshToken
          });
          
          const newAccessToken = res.data.accessToken;
          setTokens(newAccessToken);
          
          // Retry the original request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

[authApi, kycApi, documentApi, adminApi].forEach(setupResponseInterceptor);

export { authApi, kycApi, documentApi, adminApi, setTokens };
