
import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../types';
import { ICONS } from '../../constants';

interface TopBarProps {
  user: User;
  onLogout: () => void;
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ user, onLogout, onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex-shrink-0 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4">
         <button onClick={onMenuClick} className="text-gray-500 focus:outline-none md:hidden">
            {ICONS.menu}
         </button>
        <div className="flex items-center ml-auto">
          <button className="text-gray-500 hover:text-gray-700 mr-4">
            {ICONS.notification}
          </button>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
               <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                 {user.name.charAt(0)}
               </div>
              <div className="hidden sm:block text-left">
                <span className="block text-sm font-medium text-gray-700">{user.name}</span>
                <span className="block text-xs text-gray-500">{user.role}</span>
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-2 text-sm text-gray-700">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="border-t border-gray-100"></div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <div className="border-t border-gray-100"></div>
                <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                   <span className="mr-2">{ICONS.logout}</span>
                   Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
