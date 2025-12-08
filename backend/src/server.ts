import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Config
dotenv.config();

// Imports
import authRoutes from './modules/auth/auth.routes';
import contactRoutes from './modules/contacts/routes';
import campaignsRoutes from './modules/campaigns/campaigns.routes';
import usersRoutes from './modules/users/users.routes';
import clientsRoutes from './modules/clients/clients.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import callsRoutes from './modules/calls/calls.routes';
import systemRoutes from './modules/system/system.routes';
import publicContactRoutes from './modules/public/contact.routes';
import { globalErrorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';
import { protect, restrictTo } from './middleware/auth.middleware';

// App Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost and IP
  credentials: true, // Allow cookies/auth headers
})); // Allow browser access
app.use(express.json()); // Parse JSON body
app.use(morgan('dev')); // Logging

// --- ROUTES ---

// Auth routes
app.use('/auth', authRoutes);

// API routes
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/contact', publicContactRoutes); // Public contact form

// 2. Protected Routes (Token Required)
// Clients only can access /contacts
app.use('/contacts', protect, restrictTo('CLIENT'), contactRoutes);


// 3. Test/Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'CRM Backend Running' });
});

// 404 Handler (Route not found)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});