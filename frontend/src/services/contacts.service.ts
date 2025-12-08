import apiClient from './api.service';

export interface Contact {
    id: string;
    name: string;
    phone: string;
    neighborhood?: string;
    customFields?: any;
    createdAt: string;
}

export const uploadContacts = async (file: File): Promise<{ count: number; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/contacts/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getContacts = async (): Promise<Contact[]> => {
    const response = await apiClient.get('/contacts');
    return response.data.data;
};
