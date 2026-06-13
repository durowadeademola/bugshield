import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import { Shield, FileText, Search } from 'lucide-react';
import { useState } from 'react';

export default function AnalystProgramsIndex({ programs, filters }) {
    const list = programs?.data || [];
    const [search, setSearch] = useState(filters.search || '');

    const applySearch = (e) => {
        e.preventDefault();
        router.get('/analyst/programs', { ...filters, search }, { preserveState: true, replace: true });
    };

    const filterType = (type) => {
        router.get('/analyst/programs', { type: type || undefined, search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Programs" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Programs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">All active bug bounty programs across the platform.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <form onSubmit={applySearch} className="flex flex-1 gap-2">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search programs..." value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Search</button>
                    </form>
                    <div className="flex gap-2">
                        {[['', 'All'], ['bug_bounty', 'Bug Bounty'], ['vdp', 'VDP'], ['pentest', 'Pentest']].map(([val, label]) => (
                            <button key={val} onClick={() => filterType(val)} className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${filters.type === val || (!val && !filters.type) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}>{label}</button>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Program</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Organization</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Type</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Reports</th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {list.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-12 text-gray-400">No programs found.</td></tr>
                            ) : list.map(program => (
                                <tr key={program.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3">
                                        <Link href={`/analyst/programs/${program.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                                            <Shield size={14} className="text-gray-400" />
                                            {program.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{program.organization?.name}</td>
                                    <td className="px-4 py-3"><StatusBadge status={program.type} /></td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                            <FileText size={14} />{program.reports_count ?? 0}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${program.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-500'}`}>
                                            {program.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
