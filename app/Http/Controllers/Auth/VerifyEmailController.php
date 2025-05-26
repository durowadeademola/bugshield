<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

use App\Models\Organization;
use App\Models\Researcher;
use App\Models\Analyst;
use App\Models\Team;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()) . '?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));

            //update user state to active
            $this->updateBasedOnRole($request->user());
        }

        return redirect()->intended($this->redirectToRouteBasedOnRole($request->user()) . '?verified=1');
    }

    protected function updateBasedOnRole($user): void
    {
        //update user state to active
        if ($user->hasRole('organization')) {
            Organization::where(['user_id' => $user->id])->first()->update(['is_active' => true]);
        } elseif ($user->hasRole('researcher')) {
            Researcher::where(['user_id' => $user->id])->first()->update(['is_active' => true]);
        } elseif ($user->hasRole('analyst')) {
            Analyst::where(['user_id' => $user->id])->first()->update(['is_active' => true]);
        } elseif ($user->hasRole('team')) {
            Team::where(['user_id' => $user->id])->first()->update(['is_active' => true]);
        }
    }
}
