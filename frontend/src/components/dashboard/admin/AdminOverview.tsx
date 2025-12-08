
import React, { useState, useEffect } from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import * as systemService from '../../../services/system.service';
import * as clientsService from '../../../services/clients.service';

const AdminOverview: React.FC = () => {
    const [systemHealth, setSystemHealth] = useState<systemService.SystemHealth | null>(null);
    const [logs, setLogs] = useState<systemService.SystemLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOverviewData();
    }, []);

    const fetchOverviewData = async () => {
        try {
            setLoading(true);
            const [healthData, logsData] = await Promise.all([
                systemService.getSystemHealth(),
                systemService.getSystemLogs(10)
            ]);

            setSystemHealth(healthData);
            setLogs(logsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load overview data');
        } finally {
            setLoading(false);
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
            <h1 className="text-3xl font-bold text-gray-800">System Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Users" value={systemHealth?.users.toString() || '0'} icon={ICONS.clients} />
                <KpiCard title="Active Clients" value={systemHealth?.clients.toString() || '0'} icon={ICONS.clients} />
                <KpiCard
                    title="Active Campaigns"
                    value={`${systemHealth?.activeCampaigns || 0} / ${systemHealth?.campaigns || 0}`}
                    icon={ICONS.campaigns}
                />
                <KpiCard
                    title="Calls (24h)"
                    value={systemHealth?.callsLast24h.toString() || '0'}
                    icon={ICONS.reviewCalls}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent System Activity</h3>
                {logs.length === 0 ? (
                    <p className="text-gray-500">No recent system activity</p>
                ) : (
                    <ul className="space-y-3">
                        {logs.map(log => (
                            <li key={log.id} className="flex items-start space-x-3">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${log.type === 'Info' ? 'bg-blue-100 text-blue-800' :
                                        log.type === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {log.type}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800">{log.event}</p>
                                    <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminOverview;
