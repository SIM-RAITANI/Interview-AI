import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Change this once, changes everywhere
    withCredentials: true
});

export default API;