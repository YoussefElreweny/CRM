
import React, { useState } from 'react';

const ClientCreateCampaign: React.FC = () => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [campaignName, setCampaignName] = useState('');
    const [aiTemplate, setAiTemplate] = useState('Default Template');
    const [messageType, setMessageType] = useState('Call');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Create New Campaign</h1>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                {/* Stepper */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>1</div>
                            <span className="ml-2 font-medium">Upload Contacts</span>
                        </div>
                        <div className={`flex-1 mx-4 border-t-2 ${step >= 2 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-500'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>2</div>
                             <span className="ml-2 font-medium">Campaign Setup</span>
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Step 1: Upload Contacts</h2>
                        <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Upload CSV</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">CSV up to 10MB</p>
                                </div>
                            </div>
                            {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
                        </div>
                        <div className="text-right">
                             <button onClick={() => setStep(2)} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400" disabled={!file}>Next</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Step 2: Campaign Setup</h2>
                        <div>
                            <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                            <input type="text" id="campaignName" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="aiTemplate" className="block text-sm font-medium text-gray-700">Select AI Template</label>
                            <select id="aiTemplate" value={aiTemplate} onChange={(e) => setAiTemplate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option>Default Template</option>
                                <option>Product Launch</option>
                                <option>Feedback Collection</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Message Type</label>
                             <div className="mt-2 flex space-x-4">
                                <label className="flex items-center"><input type="radio" name="messageType" value="Call" checked={messageType === 'Call'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/> <span className="ml-2">Call</span></label>
                                <label className="flex items-center"><input type="radio" name="messageType" value="Text" checked={messageType === 'Text'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/> <span className="ml-2">Text</span></label>
                                <label className="flex items-center"><input type="radio" name="messageType" value="Email" checked={messageType === 'Email'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/> <span className="ml-2">Email</span></label>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => setStep(1)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300">Back</button>
                            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400" disabled={!campaignName}>Submit Campaign</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientCreateCampaign;
