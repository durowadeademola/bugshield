import { Link } from '@inertiajs/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t border-blue-700 bg-[#0b1e4e] py-16 text-white/90">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 md:grid-cols-3">
                {/* Left: Logo & Copyright */}
                <div className="flex flex-col items-center space-y-2 md:col-span-1 md:items-start">
                    <img
                        src="/images/bluestrike-logo.png"
                        alt="Bluestrike Logo"
                        className="mb-2 h-10 w-auto"
                    />
                    <p className="text-sm text-white/70">
                        &copy; {new Date().getFullYear()} Bluestrike. All rights
                        reserved.
                    </p>
                </div>

                {/* Center: Quick Links */}
                <div className="flex flex-col items-center justify-center space-y-2 md:col-span-1 md:flex-row md:space-x-8 md:space-y-0">
                    <Link
                        href="/about"
                        className="text-sm font-medium transition-all hover:text-blue-400"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium transition-all hover:text-blue-400"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/privacy"
                        className="text-sm font-medium transition-all hover:text-blue-400"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        className="text-sm font-medium transition-all hover:text-blue-400"
                    >
                        Terms
                    </Link>
                </div>

                {/* Right: Social Icons */}
                <div className="flex justify-center space-x-4 md:col-span-1 md:justify-end">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-colors hover:scale-110 hover:text-blue-400"
                    >
                        <FaTwitter className="h-6 w-6" />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-colors hover:scale-110 hover:text-blue-400"
                    >
                        <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-colors hover:scale-110 hover:text-blue-400"
                    >
                        <FaGithub className="h-6 w-6" />
                    </a>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-10 border-t border-blue-700 pt-4 text-center text-xs text-white/50">
                Made with ❤️ by Bluestrike for secure digital solutions
            </div>
        </footer>
    );
}
