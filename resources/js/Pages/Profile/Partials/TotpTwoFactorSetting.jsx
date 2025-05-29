import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PasswordConfirmModal from '@/components/PasswordConfirmModal';
import Dialogue from '@/components/Dialogue';

export default function TotpTwoFactorSetting() {
    const user = usePage().props.auth.user;
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showEnablePasswordModal, setShowEnablePasswordModal] = useState(false);
    const [showDisablePasswordModal, setShowDisablePasswordModal] = useState(false);
    const [showInfoPasswordModal, setShowInfoPasswordModal] = useState(false);
    const [dialogue, setDialogue] = useState({
        isOpen: false,
        type: 'success',
        title: '',
        message: '',
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setDialogue({
                    isOpen: true,
                    type: 'success',
                    title: 'Copied!',
                    message: 'Recovery code copied to clipboard.',
                });
            })
            .catch(() => {
                setDialogue({
                    isOpen: true,
                    type: 'error',
                    title: 'Failed!',
                    message: 'Could not copy to clipboard. Try again.',
                });
            });
    };

    // Fetch QR code and recovery codes
    const fetch2FAInfo = () => {
        axios.get(route('two-factor.qr-code')).then((res) => setQrCode(res.data.svg));
        axios.get(route('two-factor.recovery-codes')).then((res) => setRecoveryCodes(res.data));
    };

    // Enable 2FA after password confirmed
    const enable2FA = () => {
        setIsLoading(true);
        axios
            .post(route('totp-2fa-enable'))
            .then(() => {
                fetch2FAInfo();
                setDialogue({
                    isOpen: true,
                    type: 'success',
                    title: 'Enabled!',
                    message: 'TOTP Two Factor Authentication Enabled.',
                });
                location.reload(true);
            })
            .catch(() => {
                setDialogue({
                    isOpen: true,
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to enable 2FA.',
                });
            })
            .finally(() => setIsLoading(false));
    };

    // Disable 2FA with password confirmation
    const disable2FAConfirmed = (password) => {
        setIsLoading(true);
        axios
            .delete(route('totp-2fa-disable'), { data: { password } })
            .then(() => {
                setQrCode(null);
                setRecoveryCodes([]);
                setDialogue({
                    isOpen: true,
                    type: 'success',
                    title: 'Disabled!',
                    message: 'TOTP Two Factor Authentication Disabled.',
                });
                setShowDisablePasswordModal(false);
                location.reload(true);
            })
            .catch((error) => {
                setDialogue({
                    isOpen: true,
                    type: 'error',
                    title: 'Error!',
                    message: error.response?.data?.message || 'Failed to disable 2FA.',
                });
            })
            .finally(() => setIsLoading(false));
    };

    const regenerateCodes = () => {
        axios.post(route('two-factor.recovery-codes')).then((res) => setRecoveryCodes(res.data));
    };

    // On mount, if 2FA enabled, fetch info but do NOT require password confirmation to view
    useEffect(() => {
        if (user?.totp_two_factor_enabled) {
            setShowInfoPasswordModal(true);
        }
    }, []);

    return (
        <div className="space-y-6">
            {/* Dialogue for success/error messages */}
            <Dialogue
                isOpen={dialogue.isOpen}
                type={dialogue.type}
                title={dialogue.title}
                message={dialogue.message}
                onClose={() => setDialogue({ ...dialogue, isOpen: false })}
            />

            {/* Enable Password Confirm Modal */}
            <PasswordConfirmModal
                isOpen={showEnablePasswordModal}
                onClose={() => setShowEnablePasswordModal(false)}
                onConfirmed={() => {
                    setShowEnablePasswordModal(false);
                    enable2FA();
                }}
            />

            {/* Disable Password Confirm Modal */}
            <PasswordConfirmModal
                isOpen={showDisablePasswordModal}
                onClose={() => setShowDisablePasswordModal(false)}
                onConfirmed={(password) => disable2FAConfirmed(password)}
            />

            {/* Fetch Password Recovery and Code Info */}
            <PasswordConfirmModal
                isOpen={showInfoPasswordModal}
                onClose={() => setShowInfoPasswordModal(false)}
                onConfirmed={() => {
                    setShowInfoPasswordModal(false);
                    fetch2FAInfo();
                }}
            />

            {!user?.totp_two_factor_enabled ? (
                <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                        You have not enabled authenticator-based two-factor authentication.
                    </p>
                    <button
                        onClick={() => setShowEnablePasswordModal(true)}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Enable TOTP 2FA'}
                    </button>
                </div>
            ) : (
                <>
                    <div>
                        <h4 className="font-semibold text-lg">Authenticator QR Code</h4>
                        {qrCode ? (
                            <div dangerouslySetInnerHTML={{ __html: qrCode }} className="my-4" />
                        ) : (
                            <p>Loading QR code...</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg">Recovery Codes</h4>
                        {recoveryCodes.length > 0 ? (
                            <ul className="mt-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded space-y-1 text-sm">
                                {recoveryCodes.map((code, idx) => (
                                    <li
                                        key={idx}
                                        className="font-mono flex items-center justify-between"
                                    >
                                        {code}
                                        <button
                                            onClick={() => copyToClipboard(code)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                            aria-label="Copy recovery code"
                                        >
                                            📋
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading recovery codes...</p>
                        )}

                        <button
                            onClick={regenerateCodes}
                            className="mt-3 text-sm text-blue-600 hover:underline"
                        >
                            Regenerate Recovery Codes
                        </button>
                    </div>

                    <button
                        onClick={() => setShowDisablePasswordModal(true)}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Disable TOTP 2FA'}
                    </button>
                </>
            )}
        </div>
    );
}
