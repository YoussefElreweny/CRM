
import React, { useState, useEffect } from 'react';
import KpiCard from '../../common/KpiCard';
import { ICONS } from '../../../constants';
import ChartComponent from '../../common/ChartComponent';
import * as analyticsService from '../../../services/analytics.service';

const ClientDashboard: React.FC = () => {
    const [stats, setStats] = useState<analyticsService.DashboardStats | null>(null);
    const [performanceData, setPerformanceData] = useState<analyticsService.PerformanceData[]>([]);
    const [recentCampaigns, setRecentCampaigns] = useState<analyticsService.RecentCampaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, performanceDataRes, campaignsData] = await Promise.all([
                analyticsService.getDashboardStats(),
                analyticsService.getPerformanceData(),
                analyticsService.getRecentCampaigns(4)
            ]);

            setStats(statsData);
            setPerformanceData(performanceDataRes);
            setRecentCampaigns(campaignsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
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
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    title="Active Campaigns"
                    value={stats?.activeCampaigns.toString() || '0'}
                    icon={ICONS.campaigns}
                />
                <KpiCard
                    title="Success Rate"
                    value={`${stats?.successRate || 0}%`}
                    icon={ICONS.analytics}
                />
                <KpiCard
                    title="Total Calls"
                    value={stats?.totalCalls.toString() || '0'}
                    icon={ICONS.reviewCalls}
                />
                <KpiCard
                    title="AI Accuracy"
                    value={`${stats?.aiAccuracy || 0}%`}
                    icon={ICONS.aiReports}
                />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Graph */}
                <div className="lg:col-span-2">
                    <ChartComponent
                        type="line"
                        dataKey="successRate"
                        title="Campaign Success Rate Over Time"
                        data={performanceData}
                    />
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
                    {recentCampaigns.length === 0 ? (
                        <p className="text-gray-500 text-sm">No recent campaigns</p>
                    ) : (
                        <ul className="space-y-4">
                            {recentCampaigns.map(campaign => (
                                <li key={campaign.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">{campaign.name}</p>
                                        <p className="text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                            campaign.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>{campaign.status}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
