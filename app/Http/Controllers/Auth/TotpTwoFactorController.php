<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;

use Laravel\Fortify\Http\Requests\TwoFactorLoginRequest;
use Illuminate\Http\Exceptions\HttpResponseExecution;

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
            $recoveryCode = $user->recoveryCodes();
        }

        return Inertia::render('Profile/TotpTwoFactorSetting', [
            'totpTwoFactorEnabled' => $totpTwoFactorEnabled,
            'qrCode' => $qrCode,
            'recoveryCode' => $recoveryCodes
        ]);
    }

    public function show(TotpTwoFactorChallengeRequest $request): RedirectResponse|Response
    {
        if (! $request->hasChallengedUser()) {
            throw new HttpResponseException(redirect()->route('login'));
        }

        return Inertia::render('Auth/TotpTwoFactorChallenge');
    }

    public function verify(TotpTwoFactorChallengeRequest $request)
    {
        $user = $request->challengedUser();

        if ($request->recovery_code != $request->validRecoveryCode()) {
            $user->replaceRecoveryCode($recovery_code_used);

            event(new RecoveryCodeReplaced($user, $request->recovery_code));
        } else if(!$request->hasValidCode()) {
            //if 5 failed attempts then get user to login again
            if($request->session()->increment("failed.token") >= 5) {
                $this->removeSessionKeys($request);
            }

            return redirect()->back()->withErrors([
                'code' => 'Invalid authetication token'
            ]);
        }

        $this->removeSessionKeys($request);

        Auth::login($user);

        $request->session()->regenerate();

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

    private function removeSessionKeys($request)
    {
        $request->session()->remove('failed.token');
        $request->session()->remove('login.id');
    }
}