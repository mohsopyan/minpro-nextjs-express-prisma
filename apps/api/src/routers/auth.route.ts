import { Router } from 'express';
import { Login, Register } from '@/controllers/auth.controller';
import { isAuthenticated, protectRoute } from '@/middleware/auth.middleware';
import { Role } from '@prisma/client'; // Pastikan Role diimpor dari Prisma

const router = Router();

// Rute untuk registrasi
router.post('/register', Register);

// Rute untuk login
router.post('/login', Login);


// Rute ini hanya dapat diakses oleh user dengan role "organizer"
router.get(
  '/organizer-dashboard',
  isAuthenticated, // Pertama cek apakah user terautentikasi
  protectRoute(Role.ORGANIZER), 
  (req, res) => {
    res.status(200).send("This is the organizer's dashboard.");
  },
);

export default router;
