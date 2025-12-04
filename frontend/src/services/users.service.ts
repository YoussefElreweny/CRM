import apiClient from './api.service';
import { User } from '../types';

export interface UserProfile extends User {
    id: string;
    createdAt: string;
    client?: {
        id: string;
        companyName: string;
    };
}

// Get current user profile
export const getMyProfile = async (): Promise<UserProfile> => {
    const response = await apiClient.get('/api/users/me');
    return response.data.data.user;
};

// Update current user profile
export const updateMyProfile = async (data: {
    name?: string;
    email?: string;
    password?: string;
    companyName?: string;
}): Promise<UserProfile> => {
    const response = await apiClient.put('/api/users/me', data);
    return response.data.data.user;
};
