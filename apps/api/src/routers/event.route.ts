import { Router } from 'express';
import { createEvent, getEvents, getEventById } from '@/controllers/event.controller';
import { isAuthenticated, protectRoute } from '@/middleware/auth.middleware';  // Perbaiki import di sini
import { param, validationResult } from 'express-validator'; // Menambahkan express-validator untuk validasi

const router = Router();

// Rute untuk membuat event (hanya untuk organizer)
router.post(
  '/create',
  isAuthenticated, // Memastikan user terautentikasi
  protectRoute('ORGANIZER'), // Memastikan user memiliki role "organizer"
  createEvent
);

// Rute untuk mendapatkan semua event
router.get('/events', getEvents);

// Rute untuk mendapatkan event berdasarkan ID
router.get(
  '/events/:id',
  param('id').isInt().withMessage('Invalid event ID'), // Validasi parameter ID (harus integer)
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Lanjut ke controller jika validasi berhasil
  },
  getEventById // Controller untuk mendapatkan event berdasarkan ID
);

export default router;
