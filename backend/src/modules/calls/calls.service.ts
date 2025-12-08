import { PrismaClient, CallOutcome } from '@prisma/client';

const prisma = new PrismaClient();

// Get calls pending QA review
export const getCallsToReview = async (limit: number = 50) => {
    return await prisma.call.findMany({
        where: {
            qa_classification: null, // Calls not yet reviewed by QA
            ai_classification: { not: 'PENDING' } // Only calls that AI has classified
        },
        include: {
            campaign: {
                select: {
                    name: true,
                    client: {
                        select: {
                            companyName: true
                        }
                    }
                }
            },
            contact: {
                select: {
                    name: true,
                    phone: true
                }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
    });
};

// Get QA statistics
export const getQAStats = async () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Calls reviewed in last 24 hours
    const reviewedLast24h = await prisma.qAOverride.count({
        where: {
            createdAt: { gte: yesterday }
        }
    });

    // Pending reviews
    const pendingReviews = await prisma.call.count({
        where: {
            qa_classification: null,
            ai_classification: { not: 'PENDING' }
        }
    });

    // Calculate accuracy improvement
    const totalReviewed = await prisma.call.count({
        where: { qa_classification: { not: null } }
    });

    // Count where AI and QA match - use raw SQL for field comparison
    const matchedResult = await prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(*)::int as count
        FROM "Call"
        WHERE qa_classification IS NOT NULL
        AND ai_classification = qa_classification
    `;

    const matched = Number(matchedResult[0]?.count || 0);

    const accuracyRate = totalReviewed > 0
        ? (matched / totalReviewed) * 100
        : 0;

    return {
        reviewedLast24h,
        pendingReviews,
        accuracyRate: accuracyRate.toFixed(1)
    };
};

// Update call review
export const updateCallReview = async (
    callId: string,
    qaUserId: string,
    newClassification: CallOutcome,
    feedbackNotes?: string
) => {
    // Get the call to check current classification
    const call = await prisma.call.findUnique({
        where: { id: callId }
    });

    if (!call) {
        throw new Error('Call not found');
    }

    // Update the call with QA classification
    const updatedCall = await prisma.call.update({
        where: { id: callId },
        data: {
            qa_classification: newClassification,
            final_classification: newClassification // QA overrides AI
        }
    });

    // If QA classification differs from AI, create an override record
    if (call.ai_classification !== newClassification) {
        await prisma.qAOverride.create({
            data: {
                qaUserId,
                callId,
                oldClassification: call.ai_classification,
                newClassification,
                feedbackNotes
            }
        });
    }

    return updatedCall;
};

// Get recent QA activity
export const getRecentQAActivity = async (limit: number = 10) => {
    return await prisma.qAOverride.findMany({
        include: {
            call: {
                select: {
                    campaign: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true
                }
            }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
    });
};
