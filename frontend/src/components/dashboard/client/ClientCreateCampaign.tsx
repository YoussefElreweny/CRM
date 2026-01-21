
import React, { useState } from 'react';

const ClientCreateCampaign: React.FC = () => {

    const [step, setStep] = useState(1);
    const [campaignName, setCampaignName] = useState('');
    const [aiTemplate, setAiTemplate] = useState('Default Template');
    const [messageType, setMessageType] = useState('Call');

    // New state for details
    const [totalUnits, setTotalUnits] = useState<number | ''>('');
    const [distribution, setDistribution] = useState<{ type: string; count: number | ''; price: string }[]>([
        { type: 'Apartment', count: '', price: '' }
    ]);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddDistribution = () => {
        setDistribution([...distribution, { type: 'Apartment', count: '', price: '' }]);
    };

    const handleDistributionChange = (index: number, field: string, value: any) => {
        const newDist = [...distribution];
        (newDist[index] as any)[field] = value;
        setDistribution(newDist);
    };

    const handleRemoveDistribution = (index: number) => {
        const newDist = distribution.filter((_, i) => i !== index);
        setDistribution(newDist);
    };

    const handleSubmit = async () => {
        if (!campaignName) return;
        setIsLoading(true);

        try {
            // Updated to JSON payload instead of FormData since no file
            const details = {
                totalUnits: Number(totalUnits),
                distribution: distribution.map(d => ({
                    type: d.type,
                    count: Number(d.count),
                    price: d.price
                })),
                additionalInfo
            };

            const payload = {
                name: campaignName,
                description: `Template: ${aiTemplate}, Type: ${messageType}\n${additionalInfo}`,
                status: 'DRAFT',
                details: details
            };

            // Get token from localStorage
            const token = localStorage.getItem('authToken');

            // TODO: Use environment variable for API URL
            const response = await fetch('http://localhost:3000/api/campaigns', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Campaign created successfully!');
                // Reset form or redirect
                setStep(1);
                setCampaignName('');
                setTotalUnits('');
                setDistribution([{ type: 'Apartment', count: '', price: '' }]);
                setAdditionalInfo('');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to create campaign'}`);
            }
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('An error occurred. Check console.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Create New Campaign</h1>

            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                        <input type="text" id="campaignName" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    {/* New Details Section */}
                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Details</h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Total Units</label>
                            <input
                                type="number"
                                value={totalUnits}
                                onChange={(e) => setTotalUnits(Number(e.target.value))}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g 100"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unit Distribution</label>
                            {distribution.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2 items-start">
                                    <select
                                        value={item.type}
                                        onChange={(e) => handleDistributionChange(index, 'type', e.target.value)}
                                        className="block w-1/3 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="Apartment">Apartment</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Commercial">Commercial</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={item.count}
                                        onChange={(e) => handleDistributionChange(index, 'count', e.target.value)}
                                        className="block w-1/4 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Count"
                                    />
                                    <input
                                        type="text"
                                        value={item.price}
                                        onChange={(e) => handleDistributionChange(index, 'price', e.target.value)}
                                        className="block w-1/3 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Price (e.g 1M)"
                                    />
                                    {index > 0 && (
                                        <button onClick={() => handleRemoveDistribution(index)} className="text-red-500 hover:text-red-700 p-2">
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={handleAddDistribution} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-1">
                                + Add Distribution Type
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                            <textarea
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                rows={3}
                                placeholder="Any other details..."
                            />
                        </div>
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
                            <label className="flex items-center"><input type="radio" name="messageType" value="Call" checked={messageType === 'Call'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">Call</span></label>
                            <label className="flex items-center"><input type="radio" name="messageType" value="Text" checked={messageType === 'Text'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">Text</span></label>
                            <label className="flex items-center"><input type="radio" name="messageType" value="Email" checked={messageType === 'Email'} onChange={(e) => setMessageType(e.target.value)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" /> <span className="ml-2">Email</span></label>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {/* <button onClick={() => setStep(1)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300">Back</button> */}
                        <div />
                        <button onClick={handleSubmit} disabled={!campaignName || isLoading} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400">
                            {isLoading ? 'Creating...' : 'Submit Campaign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientCreateCampaign;
