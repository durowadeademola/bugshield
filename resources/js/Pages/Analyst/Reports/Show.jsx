import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { ArrowLeft, User, Send, Clock } from 'lucide-react';

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

function TriagePanel({ report }) {
    const { data, setData, patch, processing } = useForm({
        status: report.status,
        triage_notes: report.triage_notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/analyst/reports/${report.id}/status`);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Triage</h3>
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
                    <textarea className={inputCls} rows={3} value={data.triage_notes} onChange={e => setData('triage_notes', e.target.value)} placeholder="Internal triage notes..." />
                </div>
                <button type="submit" disabled={processing} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                    {processing ? 'Updating...' : 'Update Status'}
                </button>
            </form>
        </div>
    );
}

export default function AnalystShowReport({ report }) {
    const { data, setData, post, processing, reset } = useForm({ message: '' });

    const submitComment = (e) => {
        e.preventDefault();
        post(`/analyst/reports/${report.id}/comments`, { onSuccess: () => reset() });
    };

    return (
        <>
            <Head title={report.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/analyst/reports" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Reports
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                        {/* Header */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white flex-1 pr-4">{report.title}</h1>
                                <div className="flex gap-2 flex-shrink-0">
                                    <SeverityBadge severity={report.severity} />
                                    <StatusBadge status={report.status} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div><span className="text-gray-400">Program</span><p className="font-medium text-gray-900 dark:text-white">{report.program?.title}</p></div>
                                <div><span className="text-gray-400">Researcher</span><p className="font-medium text-gray-900 dark:text-white">{report.researcher?.first_name} {report.researcher?.last_name}</p></div>
                                <div><span className="text-gray-400">Asset</span><p className="font-medium text-gray-900 dark:text-white">{report.asset}</p></div>
                                <div><span className="text-gray-400">Weakness</span><p className="font-medium text-gray-900 dark:text-white">{report.weakness}</p></div>
                                {report.cvss_score && <div><span className="text-gray-400">CVSS</span><p className="font-medium text-gray-900 dark:text-white">{report.cvss_score}</p></div>}
                                {report.url && <div><span className="text-gray-400">URL</span><a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">{report.url}</a></div>}
                            </div>
                            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1"><Clock size={12} /> {new Date(report.created_at).toLocaleString()}</p>
                        </div>

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

                        {/* Comments */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Comments ({report.comments?.length || 0})</h3>
                            <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                                {(!report.comments || report.comments.length === 0) && <p className="text-sm text-gray-400 text-center py-4">No comments yet.</p>}
                                {report.comments?.map(c => (
                                    <div key={c.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0"><User size={14} className="text-blue-600" /></div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1"><span className="text-sm font-medium text-gray-900 dark:text-white">{c.user?.name}</span><span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span></div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{c.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={submitComment} className="flex gap-2">
                                <textarea className={`${inputCls} flex-1`} rows={2} value={data.message} onChange={e => setData('message', e.target.value)} placeholder="Add a comment..." />
                                <button type="submit" disabled={processing || !data.message} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"><Send size={16} /></button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <TriagePanel report={report} />

                        {report.bounty && (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 p-5">
                                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Bounty Awarded</h3>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">₦{Number(report.bounty.amount).toLocaleString()}</p>
                                <StatusBadge status={report.bounty.status} />
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Researcher</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center"><User size={16} className="text-blue-600" /></div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{report.researcher?.first_name} {report.researcher?.last_name}</p>
                                    <p className="text-xs text-gray-400">{report.researcher?.reputation_points || 0} pts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
