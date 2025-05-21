<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()));
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
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
        return route('dashboard', absolute: false);
    }
}
