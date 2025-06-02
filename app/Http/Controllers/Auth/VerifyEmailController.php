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
        $rolesMap = [
            'organization' => Organization::class,
            'analyst'      => Analyst::class,
            'researcher'   => Researcher::class,
            'team'         => Team::class,
        ];

        foreach ($rolesMap as $role => $model) {
            if ($user->hasRole($role)) {
                $instance = $model::where('user_id', $user->id)->first();

                if ($instance) {
                    $instance->update(['is_active' => true]);
                }

                break;
            }
        }
    }

}
