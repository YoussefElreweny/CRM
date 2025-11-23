import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { protect, restrictTo } from './middleware/auth.middleware';

// Config
dotenv.config();

// Imports
import authRoutes from './modules/auth/auth.routes';
import { globalErrorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

// App Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Allow browser access
app.use(express.json()); // Parse JSON body
app.use(morgan('dev')); // Logging


// --- ROUTES ---
// This hooks up your Auth module
app.use('/auth', authRoutes); 

// Test Protected Route
app.get('/api/secret', protect, (req, res) => {
  res.json({ message: '🤫 You found the secret data because you are logged in!' });
});


// Test Route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'CRM Backend Running' });
});

// 404 Handler (If user tries a route that doesn't exist)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});