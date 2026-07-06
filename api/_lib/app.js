import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import letterRoutes from './routes/letterRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/letters', letterRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/timeline', timelineRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
