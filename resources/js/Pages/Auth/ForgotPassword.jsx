import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
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
                            <h2 className="text-4xl font-extrabold mb-2">Forgot Password</h2>
                            <p className="text-base text-gray-400">
                                Enter your email address and we’ll send you a link to reset your password.
                            </p>
                        </div>

                        {status && (
                            <div className="text-green-500 text-sm font-medium">
                                {status}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={submit}>
                            <div>
                                <label className="block text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="username"
                                    required
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Sending...' : 'Send Password Reset Link'}
                            </button>
                        </form>

                        {/* Go Back to Login Link */}
                        <div className="text-center mt-4">
                            <Link
                                href={route('login')}
                                className="text-blue-500 hover:underline text-sm font-medium"
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
