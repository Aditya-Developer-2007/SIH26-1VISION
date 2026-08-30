import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import officerRoutes from './routes/officerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import centreRoutes from './routes/centreRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/officer', officerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/centres', centreRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/documents', documentRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'AgroCure Backend API',
    version: '1.0.0 (SIH 2026)',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[AGROCURE SERVER] Running on port ${PORT}`);
  console.log(`[AGROCURE SERVER] Prototype demo store initialized with realistic Indian agricultural data.`);
});

export default app;
