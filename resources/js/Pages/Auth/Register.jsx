import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Register({ states = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        phone_number: '',
        address: '',
        image: '',
        role: 'Organization',
        name: '',
        website: '',
        description: '',
        country: 'Nigeria',
        state: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        designation: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />

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

                    <div className="w-full max-w-xl space-y-6 mt-20">
                        <div>
                            <h2 className="text-4xl font-extrabold mb-2">Get Started</h2>
                            <p className="text-base text-gray-400">Sign up to create an account</p>
                        </div>

                        {Object.values(errors).length > 0 && (
                            <div className="bg-red-500 text-white p-3 rounded mb-4 space-y-1">
                                {Object.values(errors).map((error, i) => (
                                    <div key={i}>{error}</div>
                                ))}
                            </div>
                        )}


                        <form className="space-y-5" onSubmit={submit} encType="multipart/form-data">
                         {/* User type toggle bar */}
                        <div className="mb-4">
                            <p className="text-sm text-white mb-1">You are registering as?</p>
                            <div className="flex justify-center mb-6 border-b border-gray-700 space-x-10">
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'Organization')}
                                    className={`px-2 py-2 text-lg font-semibold relative transition ${
                                    data.role === 'Organization'
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-white'
                                        : 'text-gray-400'
                                    }`}
                                >
                                    Organization
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'Researcher')}
                                    className={`px-2 py-2 text-lg font-semibold relative transition ${
                                    data.role === 'Researcher'
                                        ? 'text-white after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-white'
                                        : 'text-gray-400'
                                    }`}
                                >
                                    Researcher
                                </button>
                            </div>

                                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                    required
                                />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={data.phone_number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                    required
                                />
                                {errors.phone_number && <div className="text-red-500 text-sm mt-1">{errors.phone_number}</div>}
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Upload Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="block w-full text-sm text-gray-400"
                                />
                                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                            </div>

                            {/* ORGANIZATION FIELDS */}
                            {data.role === 'Organization' && (
                                <>
                                    <div>
                                        <label className="block text-sm mb-1">Organization Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Website</label>
                                        <input
                                            type="text"
                                            name="website"
                                            value={data.website}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.website && <div className="text-red-500 text-sm mt-1">{errors.website}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={data.country}
                                            readOnly
                                            className="w-full px-4 py-3 rounded-md bg-gray-700 text-gray-300 cursor-not-allowed"
                                        />
                                        {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">State</label>
                                        <select
                                            name="state"
                                            value={data.state}
                                            onChange={e => setData('state', e.target.value)}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white"
                                        >
                                            <option value="">Select your state</option>
                                            {states.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.state && <div className="text-red-500 text-sm mt-1">{errors.state}</div>}
                                    </div>
                                </>
                            )}

                            {/* RESEARCHER FIELDS */}
                            {data.role === 'Researcher' && (
                                <>
                                    <div>
                                        <label className="block text-sm mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Middle Name</label>
                                        <input
                                            type="text"
                                            name="middle_name"
                                            value={data.middle_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.middle_name && <div className="text-red-500 text-sm mt-1">{errors.middle_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Designation</label>
                                        <input
                                            type="text"
                                            name="designation"
                                            value={data.designation}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700"
                                        />
                                        {errors.designation && <div className="text-red-500 text-sm mt-1">{errors.designation}</div>}
                                    </div>
                                </>
                            )}

                            {/* Password Fields */}
                            <div className="relative">
                                <label className="block text-sm mb-1">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[38px] text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>

                            <div className="relative">
                                <label className="block text-sm mb-1">Confirm Password</label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-[38px] text-gray-400"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-md font-bold transition"
                            >
                                {processing ? 'Please wait...' : 'Register'}
                            </button>
                        </form>

                        <p className="text-sm text-center text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-500 hover:underline">
                                Sign In
                            </Link>
                        </p>

                        <p className="text-sm text-center text-gray-400 mt-6">
                            By continuing, you agree to Bugshield&apos;s{' '}
                            <Link href={route('terms')} className="text-blue-500 hover:underline">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href={route('privacy')} className="text-blue-500 hover:underline">
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                </div>

                 {/* Right Panel */}
                <div className="hidden md:flex w-1/2 bg-[#263178] items-center justify-center p-6 shadow-2xl overflow-hidden">
                    <img
                        src="/images/bugshield-illustration.png"
                        alt="Bugshield Illustration"
                        className="max-w-[700px] w-full h-auto object-contain rounded-xl"
                    />
                </div>
            </div>
        </>
    );
}
