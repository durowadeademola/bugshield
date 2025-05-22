<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended($this->redirectToRouteBasedOnRole($request->user()))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }

    protected function redirectToRouteBasedOnRole($user): string
    {
        if ($user->hasRole('organization')) {
            return route('organization.dashboard', absolute: false);
        } elseif ($user->hasRole('researcher')) {
            return route('researcher.dashboard', absolute: false);
        } elseif ($user->hasRole('analyst')) {
            return route('analyst.dashboard', absolute: false);
        }

        // fallback route
        return route('home', absolute: false);
    }
}
