import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/AppError';
import * as callsService from './calls.service';
import { CallOutcome } from '@prisma/client';

interface AuthRequest extends Request {
    user?: any;
}

export const getCallsToReview = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const calls = await callsService.getCallsToReview(limit);

    res.json({
        status: 'success',
        results: calls.length,
        data: calls
    });
});

export const getQAStats = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const stats = await callsService.getQAStats();

    res.json({
        status: 'success',
        data: stats
    });
});

export const updateCallReview = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { classification, feedbackNotes } = req.body;
    const qaUserId = req.user?.id;

    if (!qaUserId) {
        return next(new AppError('User not authenticated', 401));
    }

    if (!classification || !Object.values(CallOutcome).includes(classification)) {
        return next(new AppError('Valid classification is required', 400));
    }

    const updatedCall = await callsService.updateCallReview(
        id,
        qaUserId,
        classification as CallOutcome,
        feedbackNotes
    );

    res.json({
        status: 'success',
        data: updatedCall
    });
});

export const getRecentQAActivity = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const activity = await callsService.getRecentQAActivity(limit);

    res.json({
        status: 'success',
        results: activity.length,
        data: activity
    });
});
