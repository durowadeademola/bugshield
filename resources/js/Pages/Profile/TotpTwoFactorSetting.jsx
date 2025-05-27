import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TotpTwoFactorSetting() {
    const user = usePage().props.auth.user;
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const enable2FA = () => {
        setIsLoading(true);
        axios.post(route('totp-2fa-enable')).then(() => {
            fetch2FAInfo();
        }).finally(() => setIsLoading(false));
    };

    const disable2FA = () => {
        setIsLoading(true);
        axios.delete(route('totp-2fa-disable')).then(() => {
            setQrCode(null);
            setRecoveryCodes([]);
        }).finally(() => setIsLoading(false));
    };

    const fetch2FAInfo = () => {
        axios.get(route('two-factor.qr-code')).then(res => {
            setQrCode(res.data.svg);
        });

        axios.get(route('two-factor.recovery-codes')).then(res => {
            setRecoveryCodes(res.data);
        });
    };

    const regenerateCodes = () => {
        axios.post(route('two-factor.recovery-codes')).then(res => {
            setRecoveryCodes(res.data);
        });
    };

    useEffect(() => {
        if (user.totp_two_factor_enabled) {
            fetch2FAInfo();
        }
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Two-Factor Authentication</h2>

            {!user.totp_two_factor_enabled ? (
                <div>
                    <p className="text-gray-600 mb-4">You have not enabled two-factor authentication.</p>
                    <button
                        onClick={enable2FA}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Enable 2FA'}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg">Authenticator QR Code</h4>
                        {qrCode ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: qrCode }}
                                className="my-4"
                            />
                        ) : (
                            <p>Loading QR code...</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg">Recovery Codes</h4>
                        <ul className="mt-2 bg-gray-800 text-white p-4 rounded space-y-1">
                            {recoveryCodes.map((code, idx) => (
                                <li key={idx} className="text-mono">{code}</li>
                            ))}
                        </ul>
                        <button
                            onClick={regenerateCodes}
                            className="mt-3 text-sm text-blue-500 hover:underline"
                        >
                            Regenerate Recovery Codes
                        </button>
                    </div>

                    <button
                        onClick={disable2FA}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Please wait...' : 'Disable 2FA'}
                    </button>
                </div>
            )}
        </div>
    );
}
