import express from 'express';
import { login, verifyOtp, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.get('/me', protect, getMe);

export default router;
