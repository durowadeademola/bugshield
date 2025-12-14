export default function ChartPlaceholder({ height }) {
    return (
        <div
            className={`w-full ${height} rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
        >
            <span className="text-gray-400 text-sm">Chart goes here</span>
        </div>
    );
}
