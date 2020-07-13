import axios from 'axios';
import { store } from './store/index';
import { userLogOut } from './store/current_user/actions';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
});


axiosInstance.interceptors.request.use(config => {
  if (!config.url.includes('Authenticate')) {
    const token = localStorage.token;

    if (!token) return config;

    config.headers.Authorization = token.split(' ')[1];
  }

  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.statusText && error.response.statusText === 'Unauthorized') {
    store.dispatch(userLogOut());
    return error.response;
  }
  return Promise.reject(error);
});


export default axiosInstance;
