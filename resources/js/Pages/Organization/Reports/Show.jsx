import { Head, Link, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { ArrowLeft, Send, DollarSign, User, Clock } from 'lucide-react';
import { useState } from 'react';

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

function TriagePanel({ report }) {
    const { data, setData, patch, processing, errors } = useForm({
        status: report.status,
        triage_notes: report.triage_notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/org/reports/${report.id}/status`);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Triage Report</h3>
            <form onSubmit={submit} className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
                    <select className={inputCls} value={data.status} onChange={e => setData('status', e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="triaged">Triaged</option>
                        <option value="resolved">Resolved</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Triage Notes</label>
                    <textarea className={inputCls} rows={3} value={data.triage_notes} onChange={e => setData('triage_notes', e.target.value)} placeholder="Internal notes about this report..." />
                </div>
                <button type="submit" disabled={processing} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                    {processing ? 'Updating...' : 'Update Status'}
                </button>
            </form>
        </div>
    );
}

function BountyPanel({ report }) {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        notes: '',
    });

    if (report.bounty) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Bounty Awarded</h3>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <DollarSign size={20} />
                    <span className="text-xl font-bold">₦{Number(report.bounty.amount).toLocaleString()}</span>
                </div>
                <StatusBadge status={report.bounty.status} />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Award Bounty</h3>
            {!show ? (
                <button onClick={() => setShow(true)} className="w-full py-2 border border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-sm font-medium transition-colors">
                    + Award Bounty
                </button>
            ) : (
                <form onSubmit={e => { e.preventDefault(); post(`/org/reports/${report.id}/bounty`); }} className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Amount (NGN)</label>
                        <input type="number" min="0" className={inputCls} value={data.amount} onChange={e => setData('amount', e.target.value)} placeholder="50000" />
                        {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Notes (optional)</label>
                        <textarea className={inputCls} rows={2} value={data.notes} onChange={e => setData('notes', e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShow(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm">Cancel</button>
                        <button type="submit" disabled={processing} className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium">
                            {processing ? 'Awarding...' : 'Award'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

function CommentThread({ report }) {
    const { data, setData, post, processing, reset } = useForm({ message: '' });

    const submit = (e) => {
        e.preventDefault();
        post(`/org/reports/${report.id}/comments`, { onSuccess: () => reset() });
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Comments ({report.comments?.length || 0})</h3>
            <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                {report.comments?.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">No comments yet.</p>
                )}
                {report.comments?.map(c => (
                    <div key={c.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <User size={14} className="text-blue-600 dark:text-blue-300" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{c.user?.name}</span>
                                <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{c.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={submit} className="flex gap-2">
                <textarea className={`${inputCls} flex-1`} rows={2} value={data.message} onChange={e => setData('message', e.target.value)} placeholder="Add a comment..." />
                <button type="submit" disabled={processing || !data.message} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}

export default function ShowReport({ report }) {
    return (
        <>
            <Head title={report.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/org/reports" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Reports
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Report Header */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1 pr-4">{report.title}</h1>
                                <div className="flex gap-2 flex-shrink-0">
                                    <SeverityBadge severity={report.severity} />
                                    <StatusBadge status={report.status} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                <div>
                                    <span className="text-gray-400">Program</span>
                                    <p className="font-medium text-gray-900 dark:text-white">{report.program?.title}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Researcher</span>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {report.researcher?.first_name} {report.researcher?.last_name}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Asset</span>
                                    <p className="font-medium text-gray-900 dark:text-white">{report.asset}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Weakness</span>
                                    <p className="font-medium text-gray-900 dark:text-white">{report.weakness}</p>
                                </div>
                                {report.cvss_score && (
                                    <div>
                                        <span className="text-gray-400">CVSS Score</span>
                                        <p className="font-medium text-gray-900 dark:text-white">{report.cvss_score}</p>
                                    </div>
                                )}
                                {report.url && (
                                    <div>
                                        <span className="text-gray-400">URL</span>
                                        <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs break-all">{report.url}</a>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock size={12} /> Submitted {new Date(report.created_at).toLocaleString()}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{report.description}</p>
                        </div>

                        {report.steps_to_reproduce && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Steps to Reproduce</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{report.steps_to_reproduce}</p>
                            </div>
                        )}

                        {report.proof_of_concept && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Proof of Concept</h3>
                                <pre className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">{report.proof_of_concept}</pre>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Impact</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{report.impact}</p>
                        </div>

                        {report.triage_notes && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700 p-5">
                                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Triage Notes (Internal)</h3>
                                <p className="text-sm text-yellow-700 dark:text-yellow-400 whitespace-pre-wrap">{report.triage_notes}</p>
                            </div>
                        )}

                        <CommentThread report={report} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <TriagePanel report={report} />
                        <BountyPanel report={report} />

                        {/* Researcher Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Researcher</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <User size={16} className="text-blue-600 dark:text-blue-300" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{report.researcher?.first_name} {report.researcher?.last_name}</p>
                                    <p className="text-xs text-gray-400">{report.researcher?.reputation_points || 0} reputation points</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
