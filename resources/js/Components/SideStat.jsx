export default function SideStat({ label, value }) {
    return (
        <div className="flex items-center justify-between rounded-lg px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                {label}
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {value}
            </span>
        </div>
    );
}
