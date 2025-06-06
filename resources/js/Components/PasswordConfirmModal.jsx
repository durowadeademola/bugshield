import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

export default function PasswordConfirmModal({
    isOpen,
    onClose,
    onConfirmed,
}) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setLoading(true);
        setError('');
        try {
            await axios.post(route('password.confirm'), {
                password: password,
            });
            onConfirmed();
            onClose();
        } catch (err) {
            setError('Incorrect password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-[#1c2438] text-black dark:text-white rounded-2xl w-full max-w-lg p-10 shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                    <X size={22} />
                </button>

                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-bold">Confirm Password</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please enter your password to continue with 2FA.
                    </p>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full mt-4 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:border-blue-500"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 border border-gray-400 dark:border-white text-black dark:text-white rounded hover:bg-gray-100 dark:hover:bg-white dark:hover:text-black transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        >
                            {loading ? 'Verifying...' : 'Confirm'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
