<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Requests\Auth\TwoFactorChallengeRequest;

class EmailTwoFactorController extends Controller
{
    public function show(Request $request): RedirectResponse|Response
    {
        if (! $request->session()->has('email-2fa:user:id')) {
            throw new HttpResponseException(redirect()->route('login'));
        }

        return Inertia::render('Auth/EmailTwoFactorChallenge');
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'email_two_factor_enabled' => ['boolean'],
        ]);
    
        $request->user()->update([
            'email_two_factor_enabled' => $request->email_two_factor_enabled,
            'totp_two_factor_enabled' => false
        ]);
    
        return back()->with('status', 'Email 2FA updated.');
    }

    public function verify(TwoFactorChallengeRequest $request): RedirectResponse
    {
        $user = $request->getChallengedUser();

        if(! $user->isEmailTwoFactorEnabled()) {
            throw new HttpResponseException(redirect()->route('login'));
        } 

        $request->validate([
            'code' => 'required|numeric',
        ]);

        if (!$user) {
            throw ValidationException::withMessages(['code' => 'The user was not found.']);

        } else if($user->two_factor_code !== $request->code) {
            throw ValidationException::withMessages(['code' => 'The code is invalid. Please try again.']);
            
        } else if ($user->two_factor_expires_at->lt(now())) {
            throw ValidationException::withMessages(['code' => 'The code has expired, Please resend another.']);
        }

        Auth::login($user);

        $user->resetEmailTwoFactorCode();

        $request->session()->forget('email-2fa:user:id');
        $request->session()->regenerate();
        $request->session()->regenerateToken();

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
    }

    public function resend(TwoFactorChallengeRequest $request): RedirectResponse
    {
        $user = $request->getChallengedUser();
        
        if ($user) {
            $user->generateEmailTwoFactorCode();
        }

        return back()->with('status', 'Verification code resent.');
    }
}
