import express from 'express';
import { 
  getFarmerDashboard, 
  getFarmerProcurements, 
  getFarmerProcurementById,
  getFarmerPaymentById,
  getFarmerProfile, 
  updateFarmerProfile, 
  getCrops, 
  getCentres, 
  registerCropAndBookSlot, 
  getFarmerDocuments, 
  getFarmerGrievances, 
  createFarmerGrievance 
} from '../controllers/farmerController.js';
import { requireAuth, requireRole, requireSelfAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole('FARMER'));

router.get('/dashboard', getFarmerDashboard);
router.get('/procurements', getFarmerProcurements);
router.get('/procurements/:id', requireSelfAccess, getFarmerProcurementById);
router.post('/procurements', registerCropAndBookSlot);
router.get('/payments/:id', requireSelfAccess, getFarmerPaymentById);
router.get('/profile', getFarmerProfile);
router.put('/profile', updateFarmerProfile);
router.get('/crops', getCrops);
router.get('/centres', getCentres);
router.get('/documents', getFarmerDocuments);
router.get('/grievances', getFarmerGrievances);
router.post('/grievances', createFarmerGrievance);

export default router;
