import { Head, Link } from '@inertiajs/react';
import { motion } from "framer-motion";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const roles = auth.user?.roles || [];
    const isOrganization = roles.includes('organization');
    const isAnalyst = roles.includes('analyst');
    const isResearcher = roles.includes('researcher');
    const isTeam = roles.includes('team');
    var href;

    if(isOrganization) {
        href = route('organization.dashboard');
    } else if(isAnalyst) {
        href = route('analyst.dashboard');
    } else if (isResearcher) {
        href = route('researcher.dashboard');
    } else if (isTeam) {
        href = route('team.dashboard');
    } else {
        href = route('home');
    }

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
           <Head>
            <title>Protect Your Business</title>
            <img
                src="/images/bluestrike-logo.png"
                alt="Bluestrike Logo"
                className="h-20 w-auto"
            />
            </Head>

            <div className="bg-black text-white dark:bg-black dark:text-white/50 relative min-h-screen">

                <header className="fixed top-0 left-0 w-full bg-[#0b1e4e] text-white shadow z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-6">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                        src="/images/bluestrike-logo.png"
                        alt="Bluestrike Logo"
                        className="h-20 w-auto"
                        />
                        <Link href="/">
                            <span className="text-3xl font-bold text-white cursor-pointer">Bluestrike</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-8">
                        <div className="relative group">
                        <span className="cursor-pointer">Services</span>
                        <div className="absolute hidden cursor-pointer group-hover:block bg-white text-black mt-2 rounded shadow-lg p-2 space-y-2">
                            <Link href="/bug-bounty">Bug Bounty</Link>
                            <Link href="/pentest">Penetration Testing</Link>
                            <Link href="/audit">Security Audit</Link>
                            <Link href="/training">Training</Link>
                        </div>
                        </div>
                        <Link href="/solution">Solutions</Link>
                        <Link href="/researchers">Researchers</Link>
                        <Link href="/customers">Customers</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/company">Company</Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="space-x-4 flex-shrink-0">
                        {auth.user ? (
                        <Link
                            href={href}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Go to Dashboard
                        </Link>
                        ) : (
                        <>
                            <Link href={route('login')} className="text-white hover:text-gray-300">
                            Log In
                            </Link>
            
                            <Link
                            href={route('register')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-4 rounded hover:bg-hoverPrimary ease-in duration-300"
                            >
                            Try Bluestrike
                            </Link>
                        </>
                        )}
                    </div>
                    </div>
                </header>

                <main className="pt-32 bg-black text-white min-h-screen">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 items-center">
                        {/* Left side Texts */}
                        <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        >
                        <p className="text-blue-400 uppercase font-semibold tracking-wide mb-2">
                            A Comprehensive Cybersecurity Solution
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                            Protects <span className='text-green-400'>Data</span> from cyber <span className="text-yellow-400">security</span> <span className="text-red-400">threats</span> around the world
                        </h1>
                        <p className="text-white/80 mb-6">
                            Threat intelligence provides information about current and emerging cyber threats, allowing organizations to stay ahead of potential attacks.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                            href="/register"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold"
                            >
                            Get Started
                            </Link>
                            <Link
                            href="/login"
                            className="bg-transparent border border-white hover:bg-white hover:text-[#0b1e4e] px-6 py-3 rounded text-white font-semibold"
                            >
                            Sign In
                            </Link>
                        </div>
                        </motion.div>
                            
                        {/* Right side Illustration Image */}
                        <motion.div
                        className="flex justify-center items-center h-full"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        >
                        <img
                            src="/images/bluestrike-illustration.png"
                            alt="Cybersecurity Illustration"
                            className="object-contain w-full max-w-lg h-[500px] rounded-2xl"
                        />
                        </motion.div>

                    </div>
                </main>



                <footer className="py-16 text-center text-sm text-white/70">
                    {/* Footer content */}
                </footer>
            </div>
        </>
    );
}
