import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import SeverityBadge from '@/Components/SeverityBadge';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

export default function AnalystShowProgram({ program, reportStats }) {
    return (
        <>
            <Head title={program.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/analyst/programs" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Programs
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Shield size={24} className="text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{program.title}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <StatusBadge status={program.type} />
                                <span className="text-sm text-gray-400">{program.organization?.name}</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">{program.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total', value: reportStats.total, color: 'text-blue-600' },
                        { label: 'Pending', value: reportStats.pending, color: 'text-yellow-600' },
                        { label: 'Triaged', value: reportStats.triaged, color: 'text-blue-500' },
                        { label: 'Resolved', value: reportStats.resolved, color: 'text-green-600' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">In Scope</h2>
                            <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">{program.in_scope}</pre>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Out of Scope</h2>
                            <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">{program.out_of_scope}</pre>
                        </div>

                        {/* Recent Reports */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                                <Link href={`/analyst/reports?program_id=${program.id}`} className="text-xs text-blue-600 hover:underline">View all</Link>
                            </div>
                            {program.reports?.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-4">No reports yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {program.reports?.map(r => (
                                        <Link key={r.id} href={`/analyst/reports/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{r.title}</p>
                                                <p className="text-xs text-gray-400">{r.researcher?.first_name} {r.researcher?.last_name}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <SeverityBadge severity={r.severity} />
                                                <StatusBadge status={r.status} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Details</h2>
                            <div className="space-y-2 text-sm">
                                {program.response_sla && <div className="flex justify-between"><span className="text-gray-500">SLA</span><span className="text-gray-900 dark:text-white">{program.response_sla}</span></div>}
                                <div className="flex justify-between"><span className="text-gray-500">Visibility</span><span className="text-gray-900 dark:text-white">{program.is_public ? 'Public' : 'Private'}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Currency</span><span className="text-gray-900 dark:text-white">{program.currency || 'NGN'}</span></div>
                            </div>
                        </div>
                        <Link href={`/analyst/reports?program_id=${program.id}`} className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                            <FileText size={16} /> View Reports
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
