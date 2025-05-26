<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmailTwoFactorController extends Controller
{
    public function show(): RedirectResponse|Response
    {
        if (!session()->has('2fa:user:id')) {
            return redirect()->route('login');
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
        ]);
    
        return back()->with('status', 'Email 2FA updated.');
    }

    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => 'required|numeric',
        ]);

        $user = User::find(session('2fa:user:id'));

        if (
            !$user ||
            $user->two_factor_code !== $request->code ||
            $user->two_factor_expires_at->lt(now())
        ) {
            return back()->withErrors(['code' => 'The code is invalid or expired.']);
        }

        Auth::login($user);

        $user->resetEmailTwoFactorCode();
        session()->forget('2fa:user:id');

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
    }

    public function resend(): RedirectResponse
    {
        $user = User::find(session('2fa:user:id'));

        if ($user) {
            $user->generateEmailTwoFactorCode();
        }

        return back()->with('status', 'Verification code resent.');
    }
}
