import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // récupère le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ajoute au header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
