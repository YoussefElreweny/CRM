
import React from 'react';
import { mockSystemLogs } from '../../../services/mockData';
import { SystemLog } from '../../../types';

const LogTypeBadge: React.FC<{ type: SystemLog['type'] }> = ({ type }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    const typeClasses = {
        'Info': 'bg-blue-100 text-blue-800',
        'Warning': 'bg-yellow-100 text-yellow-800',
        'Error': 'bg-red-100 text-red-800'
    };
    return <span className={`${baseClasses} ${typeClasses[type]}`}>{type}</span>;
}

const AdminSystemMonitoring: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">System Monitoring</h1>
                <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Download Reports
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Server Uptime</p>
                    <p className="text-3xl font-bold text-green-600">99.98%</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">API Latency</p>
                    <p className="text-3xl font-bold text-gray-800">120ms</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Errors (24h)</p>
                    <p className="text-3xl font-bold text-red-600">3</p>
                </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">System Logs</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockSystemLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{log.timestamp}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{log.event}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><LogTypeBadge type={log.type} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSystemMonitoring;
