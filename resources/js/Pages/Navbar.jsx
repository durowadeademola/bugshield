import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { props } = usePage();
    const auth = props.auth ?? {};
    const roles = auth.user?.roles || [];

    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    const isOrganization = roles.includes('organization');
    const isAnalyst = roles.includes('analyst');
    const isResearcher = roles.includes('researcher');
    const isTeam = roles.includes('team');

    let href;

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

    const services = [
        {
            name: 'Bug Bounty',
            href: '/bug-bounty',
            description: 'Crowdsourced security testing',
        },
        {
            name: 'Penetration Testing',
            href: '/pentest',
            description: 'Expert-led security assessments',
        },
        {
            name: 'Security Audit',
            href: '/audit',
            description: 'Comprehensive security reviews',
        },
        {
            name: 'Training',
            href: '/training',
            description: 'Security awareness programs',
        },
    ];

    const pages = [
        'solution',
        'researchers',
        'customers',
        'resources',
        'company',
    ];

    return (
        <header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <img
                            src="/images/bluestrike-logo.png"
                            alt="Bluestrike Logo"
                            className="h-12 w-auto"
                        />
                        <Link href="/">
                            <span className="cursor-pointer text-3xl font-bold text-white transition-colors hover:text-blue-400">
                                Bluestrike
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="ml-8 hidden items-center space-x-12 text-white lg:flex">
                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <button className="flex transform items-center space-x-1 font-medium transition transition-all duration-200 hover:scale-105 hover:text-blue-400">
                                <span>Services</span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl"
                                    >
                                        {services.map((service, idx) => (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                className={`block border-b border-gray-700 px-6 py-4 transition-colors hover:bg-gray-700 ${idx === services.length - 1 ? 'border-b-0' : ''}`}
                                            >
                                                <div className="mb-1 font-medium text-white">
                                                    {service.name}
                                                </div>
                                                <div className="text-sm text-gray-300">
                                                    {service.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Other nav links */}
                        {pages.map((page) => (
                            <Link
                                key={page}
                                href={`/${page}`}
                                className="transform font-medium transition transition-colors duration-200 hover:scale-105 hover:text-blue-400"
                            >
                                {page.charAt(0).toUpperCase() + page.slice(1)}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="ml-6 hidden items-center space-x-4 lg:flex">
                        {auth.user ? (
                            <Link
                                href={href}
                                className="transform rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="transform px-4 py-2 font-medium text-white transition transition-colors duration-200 hover:scale-105 hover:text-blue-400"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="transform rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white transition-colors hover:text-blue-400 lg:hidden"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-gray-700 bg-gray-900 lg:hidden"
                        >
                            <nav className="space-y-1 py-4 text-white">
                                {/* Mobile Services */}
                                <div className="px-4">
                                    <button
                                        onClick={() =>
                                            setIsMobileServicesOpen(
                                                !isMobileServicesOpen,
                                            )
                                        }
                                        className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-200 transition-colors hover:text-blue-400"
                                    >
                                        Services{' '}
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {isMobileServicesOpen && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="pl-4"
                                            >
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.href}
                                                        href={service.href}
                                                        className="block py-2 text-white transition-colors hover:text-blue-400"
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="my-2 border-t border-gray-700"></div>

                                {pages.map((page) => (
                                    <Link
                                        key={page}
                                        href={`/${page}`}
                                        className="block px-4 py-2 transition-colors hover:bg-gray-800 hover:text-blue-400"
                                    >
                                        {page.charAt(0).toUpperCase() +
                                            page.slice(1)}
                                    </Link>
                                ))}

                                <div className="my-2 border-t border-gray-700"></div>

                                {/* Mobile Auth */}
                                <div className="space-y-2 px-4 py-2">
                                    {auth.user ? (
                                        <Link
                                            href={href}
                                            className="block rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="block rounded-lg border border-gray-700 px-5 py-2.5 text-center font-medium text-white transition-colors hover:text-blue-400"
                                            >
                                                Log In
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block rounded-lg bg-blue-600 px-5 py-2.5 text-center font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
