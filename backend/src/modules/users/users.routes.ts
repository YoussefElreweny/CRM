import { Router } from 'express';
import { protect } from '../../middleware/auth.middleware';
import * as usersController from './users.controller';

const router = Router();

// All routes require authentication
router.use(protect);

router
    .route('/me')
    .get(usersController.getMe)
    .put(usersController.updateMe);

export default router;
