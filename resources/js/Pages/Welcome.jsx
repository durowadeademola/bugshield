import Footer from '@/Pages/Footer.jsx';
import Navbar from '@/Pages/Navbar.jsx';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const roles = auth.user?.roles || [];
    const isOrganization = roles.includes('organization');
    const isAnalyst = roles.includes('analyst');
    const isResearcher = roles.includes('researcher');
    const isTeam = roles.includes('team');
    var href;

    if (isOrganization) {
        href = route('organization.dashboard');
    } else if (isAnalyst) {
        href = route('analyst.dashboard');
    } else if (isResearcher) {
        href = route('researcher.dashboard');
    } else if (isTeam) {
        href = route('team.dashboard');
    } else {
        href = route('home');
    }

    return (
        <>
            <Head>
                <title>Protect Your Business</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <div className="relative min-h-screen bg-gradient-to-b from-[#0b1e4e] to-black text-white">
                {/* Header */}
                <header className="fixed left-0 top-0 z-50 w-full bg-[#0b1e4e] text-white shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
                        <Navbar auth={auth} href={href} />
                    </div>
                </header>

                {/* Hero Section */}
                <main className="min-h-screen pt-32">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
                        {/* Left side Texts */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <p className="text-1xl bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 bg-clip-text font-bold uppercase tracking-wider text-transparent drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl md:text-2xl lg:text-2xl">
                                A Comprehensive Cybersecurity Solution
                            </p>

                            <h1 className="mb-4 text-4xl font-extrabold leading-tight lg:text-5xl">
                                Protect{' '}
                                <span className="text-green-400">Data</span>{' '}
                                from cyber{' '}
                                <span className="text-yellow-400">
                                    security
                                </span>{' '}
                                <span className="text-red-400">threats</span>{' '}
                                around the world
                            </h1>

                            <p className="text-base text-white/80 md:text-lg">
                                Threat intelligence provides information about
                                current and emerging cyber threats, allowing
                                organizations to stay ahead of potential
                                attacks.
                            </p>

                            <div className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/login"
                                    className="rounded-lg border border-white bg-transparent px-6 py-3 font-semibold text-white transition-all hover:bg-white hover:text-[#0b1e4e]"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right side Illustration Image */}
                        <motion.div
                            className="flex h-full items-center justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <img
                                src="/images/bluestrike-illustration.png"
                                alt="Cybersecurity Illustration"
                                className="h-[500px] w-full max-w-lg rounded-2xl object-contain shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
