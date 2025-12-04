import { Router } from 'express';
import { protect, restrictTo } from '../../middleware/auth.middleware';
import * as clientsController from './clients.controller';

const router = Router();

// All routes require authentication and admin role
router.use(protect);
router.use(restrictTo('ADMIN'));

router
    .route('/')
    .get(clientsController.getAllClients);

router
    .route('/:id')
    .get(clientsController.getClient)
    .put(clientsController.updateClient)
    .delete(clientsController.deleteClient);

export default router;
