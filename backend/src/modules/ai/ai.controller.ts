import { Request, Response, NextFunction } from 'express';
import * as aiService from './ai.service';
import { catchAsync } from '../../utils/catchAsync';

// GET /api/ai/next-call - Get the next contact to call
export const getNextCall = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const campaignId = req.query.campaignId as string | undefined;

    const contact = await aiService.findNextTask(campaignId);

    if (!contact) {
        return res.status(200).json({
            status: 'success',
            message: 'No pending calls',
            task: null
        });
    }

    // Get the campaign info (use first linked campaign if multiple)
    const campaignInfo = contact.campaignContacts[0]?.campaign;

    res.status(200).json({
        status: 'success',
        task: {
            contactId: contact.id,
            contactName: contact.name,
            contactPhone: contact.phone,
            campaignId: campaignInfo?.id || null,
            campaignName: campaignInfo?.name || 'No Campaign',
            campaignDescription: campaignInfo?.description || '',
            companyName: contact.client.companyName,
            // The prompt that would be sent to the AI
            systemPrompt: `You are an AI sales agent for ${contact.client.companyName}. 
Campaign: ${campaignInfo?.name || 'General Outreach'}
Goal: ${campaignInfo?.description || 'Qualify leads and book appointments.'}
You are calling ${contact.name}. Be professional and helpful.`
        }
    });
});

// POST /api/ai/call-result - Submit the result of a call
export const submitResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { contactId, campaignId, outcome, ai_notes, transcript } = req.body;

    if (!contactId || !campaignId || !outcome) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing required fields: contactId, campaignId, outcome'
        });
    }

    const result = await aiService.saveCallResult({
        contactId,
        campaignId,
        outcome,
        ai_notes: ai_notes || '',
        transcript: transcript || ''
    });

    res.status(201).json({
        status: 'success',
        message: 'Call result saved',
        data: result
    });
});

// GET /api/ai/campaigns - Get active campaigns for the simulator
export const getActiveCampaigns = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const campaigns = await aiService.getActiveCampaigns();

    res.status(200).json({
        status: 'success',
        data: campaigns
    });
});
