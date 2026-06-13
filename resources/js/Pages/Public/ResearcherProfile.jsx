import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Trophy, Shield, DollarSign, FileText, Globe,
    CheckCircle, Clock, AlertTriangle, Star, ArrowLeft
} from 'lucide-react';
import SeverityBadge from '@/Components/SeverityBadge';
import StatusBadge from '@/Components/StatusBadge';

const RANK_LABELS = { 1: '🥇', 2: '🥈', 3: '🥉' };

const BADGE_THRESHOLDS = [
    { label: 'First Blood', icon: '🩸', condition: s => s.reports_submitted >= 1 },
    { label: 'Bug Hunter', icon: '🐛', condition: s => s.reports_submitted >= 10 },
    { label: 'Elite Hunter', icon: '⚡', condition: s => s.reports_submitted >= 50 },
    { label: 'Hall of Fame', icon: '🏆', condition: s => s.reputation_points >= 1000 },
    { label: 'Millionaire', icon: '💰', condition: s => s.total_earned >= 1000000 },
    { label: 'Prolific', icon: '📋', condition: s => s.reports_resolved >= 20 },
];

export default function ResearcherProfile({ researcher, stats, rank, recentActivity }) {
    const badges = BADGE_THRESHOLDS.filter(b => b.condition(stats));
    const rankEmoji = RANK_LABELS[rank] ?? `#${rank}`;

    return (
        <>
            <Head title={`${researcher.first_name} ${researcher.last_name} — Bluestrike Researcher`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

                {/* Header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                    <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
                        <Link href="/" className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Bluestrike
                        </Link>
                        <Link href="/programs" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <ArrowLeft size={14} /> Browse Programs
                        </Link>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-6 py-10">
                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-6"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                {researcher.image_path ? (
                                    <img
                                        src={`/storage/${researcher.image_path}`}
                                        alt={researcher.first_name}
                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-500/20"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
                                        {researcher.first_name?.[0]}{researcher.last_name?.[0]}
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow text-lg">
                                    {rankEmoji}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {researcher.first_name} {researcher.last_name}
                                </h1>
                                {researcher.country && (
                                    <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                        <Globe size={14} /> {researcher.country}
                                    </p>
                                )}
                                {researcher.bio && (
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm max-w-lg">{researcher.bio}</p>
                                )}
                                {badges.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {badges.map(b => (
                                            <span key={b.label} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700">
                                                {b.icon} {b.label}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="text-right hidden md:block">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                                    <Trophy size={18} className="text-yellow-600 dark:text-yellow-400" />
                                    <div>
                                        <p className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{stats.reputation_points} pts</p>
                                        <p className="text-xs text-yellow-600 dark:text-yellow-400">Reputation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Reports Submitted', value: stats.reports_submitted, icon: <FileText size={18} className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
                            { label: 'Reports Resolved', value: stats.reports_resolved, icon: <CheckCircle size={18} className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
                            { label: 'Total Earned', value: `₦${Number(stats.total_earned).toLocaleString()}`, icon: <DollarSign size={18} className="text-emerald-600" />, color: 'bg-emerald-50 dark:bg-emerald-900/20' },
                            { label: 'Global Rank', value: `#${rank}`, icon: <Trophy size={18} className="text-yellow-600" />, color: 'bg-yellow-50 dark:bg-yellow-900/20' },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div className={`p-2 rounded-lg ${s.color} inline-flex mb-2`}>{s.icon}</div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText size={16} /> Recent Activity
                        </h2>
                        {(!recentActivity || recentActivity.length === 0) ? (
                            <p className="text-gray-400 text-sm text-center py-8">No public activity yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {recentActivity.map(report => (
                                    <div key={report.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                                        <div className="flex-1 min-w-0 mr-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{report.title}</p>
                                            <p className="text-xs text-gray-400">{report.program?.title}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <SeverityBadge severity={report.severity} />
                                            <StatusBadge status={report.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* CTA */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Want to join {researcher.first_name} on the leaderboard?</p>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Create Researcher Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
