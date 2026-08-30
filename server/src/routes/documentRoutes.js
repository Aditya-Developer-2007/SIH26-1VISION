import express from 'express';
import { downloadDocument } from '../controllers/documentController.js';

const router = express.Router();

router.get('/download/:id', downloadDocument);

export default router;
