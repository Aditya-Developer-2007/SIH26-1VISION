import express from 'express';
import { getGrievances, createGrievance, respondGrievance } from '../controllers/grievanceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getGrievances);
router.post('/', protect, createGrievance);
router.put('/:id/respond', protect, respondGrievance);

export default router;
