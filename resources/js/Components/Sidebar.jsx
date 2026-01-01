import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  Home, Activity, CreditCard, Users, Settings, Bot, ShieldHalf, Trophy,
  HelpCircle, FileText, ChevronDown, ChevronRight, Shield, Lock, Key,
  UserPlus
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
        name: 'Security',
        icon: <ShieldHalf />,
        children: [
          { name: 'Bug Bounty', href: '/org/security/bug-bounty' },
          { name: 'Vulnerability Disclosure', href: '/org/security/disclosure' },
          { name: 'Penetration Testing', href: '/org/security/pentest' },
        ],
      },
      {
        name: 'AI & Automation',
        icon: <Bot />, 
        children: [
          { name: 'Vulnerability Scanner', href: '/org/ai-auto/scanner' },
          { name: 'Threat Monitoring', href: '/org/ai-auto/threat-monitor' },
          { name: 'AI Assistant', href: '/org/ai-auto/ai-assistant' },
        ]
      },
      {
        name: 'Audit & Reports',
        icon: <FileText />, 
        children: [
          { name: 'Security Audit', href: '/org/audit-report/security-audit'},
          { name: 'Threat Report', href: '/org/audit-report/threat-report' },
          { name: 'Vulnerability Report', href: '/org/audit-report/vuln-report' }
        ]
      },
      {
        name: 'Teams',
        icon: <Users />,
        children: [
          // { name: 'Manage', href: '/org/manage/teams' },
        ],
      },
      {
        name: 'Subscriptions',
        icon: <CreditCard />,
        children: [
          // { name: 'Manage', href: '/org/manage/subscriptions' },
        ],
      },
      { name: 'Settings', icon: <Settings />, href: '/profile' },
      { 
        name: 'Help & Support', 
        icon: <HelpCircle />, 
        children: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Chat with us', href: '/chat' },
          { name: 'Report a Bug', href: '/bug' },
          { name: 'FAQs', href: '/faqs' },
          { name: 'Terms & Conditions', href: '/terms' },
        ],
      },
    ];
  } else if (isResearcher) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/researcher/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/researcher/programs' },
      { name: 'Invites', icon: <UserPlus />, href: '/researcher/invites'},
      { name: 'Submissions', icon: <FileText />, href: '/researcher/submissions' },
      { name: 'Payments', icon: <CreditCard />, href: '/researcher/payments' },
      { name: 'Leaderboards', icon: <Trophy />, href: '/researcher/leaderboards' },
      { name: 'Settings', icon: <Settings />, href: '/profile' },
      { 
        name: 'Help & Support', 
        icon: <HelpCircle />, 
        children: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Chat with us', href: '/chat' },
          { name: 'Report a Bug', href: '/bug' },
          { name: 'FAQs', href: '/faqs' },
          { name: 'Terms & Conditions', href: '/terms' },
        ],
      },
    ];
  } else if (isAnalyst) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/analyst/dashboard' },
      { name: 'Programs', icon: <Activity />, href: '/analyst/programs' },
      { name: 'Reports', icon: <FileText />, href: '/analyst/reports' },
      { name: 'Settings', icon: <Settings />, href: '/profile' },
      { 
        name: 'Help & Support', 
        icon: <HelpCircle />, 
        children: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Chat with us', href: '/chat' },
          { name: 'Report a Bug', href: '/bug' },
          { name: 'FAQs', href: '/faqs' },
          { name: 'Terms & Conditions', href: '/terms' },
        ],
      },
    ];
  } else if (isTeam) {
    navItems = [
      { name: 'Home', icon: <Home />, href: '/team/dashboard' },
      {
        name: 'Security',
        icon: <ShieldHalf />,
        children: [
          { name: 'Bug Bounty', href: '/org/bug-bounty' },
          { name: 'Vulnerability Disclosure', href: '/org/disclosure' },
          { name: 'Penetration Testing', href: '/org/pen-test' },
        ],
      },
      {
        name: 'AI & Automation',
        icon: <Bot />, 
        children: [
          { name: 'Vulnerability Scanner', href: '/org/ai-auto/scanner' },
          { name: 'Threat Monitoring', href: '/org/ai-auto/threat-monitoring' },
          { name: 'AI Assitant', href: '/org/ai-auto/ai-assitant'}
        ]
      },
      {
        name: 'Audit & Reports',
        icon: <FileText />, 
        children: [
          { name: 'Security Audit', href: '/org/audit-report/security-report'},
          { name: 'Threat Report', href: '/org/audit-report/threat-report' },
          { name: 'Vulnerability Report', href: '/org/audit-report/vuln-report' }
        ]
      },
      { name: 'Settings', icon: <Settings />, href: '/profile' },
      { 
        name: 'Help & Support', 
        icon: <HelpCircle />, 
        children: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Chat with us', href: '/chat' },
          { name: 'Report a Bug', href: '/bug' },
          { name: 'FAQs', href: '/faqs' },
          { name: 'Terms & Conditions', href: '/terms' },
        ],
      },
    ];
  }

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/images/bluestrike-logo.png" alt="Bluestrike Logo" className="h-10" />
            <Link
              href="/"
              className="text-2xl font-extrabold text-gray-900 dark:text-white select-none"
            >
              Bluestrike
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
        style={{ overscrollBehavior: 'contain' }}
      >
        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`w-full flex justify-between items-center text-left
                      ${isCollapsed ? 'justify-center' : 'justify-between'}
                      text-gray-800 dark:text-gray-200 font-medium
                      py-2 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                      `}
                    style={{ fontSize: '1.125rem' }}
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
                        className="pl-6 space-y-2 mt-1 overflow-hidden"
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
                    py-2 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
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
