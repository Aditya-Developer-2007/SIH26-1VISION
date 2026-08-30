import express from 'express';
import { getOfficerDashboard, verifyTokenAndGetDetails, submitQualityAndWeighment } from '../controllers/officerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, getOfficerDashboard);
router.get('/token/:tokenNumber', protect, verifyTokenAndGetDetails);
router.post('/weighment', protect, submitQualityAndWeighment);

export default router;
