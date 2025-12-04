import apiClient from './api.service';

export interface Campaign {
    id: string;
    name: string;
    description?: string;
    status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'PAUSED';
    startDate?: string;
    endDate?: string;
    createdAt: string;
    client?: {
        companyName: string;
        user: {
            email: string;
        };
    };
    _count?: {
        calls: number;
        campaignContacts: number;
    };
}

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

// Get all campaigns
export const getCampaigns = async (): Promise<Campaign[]> => {
    const response = await apiClient.get('/api/campaigns');
    return response.data.data.campaigns;
};

// Get single campaign
export const getCampaign = async (id: string): Promise<Campaign> => {
    const response = await apiClient.get(`/api/campaigns/${id}`);
    return response.data.data.campaign;
};

// Create new campaign
export const createCampaign = async (data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.post('/api/campaigns', data);
    return response.data.data.campaign;
};

// Update campaign
export const updateCampaign = async (id: string, data: Partial<Campaign>): Promise<Campaign> => {
    const response = await apiClient.put(`/api/campaigns/${id}`, data);
    return response.data.data.campaign;
};

// Delete campaign
export const deleteCampaign = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/campaigns/${id}`);
};

// Get campaign statistics
export const getCampaignStats = async (id: string): Promise<CampaignStats> => {
    const response = await apiClient.get(`/api/campaigns/${id}/stats`);
    return response.data.data.stats;
};
