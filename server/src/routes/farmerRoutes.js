import express from 'express';
import { getFarmerDashboard, registerCropAndBookSlot, getProcurementById, getDocuments } from '../controllers/farmerController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, getFarmerDashboard);
router.post('/register-crop', protect, registerCropAndBookSlot);
router.get('/procurement/:id', protect, getProcurementById);
router.get('/documents', protect, getDocuments);

export default router;
