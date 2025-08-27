import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './src/routes/authRoutes.js';
import announcementRoutes from './src/routes/announcementRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import resourceRoutes from './src/routes/resourceRoutes.js';

dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', ( req, res ) => {
  res.send('CampusBridge backend is running.... 👋');
});

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);

export default app;