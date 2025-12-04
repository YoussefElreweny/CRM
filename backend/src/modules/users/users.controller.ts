import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import * as usersService from './users.service';

// Get current user profile
export const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    const user = await usersService.getUserProfile(userId);

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

// Update current user profile
export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    const user = await usersService.updateUserProfile(userId, req.body);

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});
