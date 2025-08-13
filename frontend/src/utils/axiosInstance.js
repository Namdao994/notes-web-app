import axios from 'axios';
import ms from 'ms';
let axiosInstance = axios.create();

axiosInstance.defaults.timeout = ms('10m');
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
