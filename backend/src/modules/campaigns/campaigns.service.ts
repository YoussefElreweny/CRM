import prisma from '../../config/prisma';
import { AppError } from '../../utils/AppError';
import fs from 'fs';
import csv from 'csv-parser';

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
export const createCampaign = async (userId: string, data: any, filePath?: string) => {
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
            // @ts-ignore
            details: data.details,
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

    // If file provided, process it
    if (filePath) {
        const contacts: any[] = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row: any) => {
                    // Normalize headers slightly if needed, but assuming standard headers for now
                    // Expected headers: name, phone, neighborhood, etc.
                    if (row.name && row.phone) {
                        // For now we do sequential creates to restart simpler (could leverage createMany if no linking needed immediately)
                        // But we need to link to campaign.
                        // Ideally: Create Contact -> Create CampaignContact

                        // We will just process - this logic is fine but we'll wrap it in try catch if needed
                        // or better, delegate to contacts service? For now keep inline to minimize diff

                        // Saving logic placeholder or keep existing if it was working
                        // Since I replaced the logic in previous step, I should keep it or re-add it if I am replacing the block
                        // The user approved removal of file upload from *Campaign Creation*, but keeping the logic in backend *optionally* is fine or we can remove it to clean up.
                        // The plan said "Remove mandatory file logic".
                        // So I will keep it optional for backward compatibility or future flexibility.
                        contacts.push({
                            clientId: client.id,
                            name: row.name,
                            phone: row.phone,
                            neighborhood: row.neighborhood || null,
                            customFields: row // Store everything else as custom fields
                        });
                    }
                })
                .on('end', async () => {
                    try {
                        // Create contacts in batch (transactional ideally, but let's do simple first)
                        // Note: createMany is faster
                        if (contacts.length > 0) {
                            // We need to insert contacts and then link them.
                            // createMany doesn't return IDs in all DBs (Postgres does, but Prisma only returns count).

                            // So we have to loop or use a more complex query.
                            // For now, let's just loop and create. It's slower but safe for getting IDs.

                            for (const contactData of contacts) {
                                const contact = await prisma.contact.create({
                                    data: contactData
                                });

                                await prisma.campaignContact.create({
                                    data: {
                                        campaignId: campaign.id,
                                        contactId: contact.id
                                    }
                                });
                            }
                        }

                        // Clean up file
                        fs.unlinkSync(filePath);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
    }

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
