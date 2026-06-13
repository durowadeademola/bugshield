import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

const Field = ({ label, error, children, hint }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        {children}
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function CreateProgram() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: 'bug_bounty',
        asset: '',
        in_scope: '',
        out_of_scope: '',
        policy: '',
        response_sla: '',
        critical_bounty_range: '',
        high_bounty_range: '',
        medium_bounty_range: '',
        low_bounty_range: '',
        informational_bounty_range: '',
        is_public: true,
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/org/programs', { forceFormData: true });
    };

    return (
        <>
            <Head title="Create Program" />
            <DashboardLayout>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link href="/org/security/bug-bounty" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-3">
                            <ArrowLeft size={14} /> Back to Programs
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Program</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set up a security program to start receiving vulnerability reports.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h2>

                            <Field label="Program Title" error={errors.title}>
                                <input className={inputCls} value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. Acme Corp Bug Bounty" />
                            </Field>

                            <Field label="Description" error={errors.description}>
                                <textarea className={inputCls} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Describe your program, goals, and what researchers should focus on..." />
                            </Field>

                            <Field label="Program Type" error={errors.type}>
                                <select className={inputCls} value={data.type} onChange={e => setData('type', e.target.value)}>
                                    <option value="bug_bounty">Bug Bounty</option>
                                    <option value="vdp">Vulnerability Disclosure Program (VDP)</option>
                                    <option value="pentest">Penetration Testing</option>
                                </select>
                            </Field>

                            <Field label="Visibility" error={errors.is_public}>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" checked={data.is_public} onChange={() => setData('is_public', true)} className="text-blue-600" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" checked={!data.is_public} onChange={() => setData('is_public', false)} className="text-blue-600" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Private (invite-only)</span>
                                    </label>
                                </div>
                            </Field>

                            <Field label="Program Logo" error={errors.logo} hint="Optional. PNG, JPG up to 2MB">
                                <input type="file" accept="image/*" onChange={e => setData('logo', e.target.files[0])} className="text-sm text-gray-600 dark:text-gray-300" />
                            </Field>
                        </div>

                        {/* Scope */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Scope & Assets</h2>

                            <Field label="Assets" error={errors.asset} hint="Comma-separated list of domains, apps, or systems">
                                <textarea className={inputCls} rows={3} value={data.asset} onChange={e => setData('asset', e.target.value)} placeholder="*.example.com, api.example.com, iOS App" />
                            </Field>

                            <Field label="In Scope" error={errors.in_scope} hint="What is eligible for reports">
                                <textarea className={inputCls} rows={4} value={data.in_scope} onChange={e => setData('in_scope', e.target.value)} placeholder="- SQL Injection&#10;- XSS&#10;- Authentication bypass&#10;- Remote code execution" />
                            </Field>

                            <Field label="Out of Scope" error={errors.out_of_scope} hint="What should NOT be reported">
                                <textarea className={inputCls} rows={4} value={data.out_of_scope} onChange={e => setData('out_of_scope', e.target.value)} placeholder="- Social engineering&#10;- Physical attacks&#10;- Denial of service" />
                            </Field>

                            <Field label="Program Policy" error={errors.policy}>
                                <textarea className={inputCls} rows={4} value={data.policy} onChange={e => setData('policy', e.target.value)} placeholder="Describe your responsible disclosure policy, rules of engagement, legal safe harbor..." />
                            </Field>

                            <Field label="Response SLA" error={errors.response_sla} hint="e.g. First response within 3 business days">
                                <input className={inputCls} value={data.response_sla} onChange={e => setData('response_sla', e.target.value)} placeholder="3 business days" />
                            </Field>
                        </div>

                        {/* Bounty Ranges */}
                        {data.type === 'bug_bounty' && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bounty Ranges (NGN)</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Set reward ranges for each severity level. Leave blank for no bounty on that level.</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Critical" error={errors.critical_bounty_range}>
                                        <input className={inputCls} value={data.critical_bounty_range} onChange={e => setData('critical_bounty_range', e.target.value)} placeholder="e.g. 500,000 – 1,000,000" />
                                    </Field>
                                    <Field label="High" error={errors.high_bounty_range}>
                                        <input className={inputCls} value={data.high_bounty_range} onChange={e => setData('high_bounty_range', e.target.value)} placeholder="e.g. 100,000 – 500,000" />
                                    </Field>
                                    <Field label="Medium" error={errors.medium_bounty_range}>
                                        <input className={inputCls} value={data.medium_bounty_range} onChange={e => setData('medium_bounty_range', e.target.value)} placeholder="e.g. 25,000 – 100,000" />
                                    </Field>
                                    <Field label="Low" error={errors.low_bounty_range}>
                                        <input className={inputCls} value={data.low_bounty_range} onChange={e => setData('low_bounty_range', e.target.value)} placeholder="e.g. 5,000 – 25,000" />
                                    </Field>
                                    <Field label="Informational" error={errors.informational_bounty_range}>
                                        <input className={inputCls} value={data.informational_bounty_range} onChange={e => setData('informational_bounty_range', e.target.value)} placeholder="e.g. No bounty" />
                                    </Field>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3">
                            <Link href="/org/security/bug-bounty" className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                                {processing ? 'Creating...' : 'Create Program'}
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
}
