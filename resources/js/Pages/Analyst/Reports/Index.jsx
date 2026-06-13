import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { FileText, Filter } from 'lucide-react';

const selectCls = 'rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function AnalystReportsIndex({ reports, programs, filters }) {
    const list = reports?.data || [];

    const applyFilter = (key, value) => {
        router.get('/analyst/reports', { ...filters, [key]: value || undefined }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Reports Review" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports Review</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and triage all vulnerability reports.</p>
                </div>

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
                    <select className={selectCls} value={filters.program_id || ''} onChange={e => applyFilter('program_id', e.target.value)}>
                        <option value="">All Programs</option>
                        {programs?.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Report</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Program</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Researcher</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Severity</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Status</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {list.length === 0 ? (
                                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No reports found.</td></tr>
                            ) : list.map(report => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3">
                                        <Link href={`/analyst/reports/${report.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{report.title}</Link>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{report.program?.title}</td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{report.researcher?.first_name} {report.researcher?.last_name}</td>
                                    <td className="px-4 py-3"><SeverityBadge severity={report.severity} /></td>
                                    <td className="px-4 py-3"><StatusBadge status={report.status} /></td>
                                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(report.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reports?.links && (
                    <div className="mt-6 flex justify-center gap-2">
                        {reports.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </DashboardLayout>
        </>
    );
}
