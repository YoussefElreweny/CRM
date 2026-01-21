import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../types';
import { APP_NAME, ICONS } from '../../constants';

interface SidebarProps {
  userRole: UserRole;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = {
  [UserRole.Client]: [
    { name: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard, end: true },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: ICONS.campaigns },
    { name: 'Upload Contacts', path: '/dashboard/contacts', icon: ICONS.upload },
    { name: 'Analytics', path: '/dashboard/analytics', icon: ICONS.analytics },
    { name: 'Settings', path: '/dashboard/settings', icon: ICONS.settings },
  ],
  [UserRole.Admin]: [
    { name: 'Overview', path: '/dashboard', icon: ICONS.dashboard, end: true },
    { name: 'Clients', path: '/dashboard/clients', icon: ICONS.clients },
    { name: 'Campaigns', path: '/dashboard/campaigns', icon: ICONS.campaigns },
    { name: 'System Monitoring', path: '/dashboard/monitoring', icon: ICONS.monitoring },
    { name: 'AI Model Reports', path: '/dashboard/reports-model', icon: ICONS.aiReports },
    { name: 'Inquiries', path: '/dashboard/inquiries', icon: ICONS.reports },
  ],
  [UserRole.QA]: [
    { name: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard, end: true },
    { name: 'Review Calls', path: '/dashboard/reviews', icon: ICONS.reviewCalls },
    { name: 'Reports', path: '/dashboard/reports', icon: ICONS.reports },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, setIsOpen }) => {
  const links = navLinks[userRole];

  return (
    <>
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`fixed top-0 left-0 z-30 h-full w-64 bg-gray-800 text-white flex flex-col transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-xl font-bold">{APP_NAME}</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            {ICONS.close}
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.end}
              onClick={() => {
                if (window.innerWidth < 768) setIsOpen(false);
              }}
              className={({ isActive }) => `flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
