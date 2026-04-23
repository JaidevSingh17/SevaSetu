const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Please set it in your environment variables.');
}

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const requirementRoutes = require('./src/routes/requirementRoutes');
const donationRoutes = require('./src/routes/donationRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const impactRoutes = require('./src/routes/impactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/impact', impactRoutes);

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SevaSetu API is running' });
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sevasetu';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
