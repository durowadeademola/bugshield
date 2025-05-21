import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
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
                            <h2 className="text-4xl font-extrabold mb-2">Reset Password</h2>
                            <p className="text-base text-gray-400">
                                Enter a new password for your account.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={submit}>
                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="username"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 pr-12"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 pr-12"
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-3 text-gray-400"
                                    >
                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.password_confirmation}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
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
