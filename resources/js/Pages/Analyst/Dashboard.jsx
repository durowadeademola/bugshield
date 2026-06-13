import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { FileText, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className={`p-2 rounded-lg ${color} inline-flex mb-3`}>{icon}</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
        </div>
    );
}

export default function AnalystDashboard({ stats, recentReports }) {
    return (
        <>
            <Head title="Analyst Dashboard" />
            <DashboardLayout>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analyst Dashboard</h1>
                    <Link href="/analyst/reports?status=pending" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        <Clock size={16} /> Review Pending
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <StatCard title="Active Programs" value={stats?.total_programs ?? 0} icon={<Shield size={18} className="text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" />
                    <StatCard title="Total Reports" value={stats?.total_reports ?? 0} icon={<FileText size={18} className="text-purple-600" />} color="bg-purple-50 dark:bg-purple-900/20" />
                    <StatCard title="Pending" value={stats?.pending_reports ?? 0} icon={<Clock size={18} className="text-yellow-600" />} color="bg-yellow-50 dark:bg-yellow-900/20" />
                    <StatCard title="Triaged" value={stats?.triaged_reports ?? 0} icon={<AlertTriangle size={18} className="text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" />
                    <StatCard title="Resolved" value={stats?.resolved_reports ?? 0} icon={<CheckCircle size={18} className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                                <Link href="/analyst/reports" className="text-sm text-blue-600 hover:underline">View all</Link>
                            </div>
                            {(!recentReports || recentReports.length === 0) ? (
                                <p className="text-gray-400 text-sm text-center py-8">No reports yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentReports.map(r => (
                                        <Link key={r.id} href={`/analyst/reports/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <div className="flex-1 min-w-0 mr-3">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.title}</p>
                                                <p className="text-xs text-gray-400">{r.program?.title} · {r.researcher?.first_name} {r.researcher?.last_name}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <SeverityBadge severity={r.severity} />
                                                <StatusBadge status={r.status} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'All Programs', href: '/analyst/programs', icon: '🛡️' },
                                    { label: 'All Reports', href: '/analyst/reports', icon: '📋' },
                                    { label: 'Pending Reports', href: '/analyst/reports?status=pending', icon: '⏳' },
                                    { label: 'My Profile', href: '/profile', icon: '👤' },
                                ].map(a => (
                                    <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300">
                                        <span>{a.icon}</span> {a.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {(stats?.pending_reports ?? 0) > 0 && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-5">
                                <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 mb-2">
                                    <Clock size={18} />
                                    <span className="font-semibold">Needs Review</span>
                                </div>
                                <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">{stats.pending_reports}</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-400">pending reports</p>
                                <Link href="/analyst/reports?status=pending" className="mt-3 block text-center py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-medium">
                                    Review Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
