<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     */
    public function store(Request $request): RedirectResponse
    {
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
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
