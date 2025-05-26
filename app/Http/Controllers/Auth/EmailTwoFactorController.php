<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmailTwoFactorController extends Controller
{
    public function show(): Response
    {
        if (!session()->has('2fa:user:id')) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/EmailTwoFactorChallenge');
    }

    public function verify(Request $request)
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
            return back()->withErrors(['code' => 'Invalid or expired code']);
        }

        Auth::login($user);

        $user->resetEmailTwoFactorCode();
        session()->forget('2fa:user:id');

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
    }

    public function resend()    
    {
        $user = User::find(session('2fa:user:id'));

        if ($user) {
            $user->generateEmailTwoFactorCode();
        }

        return back()->with('status', 'Verification code resent.');
    }

    protected function redirectToRouteBasedOnRole($user): string
    {
        if ($user->hasRole('organization')) {
            return route('organization.dashboard', absolute: false);
        } elseif ($user->hasRole('researcher')) {
            return route('researcher.dashboard', absolute: false);
        } elseif ($user->hasRole('analyst')) {
            return route('analyst.dashboard', absolute: false);
        } elseif ($user->hasRole('team')) {
            return route('team.dashboard', absolute: false);
        }

        // fallback route
        return route('home', absolute: false);
    }
}
