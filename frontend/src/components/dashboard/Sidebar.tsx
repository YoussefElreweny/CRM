
import React from 'react';
import { UserRole } from '../../types';
import { APP_NAME, ICONS } from '../../constants';

interface SidebarProps {
  userRole: UserRole;
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navLinks = {
  [UserRole.Client]: [
    { name: 'Dashboard', icon: ICONS.dashboard },
    { name: 'Campaigns', icon: ICONS.campaigns },
    { name: 'Upload Contacts', icon: ICONS.upload },
    { name: 'Analytics', icon: ICONS.analytics },
    { name: 'Settings', icon: ICONS.settings },
  ],
  [UserRole.Admin]: [
    { name: 'Overview', icon: ICONS.dashboard },
    { name: 'Clients', icon: ICONS.clients },
    { name: 'Campaigns', icon: ICONS.campaigns },
    { name: 'System Monitoring', icon: ICONS.monitoring },
    { name: 'AI Model Reports', icon: ICONS.aiReports },
    { name: 'Inquiries', icon: ICONS.reports }, // Reusing reports icon for now
  ],
  [UserRole.QA]: [
    { name: 'Dashboard', icon: ICONS.dashboard },
    { name: 'Review Calls', icon: ICONS.reviewCalls },
    { name: 'Reports', icon: ICONS.reports },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ userRole, activePage, setActivePage, isOpen, setIsOpen }) => {
  const links = navLinks[userRole];

  const handleNavigation = (page: string) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }

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
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.name);
              }}
              className={`flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${activePage === link.name
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
