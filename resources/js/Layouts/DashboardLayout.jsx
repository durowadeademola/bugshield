import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function DashboardLayout({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="flex">
            <Sidebar user={user} />
            <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-800">
                <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}