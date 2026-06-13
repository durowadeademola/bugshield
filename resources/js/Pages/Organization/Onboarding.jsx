import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    Building2, Globe, Mail, Phone, MapPin, FileText,
    Upload, ChevronRight, ChevronLeft, Check, Shield
} from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Company Info', icon: <Building2 size={20} />, desc: 'Basic organization details' },
    { id: 2, title: 'Contact & Location', icon: <MapPin size={20} />, desc: 'Where you operate' },
    { id: 3, title: 'Review & Submit', icon: <Check size={20} />, desc: 'Confirm your details' },
];

const COUNTRIES = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Ethiopia',
    'Tanzania', 'Uganda', 'Rwanda', 'Senegal', 'Cameroon', 'Ivory Coast',
    'Angola', 'Mozambique', 'Zimbabwe', 'Zambia', 'Other',
];

function StepIndicator({ currentStep }) {
    return (
        <div className="flex items-center gap-0 mb-10">
            {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        currentStep > s.id
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : currentStep === s.id
                                ? 'border-blue-600 text-blue-600 bg-white dark:bg-gray-900'
                                : 'border-gray-300 dark:border-gray-600 text-gray-400'
                    }`}>
                        {currentStep > s.id ? <Check size={16} /> : s.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`h-0.5 w-16 mx-1 transition-all duration-300 ${
                            currentStep > s.id ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                    )}
                </div>
            ))}
        </div>
    );
}

function FieldLabel({ children, required }) {
    return (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );
}

function Input({ className = '', ...props }) {
    return (
        <input
            className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
            {...props}
        />
    );
}

