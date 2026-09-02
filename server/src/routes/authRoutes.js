import express from 'express';
import { loginUser, getUserProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', requireAuth, getUserProfile);

export default router;
