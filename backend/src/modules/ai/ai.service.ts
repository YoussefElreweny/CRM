import prisma from '../../config/prisma';

// Find the next contact that hasn't been called yet
// ONLY returns contacts linked to ACTIVE campaigns
export const findNextTask = async (campaignId?: string) => {
    // Build the where clause - MUST be linked to an ACTIVE campaign
    const whereClause: any = {
        calls: {
            none: {} // Contacts with NO calls yet
        },
        // MUST have at least one link to an ACTIVE campaign
        campaignContacts: {
            some: {
                campaign: {
                    status: 'ACTIVE'
                }
            }
        }
    };

    // If specific campaignId provided, filter by that campaign
    if (campaignId) {
        whereClause.campaignContacts.some.campaignId = campaignId;
    }

    const contact = await prisma.contact.findFirst({
        where: whereClause,
        include: {
            campaignContacts: {
                where: {
                    campaign: {
                        status: 'ACTIVE'
                    }
                },
                include: {
                    campaign: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            status: true
                        }
                    }
                }
            },
            client: {
                select: {
                    companyName: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc' // Oldest first (FIFO)
        }
    });

    return contact;
};

// Save the result of an AI call
export const saveCallResult = async (data: {
    contactId: string;
    campaignId: string;
    outcome: 'QUALIFIED' | 'FOLLOW_UP' | 'NO_ANSWER' | 'NOT_INTERESTED' | 'VOICEMAIL' | 'ERROR';
    ai_notes: string;
    transcript: string;
}) => {
    // Verify the campaign exists
    const campaign = await prisma.campaign.findUnique({
        where: { id: data.campaignId }
    });

    if (!campaign) {
        throw new Error('Campaign not found');
    }

    // Create the call record
    return await prisma.call.create({
        data: {
            contactId: data.contactId,
            campaignId: data.campaignId,
            ai_notes: data.ai_notes,
            ai_classification: data.outcome,
            final_classification: data.outcome,
            transcript_text: data.transcript,
            attemptNumber: 1,
            call_time: new Date()
        }
    });
};

// Get all active campaigns (for simulator to pick one)
export const getActiveCampaigns = async () => {
    return await prisma.campaign.findMany({
        where: { status: 'ACTIVE' },
        select: {
            id: true,
            name: true,
            description: true,
            _count: {
                select: {
                    campaignContacts: true,
                    calls: true
                }
            }
        }
    });
};
