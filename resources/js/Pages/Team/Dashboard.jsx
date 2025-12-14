import { Head } from '@inertiajs/react';
import DashboardCard from '@/Components/DashboardCard';
import AnalyticsCard from '@/Components/AnalyticsCard';
import ChartPlaceholder from '@/Components/ChartPlaceholder';
import SideStat from '@/Components/SideStat';
import FeatureGridItem from '@/Components/FeatureGridItem';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Gift, Bitcoin, FileText, Server, Star } from 'lucide-react';

export default function Dashboard({ user }) {
    return (
        <>
      <Head title="Dashboard" />
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <DashboardCard title="Balance" value="₦0.00" icon={<span className="text-3xl">₦</span>} bgColor='bg-green-700'/>
            <DashboardCard title="Reports" value="45" icon={<FileText />} bgColor="bg-purple-700" />
            <DashboardCard title="Active Bounties" value="12" icon={<Star />} bgColor="bg-indigo-700" />
            <DashboardCard title="Payments" value="₦23.44" icon={<span className="text-3xl">₦</span>} bgColor="bg-indigo-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Charts Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnalyticsCard title="Cumulative MRR added this month">
                            <ChartPlaceholder height="h-64" />
                        </AnalyticsCard>
        
                        <AnalyticsCard title="Signups and Day-2 Active (by week)">
                            <ChartPlaceholder height="h-56" />
                        </AnalyticsCard>
                    </div>
        
                    {/* Side Stats */}
                    <div className="space-y-4">
                        <SideStat label="Paying customers" value="9,875" />
                        <SideStat label="Free plan users" value="23.5k" />
                        <SideStat label="Signups this month" value="5,145" />
                        <SideStat label="Daily Active Users" value="4,581" />
                        <SideStat label="Monthly Active Users" value="8,959" />
                        <SideStat label="DAU / MAU" value="51.1%" />
                    </div>
                </div>
        </DashboardLayout>
    </>
    );
}
