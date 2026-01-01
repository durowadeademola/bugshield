<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
                    ? $user->only([
                        'id',
                        'name',
                        'email',
                        'email_two_factor_enabled',
                        'totp_two_factor_enabled',
                    ]) + [
                        'roles' => $user->getRoleNames(),
                        'unreadNotifications' => $user->unreadNotifications()->count(),
                        'notifications' => $user->notifications()->latest()->limit(10)->get(),
                        'organization' => $user->organization,
                        'analyst' => $user->analyst,
                        'team' => $user->team,
                        'admin' => $user->admin,
                        'researcher' => $user->researcher,
                    ]
                    : null,
            ],
        ];
    }
}
