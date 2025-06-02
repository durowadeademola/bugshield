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
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only(['id', 'name', 'email', 'email_two_factor_enabled', 'totp_two_factor_enabled']) + [
                        'roles' => $request->user()->getRoleNames(),
                        'unreadNotifications' => $request->user()->unreadNotifications()->count(),
                        'notifications' => $request->user()->notifications->take(10),
                        'organization' => $request->user()->getOrganizationAttributes(),
                        'analyst' => $request->user()->getAnalystAttributes(),
                        'team' => $request->user()->getTeamAttributes(),
                        'admin' => $request->user()->getAdminAttributes(),
                        'researcher' => $request->user()->getResearcherAttributes(),
                    ]
                    : null,
            ],
        ];
    }    
}
