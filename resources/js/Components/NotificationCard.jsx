import { CheckCircle, Circle } from 'lucide-react';

export default function NotificationCard({ notification }) {
    const { data, read_at, created_at } = notification;

    return (
        <div className="bg-[#1E293B] text-white p-4 rounded-xl space-y-2 relative">
            <div className="flex justify-between">
                <span className="text-sm">
                    {read_at ? (
                        <span className="text-gray-400">Read</span>
                    ) : (
                        <span className="text-red-500 flex items-center">
                            <Circle className="w-2 h-2 mr-1" />
                        </span>
                    )}
                </span>
                {!read_at && <a href="#" className="text-sm text-blue-400">Mark as read</a>}
            </div>
            <p className="text-base">{data.message}</p>
            <p className="text-sm font-bold">{new Date(created_at).toLocaleString()}</p>
        </div>
    );
}
