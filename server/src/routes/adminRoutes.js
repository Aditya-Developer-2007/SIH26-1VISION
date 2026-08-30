import express from 'express';
import { getAdminDashboard, exportReportCsv } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', protect, getAdminDashboard);
router.get('/export-csv', protect, exportReportCsv);

export default router;
