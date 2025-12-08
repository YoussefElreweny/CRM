import React, { useState, useEffect } from 'react';
import * as contactsService from '../../../services/contacts.service';

const ClientContacts: React.FC = () => {
    const [contacts, setContacts] = useState<contactsService.Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const data = await contactsService.getContacts();
            setContacts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load contacts');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setError('');
            setSuccessMessage('');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }

        try {
            setUploading(true);
            setError('');
            const result = await contactsService.uploadContacts(file);
            setSuccessMessage(result.message);
            setFile(null);
            // Reset file input
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            // Refresh list
            fetchContacts();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to upload contacts');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
            </div>

            {/* Upload Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Upload Contacts</h2>
                <p className="text-gray-600 mb-4">Upload a CSV file with columns: <code>name, phone</code> (optional: <code>neighborhood</code>)</p>

                <form onSubmit={handleUpload} className="flex items-end space-x-4">
                    <div className="flex-1">
                        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                            CSV File
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className={`py-2 px-4 rounded-md text-white font-bold transition-colors duration-300 ${!file || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {uploading ? 'Uploading...' : 'Upload CSV'}
                    </button>
                </form>

                {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
                {successMessage && <p className="mt-3 text-green-600 text-sm">{successMessage}</p>}
            </div>

            {/* Contacts List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Neighborhood</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                            No contacts found. Upload a CSV to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    contacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.neighborhood || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientContacts;
