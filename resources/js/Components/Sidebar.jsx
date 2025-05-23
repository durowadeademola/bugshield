import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  Home, Activity, CreditCard, Users, Settings,
  HelpCircle, Shield, FileText, ChevronDown, ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Sidebar({ user }) {
  const roles = user?.roles || [];
  const isOrganization = roles.includes('organization');
  const isAnalyst = roles.includes('analyst');
  const isResearcher = roles.includes('researcher');

  const [expanded, setExpanded] = useState(null);
  const toggleExpand = (name) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  let navItems = [];

  if (isOrganization) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/organization/dashboard' },
      {
        name: 'Programs',
        icon: <Activity />,
        children: [
          { name: 'Bug Bounty', href: '/organization/bug-bounty' },
          { name: 'Vulnerability Disclosure', href: '/organization/vuln-disclosure' },
          { name: 'Penetration Testing', href: '/organization/pen-test' },
        ],
      },
      { name: 'AI and Automation', icon: <Users />, href: '/organization/ai-auto' },
      { name: 'Teams', icon: <Users />, href: '/organization/teams' },
      { name: 'Subscriptions', icon: <CreditCard />, href: '/organization/subscriptions' },
      { name: 'Settings', icon: <Settings />, href: '/organization/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/organization/support' },
    ];
  } else if (isResearcher) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/researcher/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/researcher/programs' },
      { name: 'My Reports', icon: <FileText />, href: '/researcher/reports' },
      { name: 'Rewards', icon: <CreditCard />, href: '/researcher/rewards' },
      { name: 'Leaderboards', icon: <CreditCard />, href: '/researcher/leaderboards' },
      { name: 'Settings', icon: <Settings />, href: '/researcher/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/organization/support' },
    ];
  } else if (isAnalyst) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/analyst/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/analyst/programs' },
      { name: 'Reports', icon: <FileText />, href: '/analyst/reports' },
      { name: 'Settings', icon: <Settings />, href: '/analyst/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/organization/support' },
    ];
  }

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-2">
        <img src="/images/bugshield-logo.png" alt="Bugshield Logo" className="h-10" />
        <Link href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white">Bugshield</Link>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto mt-6 pr-1">
        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className="w-full flex justify-between items-center text-left text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <span>
                      {expanded === item.name ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </span>
                  </button>

                <AnimatePresence initial={false}>
                    {expanded === item.name && (
                        <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-12 space-y-3 mt-2 overflow-hidden"
                        >
                        {item.children.map((child, cidx) => (
                            <li key={cidx}>
                            <Link
                                href={child.href}
                                className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-1"
                            >
                                {child.name}
                            </Link>
                            </li>
                        ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
