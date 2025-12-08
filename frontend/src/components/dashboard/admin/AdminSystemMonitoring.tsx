
import React, { useState, useEffect } from 'react';
import * as systemService from '../../../services/system.service';

const AdminSystemMonitoring: React.FC = () => {
    const [systemHealth, setSystemHealth] = useState<systemService.SystemHealth | null>(null);
    const [logs, setLogs] = useState<systemService.SystemLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSystemData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(fetchSystemData, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchSystemData = async () => {
        try {
            setLoading(true);
            const [healthData, logsData] = await Promise.all([
                systemService.getSystemHealth(),
                systemService.getSystemLogs(20)
            ]);

            setSystemHealth(healthData);
            setLogs(logsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load system data');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !systemHealth) {
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

    const uptimeHours = systemHealth ? Math.floor(systemHealth.uptime / 3600) : 0;
    const uptimeMinutes = systemHealth ? Math.floor((systemHealth.uptime % 3600) / 60) : 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">System Monitoring</h1>
                <button
                    onClick={fetchSystemData}
                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                    Refresh
                </button>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">System Status</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${systemHealth?.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {systemHealth?.status || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Uptime:</span>
                            <span className="font-semibold text-gray-800">{uptimeHours}h {uptimeMinutes}m</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Calls:</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.totalCalls || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Calls (24h):</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.callsLast24h || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Database Metrics</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Users:</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.users || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Clients:</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.clients || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Campaigns:</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.campaigns || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Active Campaigns:</span>
                            <span className="font-semibold text-gray-800">{systemHealth?.activeCampaigns || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">System Logs</h3>
                {logs.length === 0 ? (
                    <p className="text-gray-500">No system logs available</p>
                ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {logs.map(log => (
                            <div key={log.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded flex-shrink-0 ${log.type === 'Info' ? 'bg-blue-100 text-blue-800' :
                                        log.type === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {log.type}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-800">{log.event}</p>
                                    <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSystemMonitoring;
