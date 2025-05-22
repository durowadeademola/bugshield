import { Moon, Sun, ChevronDown, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ darkMode, toggleDarkMode, user }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [greeting, setGreeting] = useState('')
    const dropdownRef = useRef(null);

    // Handle clicks outside dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    return (
        <div className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900 shadow relative">
            <div className="text-xl font-bold dark:text-white mt-4">
                {greeting},
            </div>

            <div className="flex items-center space-x-4 relative">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
                </button>

                {/* Profile Avatar + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-500" />
                        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50">
                            <Link
                                href="/organization/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <User className="w-4 h-4 mr-2" /> View Profile
                            </Link>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <LogOut className="w-4 h-4 mr-2" /> Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
