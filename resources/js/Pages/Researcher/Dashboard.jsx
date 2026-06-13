import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';
import ActivityFeed from '@/Components/ActivityFeed';
import { FileText, CheckCircle, Clock, DollarSign, Star, Trophy, AlertCircle } from 'lucide-react';

function StatCard({ title, value, icon, color }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className={`p-2 rounded-lg ${color} inline-flex mb-3`}>{icon}</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
        </div>
    );
}

function toActivities(submissions) {
    return (submissions || []).map(r => ({
        type: r.status,
        title: r.title,
        subtitle: r.program?.title,
        severity: r.severity,
        date: r.created_at,
        href: `/researcher/submissions/${r.id}`,
    }));
}

export default function ResearcherDashboard({ stats, recentSubmissions, hasProfile }) {
    return (
        <>
            <Head title="Researcher Dashboard" />
            <DashboardLayout>
                {!hasProfile && (
                    <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-300">Complete your researcher profile</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-0.5">Set up your profile to start submitting vulnerability reports.</p>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <Link href="/researcher/programs" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Browse Programs
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <StatCard title="Submissions" value={stats.total_submissions} icon={<FileText size={18} className="text-purple-600" />} color="bg-purple-50 dark:bg-purple-900/20" />
                    <StatCard title="Pending" value={stats.pending_reports} icon={<Clock size={18} className="text-yellow-600" />} color="bg-yellow-50 dark:bg-yellow-900/20" />
                    <StatCard title="Triaged" value={stats.triaged_reports} icon={<FileText size={18} className="text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" />
                    <StatCard title="Resolved" value={stats.resolved_reports} icon={<CheckCircle size={18} className="text-green-600" />} color="bg-green-50 dark:bg-green-900/20" />
                    <StatCard title="Total Earned" value={`₦${Number(stats.total_earned || 0).toLocaleString()}`} icon={<DollarSign size={18} className="text-emerald-600" />} color="bg-emerald-50 dark:bg-emerald-900/20" />
                    <StatCard title="Reputation" value={stats.reputation_points || 0} icon={<Star size={18} className="text-yellow-600" />} color="bg-yellow-50 dark:bg-yellow-900/20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Submissions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Submissions</h2>
                                <Link href="/researcher/submissions" className="text-sm text-blue-600 hover:underline">View all</Link>
                            </div>
                            {(!recentSubmissions || recentSubmissions.length === 0) ? (
                                <div className="text-center py-10">
                                    <FileText size={36} className="mx-auto text-gray-300 mb-3" />
                                    <p className="text-gray-400 text-sm mb-4">No submissions yet. Browse programs to get started.</p>
                                    <Link href="/researcher/programs" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                        Browse Programs
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentSubmissions.map(r => (
                                        <Link key={r.id} href={`/researcher/submissions/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
                            <div className="space-y-2">
                                {[
                                    { label: 'Browse Programs', href: '/researcher/programs', icon: '🔍' },
                                    { label: 'My Submissions', href: '/researcher/submissions', icon: '📋' },
                                    { label: 'My Payments', href: '/researcher/payments', icon: '💰' },
                                    { label: 'Leaderboards', href: '/researcher/leaderboards', icon: '🏆' },
                                    { label: 'Update Profile', href: '/profile', icon: '👤' },
                                ].map(a => (
                                    <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300">
                                        <span>{a.icon}</span> {a.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {stats.rank > 0 && (
                            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-5 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <Trophy size={20} />
                                    <span className="font-semibold">Your Rank</span>
                                </div>
                                <p className="text-4xl font-black">#{stats.rank}</p>
                                <Link href="/researcher/leaderboards" className="text-sm underline mt-1 block opacity-90">View Leaderboard</Link>
                            </div>
                        )}

                        <ActivityFeed
                            title="My Activity"
                            activities={toActivities(recentSubmissions)}
                            viewAllHref="/researcher/submissions"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
