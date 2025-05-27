import { Head, useForm, usePage, Link } from '@inertiajs/react';

export default function TwoFactorChallenge() {
    const { flash = {} } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('2fa.email.verify'));
    };

    return (
        <>
            <Head title="Two-Factor Authentication" />
            <div className="min-h-screen flex">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 bg-[#1A1C2C] text-white relative flex items-center justify-center p-8">

                    {/* Logo at Top Left */}
                    <div className="absolute top-6 left-6 flex items-center">
                        <img
                            src="/images/bugshield-logo.png"
                            alt="Bugshield Logo"
                            className="h-12 w-auto"
                        />
                        <span className="text-2xl md:text-3xl font-extrabold text-white cursor-pointer">
                            Bugshield
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-md space-y-6 mt-20">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-2">Two-Factor Challenge</h2>
                            <p className="text-base text-gray-400">
                                Enter your 6-digit authentication code or a recovery code to log in.
                            </p>
                        </div>

                        {flash.status && (
                            <div className="text-green-500 text-sm font-medium">
                                {flash.status}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={submit}>
                            <div>
                                <label className="block text-sm mb-2">Authentication Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter 6-digit code"
                                    autoFocus
                                />
                                {errors.code && (
                                    <div className="text-red-500 text-sm mt-1">{errors.code}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm mb-2">Or Recovery Code</label>
                                <input
                                    type="text"
                                    name="recovery_code"
                                    value={data.recovery_code}
                                    onChange={(e) => setData('recovery_code', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter recovery code"
                                />
                                {errors.recovery_code && (
                                    <div className="text-red-500 text-sm mt-1">{errors.recovery_code}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Please wait...' : 'Verify'}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <Link
                                href={route('login')}
                                className="text-blue-400 hover:underline text-sm font-medium"
                            >
                                Go back to Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="hidden md:flex w-1/2 bg-[#263178] items-center justify-center p-10">
                    <img
                        src="/images/bugshield-illustration.png"
                        alt="Bugshield Illustration"
                        className="max-w-full h-[500px] md:h-[600px] lg:h-[700px] object-contain rounded-xl shadow-2xl"
                    />
                </div>
            </div>
        </>
    );
}
