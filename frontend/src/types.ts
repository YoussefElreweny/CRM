
export enum UserRole {
  Client = 'Client',
  Admin = 'Admin',
  QA = 'QA Team',
}

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
  createdAt: string;
  successRate: number;
  client?: {
    companyName: string;
    user: {
      email: string;
    };
  };
  _count?: {
    calls: number;
    campaignContacts: number;
  };
}

export interface Client {
  id: string;
  companyName: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  status: 'Active' | 'Suspended';
  createdDate: string;
  _count?: {
    campaigns: number;
    contacts: number;
  };
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
