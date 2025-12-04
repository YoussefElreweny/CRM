import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';

// Get campaigns based on user role
export const getCampaigns = async (userId: string, userRole: string) => {
    if (userRole === 'ADMIN') {
        // Admin sees all campaigns
        return await prisma.campaign.findMany({
            include: {
                client: {
                    select: {
                        companyName: true,
                        user: {
                            select: {
                                email: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        calls: true,
                        campaignContacts: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    } else {
        // Client sees only their campaigns
        const client = await prisma.client.findUnique({
            where: { userId }
        });

        if (!client) {
            throw new AppError('Client profile not found', 404);
        }

        return await prisma.campaign.findMany({
            where: { clientId: client.id },
            include: {
                _count: {
                    select: {
                        calls: true,
                        campaignContacts: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
};

// Get single campaign by ID
export const getCampaignById = async (campaignId: string, userId: string, userRole: string) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: {
            client: {
                select: {
                    companyName: true,
                    userId: true
                }
            },
            _count: {
                select: {
                    calls: true,
                    campaignContacts: true
                }
            }
        }
    });

    if (!campaign) {
        throw new AppError('Campaign not found', 404);
    }

    // Check authorization
    if (userRole !== 'ADMIN' && campaign.client.userId !== userId) {
        throw new AppError('You do not have permission to access this campaign', 403);
    }

    return campaign;
};

// Create new campaign
export const createCampaign = async (userId: string, data: any) => {
    // Get client profile
    const client = await prisma.client.findUnique({
        where: { userId }
    });

    if (!client) {
        throw new AppError('Client profile not found', 404);
    }

    const campaign = await prisma.campaign.create({
        data: {
            clientId: client.id,
            name: data.name,
            description: data.description,
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
            status: data.status || 'DRAFT'
        },
        include: {
            _count: {
                select: {
                    calls: true,
                    campaignContacts: true
                }
            }
        }
    });

    return campaign;
};

// Update campaign
export const updateCampaign = async (campaignId: string, userId: string, userRole: string, data: any) => {
    const campaign = await getCampaignById(campaignId, userId, userRole);

    const updated = await prisma.campaign.update({
        where: { id: campaignId },
        data: {
            name: data.name,
            description: data.description,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
            status: data.status
        },
        include: {
            _count: {
                select: {
                    calls: true,
                    campaignContacts: true
                }
            }
        }
    });

    return updated;
};

// Delete campaign
export const deleteCampaign = async (campaignId: string, userId: string, userRole: string) => {
    await getCampaignById(campaignId, userId, userRole);

    await prisma.campaign.delete({
        where: { id: campaignId }
    });
};

// Get campaign statistics
export const getCampaignStats = async (campaignId: string, userId: string, userRole: string) => {
    const campaign = await getCampaignById(campaignId, userId, userRole);

    // Get call statistics
    const callStats = await prisma.call.groupBy({
        by: ['final_classification'],
        where: { campaignId },
        _count: true
    });

    const totalCalls = await prisma.call.count({
        where: { campaignId }
    });

    const totalContacts = await prisma.campaignContact.count({
        where: { campaignId }
    });

    // Calculate success rate (QUALIFIED calls / total calls)
    const qualifiedCalls = callStats.find(stat => stat.final_classification === 'QUALIFIED')?._count || 0;
    const successRate = totalCalls > 0 ? Math.round((qualifiedCalls / totalCalls) * 100) : 0;

    return {
        campaignId,
        campaignName: campaign.name,
        totalContacts,
        totalCalls,
        successRate,
        callBreakdown: callStats.map(stat => ({
            classification: stat.final_classification,
            count: stat._count
        }))
    };
};
