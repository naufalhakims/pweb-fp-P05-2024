import { Router } from 'express';
import { login } from '../controllers/authController'; // Pastikan path-nya benar

const router = Router();

// Pastikan rute ini menggunakan `router.post` untuk mendefinisikan rute POST
router.post('/login', login);

export default router;
