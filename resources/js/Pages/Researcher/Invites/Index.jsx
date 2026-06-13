import { Head } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { UserPlus, Mail } from 'lucide-react';

export default function InvitesIndex({ invites }) {
    return (
        <>
            <Head title="Program Invites" />
            <DashboardLayout>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Program Invites</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Private program invitations from organizations.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    {(!invites || invites.length === 0) ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
                                <Mail size={28} className="text-blue-600 dark:text-blue-300" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Invites Yet</h3>
                            <p className="text-gray-400 max-w-sm mx-auto">
                                Organizations can invite you to their private programs. Keep submitting quality reports to increase your chances of getting invited!
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {invites.map(invite => (
                                <div key={invite.id} className="flex items-center justify-between p-5">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{invite.program?.title}</p>
                                        <p className="text-sm text-gray-400">{invite.organization?.name}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Accept</button>
                                        <button className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">Decline</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
}
