import express from 'express';
import { downloadDocument } from '../controllers/documentController.js';
import { requireAuth, requireSelfAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.get('/download/:id', requireSelfAccess, downloadDocument);

export default router;
