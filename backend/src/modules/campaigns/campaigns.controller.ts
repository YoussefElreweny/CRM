import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import * as campaignsService from './campaigns.service';

// Get all campaigns (filtered by user role)
export const getAllCampaigns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const campaigns = await campaignsService.getCampaigns(userId, userRole);

    res.status(200).json({
        status: 'success',
        results: campaigns.length,
        data: { campaigns }
    });
});

// Get single campaign
export const getCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const campaign = await campaignsService.getCampaignById(id, userId, userRole);

    res.status(200).json({
        status: 'success',
        data: { campaign }
    });
});

// Create new campaign
export const createCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user.id;

    const campaign = await campaignsService.createCampaign(userId, req.body);

    res.status(201).json({
        status: 'success',
        data: { campaign }
    });
});

// Update campaign
export const updateCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const campaign = await campaignsService.updateCampaign(id, userId, userRole, req.body);

    res.status(200).json({
        status: 'success',
        data: { campaign }
    });
});

// Delete campaign
export const deleteCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    await campaignsService.deleteCampaign(id, userId, userRole);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// Get campaign statistics
export const getCampaignStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const stats = await campaignsService.getCampaignStats(id, userId, userRole);

    res.status(200).json({
        status: 'success',
        data: { stats }
    });
});
