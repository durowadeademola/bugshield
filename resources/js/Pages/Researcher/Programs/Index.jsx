import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Search, Shield, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function ProgramsIndex({ programs, filters }) {
    const list = programs?.data || [];
    const [search, setSearch] = useState(filters.search || '');

    const applySearch = (e) => {
        e.preventDefault();
        router.get('/researcher/programs', { ...filters, search }, { preserveState: true, replace: true });
    };

    const filterType = (type) => {
        router.get('/researcher/programs', { ...filters, type: type || undefined, search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Browse Programs" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bug Bounty Programs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse active programs and submit your vulnerability findings.</p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <form onSubmit={applySearch} className="flex flex-1 gap-2">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search programs..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Search</button>
                    </form>
                    <div className="flex gap-2">
                        {[['', 'All'], ['bug_bounty', 'Bug Bounty'], ['vdp', 'VDP'], ['pentest', 'Pentest']].map(([val, label]) => (
                            <button key={val} onClick={() => filterType(val)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${filters.type === val || (!val && !filters.type) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {list.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                        <Shield size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No programs found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {list.map(program => (
                            <Link
                                key={program.id}
                                href={`/researcher/programs/${program.id}`}
                                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    {program.organization?.logo_path ? (
                                        <img src={`/storage/${program.organization.logo_path}`} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <Shield size={18} className="text-blue-600 dark:text-blue-300" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">{program.title}</h3>
                                        <p className="text-xs text-gray-400">{program.organization?.name}</p>
                                    </div>
                                    <StatusBadge status={program.type} />
                                </div>

                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{program.description}</p>

                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span className="flex items-center gap-1"><FileText size={12} />{program.reports_count ?? 0} reports</span>
                                    {program.critical_bounty_range && (
                                        <span className="text-red-600 dark:text-red-400 font-medium">Critical: ₦{program.critical_bounty_range}</span>
                                    )}
                                    <ChevronRight size={14} className="group-hover:text-blue-500 transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {programs?.links && (
                    <div className="mt-6 flex justify-center gap-2">
                        {programs.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} className={`px-3 py-1 rounded text-sm border ${link.active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'} ${!link.url ? 'opacity-40 pointer-events-none' : ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </DashboardLayout>
        </>
    );
}
