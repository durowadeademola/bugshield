import { Link } from '@inertiajs/react';
import {
  Home,
  Activity,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  Shield,
  FileText,
} from 'lucide-react';

export default function Sidebar({ user }) {
    const roles = user?.roles || [];
  
    const isOrganization = roles.includes('organization');
    const isAnalyst = roles.includes('analyst');
    const isResearcher = roles.includes('researcher');
  
    let navItems = [];
  
    if (isOrganization) {
        navItems = [
            { name: 'Home', icon: <Home />, href: '/organization/dashboard' },
            { name: 'Bug Bounty', icon: <Activity />, href: '/organization/bug-bounty' },
            { name: 'Vulnerability Disclosure', icon: <Activity />, href: '/organization/v-disclosure' },
            { name: 'Penetration Testing', icon: <CreditCard />, href: '/organization/p-test' },
            { name: 'AI and Automation', icon: <Users />, href: '/organization/ai-auto' },
            { name: 'Teams', icon: <Users />, href: '/organization/teams' },
            { name: 'Settings', icon: <Settings />, href: '/organization/settings' },
            { name: 'Help & Support', icon: <HelpCircle />, href: '/organization/support' },
        ];
    } else if (isResearcher) {
        navItems = [
            { name: 'Dashboard', icon: <Home />, href: '/researcher/dashboard' },
            { name: 'Bug Bounty Programs', icon: <Activity />, href: '/researcher/programs' },
            { name: 'My Reports', icon: <FileText />, href: '/researcher/reports' },
            { name: 'Rewards', icon: <CreditCard />, href: '/researcher/rewards' },
            { name: 'Settings', icon: <Settings />, href: '/researcher/settings' },
        ];
    } else if (isAnalyst) {
         navItems = [
            { name: 'Dashboard', icon: <Home />, href: '/analyst/dashboard' },
            { name: 'Programs', icon: <Activity />, href: '/analyst/programs' },
            { name: 'Reports', icon: <FileText />, href: '/analyst/reports' },
            { name: 'Settings', icon: <Settings />, href: '/analyst/settings' },
        ];
    }
  
    return (
        <div className="w-64 h-screen bg-white dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700">
            {/* Logo at Top Left */}
            <div className="absolute top-6 left-6 flex items-center">
                <img src="/images/bugshield-logo.png" alt="Bugshield Logo" className="h-12 w-auto" />
                <Link href="/">
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white cursor-pointer">
                    Bugshield
                </span>
                </Link>
            </div>
            {/* Navigation Items */}
            <ul className="space-y-4 mt-24">
                {navItems.map((item, idx) => (
                <li key={idx}>
                    <Link
                    href={item.href}
                    className="flex items-center space-x-4 text-base font-medium text-gray-800 dark:text-gray-200 py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                    <span className="text-xl">{item.icon}</span>
                    <span className="truncate">{item.name}</span>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
  }
  