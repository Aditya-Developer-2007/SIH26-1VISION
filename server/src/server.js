import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import officerRoutes from './routes/officerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import centreRoutes from './routes/centreRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

// Pass IO instance to routes via request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log(`[SOCKET.IO] New connection: ${socket.id}`);
  
  // Dynamic room joining for real-time queue updates
  socket.on('joinQueueRoom', ({ centreId, date }) => {
    const roomName = `centre_${centreId}_${date}`;
    socket.join(roomName);
    console.log(`[SOCKET.IO] Socket ${socket.id} joined room: ${roomName}`);
  });

  socket.on('disconnect', () => {
    console.log(`[SOCKET.IO] Socket disconnected: ${socket.id}`);
  });
});

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

server.listen(PORT, () => {
  console.log(`[AGROCURE SERVER] Running on port ${PORT}`);
  console.log(`[AGROCURE SERVER] Prototype demo store initialized with realistic Indian agricultural data.`);
});

export default app;
