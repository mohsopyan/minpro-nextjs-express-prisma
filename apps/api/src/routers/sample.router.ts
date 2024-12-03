// src/routers/sample.router.ts
import { Router } from 'express';
import { getSample } from '@/controllers/sample.controller'; // Pastikan path ini benar

const router = Router();

// Route untuk sample
router.get('/sample', getSample);

// Ekspor router sebagai ekspor default
export default router;
