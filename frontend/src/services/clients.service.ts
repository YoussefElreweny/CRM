import apiClient from './api.service';

export interface ClientData {
    id: string;
    companyName: string;
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
    };
    _count?: {
        campaigns: number;
        contacts: number;
    };
    campaigns?: Array<{
        id: string;
        name: string;
        status: string;
        createdAt: string;
    }>;
}

// Get all clients (Admin only)
export const getClients = async (): Promise<ClientData[]> => {
    const response = await apiClient.get('/api/clients');
    return response.data.data.clients;
};

// Get single client
export const getClient = async (id: string): Promise<ClientData> => {
    const response = await apiClient.get(`/api/clients/${id}`);
    return response.data.data.client;
};

// Update client
export const updateClient = async (id: string, data: Partial<ClientData>): Promise<ClientData> => {
    const response = await apiClient.put(`/api/clients/${id}`, data);
    return response.data.data.client;
};

// Delete client
export const deleteClient = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/clients/${id}`);
};
