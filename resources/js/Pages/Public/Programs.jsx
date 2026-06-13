import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Shield, Bug, Globe, Users, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPE_FILTERS = [
    { value: '', label: 'All Programs' },
    { value: 'bug_bounty', label: 'Bug Bounty' },
    { value: 'vdp', label: 'VDP' },
    { value: 'pentest', label: 'Pentest' },
];

const TYPE_COLORS = {
    bug_bounty: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    vdp: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    pentest: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
};

function ProgramCard({ program, index }) {
    const typeClass = TYPE_COLORS[program.type] || TYPE_COLORS.bug_bounty;
    const typeLabel = program.type === 'bug_bounty' ? 'Bug Bounty' : program.type === 'vdp' ? 'VDP' : 'Pentest';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 6) * 0.05 }}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {program.organization?.logo_path ? (
                        <img
                            src={`/storage/${program.organization.logo_path}`}
                            alt={program.organization.name}
                            className="w-12 h-12 rounded-xl object-contain border border-gray-100 dark:border-gray-700 p-1"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{program.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{program.organization?.name}</p>
                    </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${typeClass}`}>{typeLabel}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {program.description}
            </p>

            {program.critical_bounty_range && (
                <div className="mb-4 space-y-1">
                    {[
                        ['Critical', program.critical_bounty_range, 'text-red-600 dark:text-red-400'],
                        ['High', program.high_bounty_range, 'text-orange-600 dark:text-orange-400'],
                        ['Medium', program.medium_bounty_range, 'text-yellow-600 dark:text-yellow-400'],
                    ].filter(([, val]) => val).slice(0, 2).map(([label, val, color]) => (
                        <div key={label} className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">{label}</span>
                            <span className={`font-medium ${color}`}>{val}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FileText size={12} />{program.reports_count} reports</span>
                </div>
                <Link
                    href={`/researcher/programs/${program.id}`}
                    className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium hover:gap-2 transition-all"
                >
                    View Program <ChevronRight size={12} />
                </Link>
            </div>
        </motion.div>
    );
}

export default function PublicPrograms({ programs, filters, stats }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const applyFilter = (params) => {
        router.get('/programs', { ...filters, ...params }, { preserveScroll: true, replace: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter({ search });
    };

    const programList = programs?.data ?? programs ?? [];

    return (
        <>
            <Head title="Bug Bounty Programs — Bluestrike" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

                {/* Header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                        <Link href="/" className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Bluestrike
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Sign In</Link>
                            <Link href="/register" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero bar */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <h1 className="text-3xl font-bold mb-1">Bug Bounty Programs</h1>
                        <p className="text-blue-200 mb-6">Find and report vulnerabilities in Africa's top companies</p>
                        <div className="grid grid-cols-3 gap-4 max-w-lg">
                            {[
                                { label: 'Active Programs', value: stats?.total_programs ?? 0 },
                                { label: 'Researchers', value: stats?.total_researchers ?? 0 },
                                { label: 'Bounties Paid (NGN)', value: `₦${Number(stats?.total_bounties_paid ?? 0).toLocaleString()}` },
                            ].map(s => (
                                <div key={s.label}>
                                    <p className="text-2xl font-bold">{s.value}</p>
                                    <p className="text-xs text-blue-200">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Search + filters */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search programs or organizations..."
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">
                                Search
                            </button>
                        </form>
                        <div className="flex gap-2 flex-wrap">
                            {TYPE_FILTERS.map(f => (
                                <button
                                    key={f.value}
                                    onClick={() => applyFilter({ type: f.value, search })}
                                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                                        (filters?.type ?? '') === f.value
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {programList.length === 0 ? (
                        <div className="text-center py-20">
                            <Globe size={40} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500">No programs found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {programList.map((p, i) => <ProgramCard key={p.id} program={p} index={i} />)}
                            </div>

                            {/* Pagination */}
                            {programs?.links && programs.links.length > 3 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {programs.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? '#'}
                                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                        ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300'
                                                        : 'opacity-40 cursor-not-allowed bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-400'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* CTA Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 mt-8">
                    <div className="max-w-3xl mx-auto text-center px-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Ready to start hunting?</h2>
                        <p className="text-blue-200 mb-6">Create a free researcher account and start earning Naira for valid vulnerabilities.</p>
                        <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                            Create Free Account <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
