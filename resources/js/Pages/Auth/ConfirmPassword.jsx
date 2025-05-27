import { Head, Link, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirm Password" />
            <div className="min-h-screen flex">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 bg-[#1A1C2C] text-white flex items-center justify-center p-8 relative">

                    {/* Logo */}
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

                    {/* Card */}
                    <div className="w-full max-w-md space-y-6 mt-20">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-2">Confirm Password</h2>
                            <p className="text-base text-gray-400">
                                This is a secure area of the application. Please confirm your password before continuing.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={submit}>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="current-password"
                                    required
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Confirming...' : 'Confirm Password'}
                            </button>
                        </form>

                        {/* Go back to Login Link */}
                        <div className="mt-4 text-center">
                            <Link
                                href={route('login')}
                                className="text-blue-500 hover:underline"
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
