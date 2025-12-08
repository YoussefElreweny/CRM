import apiClient from './api.service';

export interface CallToReview {
    id: string;
    campaign: {
        name: string;
        client: {
            companyName: string;
        };
    };
    contact: {
        name: string;
        phone: string;
    };
    ai_classification: string;
    qa_classification: string | null;
    createdAt: string;
}

export interface QAStats {
    reviewedLast24h: number;
    pendingReviews: number;
    accuracyRate: string;
}

export interface QAActivity {
    id: string;
    call: {
        campaign: {
            name: string;
        };
    };
    user: {
        name: string;
    };
    oldClassification: string;
    newClassification: string;
    feedbackNotes?: string;
    createdAt: string;
}

export const getCallsToReview = async (limit: number = 50): Promise<CallToReview[]> => {
    const response = await apiClient.get(`/api/calls/review?limit=${limit}`);
    return response.data.data;
};

export const getQAStats = async (): Promise<QAStats> => {
    const response = await apiClient.get('/api/calls/stats');
    return response.data.data;
};

export const getRecentQAActivity = async (limit: number = 10): Promise<QAActivity[]> => {
    const response = await apiClient.get(`/api/calls/activity?limit=${limit}`);
    return response.data.data;
};

export const updateCallReview = async (
    callId: string,
    classification: string,
    feedbackNotes?: string
): Promise<void> => {
    await apiClient.patch(`/api/calls/${callId}/review`, {
        classification,
        feedbackNotes
    });
};
