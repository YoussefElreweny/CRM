
import React from 'react';

const ClientSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Profile Information</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" id="companyName" defaultValue="Acme Corp" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" defaultValue="contact@acme.com" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" id="password" placeholder="Leave blank to keep current password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div className="text-right">
            <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300">Save Changes</button>
          </div>
        </form>
      </div>

       <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Notification Preferences</h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p>Campaign completion emails</p>
                <label htmlFor="toggle1" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggle1" className="sr-only" defaultChecked/>
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                </label>
            </div>
             <div className="flex items-center justify-between">
                <p>Weekly summary reports</p>
                <label htmlFor="toggle2" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggle2" className="sr-only" defaultChecked/>
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                </label>
            </div>
        </div>
        <style>{`
            input:checked ~ .dot {
                transform: translateX(100%);
                background-color: #4f46e5;
            }
            input:checked ~ .block {
                background-color: #a5b4fc;
            }
        `}</style>
      </div>
    </div>
  );
};

export default ClientSettings;
