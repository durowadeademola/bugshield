import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
        <Head title='Login' />
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
                    <Link href="/">
                        <span className="text-2xl md:text-3xl font-extrabold text-white cursor-pointer">
                            Bugshield
                        </span>
                    </Link>
                </div>

                {/* Login Form */}
                <div className="w-full max-w-md space-y-6 mt-20">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-2">Welcome Back,</h2>
                        <p className="text-base text-gray-400">
                            Kindly enter your details to log in.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={submit}>
                        <div>
                            <label className="block text-sm mb-2">Email Address</label>
                            <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Password</label>
                            <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-4 text-lg rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="form-checkbox text-blue-600"
                            />
                            <span>Remember me</span>
                            </label>
                            {canResetPassword && (
                            <Link href={route('password.request')} className="text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                        >
                            {processing ? 'Please wait...' : 'Login'}
                        </button>
                    </form>


                    <p className="text-sm text-center text-gray-400">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>

                    <p className="text-sm text-center text-gray-400 mt-6">
                        By continuing, you agree to Bugshield&apos;s{' '}
                        <Link
                            href={route('terms')}
                            className="text-blue-500 hover:underline"
                        >
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                            href={route('privacy')}
                            className="text-blue-500 hover:underline"
                        >
                            Privacy Policy
                        </Link>.
                    </p>

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
