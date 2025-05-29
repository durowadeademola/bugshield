import { useForm } from '@inertiajs/react';

export default function EmailTwoFactorSetting({ user }) {
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        email_two_factor_enabled: user?.email_two_factor_enabled ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('email-2fa'), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable or Disable Email Two-Factor Authentication
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.email_two_factor_enabled}
                        onChange={(e) =>
                            setData('email_two_factor_enabled', e.target.checked)
                        }
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
            </div>

            <button type="submit" disabled={processing}
                className={`px-4 py-2 rounded transition text-white ${
                    user.email_two_factor_enabled
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {user.email_two_factor_enabled ? 'Disable' : 'Enable'} Email 2FA
            </button>


            {recentlySuccessful && (
                <p className="text-green-600 text-sm">Settings updated successfully.</p>
            )}
        </form>
    );
}
