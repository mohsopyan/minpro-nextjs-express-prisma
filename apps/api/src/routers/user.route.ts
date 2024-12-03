import { Router } from 'express';
import { getUserProfile, updateUserProfile, getUserByEmail } from '@/controllers/user.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = Router();

// Rute untuk mendapatkan profil pengguna
// Menggunakan middleware isAuthenticated untuk memastikan hanya pengguna yang terautentikasi yang dapat mengaksesnya
router.get('/profile', isAuthenticated, getUserProfile);

// Rute untuk memperbarui profil pengguna
// Menggunakan middleware isAuthenticated untuk memastikan hanya pengguna yang terautentikasi yang dapat mengaksesnya
router.put('/profile', isAuthenticated, updateUserProfile);

// Rute untuk mendapatkan data pengguna berdasarkan email
// Menggunakan middleware isAuthenticated untuk memastikan hanya pengguna yang terautentikasi yang dapat mengaksesnya
router.get('/email/:email', isAuthenticated, getUserByEmail);

export default router;
