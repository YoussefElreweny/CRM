
import React from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import { mockCallsToReview } from '../../../services/mockData';

const QADashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">QA Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <KpiCard title="Calls Reviewed (24h)" value="152" icon={ICONS.reviewCalls} />
                <KpiCard title="Accuracy Improved" value="+1.2%" changeType="increase" icon={ICONS.analytics} />
                <KpiCard title="Pending Reviews" value="28" icon={ICONS.reports} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Review Activity</h3>
                <ul className="space-y-4">
                    {mockCallsToReview.map(call => (
                        <li key={call.id} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">
                                    Call from campaign "{call.campaign}"
                                </p>
                                <p className="text-sm text-gray-500">
                                    AI classified as <span className="font-semibold text-indigo-600">{call.aiClassification}</span>. Status: {call.status}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">{call.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QADashboard;
