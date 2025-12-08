import apiClient from './api.service';
import { User, UserRole } from '../types';

// API Response Types
interface AuthResponse {
    status: string;
    data: {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            createdAt: string;
            updatedAt: string;
            companyName?: string;
        };
        token: string;
    };
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    companyName?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

// Map backend role to frontend UserRole enum
const mapBackendRole = (backendRole: string): UserRole => {
    switch (backendRole) {
        case 'CLIENT':
            return UserRole.Client;
        case 'ADMIN':
            return UserRole.Admin;
        case 'QA':
            return UserRole.QA;
        default:
            return UserRole.Client;
    }
};

// Register new user
export const register = async (data: RegisterData): Promise<User> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const { user, token } = response.data.data;

    // Store token in localStorage
    localStorage.setItem('authToken', token);

    // Create frontend User object
    const frontendUser: User = {
        name: user.name,
        email: user.email,
        role: mapBackendRole(user.role),
        companyName: user.companyName,
    };

    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(frontendUser));

    return frontendUser;
};

// Login existing user
export const login = async (data: LoginData): Promise<User> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    const { user, token } = response.data.data;

    // Store token in localStorage
    localStorage.setItem('authToken', token);

    // Create frontend User object
    const frontendUser: User = {
        name: user.name,
        email: user.email,
        role: mapBackendRole(user.role),
        companyName: user.companyName,
    };

    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(frontendUser));

    return frontendUser;
};

// Logout user
export const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
};

// Get stored token
export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!getToken();
};
