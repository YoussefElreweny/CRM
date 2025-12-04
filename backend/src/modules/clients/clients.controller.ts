import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import * as clientsService from './clients.service';

// Get all clients (Admin only)
export const getAllClients = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const clients = await clientsService.getClients();

    res.status(200).json({
        status: 'success',
        results: clients.length,
        data: { clients }
    });
});

// Get single client
export const getClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const client = await clientsService.getClientById(id);

    res.status(200).json({
        status: 'success',
        data: { client }
    });
});

// Update client (e.g., suspend/activate)
export const updateClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const client = await clientsService.updateClient(id, req.body);

    res.status(200).json({
        status: 'success',
        data: { client }
    });
});

// Delete client
export const deleteClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await clientsService.deleteClient(id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});
