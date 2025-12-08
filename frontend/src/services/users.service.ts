import apiClient from './api.service';
import { User } from '../types';

export const getUserProfile = async (): Promise<User> => {
    const response = await apiClient.get('/api/users/me');
    return response.data.data.user;
};

export const updateUserProfile = async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch('/api/users/me', data);
    return response.data.data.user;
};