function Textarea({ className = '', ...props }) {
    return (
        <textarea
            className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ${className}`}
            {...props}
        />
    );
}

export default function Onboarding({ existingOrg }) {
    const [step, setStep] = useState(1);
    const [logoPreview, setLogoPreview] = useState(
        existingOrg?.logo_path ? `/storage/${existingOrg.logo_path}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        name:         existingOrg?.name ?? '',
        email:        existingOrg?.email ?? '',
        website:      existingOrg?.website ?? '',
        phone_number: existingOrg?.phone_number ?? '',
        country:      existingOrg?.country ?? 'Nigeria',
        state:        existingOrg?.state ?? '',
        address:      existingOrg?.address ?? '',
        description:  existingOrg?.description ?? '',
        logo:         null,
    });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/org/onboarding');
    };

    const canProceed = () => {
        if (step === 1) return data.name.trim() && data.email.trim();
        if (step === 2) return data.country.trim();
        return true;
    };

    return (
        <>
            <Head title="Set Up Your Organization — Bluestrike" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">

                {/* Header */}
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <div className="max-w-xl mx-auto px-6 h-14 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-lg">
                            <Shield size={20} className="text-blue-600" />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bluestrike</span>
                        </div>
                        <span className="text-sm text-gray-500">Organization Setup</span>
                    </div>
                </header>

                <div className="flex-1 flex items-start justify-center py-10 px-4">
                    <div className="w-full max-w-xl">
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Bluestrike</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                                Let's set up your organization profile before you create your first bug bounty program.
                            </p>
                        </div>

                        <StepIndicator currentStep={step} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            {STEPS[step - 1].icon}
                                        </div>
                                        <div>
                                            <h2 className="font-semibold text-gray-900 dark:text-white">
                                                {STEPS[step - 1].title}
                                            </h2>
                                            <p className="text-xs text-gray-500">{STEPS[step - 1].desc}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={submit}>
                                        {/* ── STEP 1: Company Info ── */}
                                        {step === 1 && (
                                            <div className="space-y-5">
                                                {/* Logo */}
                                                <div>
                                                    <FieldLabel>Company Logo</FieldLabel>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
                                                            {logoPreview ? (
                                                                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                                                            ) : (
                                                                <Upload size={24} className="text-gray-400" />
                                                            )}
                                                        </div>
                                                        <label className="cursor-pointer px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                            <span>Upload Logo</span>
                                                            <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                                                        </label>
                                                    </div>
                                                </div>

                                                <div>
                                                    <FieldLabel required>Organization Name</FieldLabel>
                                                    <Input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value)}
                                                        placeholder="e.g. Access Bank Plc"
                                                    />
                                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                                </div>

                                                <div>
                                                    <FieldLabel required>Organization Email</FieldLabel>
                                                    <Input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        placeholder="security@yourcompany.com"
                                                    />
                                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                                </div>

                                                <div>
                                                    <FieldLabel>Website</FieldLabel>
                                                    <Input
                                                        type="url"
                                                        value={data.website}
                                                        onChange={e => setData('website', e.target.value)}
                                                        placeholder="https://yourcompany.com"
                                                    />
                                                    {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
                                                </div>

                                                <div>
                                                    <FieldLabel>Description</FieldLabel>
                                                    <Textarea
                                                        value={data.description}
                                                        onChange={e => setData('description', e.target.value)}
                                                        placeholder="Brief description of your organization and what you do..."
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* ── STEP 2: Contact & Location ── */}
                                        {step === 2 && (
                                            <div className="space-y-5">
                                                <div>
                                                    <FieldLabel>Phone Number</FieldLabel>
                                                    <Input
                                                        type="tel"
                                                        value={data.phone_number}
                                                        onChange={e => setData('phone_number', e.target.value)}
                                                        placeholder="+234 800 000 0000"
                                                    />
                                                </div>

                                                <div>
                                                    <FieldLabel required>Country</FieldLabel>
                                                    <select
                                                        value={data.country}
                                                        onChange={e => setData('country', e.target.value)}
                                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>

                                                <div>
                                                    <FieldLabel>State / Province</FieldLabel>
                                                    <Input
                                                        type="text"
                                                        value={data.state}
                                                        onChange={e => setData('state', e.target.value)}
                                                        placeholder="Lagos State"
                                                    />
                                                </div>

                                                <div>
                                                    <FieldLabel>Office Address</FieldLabel>
                                                    <Textarea
                                                        value={data.address}
                                                        onChange={e => setData('address', e.target.value)}
                                                        placeholder="123 Victoria Island, Lagos..."
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* ── STEP 3: Review ── */}
                                        {step === 3 && (
                                            <div className="space-y-4">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                                    Review your organization details below before submitting.
                                                </p>
                                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Logo" className="w-16 h-16 rounded-xl object-contain border border-gray-200 dark:border-gray-700" />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                                                            {data.name[0] || 'O'}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-gray-900 dark:text-white">{data.name || 'Organization Name'}</p>
                                                        <p className="text-sm text-gray-500">{data.email}</p>
                                                        {data.website && <p className="text-sm text-blue-600">{data.website}</p>}
                                                    </div>
                                                </div>
                                                {[
                                                    ['Country', data.country],
                                                    ['State', data.state],
                                                    ['Phone', data.phone_number],
                                                    ['Address', data.address],
                                                ].filter(([, v]) => v).map(([label, value]) => (
                                                    <div key={label} className="flex gap-2 text-sm">
                                                        <span className="text-gray-500 w-20 flex-shrink-0">{label}:</span>
                                                        <span className="text-gray-900 dark:text-white">{value}</span>
                                                    </div>
                                                ))}
                                                {data.description && (
                                                    <div className="text-sm mt-2">
                                                        <span className="text-gray-500 block mb-1">Description:</span>
                                                        <span className="text-gray-900 dark:text-white text-xs leading-relaxed">{data.description}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Navigation */}
                                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                            <button
                                                type="button"
                                                onClick={() => setStep(s => s - 1)}
                                                disabled={step === 1}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronLeft size={16} /> Previous
                                            </button>

                                            {step < 3 ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(s => s + 1)}
                                                    disabled={!canProceed()}
                                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    Continue <ChevronRight size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {processing ? 'Saving...' : 'Complete Setup'}
                                                    <Check size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            You can update these details later from your organization settings.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
