export default function FeatureGridItem({ label, icon, isNew }) {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-2xl flex items-center justify-between shadow hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="text-2xl">{icon}</div>
                <div className="text-lg font-semibold">{label}</div>
            </div>
            {isNew && <span className="text-xs bg-green-500 text-white rounded px-2 py-1">New</span>}
        </div>
    );
}