import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
            <title>Nigeria's First Bug Bounty Platform</title>
            <img
                src="/images/bugshield-logo.png"
                alt="Bugshield Logo"
                className="h-20 w-auto"
            />
            </Head>

            <div className="bg-black text-white dark:bg-black dark:text-white/50 relative min-h-screen">

                <header className="fixed top-0 left-0 w-full bg-[#0b1e4e] text-white shadow z-50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between py-1 px-6">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                        src="/images/bugshield-logo.png"
                        alt="Bugshield Logo"
                        className="h-20 w-auto"
                        />
                        <Link href="/">
                            <span className="text-3xl font-bold text-white cursor-pointer">Bugshield</span>
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
                        <Link href="/hackers">Researchers</Link>
                        <Link href="/customers">Customers</Link>
                        <Link href="/resources">Resources</Link>
                        <Link href="/company">Company</Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="space-x-4 flex-shrink-0">
                        {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Dashboard
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
                            Try Bugshield
                            </Link>
                        </>
                        )}
                    </div>
                    </div>
                </header>

                <main className="mt-6">
                    {/* Main content here */}
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">

                    </div>
                </main>

                <footer className="py-16 text-center text-sm text-white/70">
                    {/* Footer content */}
                </footer>
            </div>
        </>
    );
}
