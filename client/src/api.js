import axios from 'axios';

const API_URL = 'https://group15-library-backend.onrender.com'; 

const api = axios.create({
    baseURL: API_URL,
});

export default api;