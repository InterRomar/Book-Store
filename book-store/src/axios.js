import axios from 'axios';

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
  console.log(error.message);
  if (error.response.statusText === 'Unauthorized') {
    console.log(error.response.data.message);
    return error.response;
  }
  return Promise.reject(error);
});


export default axiosInstance;
