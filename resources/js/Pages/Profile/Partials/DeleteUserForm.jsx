import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Dialogue from '@/Components/Dialogue';

export default function DeleteUserForm({ className = '' }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setShowConfirmModal(true);
    };

    const deleteUser = () => {
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setShowConfirmModal(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Delete Account
            </DangerButton>

            {/* ✅ Use Dialogue modal */}
            <Dialogue
                isOpen={showConfirmModal}
                onClose={closeModal}
                onConfirm={deleteUser}
                confirmText="Delete Account"
                type="confirm"
                title="Are you sure you want to delete your account?"
                message={
                    <>
                        Once your account is deleted, all resources and data will be lost. Bugshield would not recover your account. <br />
                        Please enter your password to confirm.
                        <div className="mt-6 text-left">
                            <input
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-red-500"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <div className="mt-2 text-red-500 text-sm">{errors.password}</div>
                            )}
                        </div>
                    </>
                }
            />

        </section>
    );
}
