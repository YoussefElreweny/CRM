
import React from 'react';
import ChartComponent from '../../common/ChartComponent';

const AdminModelReports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">AI Model Reports</h1>
                <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Download Logs
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Overall Accuracy</p>
                    <p className="text-3xl font-bold text-green-600">96.4%</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Precision</p>
                    <p className="text-3xl font-bold text-gray-800">95.8%</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-sm text-gray-500">Recall</p>
                    <p className="text-3xl font-bold text-gray-800">97.1%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartComponent type="line" dataKey="successRate" title="Accuracy Over Time" />
                <ChartComponent type="bar" dataKey="engagement" title="Classification Distribution" />
            </div>
        </div>
    );
};

export default AdminModelReports;
