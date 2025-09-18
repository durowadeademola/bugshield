<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        // Handle Email-based 2FA
        if ($request->user()->isEmailTwoFactorEnabled()) {
            $request->user()->generateEmailTwoFactorCode();
            session(['email-2fa:user:id' => $request->user()->id]);

            Auth::logout();
            return redirect()->route('2fa.email');
        }

        // Handle TOTP-based 2FA
        if ($request->user()->isTotpTwoFactorEnabled()) {
            session(['totp-2fa:user:id' => $request->user()->id]);

            Auth::logout();
            return redirect()->route('2fa.totp');
        }

        // Default: redirect based on user role
        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
