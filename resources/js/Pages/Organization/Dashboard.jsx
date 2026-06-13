import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import ActivityFeed from '@/Components/ActivityFeed';
import { Shield, FileText, CheckCircle, Clock, DollarSign, Plus, AlertCircle } from 'lucide-react';

function StatCard({ title, value, icon, color, href }) {
    const content = (
        <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 ${href ? 'hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer' : ''}`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
        </div>
    );
    return href ? <Link href={href}>{content}</Link> : content;
}

function toActivities(reports) {
    return (reports || []).map(r => ({
        type: r.status,
        title: r.title,
        subtitle: r.program?.title,
        severity: r.severity,
        date: r.created_at,
        href: `/org/reports/${r.id}`,
    }));
}

export default function OrganizationDashboard({ stats, recentReports, hasOrg }) {
    return (
        <>
            <Head title="Organization Dashboard" />
            <DashboardLayout>
                {!hasOrg && (
                    <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-300">Complete your organization profile</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-0.5">Set up your organization to start creating bug bounty programs.</p>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <Link href="/org/programs/create" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        <Plus size={16} /> New Program
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <StatCard title="Total Programs" value={stats.total_programs} icon={<Shield size={18} className="text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" href="/org/programs" />
                    <StatCard title="Active Programs" value={stats.active_programs} icon={<Shield size={18} className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20" />
                    <StatCard title="Total Reports" value={stats.total_reports} icon={<FileText size={18} className="text-purple-600" />} color="bg-purple-50 dark:bg-purple-900/20" href="/org/reports" />
                    <StatCard title="Pending Triage" value={stats.pending_reports} icon={<Clock size={18} className="text-yellow-600" />} color="bg-yellow-50 dark:bg-yellow-900/20" href="/org/reports?status=pending" />
                    <StatCard title="Resolved" value={stats.resolved_reports} icon={<CheckCircle size={18} className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20" href="/org/reports?status=resolved" />
                    <StatCard title="Bounties Paid" value={`₦${Number(stats.total_bounties_paid || 0).toLocaleString()}`} icon={<DollarSign size={18} className="text-emerald-600" />} color="bg-emerald-50 dark:bg-emerald-900/20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Reports */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                                <Link href="/org/reports" className="text-sm text-blue-600 hover:underline">View all</Link>
                            </div>
                            {(!recentReports || recentReports.length === 0) ? (
                                <div className="text-center py-10">
                                    <FileText size={36} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-400 text-sm">No reports yet. Create a program to start receiving reports.</p>
                                    <Link href="/org/programs/create" className="mt-4 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline">
                                        <Plus size={14} /> Create your first program
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentReports.map(r => (
                                        <Link key={r.id} href={`/org/reports/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'Create Bug Bounty Program', href: '/org/programs/create', icon: '🐛' },
                                    { label: 'View Incoming Reports', href: '/org/reports', icon: '📋' },
                                    { label: 'Manage Programs', href: '/org/programs', icon: '⚙️' },
                                    { label: 'Organization Setup', href: '/org/onboarding', icon: '🏢' },
                                    { label: 'Update Profile', href: '/profile', icon: '👤' },
                                ].map(a => (
                                    <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300">
                                        <span>{a.icon}</span> {a.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Report Status Breakdown */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Report Status</h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'Pending', value: stats.pending_reports, color: 'bg-yellow-400' },
                                    { label: 'Triaged', value: stats.triaged_reports, color: 'bg-blue-400' },
                                    { label: 'Resolved', value: stats.resolved_reports, color: 'bg-green-400' },
                                ].map(s => (
                                    <div key={s.label} className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                        <span className="text-sm text-gray-600 dark:text-gray-300 flex-1">{s.label}</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ActivityFeed
                            title="Activity Feed"
                            activities={toActivities(recentReports)}
                            viewAllHref="/org/reports"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
