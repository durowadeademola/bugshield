export default function StatCard({ title, value, trend, positive, negative }) {
    return (
        <div className="rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

            <div className="flex items-center justify-between mt-2">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </h2>

                {trend && (
                    <span
                        className={`flex items-center text-sm font-medium ${
                            positive
                                ? 'text-green-600'
                                : negative
                                ? 'text-red-500'
                                : 'text-gray-500'
                        }`}
                    >
                        {positive && <ArrowUpRight size={16} />}
                        {negative && <ArrowDownRight size={16} />}
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
