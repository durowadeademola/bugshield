export default function DashboardCard({ title, value, icon, bgColor = 'bg-gray-800' }) {
    return (
        <div className={`rounded-2xl shadow p-5 text-white ${bgColor}`}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium text-gray-300">{title}</div>
                    <div className="text-xl font-bold mt-1">{value}</div>
                </div>
                {icon && <div className="text-3xl">{icon}</div>}
            </div>
        </div>
    );
}