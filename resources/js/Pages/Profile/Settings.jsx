import { useForm } from '@inertiajs/react';

export default function Settings({ user }) {
    const { data, setData, patch, processing } = useForm({
        email_two_factor_enabled: user.email_two_factor_enabled || false,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('email-2fa'));
    };

    return (
        <form onSubmit={submit} className="space-y-6 max-w-md mx-auto mt-10">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enable Email 2FA</span>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.email_two_factor_enabled}
                        onChange={(e) => setData('email_two_factor_enabled', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
                </label>
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                disabled={processing}
            >
                {data.email_two_factor_enabled ? 'Disable' : 'Enable'} 2FA
            </button>
        </form>
    );
}
