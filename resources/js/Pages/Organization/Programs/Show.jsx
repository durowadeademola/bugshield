import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import SeverityBadge from '@/Components/SeverityBadge';
import { ArrowLeft, Edit, Trash2, Shield, FileText, Users, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';

export default function ShowProgram({ program, reportStats }) {
    const toggleStatus = () => {
        router.patch(`/org/programs/${program.id}/toggle`);
    };

    const deleteProgram = () => {
        if (confirm('Are you sure you want to delete this program? This cannot be undone.')) {
            router.delete(`/org/programs/${program.id}`);
        }
    };

    const bountyRanges = [
        { label: 'Critical', value: program.critical_bounty_range, color: 'text-red-600 dark:text-red-400' },
        { label: 'High', value: program.high_bounty_range, color: 'text-orange-600 dark:text-orange-400' },
        { label: 'Medium', value: program.medium_bounty_range, color: 'text-yellow-600 dark:text-yellow-400' },
        { label: 'Low', value: program.low_bounty_range, color: 'text-blue-600 dark:text-blue-400' },
        { label: 'Informational', value: program.informational_bounty_range, color: 'text-gray-600 dark:text-gray-400' },
    ].filter(r => r.value);

    return (
        <>
            <Head title={program.title} />
            <DashboardLayout>
                <div className="mb-4">
                    <Link href="/org/security/bug-bounty" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400">
                        <ArrowLeft size={14} /> Back to Programs
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            {program.logo_path ? (
                                <img src={`/storage/${program.logo_path}`} alt={program.title} className="w-16 h-16 rounded-xl object-cover" />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <Shield size={28} className="text-blue-600 dark:text-blue-300" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{program.title}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <StatusBadge status={program.type} />
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${program.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {program.is_active ? 'Active' : 'Paused'}
                                    </span>
                                    <span className="text-xs text-gray-400">{program.is_public ? '🌐 Public' : '🔒 Private'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={toggleStatus} className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300" title={program.is_active ? 'Pause' : 'Activate'}>
                                {program.is_active ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} />}
                            </button>
                            <Link href={`/org/programs/${program.id}/edit`} className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                                <Edit size={18} />
                            </Link>
                            <button onClick={deleteProgram} className="p-2 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900 text-red-500">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{program.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Reports', value: reportStats.total, icon: <FileText size={20} />, color: 'text-blue-600' },
                        { label: 'Pending', value: reportStats.pending, icon: <FileText size={20} />, color: 'text-yellow-600' },
                        { label: 'Resolved', value: reportStats.resolved, icon: <FileText size={20} />, color: 'text-green-600' },
                        { label: 'Total Paid (NGN)', value: `₦${Number(program.total_bounties_paid || 0).toLocaleString()}`, icon: <DollarSign size={20} />, color: 'text-purple-600' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                            <div className={`mb-2 ${s.color}`}>{s.icon}</div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Scope & Policy */}
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
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Program Policy</h2>
                                <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">{program.policy}</pre>
                            </div>
                        )}

                        {/* Recent Reports */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Reports</h2>
                                <Link href={`/org/reports?program_id=${program.id}`} className="text-xs text-blue-600 hover:underline">View all</Link>
                            </div>
                            {program.reports?.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-6">No reports yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {program.reports?.map(r => (
                                        <Link key={r.id} href={`/org/reports/${r.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{r.title}</p>
                                                <p className="text-xs text-gray-400">{r.researcher?.first_name} {r.researcher?.last_name}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
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
                    <div className="space-y-5">
                        {bountyRanges.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                                <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Bounty Ranges (NGN)</h2>
                                <div className="space-y-2">
                                    {bountyRanges.map(r => (
                                        <div key={r.label} className="flex justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">{r.label}</span>
                                            <span className={`font-medium ${r.color}`}>{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Details</h2>
                            <div className="space-y-2 text-sm">
                                {program.response_sla && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">SLA</span>
                                        <span className="text-gray-900 dark:text-white">{program.response_sla}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Currency</span>
                                    <span className="text-gray-900 dark:text-white">{program.currency || 'NGN'}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/org/reports?program_id=${program.id}`}
                            className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            <FileText size={16} /> View All Reports
                        </Link>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
