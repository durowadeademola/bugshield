import { Head, useForm, usePage, Link } from '@inertiajs/react';

export default function EmailTwoFactorChallenge() {
    const { flash = {} } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const resendForm = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('2fa.email.verify'));
    };

    const resendCode = (e) => {
        e.preventDefault();
        resendForm.post(route('2fa.email.resend'));
    };

    return (
        <>
            <Head title="Email 2FA Verification" />
            <div className="min-h-screen flex">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 bg-[#1A1C2C] text-white relative flex items-center justify-center p-8">

                    {/* Logo at Top Left */}
                    <div className="absolute top-6 left-6 flex items-center">
                        <img
                            src="/images/bluestrike-logo.png"
                            alt="Bluestrike Logo"
                            className="h-12 w-auto"
                        />
                        <span className="text-2xl md:text-3xl font-extrabold text-white cursor-pointer">
                            Bluestrike
                        </span>
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-md space-y-6 mt-20">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-2">Enter 2FA Code</h2>
                            <p className="text-base text-gray-400">
                                Enter the 6-digit code sent to your email address to complete your login.
                            </p>
                        </div>

                        {flash.status && (
                            <div className="text-green-500 text-sm font-medium">
                                {flash.status}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={submit}>
                            <div>
                                <label className="block text-sm mb-2">2FA Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Enter code"
                                    autoFocus
                                    required
                                />
                                {errors.code && (
                                    <div className="text-red-500 text-sm mt-1">{errors.code}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Please wait...' : 'Verify Code'}
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-400 mb-2">Didn't receive the code?</p>
                            <button
                                onClick={resendCode}
                                disabled={resendForm.processing}
                                className="text-blue-500 hover:underline text-sm font-medium"
                            >
                                {resendForm.processing ? 'Please wait...' : 'Resend Code'}
                            </button>
                        </div>

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
                <div className="hidden md:flex w-1/2 bg-[#263178] items-center justify-center p-6 shadow-2xl overflow-hidden">
                    <img
                        src="/images/bluestrike-illustration.png"
                        alt="Bluestrike Illustration"
                        className="max-w-[700px] w-full h-auto object-contain rounded-xl"
                    />
                </div>
            </div>
        </>
    );
}
