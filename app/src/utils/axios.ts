import axios from 'axios';

const { VITE_APP_URL_API="" } = import.meta.env;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = VITE_APP_URL_API;

export default axiosInstance;
