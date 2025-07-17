import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import memberRoutes from './routes/memberRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import verifyToken from './middleware/authMiddleware.js';
import eventRoutes from './routes/eventRoutes.js'
import leaderRoutes from './routes/leader.route.js';

import socialRoutes from './routes/socialRoutes.js';

import authRoutes from './routes/authRoutes.js';

import recruitmentRoutes from './routes/recruitmentRoutes.js';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();

const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
     origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/members', verifyToken, memberRoutes);


app.use('/api/socials', socialRoutes);

app.use('/api/events', eventRoutes);
app.use("/api/leaders", leaderRoutes);

app.use('/api/recruitment', recruitmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
