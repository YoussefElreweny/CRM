
import React from 'react';
import { mockCampaigns } from '../../../services/mockData';
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

const AdminCampaigns: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">All Campaigns</h1>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={campaign.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.dateCreated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCampaigns;
