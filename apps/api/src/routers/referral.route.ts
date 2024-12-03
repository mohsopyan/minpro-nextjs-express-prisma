import { Router } from 'express';
import { registerWithReferral, getReferralInfo, getReferredUsers } from '@/controllers/referral.controller';
import { isAuthenticated, protectRoute } from '@/middleware/auth.middleware'; 

const router = Router();

// Rute untuk mendaftar dengan referral code
// Menggunakan middleware isAuthenticated untuk memastikan user terautentikasi
// dan middleware protectRoute jika ingin memverifikasi peran (misalnya role 'attendee' atau 'organizer')
router.post('/register', isAuthenticated, registerWithReferral);

// Rute untuk mendapatkan informasi tentang referral dari user
router.get('/info', isAuthenticated, getReferralInfo);

// Rute untuk mendapatkan daftar pengguna yang menggunakan referral code milik user
router.get('/referred-users', isAuthenticated, getReferredUsers);

export default router;
