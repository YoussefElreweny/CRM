import apiClient from './api.service';

export interface SystemLog {
    id: string;
    timestamp: string;
    event: string;
    type: 'Info' | 'Warning' | 'Error';
}

export interface SystemHealth {
    users: number;
    clients: number;
    campaigns: number;
    activeCampaigns: number;
    totalCalls: number;
    callsLast24h: number;
    status: string;
    uptime: number;
}

export const getSystemLogs = async (limit: number = 20): Promise<SystemLog[]> => {
    const response = await apiClient.get(`/api/system/logs?limit=${limit}`);
    return response.data.data;
};

export const getSystemHealth = async (): Promise<SystemHealth> => {
    const response = await apiClient.get('/api/system/health');
    return response.data.data;
};
