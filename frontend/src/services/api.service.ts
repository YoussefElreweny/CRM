import axios, { AxiosInstance, AxiosError } from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor - attach JWT token to all requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                // You could dispatch a logout action here if using state management
            }

            // Return error message from backend
            const errorMessage = (error.response.data as any)?.message || 'An error occurred';
            return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
            // Request made but no response received
            return Promise.reject(new Error('No response from server. Please check your connection.'));
        } else {
            // Something else happened
            return Promise.reject(new Error('Request failed. Please try again.'));
        }
    }
);

export const submitContactForm = async (data: { firstName: string; lastName: string; email: string; subject: string; message: string }) => {
    return apiClient.post('/api/contact', data);
};

export const getInquiries = async () => {
    const response = await apiClient.get('/api/contact');
    return response.data.data.inquiries;
};

export const deleteInquiry = async (id: string) => {
    await apiClient.delete(`/api/contact/${id}`);
};

export default apiClient;
