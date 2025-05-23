import { Head } from '@inertiajs/react';
import DashboardCard from '@/Components/DashboardCard';
import FeatureGridItem from '@/Components/FeatureGridItem';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Gift, Bitcoin, FileText, Server, Star } from 'lucide-react';

export default function Dashboard({ user }) {
    return (
        <>
      <Head title="Dashboard" />
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <DashboardCard title="Balance" value="₦0.00" icon={<span className="text-white">₦</span>} bgColor='bg-green-700'/>
            <DashboardCard title="Reports" value="45" icon={<FileText />} bgColor="bg-purple-700" />
            <DashboardCard title="Active Bounties" value="12" icon={<Star />} bgColor="bg-indigo-700" />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureGridItem label="Gift Cards" icon={<Gift />} />
            <FeatureGridItem label="Crypto" icon={<Bitcoin />} />
            <FeatureGridItem label="Reports" icon={<FileText />} />
            <FeatureGridItem label="Infrastructure" icon={<Server />} />
            <FeatureGridItem label="Reputation" icon={<Star />} isNew />
        </div> */}
        </DashboardLayout>
    </>
    );
}
