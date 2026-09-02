import express from 'express';
import { 
  getAdminDashboard, 
  getAdminProcurements, 
  getFarmersList, 
  getOfficersList, 
  updateOfficerAssignment, 
  getPaymentsList, 
  initiatePayment,
  getAdminCentreOfficers,
  getAdminOfficerDetails
} from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole('ADMIN'));

router.get('/dashboard', getAdminDashboard);
router.get('/procurements', getAdminProcurements);
router.get('/farmers', getFarmersList);
router.get('/officers', getOfficersList);
router.put('/officers/:officerId/assignments', updateOfficerAssignment);
router.get('/payments', getPaymentsList);
router.post('/payments/:paymentId/initiate', initiatePayment);

// Drill-down endpoints
router.get('/drilldown/centres/:centreId/officers', getAdminCentreOfficers);
router.get('/drilldown/officers/:officerId', getAdminOfficerDetails);

export default router;
