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

export default function EditProgram({ program }) {
    const { data, setData, put, processing, errors } = useForm({
        title: program.title || '',
        description: program.description || '',
        type: program.type || 'bug_bounty',
        asset: program.asset || '',
        in_scope: program.in_scope || '',
        out_of_scope: program.out_of_scope || '',
        policy: program.policy || '',
        response_sla: program.response_sla || '',
        critical_bounty_range: program.critical_bounty_range || '',
        high_bounty_range: program.high_bounty_range || '',
        medium_bounty_range: program.medium_bounty_range || '',
        low_bounty_range: program.low_bounty_range || '',
        informational_bounty_range: program.informational_bounty_range || '',
        is_public: program.is_public,
        is_active: program.is_active,
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/org/programs/${program.id}`, { forceFormData: true });
    };

    return (
        <>
            <Head title={`Edit - ${program.title}`} />
            <DashboardLayout>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link href={`/org/programs/${program.id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 mb-3">
                            <ArrowLeft size={14} /> Back to Program
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Program</h1>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h2>

                            <Field label="Program Title" error={errors.title}>
                                <input className={inputCls} value={data.title} onChange={e => setData('title', e.target.value)} />
                            </Field>

                            <Field label="Description" error={errors.description}>
                                <textarea className={inputCls} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} />
                            </Field>

                            <Field label="Program Type" error={errors.type}>
                                <select className={inputCls} value={data.type} onChange={e => setData('type', e.target.value)}>
                                    <option value="bug_bounty">Bug Bounty</option>
                                    <option value="vdp">Vulnerability Disclosure Program (VDP)</option>
                                    <option value="pentest">Penetration Testing</option>
                                </select>
                            </Field>

                            <div className="flex gap-6">
                                <Field label="Visibility" error={errors.is_public}>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={data.is_public} onChange={() => setData('is_public', true)} />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={!data.is_public} onChange={() => setData('is_public', false)} />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Private</span>
                                        </label>
                                    </div>
                                </Field>
                                <Field label="Status" error={errors.is_active}>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={data.is_active} onChange={() => setData('is_active', true)} />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" checked={!data.is_active} onChange={() => setData('is_active', false)} />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Paused</span>
                                        </label>
                                    </div>
                                </Field>
                            </div>

                            <Field label="New Logo (optional)" hint="PNG, JPG up to 2MB">
                                <input type="file" accept="image/*" onChange={e => setData('logo', e.target.files[0])} className="text-sm text-gray-600 dark:text-gray-300" />
                            </Field>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Scope & Assets</h2>

                            <Field label="Assets" error={errors.asset}>
                                <textarea className={inputCls} rows={2} value={data.asset} onChange={e => setData('asset', e.target.value)} />
                            </Field>
                            <Field label="In Scope" error={errors.in_scope}>
                                <textarea className={inputCls} rows={4} value={data.in_scope} onChange={e => setData('in_scope', e.target.value)} />
                            </Field>
                            <Field label="Out of Scope" error={errors.out_of_scope}>
                                <textarea className={inputCls} rows={4} value={data.out_of_scope} onChange={e => setData('out_of_scope', e.target.value)} />
                            </Field>
                            <Field label="Policy" error={errors.policy}>
                                <textarea className={inputCls} rows={3} value={data.policy} onChange={e => setData('policy', e.target.value)} />
                            </Field>
                            <Field label="Response SLA" error={errors.response_sla}>
                                <input className={inputCls} value={data.response_sla} onChange={e => setData('response_sla', e.target.value)} />
                            </Field>
                        </div>

                        {data.type === 'bug_bounty' && (
                            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Bounty Ranges (NGN)</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['critical', 'high', 'medium', 'low', 'informational'].map(level => (
                                        <Field key={level} label={level.charAt(0).toUpperCase() + level.slice(1)} error={errors[`${level}_bounty_range`]}>
                                            <input className={inputCls} value={data[`${level}_bounty_range`]} onChange={e => setData(`${level}_bounty_range`, e.target.value)} />
                                        </Field>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3">
                            <Link href={`/org/programs/${program.id}`} className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
}
