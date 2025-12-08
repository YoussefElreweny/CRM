import apiClient from './api.service';
import { Client } from '../types';

export const getClients = async (): Promise<Client[]> => {
    const response = await apiClient.get('/api/clients');
    return response.data.data.clients;
};

export const getClient = async (id: string): Promise<Client> => {
    const response = await apiClient.get(`/api/clients/${id}`);
    return response.data.data.client;
};

export const updateClient = async (id: string, data: Partial<Client>): Promise<Client> => {
    const response = await apiClient.patch(`/api/clients/${id}`, data);
    return response.data.data.client;
};

export const deleteClient = async (id: string): Promise<void> => {
    await apiClient.delete(`/api/clients/${id}`);
};
