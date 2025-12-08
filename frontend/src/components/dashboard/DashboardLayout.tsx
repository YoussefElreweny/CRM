
import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../../types';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

import ClientDashboard from './client/ClientDashboard';
import ClientCampaigns from './client/ClientCampaigns';
import ClientCreateCampaign from './client/ClientCreateCampaign';
import ClientAnalytics from './client/ClientAnalytics';
import ClientSettings from './client/ClientSettings';

import AdminOverview from './admin/AdminOverview';
import AdminClients from './admin/AdminClients';
import AdminCampaigns from './admin/AdminCampaigns';
import AdminSystemMonitoring from './admin/AdminSystemMonitoring';
import AdminModelReports from './admin/AdminModelReports';
import AdminInquiries from './admin/AdminInquiries';

import QADashboard from './qa/QADashboard';
import QAReviewCalls from './qa/QAReviewCalls';
import QAReports from './qa/QAReports';

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}

import ClientContacts from './client/ClientContacts';

const clientPages = {
  'Dashboard': <ClientDashboard />,
  'Campaigns': <ClientCampaigns />,
  'Upload Contacts': <ClientContacts />,
  'Analytics': <ClientAnalytics />,
  'Settings': <ClientSettings />,
};

const adminPages = {
  'Overview': <AdminOverview />,
  'Clients': <AdminClients />,
  'Campaigns': <AdminCampaigns />,
  'System Monitoring': <AdminSystemMonitoring />,
  'AI Model Reports': <AdminModelReports />,
  'Inquiries': <AdminInquiries />,
};

const qaPages = {
  'Dashboard': <QADashboard />,
  'Review Calls': <QAReviewCalls />,
  'Reports': <QAReports />,
};

const pagesByRole = {
  [UserRole.Client]: clientPages,
  [UserRole.Admin]: adminPages,
  [UserRole.QA]: qaPages,
};


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const availablePages = useMemo(() => pagesByRole[user.role], [user.role]);
  const [activePage, setActivePage] = useState(Object.keys(availablePages)[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        userRole={user.role}
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={onLogout} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          {availablePages[activePage as keyof typeof availablePages] || <div>Page not found</div>}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
