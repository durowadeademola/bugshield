import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Trophy, Medal, Star, User } from 'lucide-react';

const RANK_COLORS = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
const RANK_BG = ['bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700', 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600', 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'];

export default function Leaderboards({ researchers, currentResearcherId }) {
    const top3 = researchers.slice(0, 3);
    const rest = researchers.slice(3);

    return (
        <>
            <Head title="Leaderboards" />
            <DashboardLayout>
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-3">
                        <Trophy size={32} className="text-yellow-600 dark:text-yellow-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Researcher Leaderboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Top security researchers on Bluestrike</p>
                </div>

                {/* Top 3 Podium */}
                {top3.length > 0 && (
                    <div className="flex items-end justify-center gap-4 mb-8">
                        {[top3[1], top3[0], top3[2]].filter(Boolean).map((r, i) => {
                            const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                            const heights = ['h-28', 'h-36', 'h-24'];
                            const isMe = r.id === currentResearcherId;
                            return (
                                <div key={r.id} className={`flex flex-col items-center ${isMe ? 'ring-2 ring-blue-500 rounded-xl' : ''}`}>
                                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2 border-4 border-white dark:border-gray-800 shadow-lg">
                                        {r.image_path ? (
                                            <img src={`/storage/${r.image_path}`} className="w-full h-full rounded-full object-cover" alt="" />
                                        ) : (
                                            <User size={24} className="text-blue-600 dark:text-blue-300" />
                                        )}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.first_name} {r.last_name}</p>
                                    <p className="text-xs text-gray-400">{r.country}</p>
                                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{r.reputation_points} pts</p>
                                    <div className={`${heights[i]} w-24 rounded-t-xl flex items-end justify-center pb-3 mt-2 ${actualRank === 1 ? 'bg-yellow-400' : actualRank === 2 ? 'bg-gray-300 dark:bg-gray-600' : 'bg-orange-400'}`}>
                                        <span className="text-2xl font-black text-white">#{actualRank}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Full Leaderboard Table */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900 dark:text-white">All Rankings</h2>
                        <span className="text-sm text-gray-400">{researchers.length} researchers</span>
                    </div>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Rank</th>
                                <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Researcher</th>
                                <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Country</th>
                                <th className="text-right px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Reports</th>
                                <th className="text-right px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Resolved</th>
                                <th className="text-right px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Earnings</th>
                                <th className="text-right px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {researchers.map((r, i) => {
                                const isMe = r.id === currentResearcherId;
                                const rank = i + 1;
                                return (
                                    <tr key={r.id} className={`${isMe ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors`}>
                                        <td className="px-5 py-3">
                                            <span className={`font-bold text-lg ${rank <= 3 ? RANK_COLORS[rank - 1] : 'text-gray-400'}`}>
                                                #{rank}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                    {r.image_path ? (
                                                        <img src={`/storage/${r.image_path}`} className="w-full h-full rounded-full object-cover" alt="" />
                                                    ) : (
                                                        <User size={14} className="text-blue-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {r.first_name} {r.last_name}
                                                        {isMe && <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded">You</span>}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{r.country || '—'}</td>
                                        <td className="px-5 py-3 text-right text-gray-900 dark:text-white">{r.reports_submitted}</td>
                                        <td className="px-5 py-3 text-right text-green-600 dark:text-green-400">{r.reports_resolved}</td>
                                        <td className="px-5 py-3 text-right font-medium text-gray-900 dark:text-white">₦{Number(r.total_earnings || 0).toLocaleString()}</td>
                                        <td className="px-5 py-3 text-right font-bold text-blue-600 dark:text-blue-400">{r.reputation_points}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
        </>
    );
}
