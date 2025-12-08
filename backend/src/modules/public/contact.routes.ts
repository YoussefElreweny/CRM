import { Router } from 'express';
import * as contactController from './contact.controller';
import { protect, restrictTo } from '../../middleware/auth.middleware';

const router = Router();

// Public route - no auth required
router.post('/', contactController.submitContactForm);

// Admin routes - protected
router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/', contactController.getAllInquiries);
router.delete('/:id', contactController.deleteInquiry);

export default router;
