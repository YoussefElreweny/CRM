import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/AppError';
import * as contactService from './service';

// Add 'file' to Request type
interface MulterRequest extends Request {
    file?: any; // We use 'any' or express.Multer.File if types installed
    user?: any;
}

export const uploadContacts = catchAsync(async (req: MulterRequest, res: Response, next: NextFunction) => {
    // 1. Check if file exists
    if (!req.file) {
        return next(new AppError('Please upload a CSV file', 400));
    }

    // 2. Identify the logged-in Client
    const clientId = req.user?.client?.id; 
    if (!clientId) {
        // Should verify your /login created a Client! (We'll check this)
        return next(new AppError('No client profile found for this user', 403));
    }

    // 3. Process the file
    const result = await contactService.parseAndSaveContacts(req.file.path, clientId);

    res.status(201).json({
        status: 'success',
        data: result
    });
});

export const listContacts = catchAsync(async (req: MulterRequest, res: Response, next: NextFunction) => {
    const clientId = req.user?.client?.id;
    const contacts = await contactService.getContacts(clientId);

    res.json({
        status: 'success',
        results: contacts.length,
        data: contacts
    });
});