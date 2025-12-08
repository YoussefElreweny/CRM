import { Router } from 'express';
import { protect, restrictTo } from '../../middleware/auth.middleware';
import * as systemController from './system.controller';

const router = Router();

// All routes require authentication and ADMIN role
router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/logs', systemController.getSystemLogs);
router.get('/health', systemController.getSystemHealth);

export default router;
