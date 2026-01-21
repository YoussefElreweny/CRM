import prisma from '../../config/prisma';

// Get dashboard statistics for CLIENT role
export const getDashboardStats = async (clientId: string) => {
    // Get active campaigns count
    const activeCampaigns = await prisma.campaign.count({
        where: {
            clientId,
            status: 'ACTIVE'
        }
    });

    // Get total calls
    const totalCalls = await prisma.call.count({
        where: {
            campaign: {
                clientId
            }
        }
    });

    // Calculate success rate (qualified + follow_up calls / total calls)
    const successfulCalls = await prisma.call.count({
        where: {
            campaign: { clientId },
            final_classification: {
                in: ['QUALIFIED', 'FOLLOW_UP']
            }
        }
    });

    const successRate = totalCalls > 0
        ? Math.round((successfulCalls / totalCalls) * 100)
        : 0;

    // Get AI accuracy (calls where qa_classification matches ai_classification)
    const reviewedCalls = await prisma.call.count({
        where: {
            campaign: { clientId },
            qa_classification: { not: null }
        }
    });

    // Count calls where AI and QA classifications match
    // We need to use raw SQL for this comparison since Prisma doesn't support field-to-field comparison
    const accurateCallsResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*)::int as count
        FROM "Call" c
        INNER JOIN "Campaign" camp ON c."campaignId" = camp.id
        WHERE camp."clientId" = ${clientId}
        AND c.qa_classification IS NOT NULL
        AND c.ai_classification = c.qa_classification
    `;

    const accurateCalls = Number(accurateCallsResult[0]?.count || 0);

    const aiAccuracy = reviewedCalls > 0
        ? Math.round((accurateCalls / reviewedCalls) * 100)
        : 96; // Default value if no reviews yet

    return {
        activeCampaigns,
        totalCalls,
        successRate,
        aiAccuracy
    };
};

// Get performance data over time (for charts)
export const getPerformanceData = async (clientId: string) => {
    // We want data for the last 7 months
    // Efficient aggregation using groupBy is tricky with "by month" in Prisma without raw SQL for dates
    // But we can approximate or use raw SQL which is cleaner for time-series aggregation

    const stats = await prisma.$queryRaw<Array<{
        month_year: string,
        total_calls: bigint,
        successful_calls: bigint
    }>>`
        SELECT 
            TO_CHAR(c."createdAt", 'Mon YYYY') as month_year,
            COUNT(*)::int as total_calls,
            COUNT(CASE WHEN c.final_classification IN ('QUALIFIED', 'FOLLOW_UP') THEN 1 END)::int as successful_calls
        FROM "Call" c
        JOIN "Campaign" camp ON c."campaignId" = camp.id
        WHERE camp."clientId" = ${clientId}
        AND c."createdAt" >= NOW() - INTERVAL '7 months'
        GROUP BY TO_CHAR(c."createdAt", 'Mon YYYY'), DATE_TRUNC('month', c."createdAt")
        ORDER BY DATE_TRUNC('month', c."createdAt") ASC
    `;

    return stats.map(stat => {
        const total = Number(stat.total_calls);
        const successful = Number(stat.successful_calls);

        return {
            name: stat.month_year,
            successRate: total > 0 ? Math.round((successful / total) * 100) : 0,
            engagement: total > 0 ? Math.round((successful / total) * 85) : 0 // Simplified metric
        };
    });
};

// Get recent campaigns for CLIENT
export const getRecentCampaigns = async (clientId: string, limit: number = 4) => {
    return await prisma.campaign.findMany({
        where: { clientId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
            id: true,
            name: true,
            status: true,
            createdAt: true
        }
    });
};
