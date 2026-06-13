import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';
import SeverityBadge from '@/Components/SeverityBadge';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function PaymentsIndex({ bounties, totalEarned, pendingAmount }) {
    const list = bounties?.data || [];

    return (
        <>
            <Head title="Payments & Earnings" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payments & Earnings</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your bounty payments and earnings history.</p>
                </div>

                {/* Earnings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign size={20} />
                            <span className="text-sm font-medium opacity-90">Total Earned</span>
                        </div>
                        <p className="text-3xl font-bold">₦{Number(totalEarned || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-center gap-2 mb-1 text-yellow-600">
                            <Clock size={20} />
                            <span className="text-sm font-medium">Pending</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">₦{Number(pendingAmount || 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                        <div className="flex items-center gap-2 mb-1 text-blue-600">
                            <TrendingUp size={20} />
                            <span className="text-sm font-medium">Total Bounties</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{bounties?.total ?? list.length}</p>
                    </div>
                </div>

                {/* Payment History */}
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="font-semibold text-gray-900 dark:text-white">Payment History</h2>
                    </div>
                    {list.length === 0 ? (
                        <div className="text-center py-12">
                            <DollarSign size={40} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 dark:text-gray-400">No payments yet. Submit reports to earn bounties!</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Report</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Program</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Severity</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Amount</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Status</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600 dark:text-gray-300">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {list.map(bounty => (
                                    <tr key={bounty.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">{bounty.report?.title}</td>
                                        <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{bounty.program?.title}</td>
                                        <td className="px-5 py-3"><SeverityBadge severity={bounty.report?.severity} /></td>
                                        <td className="px-5 py-3 font-bold text-green-600 dark:text-green-400">₦{Number(bounty.amount).toLocaleString()}</td>
                                        <td className="px-5 py-3"><StatusBadge status={bounty.status} /></td>
                                        <td className="px-5 py-3 text-gray-400 text-xs">{new Date(bounty.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
}
