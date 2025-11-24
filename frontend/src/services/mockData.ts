
import type { Campaign, Client, SystemLog, CallToReview } from '../types';

export const mockCampaigns: Campaign[] = [
  { id: 'c1', name: 'Q4 Lead Generation', status: 'Active', dateCreated: '2023-10-01', successRate: 85, client: 'Acme Corp' },
  { id: 'c2', name: 'New Product Launch', status: 'Completed', dateCreated: '2023-09-15', successRate: 92, client: 'Globex Inc.' },
  { id: 'c3', name: 'Customer Feedback Outreach', status: 'Active', dateCreated: '2023-10-05', successRate: 78, client: 'Stark Industries' },
  { id: 'c4', name: 'Holiday Promotions', status: 'Paused', dateCreated: '2023-09-28', successRate: 0, client: 'Acme Corp' },
  { id: 'c5', name: 'Website Visitors Follow-up', status: 'Draft', dateCreated: '2023-10-10', successRate: 0, client: 'Wayne Enterprises' },
];

export const mockClientCampaigns: Campaign[] = mockCampaigns.filter(c => c.client === 'Acme Corp');

export const mockClients: Client[] = [
    { id: 'cl1', companyName: 'Acme Corp', email: 'contact@acme.com', status: 'Active', createdDate: '2023-01-15' },
    { id: 'cl2', companyName: 'Globex Inc.', email: 'support@globex.com', status: 'Active', createdDate: '2023-02-20' },
    { id: 'cl3', companyName: 'Stark Industries', email: 'tony@stark.io', status: 'Suspended', createdDate: '2023-03-10' },
    { id: 'cl4', companyName: 'Wayne Enterprises', email: 'bruce@wayne.com', status: 'Active', createdDate: '2023-04-01' },
];

export const mockSystemLogs: SystemLog[] = [
    { id: 'sl1', timestamp: '2023-10-28 10:00:15', event: 'Campaign "Q4 Lead Generation" started by Acme Corp.', type: 'Info' },
    { id: 'sl2', timestamp: '2023-10-28 10:05:22', event: 'API latency high: 500ms on /api/calls', type: 'Warning' },
    { id: 'sl3', timestamp: '2023-10-28 10:10:03', event: 'Failed to process contact list for "New Client Onboarding".', type: 'Error' },
    { id: 'sl4', timestamp: '2023-10-28 10:15:45', event: 'Admin User logged in.', type: 'Info' },
];

export const mockCallsToReview: CallToReview[] = [
    { id: 'cr1', date: '2023-10-27', campaign: 'Q4 Lead Generation', aiClassification: 'Interested', humanReview: null, status: 'Pending' },
    { id: 'cr2', date: '2023-10-27', campaign: 'Customer Feedback', aiClassification: 'Not Interested', humanReview: 'Not Interested', status: 'Verified' },
    { id: 'cr3', date: '2023-10-26', campaign: 'Q4 Lead Generation', aiClassification: 'Voicemail', humanReview: 'Wrong Number', status: 'Corrected' },
    { id: 'cr4', date: '2023-10-26', campaign: 'Product Launch', aiClassification: 'Follow-up', humanReview: null, status: 'Pending' },
];

export const mockPerformanceData = [
    { name: 'Jan', successRate: 65, engagement: 50 },
    { name: 'Feb', successRate: 59, engagement: 45 },
    { name: 'Mar', successRate: 80, engagement: 70 },
    { name: 'Apr', successRate: 81, engagement: 72 },
    { name: 'May', successRate: 56, engagement: 51 },
    { name: 'Jun', successRate: 55, engagement: 50 },
    { name: 'Jul', successRate: 70, engagement: 65 },
];
