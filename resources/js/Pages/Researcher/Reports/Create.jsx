import { Head, useForm, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import CvssCalculator from '@/Components/CvssCalculator';
import { ArrowLeft, Shield } from 'lucide-react';

const Field = ({ label, error, children, hint, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);

const inputCls = 'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

const WEAKNESSES = [
    'SQL Injection', 'Cross-Site Scripting (XSS)', 'Cross-Site Request Forgery (CSRF)',
    'Server-Side Request Forgery (SSRF)', 'Remote Code Execution (RCE)',
    'Insecure Direct Object Reference (IDOR)', 'Authentication Bypass',
    'Authorization Bypass', 'Information Disclosure', 'Path Traversal',
    'Command Injection', 'XML External Entity (XXE)', 'Broken Access Control',
    'Security Misconfiguration', 'Sensitive Data Exposure', 'Open Redirect',
    'Business Logic Vulnerability', 'Race Condition', 'Memory Corruption', 'Other',
];

const SEVERITY_FROM_SCORE = (score) => {
    if (score === 0) return 'informational';
    if (score < 4.0) return 'low';
    if (score < 7.0) return 'medium';
    if (score < 9.0) return 'high';
    return 'critical';
};

export default function CreateReport({ program }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        steps_to_reproduce: '',
        proof_of_concept: '',
        url: '',
        asset: '',
        weakness: '',
        severity: 'medium',
        impact: '',
        cvss_score: '',
        cvss_vector: '',
    });

    const handleCvssChange = (score, vector, severityLabel) => {
        if (score > 0) {
            setData(prev => ({
                ...prev,
                cvss_score: score.toString(),
                cvss_vector: vector,
                severity: SEVERITY_FROM_SCORE(score),
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/researcher/programs/${program.id}/submit`);
    };

    return (
        <>
            <Head title={`Submit Report - ${program.title}`} />
            <DashboardLayout>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <Link href={`/researcher/programs/${program.id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 mb-3">
                            <ArrowLeft size={14} /> Back to Program
                        </Link>
                        <div className="flex items-center gap-3">
                            {program.logo_path ? (
                                <img src={`/storage/${program.logo_path}`} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            ) : (
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <Shield size={18} className="text-blue-600" />
                                </div>
                            )}
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Submit Vulnerability Report</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{program.title}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Vulnerability Summary */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Vulnerability Summary</h2>

                            <Field label="Title" error={errors.title} required hint="Brief descriptive title of the vulnerability">
                                <input className={inputCls} value={data.title} onChange={e => setData('title', e.target.value)} placeholder="e.g. SQL Injection in /api/users endpoint" />
                            </Field>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Severity" error={errors.severity} required hint="Auto-filled by CVSS calculator below">
                                    <select className={inputCls} value={data.severity} onChange={e => setData('severity', e.target.value)}>
                                        <option value="critical">Critical</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                        <option value="informational">Informational</option>
                                    </select>
                                </Field>

                                <Field label="Vulnerability Type / Weakness" error={errors.weakness} required>
                                    <select className={inputCls} value={data.weakness} onChange={e => setData('weakness', e.target.value)}>
                                        <option value="">Select weakness...</option>
                                        {WEAKNESSES.map(w => <option key={w} value={w}>{w}</option>)}
                                    </select>
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Affected Asset" error={errors.asset} required hint="Domain, endpoint, or app component">
                                    <input className={inputCls} value={data.asset} onChange={e => setData('asset', e.target.value)} placeholder="e.g. api.example.com" />
                                </Field>
                                <Field label="Affected URL" error={errors.url} hint="Direct URL to the vulnerable resource">
                                    <input className={inputCls} type="url" value={data.url} onChange={e => setData('url', e.target.value)} placeholder="https://..." />
                                </Field>
                            </div>
                        </div>

                        {/* CVSS 3.1 Calculator */}
                        <div>
                            <CvssCalculator onScoreChange={handleCvssChange} />
                            {/* Hidden read-only display of auto-filled values */}
                            {data.cvss_score && (
                                <div className="mt-2 grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Auto-filled CVSS Score</p>
                                        <input className={inputCls} readOnly value={data.cvss_score} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Auto-filled CVSS Vector</p>
                                        <input className={`${inputCls} font-mono text-xs`} readOnly value={data.cvss_vector} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Detailed Report */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Detailed Report</h2>

                            <Field label="Description" error={errors.description} required hint="Describe the vulnerability in detail. What is it and how did you find it?">
                                <textarea className={inputCls} rows={5} value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Provide a clear, detailed description of the vulnerability..." />
                            </Field>

                            <Field label="Steps to Reproduce" error={errors.steps_to_reproduce} required hint="Step-by-step instructions to reproduce the issue">
                                <textarea className={inputCls} rows={6} value={data.steps_to_reproduce} onChange={e => setData('steps_to_reproduce', e.target.value)} placeholder="1. Navigate to...&#10;2. Click on...&#10;3. Enter the following payload...&#10;4. Observe that..." />
                            </Field>

                            <Field label="Proof of Concept" error={errors.proof_of_concept} hint="Code, payloads, or commands used to demonstrate the vulnerability">
                                <textarea className={`${inputCls} font-mono`} rows={5} value={data.proof_of_concept} onChange={e => setData('proof_of_concept', e.target.value)} placeholder="Paste payload, code snippet, or PoC here..." />
                            </Field>

                            <Field label="Impact" error={errors.impact} required hint="Describe the potential impact if this vulnerability is exploited">
                                <textarea className={inputCls} rows={4} value={data.impact} onChange={e => setData('impact', e.target.value)} placeholder="Describe the business and technical impact of this vulnerability..." />
                            </Field>
                        </div>

                        {/* Responsible Disclosure Notice */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 p-4">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Responsible Disclosure:</strong> By submitting this report, you agree to follow responsible disclosure principles. Do not exploit the vulnerability beyond what is necessary for demonstration purposes, and do not share details publicly until the issue is resolved.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <Link href={`/researcher/programs/${program.id}`} className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">
                                {processing ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
}
