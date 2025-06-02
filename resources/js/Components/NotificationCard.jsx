import { CheckCircle, Circle } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function NotificationCard({ notification }) {
    const { id, data, read_at, created_at } = notification;

    const markAsRead = () => {
        router.post(route('notifications.read', { id }), {}, {
            preserveScroll: true,
            only: ['auth'], 
        });
    };

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
                {!read_at && (
                    <button
                        onClick={markAsRead}
                        className="text-sm text-blue-400 hover:underline"
                    >
                        Mark as read
                    </button>
                )}
            </div>
            <p className="text-base font-semibold">{data?.title || 'Notification'}</p>
            <p className="text-sm text-gray-300">{data?.body || 'No details available.'}</p>

            <p className="text-sm font-bold">{new Date(created_at).toLocaleString()}</p>
        </div>
    );
}
