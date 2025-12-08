import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/AppError';
import * as analyticsService from './analytics.service';

interface AuthRequest extends Request {
    user?: any;
}

export const getDashboardStats = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const clientId = req.user?.client?.id;

    if (!clientId) {
        return next(new AppError('No client profile found', 403));
    }

    const stats = await analyticsService.getDashboardStats(clientId);

    res.json({
        status: 'success',
        data: stats
    });
});

export const getPerformanceData = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const clientId = req.user?.client?.id;

    if (!clientId) {
        return next(new AppError('No client profile found', 403));
    }

    const performanceData = await analyticsService.getPerformanceData(clientId);

    res.json({
        status: 'success',
        data: performanceData
    });
});

export const getRecentCampaigns = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const clientId = req.user?.client?.id;

    if (!clientId) {
        return next(new AppError('No client profile found', 403));
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
    const campaigns = await analyticsService.getRecentCampaigns(clientId, limit);

    res.json({
        status: 'success',
        data: campaigns
    });
});
