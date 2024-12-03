// utils/api.ts
import axios from 'axios';

// Membuat instance Axios dengan konfigurasi dasar
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Sesuaikan dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Jika Anda menggunakan token atau autentikasi lainnya, Anda bisa menambahkan interceptors
api.interceptors.request.use(
  (config) => {
    // Misalnya, menambahkan token yang disimpan di localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
