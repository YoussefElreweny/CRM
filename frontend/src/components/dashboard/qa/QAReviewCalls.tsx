
import React from 'react';
import { mockCallsToReview } from '../../../services/mockData';
import { CallToReview } from '../../../types';

const StatusBadge: React.FC<{ status: CallToReview['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full inline-block";
    const statusClasses = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Corrected': 'bg-blue-100 text-blue-800',
        'Verified': 'bg-green-100 text-green-800'
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const QAReviewCalls: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Review Calls</h1>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Classification</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Review</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockCallsToReview.map((call) => (
                                <tr key={call.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.campaign}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{call.aiClassification}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{call.humanReview || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={call.status} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            {call.status === 'Pending' ? 'Review' : 'View'}
                                        </a>
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

export default QAReviewCalls;
