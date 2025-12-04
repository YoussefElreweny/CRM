import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';

// Get all clients with user info
export const getClients = async () => {
    return await prisma.client.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            },
            _count: {
                select: {
                    campaigns: true,
                    contacts: true
                }
            }
        },
        orderBy: {
            user: {
                createdAt: 'desc'
            }
        }
    });
};

// Get single client by ID
export const getClientById = async (clientId: string) => {
    const client = await prisma.client.findUnique({
        where: { id: clientId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            },
            campaigns: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                    createdAt: true
                }
            },
            _count: {
                select: {
                    campaigns: true,
                    contacts: true
                }
            }
        }
    });

    if (!client) {
        throw new AppError('Client not found', 404);
    }

    return client;
};

// Update client
export const updateClient = async (clientId: string, data: any) => {
    const client = await getClientById(clientId);

    const updated = await prisma.client.update({
        where: { id: clientId },
        data: {
            companyName: data.companyName
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true
                }
            }
        }
    });

    return updated;
};

// Delete client (also deletes user)
export const deleteClient = async (clientId: string) => {
    const client = await getClientById(clientId);

    // Delete user (cascade will delete client)
    await prisma.user.delete({
        where: { id: client.userId }
    });
};
