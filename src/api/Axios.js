import axiosBase from 'axios'

const instance = axiosBase.create({
  baseURL: 'http://127.0.0.1:8000/api',  // NOT https
  baseURL: 'http://localhost:8000/api',//'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // récupère le token
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // ajoute au header
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default instance;

