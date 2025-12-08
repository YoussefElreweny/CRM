
import React, { useState, useEffect } from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import * as qaService from '../../../services/qa.service';

const QADashboard: React.FC = () => {
    const [stats, setStats] = useState<qaService.QAStats | null>(null);
    const [recentActivity, setRecentActivity] = useState<qaService.QAActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQAData();
    }, []);

    const fetchQAData = async () => {
        try {
            setLoading(true);
            const [statsData, activityData] = await Promise.all([
                qaService.getQAStats(),
                qaService.getRecentQAActivity(10)
            ]);

            setStats(statsData);
            setRecentActivity(activityData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load QA data');
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
            <h1 className="text-3xl font-bold text-gray-800">QA Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <KpiCard
                    title="Calls Reviewed (24h)"
                    value={stats?.reviewedLast24h.toString() || '0'}
                    icon={ICONS.reviewCalls}
                />
                <KpiCard
                    title="AI Accuracy"
                    value={`${stats?.accuracyRate || '0'}%`}
                    icon={ICONS.analytics}
                />
                <KpiCard
                    title="Pending Reviews"
                    value={stats?.pendingReviews.toString() || '0'}
                    icon={ICONS.reports}
                />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Review Activity</h3>
                {recentActivity.length === 0 ? (
                    <p className="text-gray-500">No recent review activity</p>
                ) : (
                    <ul className="space-y-4">
                        {recentActivity.map(activity => (
                            <li key={activity.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Call from campaign "{activity.call.campaign.name}"
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Changed from <span className="font-semibold text-red-600">{activity.oldClassification}</span> to <span className="font-semibold text-green-600">{activity.newClassification}</span>
                                    </p>
                                    <p className="text-xs text-gray-400">Reviewed by {activity.user.name}</p>
                                </div>
                                <span className="text-sm text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default QADashboard;
