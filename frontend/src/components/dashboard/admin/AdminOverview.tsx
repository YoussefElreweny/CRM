
import React from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import ChartComponent from '../../common/ChartComponent';
import { mockSystemLogs } from '../../../services/mockData';

const AdminOverview: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Clients" value="4" icon={ICONS.clients} />
                <KpiCard title="Total Campaigns" value="5" icon={ICONS.campaigns} />
                <KpiCard title="Total AI Calls" value="10,451" icon={ICONS.reviewCalls} />
                <KpiCard title="System Uptime" value="99.98%" change="+0.01%" changeType="increase" icon={ICONS.monitoring} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartComponent type="bar" dataKey="engagement" title="System-Wide Campaign Performance" />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent System Activity</h3>
                     <ul className="space-y-4">
                        {mockSystemLogs.map(log => (
                             <li key={log.id} className="flex items-start">
                                <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 ${log.type === 'Error' ? 'bg-red-500' : log.type === 'Warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                                <div>
                                    <p className="font-medium text-gray-800">{log.event}</p>
                                    <p className="text-sm text-gray-500">{log.timestamp}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
