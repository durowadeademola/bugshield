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
        $role = strtolower($request->input('role'));

        // Validate role
        if (! in_array($role, ['organization', 'researcher', 'analyst', 'team'])) {
            return back()->withErrors(['role' => 'Please select a valid user role.'])->withInput();
        }

        // Validate input fields dynamically based on role
        $validator = $this->validateBasedOnRole($role, $request);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Prevent duplicate accounts
        if (
            ($role === 'organization' && Organization::where(['name' => $request->name, 'email' => $request->email])->exists()) ||
            ($role === 'researcher' && Researcher::where(['first_name' => $request->first_name, 'last_name' => $request->last_name, 'email' => $request->email])->exists()) ||
            ($role === 'team' && Team::where(['first_name' => $request->first_name, 'last_name' => $request->last_name, 'email' => $request->email])->exists())
        ) {
            return back()->withErrors(['An account with these details already exists.'])->withInput();
        }

        // Create the user
        $user = User::create([
            'name' => $role === 'organization'
                ? $request->name
                : "{$request->first_name} {$request->last_name}",
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (! $user) {
            return back()->withErrors(['Failed to create user account. Please try again.'])->withInput();
        }

        // Assign role
        $user->assignRole($role);

        // Create related model (Organization, Researcher, Team, etc.)
        $this->createBasedOnRole($role, $user, $request);

        // Send email verification event
        event(new Registered($user));

        Auth::login($user);

        // Redirect to email verification notice
        return redirect()->route('verification.notice');
    }

    protected function createBasedOnRole(string $role, $user, Request $request): bool
    {
        if (! $user) {
            return false;
        }

        switch (strtolower($role)) {
            case 'organization':
                if (Organization::where(['user_id' => $user->id, 'email' => $request->email])->exists()) {
                    return false;
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
                break;

            case 'researcher':
                if (Researcher::where(['user_id' => $user->id, 'email' => $request->email])->exists()) {
                    return false;
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
                break;

            case 'analyst':
                if (Analyst::where(['user_id' => $user->id, 'email' => $request->email])->exists()) {
                    return false;
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
                break;

            case 'team':
                if (Team::where(['user_id' => $user->id, 'email' => $request->email])->exists()
                    || ! $request->organization_id) {
                    return false;
                }

                Team::create([
                    'user_id' => $user->id,
                    'organization_id' => $request->organization_id,
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'designation' => $request->designation,
                    'address' => $request->address,
                    'phone_number' => $request->phone_number,
                    'is_active' => false,
                ]);

                break;
        }

        return true;
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
