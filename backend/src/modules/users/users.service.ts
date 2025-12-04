import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';
import bcrypt from 'bcryptjs';

// Get user profile with client info if applicable
export const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            client: {
                select: {
                    id: true,
                    companyName: true
                }
            }
        }
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
};

// Update user profile
export const updateUserProfile = async (userId: string, data: any) => {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 12);
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            client: {
                select: {
                    id: true,
                    companyName: true
                }
            }
        }
    });

    // Update client company name if provided
    if (data.companyName && user.client) {
        await prisma.client.update({
            where: { id: user.client.id },
            data: { companyName: data.companyName }
        });
    }

    return user;
};
