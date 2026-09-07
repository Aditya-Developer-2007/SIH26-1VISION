import express from 'express';
import { getCentres, getCentreById, getCentreSlots } from '../controllers/centreController.js';

const router = express.Router();

router.get('/', getCentres);
router.get('/:id', getCentreById);
router.get('/:id/slots', getCentreSlots);

export default router;
