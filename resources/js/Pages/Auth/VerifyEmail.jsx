import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />
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
                            <h2 className="text-4xl font-extrabold mb-2">Verify Your Email</h2>
                            <p className="text-base text-gray-400">
                                Before getting started, please verify your email address by clicking the link we just sent.
                                If you didn’t receive the email, we’ll send another.
                            </p>
                        </div>

                        {status === 'verification-link-sent' && (
                            <div className="text-green-500 text-sm font-medium">
                                A new verification link has been sent to your email.
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={submit}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Sending...' : 'Resend Verification Email'}
                            </button>
                        </form>

                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="hover:underline hover:text-white"
                            >
                                Log Out
                            </Link>

                            <Link
                                href={route('login')}
                                className="hover:underline hover:text-white"
                            >
                                Go back to Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="hidden md:flex w-1/2 bg-[#263178] items-center justify-center p-10">
                    <img
                        src="/images/illustration-dashboard.png"
                        alt="BugShield Illustration"
                        className="max-w-full h-auto rounded-xl shadow-2xl"
                    />
                </div>
            </div>
        </>
    );
}
