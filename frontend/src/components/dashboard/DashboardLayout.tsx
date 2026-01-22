
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from '../../types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

import ClientDashboard from './client/ClientDashboard';
import ClientCampaigns from './client/ClientCampaigns';
import ClientCampaignDetails from './client/ClientCampaignDetails';
import ClientCreateCampaign from './client/ClientCreateCampaign';
import ClientAnalytics from './client/ClientAnalytics';
import ClientSettings from './client/ClientSettings';
import ClientContacts from './client/ClientContacts';
import ClientProfile from './client/ClientProfile';

import AdminOverview from './admin/AdminOverview';
import AdminClients from './admin/AdminClients';
import AdminCampaigns from './admin/AdminCampaigns';
import AdminSystemMonitoring from './admin/AdminSystemMonitoring';
import AdminModelReports from './admin/AdminModelReports';
import AdminInquiries from './admin/AdminInquiries';
import AdminProfile from './admin/AdminProfile';
import AdminSettings from './admin/AdminSettings';

import QADashboard from './qa/QADashboard';
import QAReviewCalls from './qa/QAReviewCalls';
import QAReports from './qa/QAReports';
import QAProfile from './qa/QAProfile';
import QASettings from './qa/QASettings';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Define routes based on role
  const renderRoutes = () => {
    switch (user.role) {
      case UserRole.Client:
        return (
          <Routes>
            <Route index element={<ClientDashboard />} />
            <Route path="campaigns" element={<ClientCampaigns />} />
            <Route path="campaigns/:id" element={<ClientCampaignDetails />} />
            <Route path="create-campaign" element={<ClientCreateCampaign />} />
            <Route path="contacts" element={<ClientContacts />} />
            <Route path="analytics" element={<ClientAnalytics />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="settings" element={<ClientSettings />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        );
      case UserRole.Admin:
        return (
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="campaigns" element={<AdminCampaigns />} />
            <Route path="monitoring" element={<AdminSystemMonitoring />} />
            <Route path="reports-model" element={<AdminModelReports />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        );
      case UserRole.QA:
        return (
          <Routes>
            <Route index element={<QADashboard />} />
            <Route path="reviews" element={<QAReviewCalls />} />
            <Route path="reports" element={<QAReports />} />
            <Route path="profile" element={<QAProfile />} />
            <Route path="settings" element={<QASettings />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        );
      default:
        return <div>Unknown Access</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        userRole={user.role}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={onLogout} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {renderRoutes()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
