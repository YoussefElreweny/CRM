
import React from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import ChartComponent from '../../common/ChartComponent';
import { mockClientCampaigns } from '../../../services/mockData';

const ClientDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Active Campaigns" value="3" icon={ICONS.campaigns} />
                <KpiCard title="Success Rate" value="88%" change="+5% this month" changeType="increase" icon={ICONS.analytics} />
                <KpiCard title="Total Calls" value="1,284" icon={ICONS.reviewCalls} />
                <KpiCard title="AI Accuracy" value="96%" icon={ICONS.aiReports} />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Graph */}
                <div className="lg:col-span-2">
                    <ChartComponent type="line" dataKey="successRate" title="Campaign Success Rate Over Time" />
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                    <ul className="space-y-4">
                        {mockClientCampaigns.slice(0, 4).map(campaign => (
                            <li key={campaign.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">{campaign.name}</p>
                                    <p className="text-sm text-gray-500">{campaign.dateCreated}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>{campaign.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
