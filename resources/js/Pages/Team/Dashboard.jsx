import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import { FileText, Shield, Clock, Users } from 'lucide-react';

export default function TeamDashboard({ stats, recentReports }) {
    return (
        <>
            <Head title="Team Dashboard" />
            <DashboardLayout>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Dashboard</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Programs', value: stats?.total_programs ?? 0, icon: <Shield size={18} className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
                        { label: 'Total Reports', value: stats?.total_reports ?? 0, icon: <FileText size={18} className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' },
                        { label: 'Pending', value: stats?.pending_reports ?? 0, icon: <Clock size={18} className="text-yellow-600" />, color: 'bg-yellow-50 dark:bg-yellow-900/20' },
                        { label: 'Resolved', value: stats?.resolved_reports ?? 0, icon: <Users size={18} className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className={`p-2 rounded-lg ${s.color} inline-flex mb-3`}>{s.icon}</div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                                <Link href="/org/reports" className="text-sm text-blue-600 hover:underline">View all</Link>
                            </div>
                            {(!recentReports || recentReports.length === 0) ? (
                                <p className="text-gray-400 text-sm text-center py-8">No reports yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentReports.map(r => (
                                        <Link key={r.id} href={`/org/reports/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <div className="flex-1 min-w-0 mr-3">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.title}</p>
                                                <p className="text-xs text-gray-400">{r.program?.title}</p>
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

                    <div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'View Reports', href: '/org/reports', icon: '📋' },
                                    { label: 'Bug Bounty Programs', href: '/org/security/bug-bounty', icon: '🐛' },
                                    { label: 'VDP Programs', href: '/org/security/disclosure', icon: '🔒' },
                                    { label: 'My Profile', href: '/profile', icon: '👤' },
                                ].map(a => (
                                    <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300">
                                        <span>{a.icon}</span> {a.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
