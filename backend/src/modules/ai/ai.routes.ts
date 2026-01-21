import { Router } from 'express';
import * as aiController from './ai.controller';

const router = Router();

// These endpoints are PUBLIC (no auth) so the simulator/external AI can access them
// In production, you'd add API key authentication

router.get('/next-call', aiController.getNextCall);
router.post('/call-result', aiController.submitResult);
router.get('/campaigns', aiController.getActiveCampaigns);

export default router;
