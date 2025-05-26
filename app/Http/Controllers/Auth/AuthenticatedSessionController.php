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

        if ($request->user()->email_two_factor_enabled) {
            // Generate + send code
            $request->user()->generateEmailTwoFactorCode();

            // Store user temporarily
            session(['2fa:user:id' => $request->user()->id ?? null]);

            //Temporarily log user out
            Auth::logout();

            return redirect()->route('2fa.email');

            // Force frontend to handle 2FA challenge screen
            // throw ValidationException::withMessages([
            //     'two_factor' => 'Email verification required.',
            // ])->status(423); // 423 = Locked
        }

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
