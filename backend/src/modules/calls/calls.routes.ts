import { Router } from 'express';
import { protect, restrictTo } from '../../middleware/auth.middleware';
import * as callsController from './calls.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// QA-specific routes (restricted to QA role)
router.get('/review', restrictTo('QA'), callsController.getCallsToReview);
router.get('/stats', restrictTo('QA'), callsController.getQAStats);
router.get('/activity', restrictTo('QA'), callsController.getRecentQAActivity);
router.patch('/:id/review', restrictTo('QA'), callsController.updateCallReview);

export default router;
