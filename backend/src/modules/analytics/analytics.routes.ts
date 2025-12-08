import { Router } from 'express';
import { protect, restrictTo } from '../../middleware/auth.middleware';
import * as analyticsController from './analytics.controller';

const router = Router();

// All routes require authentication and CLIENT role
router.use(protect);
router.use(restrictTo('CLIENT'));

router.get('/dashboard-stats', analyticsController.getDashboardStats);
router.get('/performance', analyticsController.getPerformanceData);
router.get('/recent-campaigns', analyticsController.getRecentCampaigns);

export default router;
