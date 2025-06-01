import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function DashboardLayout({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                user={user}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out">
                {/* Navbar */}
                <Navbar
                    user={user}
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                />

                {/* Scrollable main content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
