import { Link } from '@inertiajs/react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0b1e4e] text-white/80 py-12 border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* Left: Copyright */}
        <div className="text-center md:text-left md:col-span-1">
          <p className="text-sm">&copy; {new Date().getFullYear()} Bluestrike. All rights reserved.</p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex justify-center space-x-6 md:col-span-1 flex-wrap">
          <Link href="/about" className="hover:text-blue-400 transition-colors text-sm font-medium">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors text-sm font-medium">Contact</Link>
          <Link href="/privacy" className="hover:text-blue-400 transition-colors text-sm font-medium">Privacy</Link>
          <Link href="/terms" className="hover:text-blue-400 transition-colors text-sm font-medium">Terms</Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex justify-center md:justify-end space-x-4 md:col-span-1">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Optional: Subtle bottom note */}
      <div className="mt-6 text-center text-xs text-white/50">
        Made with ❤️ for secure digital solutions
      </div>
    </footer>
  );
}
