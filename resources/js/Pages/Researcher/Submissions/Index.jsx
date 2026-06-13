import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { FileText, Filter, TrendingUp } from 'lucide-react';

const selectCls = 'rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function SubmissionsIndex({ submissions, filters, stats }) {
    const list = submissions?.data || [];

    const applyFilter = (key, value) => {
        router.get('/researcher/submissions', { ...filters, [key]: value || undefined }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="My Submissions" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track all your vulnerability reports.</p>
                </div>

                {/* Stats */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Total', value: stats.total, color: 'text-blue-600' },
                            { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
                            { label: 'Triaged', value: stats.triaged, color: 'text-blue-600' },
                            { label: 'Resolved', value: stats.resolved, color: 'text-green-600' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <Filter size={16} className="text-gray-400" />
                    <select className={selectCls} value={filters.status || ''} onChange={e => applyFilter('status', e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="triaged">Triaged</option>
                        <option value="resolved">Resolved</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <select className={selectCls} value={filters.severity || ''} onChange={e => applyFilter('severity', e.target.value)}>
                        <option value="">All Severities</option>
                        <option value="critical">Critical</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                        <option value="informational">Informational</option>
                    </select>
                </div>

                {list.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No submissions yet</h3>
                        <p className="text-gray-400 mb-6">Browse programs and submit your first vulnerability report.</p>
                        <Link href="/researcher/programs" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Browse Programs
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Title</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Program</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Severity</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Status</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Bounty</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {list.map(report => (
                                    <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-4 py-3">
                                            <Link href={`/researcher/submissions/${report.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                                {report.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{report.program?.title}</td>
                                        <td className="px-4 py-3"><SeverityBadge severity={report.severity} /></td>
                                        <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
                                        <td className="px-4 py-3">
                                            {report.bounty ? (
                                                <span className="text-green-600 dark:text-green-400 font-medium">₦{Number(report.bounty.amount).toLocaleString()}</span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs">{new Date(report.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {submissions?.links && (
                    <div className="mt-6 flex justify-center gap-2">
                        {submissions.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </DashboardLayout>
        </>
    );
}
