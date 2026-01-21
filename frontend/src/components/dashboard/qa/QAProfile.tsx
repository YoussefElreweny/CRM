
import React, { useState, useEffect } from 'react';
import * as authService from '../../../services/auth.service';
import { User } from '../../../types';

const QAProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
                <div className="flex items-center space-x-6 mb-8">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                <p className="mt-1 text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                <p className="mt-1 text-gray-900">{user.email}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600">Role</label>
                                <p className="mt-1 text-gray-900">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">QA Responsibilities</h3>
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <p className="text-sm text-green-800">
                                You are responsible for reviewing call quality, providing feedback, and generating
                                quality assurance reports for the CRM system.
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Actions</h3>
                        <div className="flex space-x-4">
                            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
                                Edit Profile
                            </button>
                            <button className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QAProfile;
