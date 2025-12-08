import apiClient from './api.service';

export interface DashboardStats {
    activeCampaigns: number;
    totalCalls: number;
    successRate: number;
    aiAccuracy: number;
}

export interface PerformanceData {
    name: string;
    successRate: number;
    engagement: number;
}

export interface RecentCampaign {
    id: string;
    name: string;
    status: string;
    createdAt: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await apiClient.get('/api/analytics/dashboard-stats');
    return response.data.data;
};

export const getPerformanceData = async (): Promise<PerformanceData[]> => {
    const response = await apiClient.get('/api/analytics/performance');
    return response.data.data;
};

export const getRecentCampaigns = async (limit: number = 4): Promise<RecentCampaign[]> => {
    const response = await apiClient.get(`/api/analytics/recent-campaigns?limit=${limit}`);
    return response.data.data;
};
