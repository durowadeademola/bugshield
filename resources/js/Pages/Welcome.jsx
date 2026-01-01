import { Head, Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import Navbar from '@/Pages/Navbar.jsx';
import Footer from '@/Pages/Footer.jsx';


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

    return (
        <>
           <Head>
            <title>Protect Your Business</title>
           </Head>

            <div className="bg-gradient-to-b from-[#0b1e4e] to-black text-white relative min-h-screen">

                {/* Header */}
                <header className="fixed top-0 left-0 w-full bg-[#0b1e4e] text-white shadow z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6">
                        <Navbar auth={auth} href={href} />
                    </div>
                </header>

                {/* Hero Section */}
                <main className="pt-32 min-h-screen">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">

                        {/* Left side Texts */}
                        <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-4 md:space-y-6"
                        >
                            <p className="text-blue-400 uppercase font-semibold tracking-wide text-sm md:text-base">
                                A Comprehensive Cybersecurity Solution
                            </p>

                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                                Protect <span className='text-green-400'>Data</span> from cyber <span className="text-yellow-400">security</span> <span className="text-red-400">threats</span> around the world
                            </h1>

                            <p className="text-white/80 text-base md:text-lg">
                                Threat intelligence provides information about current and emerging cyber threats, allowing organizations to stay ahead of potential attacks.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mt-6">
                                <Link
                                    href="/register"
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href="/login"
                                    className="bg-transparent border border-white hover:bg-white hover:text-[#0b1e4e] px-6 py-3 rounded-lg text-white font-semibold transition-all"
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
                                className="object-contain w-full max-w-lg h-[500px] rounded-2xl shadow-2xl"
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
