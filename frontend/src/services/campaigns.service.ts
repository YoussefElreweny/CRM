import apiClient from './api.service';
import { Campaign } from '../types';

export interface CampaignStats {
    campaignId: string;
    campaignName: string;
    totalContacts: number;
    totalCalls: number;
    successRate: number;
    callBreakdown: Array<{
        classification: string;
        count: number;
    }>;
}

export const getCampaigns = async (): Promise<Campaign[]> => {
    const response = await apiClient.get('/api/campaigns');
    return response.data.data.campaigns;
};

export const getCampaign = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/api/campaigns/${id}`);
    return response.data.data.campaign;
};

export const createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.post('/api/campaigns', data);
    return response.data.data.campaign;
};

export const updateCampaign = async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.patch(`/api/campaigns/${id}`, data);
    return response.data.data.campaign;
};

export const deleteCampaign = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/campaigns/${id}`);
};

export const getCampaignStats = async (id: string): Promise<CampaignStats> => {
    const response = await apiClient.get(`/api/campaigns/${id}/stats`);
    return response.data.data.stats;
};
