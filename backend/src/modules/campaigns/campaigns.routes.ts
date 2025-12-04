import { Router } from 'express';
import { protect, restrictTo } from '../../middleware/auth.middleware';
import * as campaignsController from './campaigns.controller';

const router = Router();

// All routes require authentication
router.use(protect);

// Campaign routes
router
    .route('/')
    .get(campaignsController.getAllCampaigns)
    .post(restrictTo('CLIENT'), campaignsController.createCampaign);

router
    .route('/:id')
    .get(campaignsController.getCampaign)
    .put(campaignsController.updateCampaign)
    .delete(campaignsController.deleteCampaign);

router
    .route('/:id/stats')
    .get(campaignsController.getCampaignStats);

export default router;
