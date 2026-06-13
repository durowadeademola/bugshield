import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Rocket, ArrowLeft } from 'lucide-react';

export default function ComingSoon({ feature, description }) {
    return (
        <>
            <Head title={feature} />
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-6">
                        <Rocket size={36} className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{feature}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-8">{description}</p>
                    <Link href="/org/dashboard" className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
            </DashboardLayout>
        </>
    );
}
