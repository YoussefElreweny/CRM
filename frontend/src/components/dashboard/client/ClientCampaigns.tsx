
import React, { useState, useEffect } from 'react';
import * as campaignsService from '../../../services/campaigns.service';
import { Campaign } from '../../../types';

const StatusBadge: React.FC<{ status: Campaign['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
  const statusClasses = {
    'Active': 'bg-green-100 text-green-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Paused': 'bg-yellow-100 text-yellow-800',
    'Draft': 'bg-gray-100 text-gray-800'
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const ClientCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await campaignsService.getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;

    try {
      await campaignsService.deleteCampaign(id);
      fetchCampaigns();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete campaign');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campaigns</h1>
        <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Create New Campaign
        </button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacts</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No campaigns found. Create your first campaign to get started!
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={campaign.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign._count?.campaignContacts || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                      <button onClick={() => handleDelete(campaign.id)} className="text-red-600 hover:text-red-900">Delete</button>
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

export default ClientCampaigns;
