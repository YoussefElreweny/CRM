
export type UserRole = 'Client' | 'Admin' | 'QA Team';

export interface User {
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  dateCreated: string;
  successRate: number;
  client?: string;
}

export interface Client {
    id: string;
    companyName: string;
    email: string;
    status: 'Active' | 'Suspended';
    createdDate: string;
}

export interface SystemLog {
    id: string;
    timestamp: string;
    event: string;
    type: 'Info' | 'Warning' | 'Error';
}

export interface CallToReview {
    id: string;
    date: string;
    campaign: string;
    aiClassification: string;
    humanReview: string | null;
    status: 'Pending' | 'Corrected' | 'Verified';
}
