import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import * as systemService from './system.service';

export const getSystemLogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const logs = await systemService.getSystemLogs(limit);

    res.json({
        status: 'success',
        results: logs.length,
        data: logs
    });
});

export const getSystemHealth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const health = await systemService.getSystemHealth();

    res.json({
        status: 'success',
        data: health
    });
});
