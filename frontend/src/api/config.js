import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    try {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
    } catch (error) {
        console.error('API Config Error:', error);
    }
    return config;
});

export default api;
export { API_BASE_URL };
