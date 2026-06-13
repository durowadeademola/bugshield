export default function StatusBadge({ status }) {
    const map = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        triaged: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        bug_bounty: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
        vdp: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        pentest: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    const labels = {
        bug_bounty: 'Bug Bounty',
        vdp: 'VDP',
        pentest: 'Pentest',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] || map.inactive}`}>
            {labels[status] || status}
        </span>
    );
}
