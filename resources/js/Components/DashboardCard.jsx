export default function DashboardCard({ title, value, icon }) {
    return (
        <div className="rounded-2xl shadow p-5 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</div>
                    <div className="text-xl font-bold mt-1">{value}</div>
                </div>
                {icon && <div className="text-3xl">{icon}</div>}
            </div>
        </div>
    );
}