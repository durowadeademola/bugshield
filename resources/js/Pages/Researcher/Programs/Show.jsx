import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import { ArrowLeft, Shield, ExternalLink, Send } from 'lucide-react';

export default function ShowProgram({ program, hasSubmitted }) {
    const org = program.organization;
    const bountyRanges = [
        { label: 'Critical', value: program.critical_bounty_range, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
        { label: 'High', value: program.high_bounty_range, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        { label: 'Medium', value: program.medium_bounty_range, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
        { label: 'Low', value: program.low_bounty_range, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Informational', value: program.informational_bounty_range, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-800' },
    ].filter(r => r.value);

    return (
        <>
            <Head title={program.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/researcher/programs" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Programs
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {program.logo_path ? (
                                <img src={`/storage/${program.logo_path}`} className="w-16 h-16 rounded-xl object-cover" alt="" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <Shield size={28} className="text-blue-600 dark:text-blue-300" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{program.title}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{org?.name}</span>
                                    {org?.website && (
                                        <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <StatusBadge status={program.type} />
                                    <span className="text-xs text-gray-400">{program.is_public ? '🌐 Public' : '🔒 Private'}</span>
                                </div>
                            </div>
                        </div>

                        {hasSubmitted ? (
                            <div className="flex flex-col items-end">
                                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-sm">Already Submitted</span>
                                <Link href="/researcher/submissions" className="text-xs text-blue-500 hover:underline mt-1">View your submission</Link>
                            </div>
                        ) : (
                            <Link
                                href={`/researcher/programs/${program.id}/submit`}
                                className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Send size={16} /> Submit Report
                            </Link>
                        )}
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{program.description}</p>
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
                        {program.policy && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Disclosure Policy</h2>
                                <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">{program.policy}</pre>
                            </div>
                        )}
                    </div>

                    <div className="space-y-5">
                        {bountyRanges.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Rewards (NGN)</h2>
                                <div className="space-y-2">
                                    {bountyRanges.map(r => (
                                        <div key={r.label} className={`flex justify-between items-center px-3 py-2 rounded-lg ${r.bg}`}>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">{r.label}</span>
                                            <span className={`text-sm font-bold ${r.color}`}>₦{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Program Details</h2>
                            <div className="space-y-2 text-sm">
                                {program.response_sla && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Response SLA</span>
                                        <span className="text-gray-900 dark:text-white">{program.response_sla}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Total Reports</span>
                                    <span className="text-gray-900 dark:text-white">{program.total_reports ?? 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Currency</span>
                                    <span className="text-gray-900 dark:text-white">{program.currency || 'NGN'}</span>
                                </div>
                            </div>
                        </div>

                        {!hasSubmitted && (
                            <Link
                                href={`/researcher/programs/${program.id}/submit`}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                            >
                                <Send size={16} /> Submit a Report
                            </Link>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
