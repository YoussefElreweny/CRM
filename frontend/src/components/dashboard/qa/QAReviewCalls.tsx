
import React, { useState, useEffect } from 'react';
import * as qaService from '../../../services/qa.service';

const QAReviewCalls: React.FC = () => {
    const [calls, setCalls] = useState<qaService.CallToReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState<string | null>(null);

    useEffect(() => {
        fetchCalls();
    }, []);

    const fetchCalls = async () => {
        try {
            setLoading(true);
            const data = await qaService.getCallsToReview(50);
            setCalls(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load calls');
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async (callId: string, classification: string) => {
        try {
            setSubmitting(callId);
            await qaService.updateCallReview(callId, classification);
            // Refresh the list
            await fetchCalls();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to submit review');
        } finally {
            setSubmitting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Review Calls</h1>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                {calls.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No calls pending review
                    </div>
                ) : (
                    <div className="space-y-4">
                        {calls.map(call => (
                            <div key={call.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{call.campaign.name}</h3>
                                        <p className="text-sm text-gray-500">Client: {call.campaign.client.companyName}</p>
                                        <p className="text-sm text-gray-600">Contact: {call.contact.name} ({call.contact.phone})</p>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        AI: {call.ai_classification}
                                    </span>
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleReview(call.id, 'QUALIFIED')}
                                        disabled={submitting === call.id}
                                        className="px-3 py-1 text-sm font-semibold rounded bg-green-100 text-green-800 hover:bg-green-200 disabled:opacity-50"
                                    >
                                        Qualified
                                    </button>
                                    <button
                                        onClick={() => handleReview(call.id, 'FOLLOW_UP')}
                                        disabled={submitting === call.id}
                                        className="px-3 py-1 text-sm font-semibold rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 disabled:opacity-50"
                                    >
                                        Follow-up
                                    </button>
                                    <button
                                        onClick={() => handleReview(call.id, 'NOT_INTERESTED')}
                                        disabled={submitting === call.id}
                                        className="px-3 py-1 text-sm font-semibold rounded bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-50"
                                    >
                                        Not Interested
                                    </button>
                                    <button
                                        onClick={() => handleReview(call.id, 'NO_ANSWER')}
                                        disabled={submitting === call.id}
                                        className="px-3 py-1 text-sm font-semibold rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        No Answer
                                    </button>
                                    <button
                                        onClick={() => handleReview(call.id, 'VOICEMAIL')}
                                        disabled={submitting === call.id}
                                        className="px-3 py-1 text-sm font-semibold rounded bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        Voicemail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QAReviewCalls;
