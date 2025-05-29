import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  Home, Activity, CreditCard, Users, Settings,
  HelpCircle, FileText, ChevronDown, ChevronRight, Shield, Lock, Key
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Sidebar({ user, isCollapsed, setIsCollapsed }) {
  const roles = user?.roles || [];
  const isOrganization = roles.includes('organization');
  const isAnalyst = roles.includes('analyst');
  const isResearcher = roles.includes('researcher');
  const isTeam = roles.includes('team');

  const [expanded, setExpanded] = useState(null);
  const toggleExpand = (name) => {
    setExpanded((prev) => (prev === name ? null : name));
  };

  let navItems = [];

  if (isOrganization) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/org/dashboard' },
      {
        name: 'Programs',
        icon: <Activity />,
        children: [
          { name: 'Bug Bounty', href: '/org/bug-bounty' },
          { name: 'Vulnerability Disclosure', href: '/org/vuln-disclosure' },
          { name: 'Penetration Testing', href: '/org/pen-test' },
        ],
      },
      { name: 'AI and Automation', icon: <Users />, href: '/org/ai-auto' },
      {
        name: 'Teams',
        icon: <Users />,
        children: [
          { name: 'Manage', icon: <Settings />, href: '/org/manage/teams' },
        ],
      },
      {
        name: 'Subscriptions',
        icon: <CreditCard />,
        children: [
          { name: 'Manage', icon: <Settings />, href: '/org/manage/subscriptions' },
        ],
      },
      { name: 'Settings', icon: <Settings />, href: '/org/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/org/support' },
    ];
  } else if (isResearcher) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/researcher/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/researcher/programs' },
      { name: 'My Reports', icon: <FileText />, href: '/researcher/reports' },
      { name: 'Rewards', icon: <CreditCard />, href: '/researcher/rewards' },
      { name: 'Leaderboards', icon: <CreditCard />, href: '/researcher/leaderboards' },
      { name: 'Settings', icon: <Settings />, href: '/researcher/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/researcher/support' },
    ];
  } else if (isAnalyst) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/analyst/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/analyst/programs' },
      { name: 'Reports', icon: <FileText />, href: '/analyst/reports' },
      { name: 'Settings', icon: <Settings />, href: '/analyst/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/analyst/support' },
    ];
  } else if (isTeam) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/team/dashboard' },
      { name: 'Settings', icon: <Settings />, href: '/team/settings' },
      { name: 'Help & Support', icon: <HelpCircle />, href: '/team/support' },
    ];
  }

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Header: Logo + Title + Hamburger */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/images/bugshield-logo.png" alt="Bugshield Logo" className="h-10" />
            <Link
              href="/"
              className="text-2xl font-extrabold text-gray-900 dark:text-white select-none"
            >
              Bugshield
            </Link>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Scrollable Navigation */}
      <div
        className="flex-1 overflow-y-auto mt-6 pr-1 pt-2 pb-4"
        style={{ overscrollBehavior: 'contain' }} // Helps avoid scroll bleed
      >
        <ul className="space-y-6">
          {navItems.map((item, idx) => (
            <li key={idx}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`w-full flex justify-between items-center text-left
                      ${isCollapsed ? 'justify-center' : 'justify-between'}
                      text-gray-800 dark:text-gray-200 font-medium
                      py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                      `}
                    style={{ fontSize: '1.125rem' /* text-lg */ }}
                  >
                    <div
                      className={`flex items-center space-x-3 ${
                        isCollapsed ? 'justify-center w-full' : ''
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <span>
                        {expanded === item.name ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </span>
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded === item.name && !isCollapsed && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-6 space-y-4 mt-2 overflow-hidden"
                      >
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>
                            <Link
                              href={child.href}
                              className="flex items-center space-x-2 whitespace-nowrap
                                text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white
                                transition-colors py-1 text-lg"
                            >
                              <span className="text-lg flex-shrink-0">{child.icon}</span>
                              <span>{child.name}</span>
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
                  className={`flex items-center space-x-3
                    ${isCollapsed ? 'justify-center' : ''}
                    text-gray-800 dark:text-gray-200 font-medium
                    py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                    `}
                  style={{ fontSize: '1.125rem' }}
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
