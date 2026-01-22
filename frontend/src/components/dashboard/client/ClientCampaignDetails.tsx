import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as campaignsService from '../../../services/campaigns.service';
import { Campaign } from '../../../types';

const ClientCampaignDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [stats, setStats] = useState<campaignsService.CampaignStats | null>(null);
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (campaignId: string) => {
        try {
            setLoading(true);
            const [campaignData, statsData, contactsData] = await Promise.all([
                campaignsService.getCampaign(campaignId),
                campaignsService.getCampaignStats(campaignId),
                campaignsService.getCampaignContacts(campaignId)
            ]);
            setCampaign(campaignData);
            setStats(statsData);
            setContacts(contactsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load campaign details');
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
        const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
        let statusClasses = "bg-gray-100 text-gray-800";

        switch (status) {
            case 'QUALIFIED':
            case 'ACTIVE':
                statusClasses = 'bg-green-100 text-green-800';
                break;
            case 'COMPLETED':
                statusClasses = 'bg-blue-100 text-blue-800';
                break;
            case 'PAUSED':
                statusClasses = 'bg-yellow-100 text-yellow-800';
                break;
            case 'ERROR':
            case 'NOT_INTERESTED':
                statusClasses = 'bg-red-100 text-red-800';
                break;
        }
        return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error || 'Campaign not found'}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Link to="/dashboard/campaigns" className="text-indigo-600 hover:text-indigo-800 mb-2 inline-block">&larr; Back to Campaigns</Link>
                    <h1 className="text-3xl font-bold text-gray-800">{campaign.name}</h1>
                    <p className="text-gray-500 mt-1">{campaign.description}</p>
                </div>
                <StatusBadge status={campaign.status} />
            </div>

            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                        <p className="text-sm font-medium text-gray-500">Total Contacts</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-gray-500">Total Calls</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalCalls}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500">Success Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                        <p className="text-sm font-medium text-gray-500">Qualified Leads</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.callBreakdown.find(s => s.classification === 'QUALIFIED')?.count || 0}
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Contacts</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neighborhood</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contacted</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contacts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No contacts found for this campaign.
                                    </td>
                                </tr>
                            ) : (
                                contacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <StatusBadge status={contact.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.neighborhood || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {contact.lastContactedAt ? new Date(contact.lastContactedAt).toLocaleString() : 'Never'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientCampaignDetails;
