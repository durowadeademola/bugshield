import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dialogue({
    isOpen,
    onClose,
    type = 'confirm',
    title,
    message,
    onConfirm,
    confirmText = 'Confirm',
}) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <span className="text-6xl">✅</span>;
            case 'error':
                return <span className="text-6xl">❌</span>;
            case 'confirm':
            default:
                return <span className="text-6xl">🚨</span>;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-[#1c2438] text-black dark:text-white rounded-2xl w-full max-w-lg p-12 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <X size={22} />
                </button>

                <div className="flex flex-col items-center text-center space-y-6">
                    {getIcon()}
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-base text-gray-600 dark:text-gray-300">{message}</p>

                    <div className="flex gap-6 mt-6">
                        {type === 'confirm' ? (
                            <>
                                <button
                                    onClick={onClose}
                                    className="w-36 py-2.5 rounded-lg border border-gray-700 dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="w-36 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                                >
                                    {confirmText}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClose}
                                className="w-36 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white transition"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}