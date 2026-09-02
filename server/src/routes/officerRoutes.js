import express from 'express';
import { getOfficerDashboard, getOfficerProcurements, getOfficerProcurementById, submitQualityWeighment } from '../controllers/officerController.js';
import { requireAuth, requireRole, requireCentreAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole('OFFICER'));

router.get('/dashboard', getOfficerDashboard);
router.get('/procurements', getOfficerProcurements);
router.get('/procurements/:id', requireCentreAccess, getOfficerProcurementById);
router.post('/procurements/:procurementId/quality', requireCentreAccess, submitQualityWeighment);

export default router;
