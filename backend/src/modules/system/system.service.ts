import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// System log type
export interface SystemLog {
    id: string;
    timestamp: string;
    event: string;
    type: 'Info' | 'Warning' | 'Error';
}

// Get system logs (generated from recent activity)
export const getSystemLogs = async (limit: number = 20): Promise<SystemLog[]> => {
    const logs: SystemLog[] = [];

    // Get recent campaigns
    const recentCampaigns = await prisma.campaign.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
        },
        include: {
            client: {
                select: {
                    companyName: true
                }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    // Add campaign creation logs
    recentCampaigns.forEach(campaign => {
        logs.push({
            id: `camp-${campaign.id}`,
            timestamp: campaign.createdAt.toISOString(),
            event: `Campaign "${campaign.name}" ${campaign.status === 'ACTIVE' ? 'started' : 'created'} by ${campaign.client.companyName}.`,
            type: 'Info'
        });
    });

    // Get recent user registrations
    const recentUsers = await prisma.user.findMany({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
    });

    recentUsers.forEach(user => {
        logs.push({
            id: `user-${user.id}`,
            timestamp: user.createdAt.toISOString(),
            event: `${user.role} user "${user.name}" registered.`,
            type: 'Info'
        });
    });

    // Get recent QA overrides (potential issues)
    const recentOverrides = await prisma.qAOverride.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            call: {
                select: {
                    campaign: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });

    recentOverrides.forEach((override: any) => {
        if (override.oldClassification !== override.newClassification) {
            logs.push({
                id: `override-${override.id}`,
                timestamp: override.createdAt.toISOString(),
                event: `QA corrected AI classification from ${override.oldClassification} to ${override.newClassification} in campaign "${override.call.campaign.name}".`,
                type: 'Warning'
            });
        }
    });

    // Sort by timestamp descending
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return logs.slice(0, limit);
};

// Get system health metrics
export const getSystemHealth = async () => {
    const totalUsers = await prisma.user.count();
    const totalClients = await prisma.client.count();
    const totalCampaigns = await prisma.campaign.count();
    const activeCampaigns = await prisma.campaign.count({
        where: { status: 'ACTIVE' }
    });
    const totalCalls = await prisma.call.count();

    // Calls in last 24 hours
    const callsLast24h = await prisma.call.count({
        where: {
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        }
    });

    return {
        users: totalUsers,
        clients: totalClients,
        campaigns: totalCampaigns,
        activeCampaigns,
        totalCalls,
        callsLast24h,
        status: 'healthy',
        uptime: process.uptime()
    };
};
