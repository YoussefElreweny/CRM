
import React from 'react';
import ChartComponent from '../../common/ChartComponent';

const QAReports: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">QA Reports</h1>
                <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Download QA Reports (CSV)
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ChartComponent type="line" dataKey="engagement" title="Review Performance Over Time" />
                 <ChartComponent type="bar" dataKey="successRate" title="Correction Summary" />
            </div>
        </div>
    );
};

export default QAReports;
