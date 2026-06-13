import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Shield, Bug, DollarSign, Users, ArrowRight, CheckCircle,
    Globe, Award, Zap, Lock, ChevronRight, Star, TrendingUp,
    Search, FileText, CreditCard, Building2, Code2, Target
} from 'lucide-react';

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        const start = 0;
        const steps = 60;
        const increment = end / steps;
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(current));
        }, (duration * 1000) / steps);
        return () => clearInterval(timer);
    }, [inView, end, duration]);
    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FeatureCard({ icon, title, desc, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-400/40 transition-all duration-300"
        >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function StepCard({ number, title, desc, icon, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center text-center relative"
        >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                {icon}
            </div>
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-blue-400 text-xs font-bold flex items-center justify-center text-white">
                {number}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{desc}</p>
        </motion.div>
    );
}

const PROGRAMS = [
    { name: 'Access Bank', type: 'Bug Bounty', bounty: '₦50,000 – ₦2,000,000', logo: '🏦', researchers: 124, reports: 47 },
    { name: 'Flutterwave', type: 'VDP', bounty: '₦100,000 – ₦5,000,000', logo: '💳', researchers: 89, reports: 32 },
    { name: 'Paystack', type: 'Bug Bounty', bounty: '₦75,000 – ₦3,000,000', logo: '💰', researchers: 210, reports: 83 },
    { name: 'Kuda Bank', type: 'Bug Bounty', bounty: '₦25,000 – ₦1,500,000', logo: '📱', researchers: 67, reports: 28 },
];

const TESTIMONIALS = [
    { name: 'Chukwuemeka O.', role: 'Security Researcher', location: 'Lagos', quote: 'I earned over ₦4.5 million in my first year on Bluestrike. The platform makes it easy to find programs and get paid fast.', stars: 5 },
    { name: 'Amina B.', role: 'Penetration Tester', location: 'Abuja', quote: 'Finally, a bug bounty platform that understands the African market. Paystack integration means I get my money instantly.', stars: 5 },
    { name: 'Olumide F.', role: 'CISO at FinTech startup', location: 'Ibadan', quote: 'We found 12 critical vulnerabilities within 3 weeks of launching our program. Bluestrike researchers are world-class.', stars: 5 },
];

export default function Welcome({ auth }) {
    const [activeTab, setActiveTab] = useState('researcher');

    return (
        <>
            <Head>
                <title>Bluestrike — Africa's Premier Bug Bounty Platform</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div className="min-h-screen bg-[#060d1f] text-white">

                {/* ── NAVBAR ── */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-[#060d1f]/80 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <img src="/images/bluestrike-logo.png" alt="Bluestrike" className="h-8 w-auto" onError={e => { e.target.style.display = 'none'; }} />
                            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Bluestrike</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
                            <Link href="/programs" className="hover:text-white transition-colors">Programs</Link>
                            <Link href="/researchers" className="hover:text-white transition-colors">Researchers</Link>
                            <Link href="/customers" className="hover:text-white transition-colors">Organizations</Link>
                            <Link href="/solution" className="hover:text-white transition-colors">Solutions</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link href="/org/dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── HERO ── */}
                <section className="relative pt-32 pb-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-6 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
                        >
                            Find Bugs.{' '}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Secure Africa.
                            </span>
                            <br />Get Paid in{' '}
                            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                Naira.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.6 }}
                            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                        >
                            Bluestrike connects Africa's top security researchers with companies that need them most.
                            Ethical hacking, responsible disclosure, instant Naira payouts.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/register"
                                className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                            >
                                Start Hunting
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/programs"
                                className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-all duration-200"
                            >
                                <Search size={18} />
                                Browse Programs
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                        >
                            {[
                                { value: 500, suffix: '+', label: 'Researchers' },
                                { value: 120, suffix: '+', label: 'Programs' },
                                { value: 2800, suffix: '+', label: 'Vulnerabilities Found' },
                                { value: 85, prefix: '₦', suffix: 'M+', label: 'Bounties Paid' },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-3xl font-bold text-white">
                                        <AnimatedCounter end={s.value} suffix={s.suffix} prefix={s.prefix || ''} />
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── TRUST BAR ── */}
                <div className="border-y border-white/5 py-8 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-6">
                            Trusted by leading Nigerian & African companies
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                            {['Access Bank', 'Flutterwave', 'Paystack', 'Kuda', 'Interswitch', 'MTN Nigeria', 'Opay'].map(c => (
                                <span key={c} className="text-gray-500 hover:text-gray-300 transition-colors font-semibold text-sm">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── FEATURED PROGRAMS ── */}
                <section className="py-20 max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-bold text-white"
                            >
                                Featured Programs
                            </motion.h2>
                            <p className="text-gray-400 mt-1">Active bug bounty programs accepting submissions</p>
                        </div>
                        <Link href="/programs" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                            View all <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PROGRAMS.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-2xl">
                                        {p.logo}
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        p.type === 'Bug Bounty'
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'bg-purple-500/20 text-purple-400'
                                    }`}>{p.type}</span>
                                </div>
                                <h3 className="font-semibold text-white mb-1">{p.name}</h3>
                                <p className="text-sm text-green-400 font-medium mb-3">{p.bounty}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><Users size={11} />{p.researchers} researchers</span>
                                    <span className="flex items-center gap-1"><FileText size={11} />{p.reports} reports</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── HOW IT WORKS ── */}
                <section className="py-20 bg-white/[0.02] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-2"
                            >
                                How it works
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-bold text-white"
                            >
                                Simple. Secure. Rewarding.
                            </motion.h2>
                        </div>

                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 max-w-xs mx-auto mb-12">
                            {['researcher', 'organization'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all capitalize ${
                                        activeTab === tab
                                            ? 'bg-blue-600 text-white shadow'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {tab === 'researcher' ? 'Researcher' : 'Organization'}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'researcher' ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto relative">
                                <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-500/50 to-indigo-500/50" />
                                <StepCard number="1" icon={<Search size={28} className="text-white" />} title="Find a Program" desc="Browse bug bounty programs from top Nigerian and African companies. Filter by reward, type, and scope." delay={0} />
                                <StepCard number="2" icon={<Bug size={28} className="text-white" />} title="Hunt & Report" desc="Find vulnerabilities, write a detailed report with CVSS score, PoC, and steps to reproduce." delay={0.1} />
                                <StepCard number="3" icon={<CreditCard size={28} className="text-white" />} title="Get Paid Fast" desc="Receive your bounty in Naira via Paystack directly to your bank account — no delays, no hassle." delay={0.2} />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto relative">
                                <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-500/50 to-indigo-500/50" />
                                <StepCard number="1" icon={<Building2 size={28} className="text-white" />} title="Create Your Program" desc="Set up your bug bounty or VDP program in minutes. Define scope, bounty ranges, and policies." delay={0} />
                                <StepCard number="2" icon={<Users size={28} className="text-white" />} title="Researchers Hunt" desc="Africa's top security researchers find and report vulnerabilities in your systems responsibly." delay={0.1} />
                                <StepCard number="3" icon={<Shield size={28} className="text-white" />} title="Triage & Fix" desc="Review reports, award bounties, and track fixes. Our analyst team can assist with triage." delay={0.2} />
                            </div>
                        )}
                    </div>
                </section>

                {/* ── WHY BLUESTRIKE ── */}
                <section className="py-20 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-2"
                        >
                            Why Bluestrike
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white"
                        >
                            Built for Africa, by Africa
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-gray-400 mt-2 max-w-xl mx-auto"
                        >
                            Unlike global platforms, Bluestrike is designed specifically for the African cybersecurity ecosystem
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<DollarSign size={22} className="text-blue-400" />}
                            title="Naira Payouts via Paystack"
                            desc="Get paid directly in NGN to your Nigerian bank account. No USD conversion hassle, no international wire fees."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Globe size={22} className="text-green-400" />}
                            title="Africa-Focused Programs"
                            desc="Programs from top Nigerian banks, fintechs, and enterprises that understand the African threat landscape."
                            delay={0.05}
                        />
                        <FeatureCard
                            icon={<Zap size={22} className="text-yellow-400" />}
                            title="Fast Triage SLA"
                            desc="Guaranteed response within 48 hours. Organizations commit to triage SLAs when they join Bluestrike."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Target size={22} className="text-red-400" />}
                            title="CVSS 3.1 Scoring"
                            desc="Built-in CVSS calculator ensures fair, standardized severity scoring for every vulnerability report."
                            delay={0.15}
                        />
                        <FeatureCard
                            icon={<Award size={22} className="text-purple-400" />}
                            title="Reputation & Leaderboards"
                            desc="Build your security career with reputation points. Top hunters get featured and invited to private programs."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Code2 size={22} className="text-indigo-400" />}
                            title="Analyst Support"
                            desc="Our in-house security analysts assist with complex triage, reducing the burden on your security team."
                            delay={0.25}
                        />
                    </div>
                </section>

                {/* ── TESTIMONIALS ── */}
                <section className="py-20 bg-white/[0.02] border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl font-bold text-white"
                            >
                                What researchers say
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TESTIMONIALS.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6"
                                >
                                    <div className="flex gap-0.5 mb-4">
                                        {Array(t.stars).fill(0).map((_, j) => (
                                            <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">{t.name}</p>
                                            <p className="text-xs text-gray-500">{t.role} · {t.location}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── DUAL CTA ── */}
                <section className="py-20 max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                            <Shield size={40} className="text-white/50 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">For Researchers</h3>
                            <p className="text-blue-200 mb-6">Join Africa's elite security researchers. Find vulnerabilities, build reputation, earn Naira.</p>
                            <ul className="space-y-2 mb-8">
                                {['₦25K–₦5M bounties per report', 'CVSS-based fair scoring', 'Instant Paystack payouts', 'Private program invitations'].map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                                        <CheckCircle size={14} className="text-blue-300 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Start Hunting <ArrowRight size={16} />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 p-8"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/3 rounded-full -translate-y-12 translate-x-12" />
                            <Building2 size={40} className="text-gray-400 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">For Organizations</h3>
                            <p className="text-gray-400 mb-6">Crowdsource security testing from Africa's best researchers. Affordable, flexible, effective.</p>
                            <ul className="space-y-2 mb-8">
                                {['Pay only for valid bugs', '48-hour triage SLA', 'Analyst-assisted review', 'Public & private programs'].map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                        <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Launch a Program <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* ── FINAL CTA ── */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none" />
                    <div className="relative max-w-3xl mx-auto text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-6">
                                <TrendingUp size={12} /> Growing 40% month-over-month
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                                Africa's cybersecurity starts here.
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Join 500+ researchers and 120+ companies making the African internet safer.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/register"
                                    className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-white transition-all shadow-lg shadow-blue-600/30"
                                >
                                    Create Free Account
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/programs"
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-all"
                                >
                                    Browse Programs
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="border-t border-white/5 py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                            <div>
                                <p className="font-semibold text-white mb-3">Platform</p>
                                <div className="space-y-2">
                                    {[['Programs', '/programs'], ['Leaderboard', '/researchers'], ['How it works', '/#how-it-works']].map(([l, h]) => (
                                        <Link key={h} href={h} className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-3">Company</p>
                                <div className="space-y-2">
                                    {[['About', '/company'], ['Customers', '/customers'], ['Solutions', '/solution']].map(([l, h]) => (
                                        <Link key={h} href={h} className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-3">Legal</p>
                                <div className="space-y-2">
                                    {[['Terms', '/terms'], ['Privacy', '/privacy']].map(([l, h]) => (
                                        <Link key={h} href={h} className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-3">Support</p>
                                <div className="space-y-2">
                                    {[['Contact', '/contact'], ['Resources', '/resources']].map(([l, h]) => (
                                        <Link key={h} href={h} className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">{l}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-bold">Bluestrike</span>
                                <span className="text-gray-600 text-sm">· Africa's Bug Bounty Platform</span>
                            </div>
                            <p className="text-sm text-gray-600">© 2025 Bluestrike. Made in Nigeria 🇳🇬</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
