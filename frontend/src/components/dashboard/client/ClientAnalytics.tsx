
import React from 'react';
import ChartComponent from '../../common/ChartComponent';

const ClientAnalytics: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
                <div className="flex items-center gap-4">
                    <input type="date" className="bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ChartComponent type="line" dataKey="successRate" title="Campaign Performance Over Time" />
                 <ChartComponent type="bar" dataKey="engagement" title="Total Reach and Engagement" />
                 <ChartComponent type="line" dataKey="engagement" title="AI Classification Accuracy" />
                 <ChartComponent type="bar" dataKey="successRate" title="Cost Savings" />
            </div>
        </div>
    );
};

export default ClientAnalytics;
