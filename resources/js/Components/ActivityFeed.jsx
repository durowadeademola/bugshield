import { Link } from '@inertiajs/react';
import { FileText, DollarSign, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
    pending:     { icon: <Clock size={14} />, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', label: 'submitted' },
    triaged:     { icon: <AlertTriangle size={14} />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'triaged' },
    accepted:    { icon: <CheckCircle size={14} />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', label: 'accepted' },
    resolved:    { icon: <CheckCircle size={14} />, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', label: 'resolved' },
    rejected:    { icon: <XCircle size={14} />, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', label: 'rejected' },
    bounty:      { icon: <DollarSign size={14} />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', label: 'bounty awarded' },
};

const SEVERITY_DOT = {
    critical:      'bg-red-500',
    high:          'bg-orange-500',
    medium:        'bg-yellow-500',
    low:           'bg-blue-500',
    informational: 'bg-gray-400',
};

function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function ActivityFeed({ activities = [], title = 'Activity Feed', viewAllHref }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">{title}</h2>
                <p className="text-gray-400 text-sm text-center py-6">No recent activity.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
                {viewAllHref && (
                    <Link href={viewAllHref} className="text-xs text-blue-600 hover:underline">View all</Link>
                )}
            </div>

            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800" />

                <div className="space-y-4">
                    {activities.map((item, i) => {
                        const type   = item.type || 'pending';
                        const config = STATUS_CONFIG[type] || STATUS_CONFIG.pending;
                        const sev    = item.severity ?? null;

                        return (
                            <div key={i} className="flex items-start gap-4 pl-1">
                                {/* Icon */}
                                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 flex-shrink-0 ${config.bg}`}>
                                    <span className={config.color}>{config.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm text-gray-900 dark:text-white line-clamp-1">
                                                {item.href ? (
                                                    <Link href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        {item.title}
                                                    </Link>
                                                ) : item.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                {item.subtitle && <span>{item.subtitle} · </span>}
                                                <span className={`font-medium ${config.color}`}>{config.label}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {sev && (
                                                <span className={`w-2 h-2 rounded-full ${SEVERITY_DOT[sev] || 'bg-gray-400'}`} title={sev} />
                                            )}
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{timeAgo(item.date)}</span>
                                        </div>
                                    </div>
                                    {item.amount && (
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                                            +₦{Number(item.amount).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
