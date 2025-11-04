<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller as BaseController;
use App\Models\Analyst;
use App\Models\Organization;
use App\Models\Researcher;
use App\Models\Team;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Validator;

class RegisteredUserController extends BaseController
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'states' => BaseController::getStatesList(),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $role = strtolower($request->role);

        if (! in_array($role, ['organization', 'researcher', 'analyst', 'team'])) {
            return redirect()->back()->withErrors(['Please select a user.'])->withInput();
        }

        if ($role === 'organization' && Organization::where([
            'name' => $request->name,
            'email' => $request->email,
        ])->exists()) {
            return redirect()->back()->withErrors(['The organization already exists.'])->withInput();
        } elseif ($role === 'researcher' && Researcher::where([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
        ])->exists()) {
            return redirect()->back()->withErrors(['The researcher already exists.'])->withInput();
        } elseif ($role === 'team' && Team::where([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
        ])->exists()) {
            return redirect()->back()->withError(['The team already exists'])->withInput();
        }

        $validator = $this->validateBasedOnRole($role, $request);

        if ($validator && $validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $role === 'organization' ? $request->name : $request->first_name.' '.$request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (! empty($user)) {
            $user->assignRole($role);
        }

        $this->createBasedOnRole($role, $user, $request);

        // Dispatch email verification
        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('verification.notice');

        // return redirect(route('dashboard', absolute: false));
    }

    protected function createBasedOnRole(string $role, $user, Request $request)
    {
        if ($user && $user->hasRole('organization') && strtolower($role) === 'organization') {
            if (Organization::where([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
            ])->exists()) {
                return redirect()->back()->withErrors(['The organization already exists.'])->withInput();
            }

            Organization::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'website' => $request->website,
                'description' => $request->description,
                'country' => $request->country,
                'state' => $request->state,
                'is_active' => false,
            ]);

        } elseif ($user && $user->hasRole('researcher') && strtolower($role) === 'researcher') {
            if (Researcher::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
            ])->exists()) {
                return redirect()->back()->withErrors(['The researcher already exists.'])->withInput();
            }

            Researcher::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'designation' => $request->designation,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'is_active' => false,
            ]);
        } elseif ($user && $user->hasRole('analyst') && strtolower($role) === 'analyst') {
            if (Analyst::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
            ])->exists()) {
                return redirect()->back()->withErrors(['The analyst already exists.'])->withInput();
            }

            Analyst::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'designation' => $request->designation,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'is_active' => false,
            ]);
        } elseif ($user && $user->hasRole('team') && strtolower($role) === 'team') {
            if (Team::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
            ])->exists()) {
                return redirect()->back()->withErrors(['The team already exists.'])->withInput();
            }

            $org = Organization::where([
                'user_id' => optional($request->user())->id,
            ])->first();

            if (! empty($org)) {
                Team::create([
                    'user_id' => $user->id,
                    'organization_id' => $org->id,
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'designation' => $request->designation,
                    'address' => $request->address,
                    'phone_number' => $request->phone_number,
                    'is_active' => false,
                ]);
            }
        }
    }

    private function validateBasedOnRole(string $role, Request $request)
    {
        $validator = null;

        if ($role && $role === 'organization') {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'website' => 'required|url',
                'address' => 'required|string|max:255',
                'phone_number' => 'required|string|max:15',
                'description' => 'nullable|string',
                'country' => 'required|string|max:100',
                'state' => 'required|string|max:100',
                'logo_name' => 'nullable|string|max:255',
                'logo_path' => 'nullable|string|max:255',
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    function ($attribute, $value, $fail) {
                        if (User::where('email', $value)->exists() || Organization::where('email', $value)->exists()) {
                            $fail("The {$attribute} already exist.");
                        }
                    },
                ],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

        } elseif ($role && $role === 'researcher' || $role === 'analyst' || $role === 'team') {
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'last_name' => 'required|string|max:255',
                'designation' => 'nullable',
                'address' => 'nullable',
                'phone_number' => 'nullable',
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    function ($attribute, $value, $fail) {
                        if (User::where('email', $value)->exists() || Organization::where('email', $value)->exists()) {
                            $fail("The {$attribute} already exist.");
                        }
                    },
                ],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
        }

        return $validator;
    }
}
