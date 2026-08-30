import express from 'express';
import { getCentres, getCentreById } from '../controllers/centreController.js';

const router = express.Router();

router.get('/', getCentres);
router.get('/:id', getCentreById);

export default router;
