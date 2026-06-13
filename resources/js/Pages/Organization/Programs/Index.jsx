import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Plus, Shield, Users, FileText, ChevronRight } from 'lucide-react';

export default function ProgramsIndex({ programs, type, typeLabel }) {
    const label = typeLabel || 'All Programs';
    const list = programs?.data || programs || [];

    return (
        <>
            <Head title={label} />
            <DashboardLayout>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{label}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage your security programs and track incoming reports.
                        </p>
                    </div>
                    <Link
                        href="/org/programs/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        <Plus size={16} />
                        New Program
                    </Link>
                </div>

                {list.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <Shield size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No programs yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first security program to start receiving vulnerability reports.</p>
                        <Link
                            href="/org/programs/create"
                            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={16} /> Create Program
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {list.map((program) => (
                            <Link
                                key={program.id}
                                href={`/org/programs/${program.id}`}
                                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {program.logo_path ? (
                                            <img src={`/storage/${program.logo_path}`} alt={program.title} className="w-10 h-10 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                <Shield size={20} className="text-blue-600 dark:text-blue-300" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {program.title}
                                            </h3>
                                            <StatusBadge status={program.type} />
                                        </div>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${program.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500'}`}>
                                        {program.is_active ? 'Active' : 'Paused'}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                    {program.description}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <FileText size={14} />
                                            {program.reports_count ?? 0} reports
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {program.is_public ? '🌐 Public' : '🔒 Private'}
                                        </span>
                                    </div>
                                    <ChevronRight size={16} className="group-hover:text-blue-500 transition-colors" />
                                </div>

                                {program.critical_bounty_range && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-xs text-gray-400">
                                            Critical: <span className="font-semibold text-red-600 dark:text-red-400">{program.critical_bounty_range} NGN</span>
                                        </p>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}

                {programs?.links && (
                    <div className="mt-6 flex justify-center gap-2">
                        {programs.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </DashboardLayout>
        </>
    );
}
