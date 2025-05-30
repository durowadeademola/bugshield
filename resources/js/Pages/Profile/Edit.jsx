import { Head, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import EmailTwoFactorSetting from './Partials/EmailTwoFactorSetting';
import TotpTwoFactorSetting from './Partials/TotpTwoFactorSetting';
import KYCForm from './Partials/KYCForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <>
            <Head title="Profile Settings" />
            <DashboardLayout>
                <div className="space-y-6">
                    {/* Profile Header Card */}
                    <div className="bg-white dark:bg-gray-900 dark:text-white text-gray-900 p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold mb-4">Profile</h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-yellow-200 flex items-center justify-center text-3xl font-bold text-blue-900">
                                {user?.name?.charAt(0)}
                            </div>
                            <div className="text-xl font-semibold">
                                {user?.name?.toUpperCase()}
                            </div>
                        </div>

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    {/* Password Management Section */}
                    <div className="bg-white dark:bg-gray-900 dark:text-white text-gray-900 p-6 rounded-xl shadow">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                     {/* Two Factor Authentication Section */}
                    <div className="bg-white dark:bg-gray-900 dark:text-white text-gray-900 p-6 rounded-xl shadow space-y-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h2>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <EmailTwoFactorSetting user={user} />
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <TotpTwoFactorSetting />
                        </div>
                    </div>

                    {/* KYC Form Information */}
                    <div className='bg-white dark:bg-gray-900 dark:text-white text-gray-900 p-6 rounded-xl shadow space-y-6'>
                        <KYCForm className="max-w-2xl" />
                    </div>


                    {/* Delete Account Section */}
                    <div className="bg-white dark:bg-gray-900 dark:text-white text-gray-900 p-6 rounded-xl shadow">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}

