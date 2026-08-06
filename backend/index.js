// index.js

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { app, server } from './SocketIO/server.js';

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

// CORS Middleware for API
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
try {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(' MongoDB Connected');
} catch (error) {
  console.error('❌ MongoDB connection error:', error);
}

// API Routes
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

// Start HTTP + WebSocket server
server.listen(PORT, () => {
  console.log(` Server running at localhost port:${PORT}`);
});
