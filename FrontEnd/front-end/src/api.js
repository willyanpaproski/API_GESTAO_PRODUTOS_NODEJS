import axios from 'axios';
const port = import.meta.env.VITE_API_PORT;

const api = axios.create({
    baseURL: `http://localhost:${port}/api`
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token)
    {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export default api;