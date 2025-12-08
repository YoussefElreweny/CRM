import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';

// Public: Submit a contact form
export const submitContactForm = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, subject, message } = req.body;

    const inquiry = await prisma.contactInquiry.create({
        data: {
            firstName,
            lastName,
            email,
            subject,
            message
        }
    });

    res.status(200).json({
        status: 'success',
        message: 'Thank you for contacting us! We have received your message.',
        data: { inquiry }
    });
});

// Admin: Get all inquiries
export const getAllInquiries = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const inquiries = await prisma.contactInquiry.findMany({
        orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
        status: 'success',
        results: inquiries.length,
        data: { inquiries }
    });
});

// Admin: Delete an inquiry
export const deleteInquiry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.contactInquiry.delete({
        where: { id }
    });

    res.status(204).json({
        status: 'success',
        data: null
    });
});
