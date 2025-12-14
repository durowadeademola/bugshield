export default function AnalyticsCard({ title, children }) {
    return (
        <div className="rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                {title}
            </h3>
            {children}
        </div>
    );
}
