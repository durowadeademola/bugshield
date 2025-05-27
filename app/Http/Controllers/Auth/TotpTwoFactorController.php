<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;

use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

use App\Http\Requests\Auth\TotpTwoFactorChallengeRequest;

class TotpTwoFactorController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();

        $totpTwoFactorEnabled = $user->totpTwoFactorEnabled();

        $qrCode = null;
        $recoveryCodes = null;

        if ($request->session()->get('newlyEnabled')) {
            $qrCode = $user->twoFactorQrCodeSvg();
            $recoveryCodes = $user->recoveryCodes();
        }

        return Inertia::render('Profile/TotpTwoFactorSetting', [
            'totpTwoFactorEnabled' => $totpTwoFactorEnabled,
            'qrCode' => $qrCode,
            'recoveryCodes' => $recoveryCodes
        ]);
    }

    public function show(TotpTwoFactorChallengeRequest $request): RedirectResponse|Response
    {
        if (! $request->hasChallengedUser() || 
            ! $request->session()->has('totp-2fa:user:id')) {
            throw new HttpResponseException(
                redirect()->route('login')
            );
        }
        
        return Inertia::render('Auth/TotpTwoFactorChallenge');
    }

    public function verify(TotpTwoFactorChallengeRequest $request)
    {
        $user = $request->challengedUser();

        if(! $user->totpTwoFactorEnabled() && ! $request->hasChallengedUser()) {
            throw new HttpResponseException(
                redirect()->route('login')
            );
        } 
        
        // Throttle attempts to prevent brute-force
        $this->ensureIsNotRateLimited($request);

        $request->validate([
            'code' => 'nullable|string',
            'recovery_code' => 'nullable|string',
        ]);

        if (!$request->filled('code') && !$request->filled('recovery_code')) {
            throw ValidationException::withMessages([
                'code' => 'Please enter either the authentication code or a recovery code.',
            ]);
        }

        if ($request->filled('code') && $request->filled('recovery_code')) {
            throw ValidationException::withMessages([
                'code' => 'Please enter only one: either the authentication code or the recovery code, not both.',
            ]);
        }

        if ($request->filled('recovery_code')) {
            if ( !in_array($request->input('recovery_code'), $user->two_factor_recovery_codes ?? [])) {
                RateLimiter::hit($this->throttleKey($request));
                throw ValidationException::withMessages([
                    'recovery_code' => 'The provided recovery code is invalid.',
                ]);
            }

            // Invalidate used recovery code
            $user->forceFill([
                'recovery_codes' => array_values(array_diff($user->two_factor_recovery_codes ?? [], [$request->input('recovery_code')])),
            ])->save();

            $request->challengedUser()->replaceRecoveryCode($request->input('recovery_code'));
            
            event(new RecoveryCodeReplaced($user, $request->input('recovery_code')));
        }
        
        if ($request->filled('code')) {
            //$this->isValidTotpCode($user, $request->input('code')
            if(! $request->hasValidCode()) {
                RateLimiter::hit($this->throttleKey($request));
                throw ValidationException::withMessages([
                    'code' => 'The provided authentication code is invalid.',
                ]);
            }
        }

        Auth::login($user);

        RateLimiter::clear($this->throttleKey($request));

        $request->session()->forget(['failed.token', 'totp-2fa:user:id']);
        $request->session()->regenerate();
        $request->session()->regenerateToken();

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
    }

    public function enable(EnableTwoFactorAuthentication $enable): RedirectResponse
    {
        $user = Auth::user();
        
        $user->totp_two_factor_enabled = true;
        $user->email_two_factor_enabled = false;
        $user->save();

        $enable($user);

        return redirect()->back()->with('newlyEnabled', true);
    }

    public function disable(DisableTwoFactorAuthentication $disable): RedirectResponse
    {
        $user = Auth::user();

        $user->totp_two_factor_enabled = false;
        $user->save();

        $disable($user);

        return redirect()->back();
    }

    protected function throttleKey(Request $request)
    {
        return strtolower($request->ip()) . '|2fa';
    }

    protected function ensureIsNotRateLimited(Request $request)
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        throw ValidationException::withMessages([
            'code' => 'Too many attempts. Please try again later.',
        ]);
    }

    protected function isValidTotpCode($user, $code)
    {
        // You must implement this based on your 2FA setup.
        // For example, using Google2FA:
        return app(\Pragmarx\Google2FA\Google2FA::class)
            ->verifyKey($user->two_factor_secret, $code);
    }

}