import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { ArrowLeft, User, Send, DollarSign, Clock } from 'lucide-react';

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function ShowSubmission({ report }) {
    const { data, setData, post, processing, reset } = useForm({ message: '' });

    const submit = (e) => {
        e.preventDefault();
        post(`/researcher/submissions/${report.id}/comments`, { onSuccess: () => reset() });
    };

    const program = report.program;
    const bountyRanges = [
        { label: 'Critical', value: program?.critical_bounty_range },
        { label: 'High', value: program?.high_bounty_range },
        { label: 'Medium', value: program?.medium_bounty_range },
        { label: 'Low', value: program?.low_bounty_range },
    ].filter(r => r.value);

    return (
        <>
            <Head title={report.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/researcher/submissions" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Submissions
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
                                <div>
                                    <span className="text-gray-400">Program</span>
                                    <p className="font-medium text-gray-900 dark:text-white">{program?.title}</p>
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
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
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

                        {/* Comments */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Comments ({report.comments?.length || 0})</h3>
                            <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                                {report.comments?.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-4">No comments yet.</p>
                                )}
                                {report.comments?.map(c => (
                                    <div key={c.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                                            <User size={14} className="text-blue-600" />
                                        </div>
                                        <div>
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Bounty Status */}
                        {report.bounty ? (
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 p-5">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-1">
                                    <DollarSign size={20} />
                                    <span className="font-semibold">Bounty Awarded!</span>
                                </div>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-300">₦{Number(report.bounty.amount).toLocaleString()}</p>
                                <StatusBadge status={report.bounty.status} />
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <p className="text-sm text-gray-500 dark:text-gray-400">No bounty awarded yet.</p>
                            </div>
                        )}

                        {/* Program Bounty Ranges */}
                        {bountyRanges.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Program Rewards</h3>
                                <div className="space-y-2 text-sm">
                                    {bountyRanges.map(r => (
                                        <div key={r.label} className="flex justify-between">
                                            <span className="text-gray-500 dark:text-gray-400">{r.label}</span>
                                            <span className="font-medium text-gray-900 dark:text-white">₦{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white">Submitted</p>
                                        <p className="text-xs text-gray-400">{new Date(report.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                {report.triaged_at && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-900 dark:text-white">Triaged</p>
                                            <p className="text-xs text-gray-400">{new Date(report.triaged_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                                {report.resolved_at && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-gray-900 dark:text-white">Resolved</p>
                                            <p className="text-xs text-gray-400">{new Date(report.resolved_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
