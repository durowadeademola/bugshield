import {
    Bell,
    Moon,
    Sun,
    ChevronDown,
    LogOut,
    User,
    AlertTriangle
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Dialogue from '@/Components/Dialogue';
import NotificationCard from '@/Components/NotificationCard';
import { route } from 'ziggy-js';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ darkMode, toggleDarkMode, user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [logoutDialogueOpen, setLogoutDialogueOpen] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [shakeBell, setShakeBell] = useState(false);

    const dropdownRef = useRef(null);
    const notificationsRef = useRef(null);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target)
            ) {
                setNotificationsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <>
            <div className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900 shadow relative">
                <div className="text-xl font-bold dark:text-white mt-4">{greeting},</div>

                <div className="flex items-center space-x-4 relative">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                    >
                        {darkMode ? (
                            <Sun className="text-yellow-400" />
                        ) : (
                            <Moon className="text-gray-800" />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() => {
                                setNotificationsOpen(!notificationsOpen);
                                setShakeBell(prev => !prev);
                            }}
                            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                        >
                            <motion.div
                                key={shakeBell}
                                animate={{
                                    rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <Bell className="text-gray-700 dark:text-gray-300" />
                            </motion.div>
                            {user?.unreadNotifications > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </button>

                        <AnimatePresence>
                            {notificationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-[350px] max-h-[500px] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg rounded-xl z-50 p-4 space-y-3"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-bold dark:text-white">Notifications</h2>
                                        <button
                                            onClick={() => {
                                                router.post(route('notifications.update'));
                                                setNotificationsOpen(false);
                                            }}
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                    {user?.notifications?.length > 0 ? (
                                        user.notifications.map((notification) => (
                                            <NotificationCard key={notification.id} notification={notification} />
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">No notifications found.</p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-500" />
                            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50"
                                >
                                    <Link
                                        href="/profile"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <User className="w-4 h-4 mr-2" /> View Profile
                                    </Link>
                                    <button
                                        onClick={() => setLogoutDialogueOpen(true)}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" /> Log Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Logout Confirm Dialogue */}
            <Dialogue
                isOpen={logoutDialogueOpen}
                onClose={() => setLogoutDialogueOpen(false)}
                type="confirm"
                title="Logout Alert"
                message="Are you sure you want to log out?"
                icon={<AlertTriangle className="text-blue-500 w-10 h-10" />}
                onConfirm={handleLogout}
            />
        </>
    );
}
