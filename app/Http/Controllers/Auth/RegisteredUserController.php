<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller as BaseController;
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

use App\Models\Analyst;
use App\Models\Researcher;
use App\Models\Organization;

class RegisteredUserController extends BaseController
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register',[
            'states' => BaseController::statesList()
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

        if (!in_array($role, ['organization', 'researcher', 'analyst'])) {
            return redirect()->back()->withErrors(['Invalid user'])->withInput();
        }

        if ($role === "organization" && Organization::where([
            'name' => $request->name,
            'email' => $request->email
        ])->exists()) {return redirect()->back()->withErrors(['The organization already exists.'])->withInput();} 

        else if ($role === "researcher" && Researcher::where([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email
        ])->exists()) {return redirect()->back()->withErrors(['The researcher already exists.'])->withInput();}


        $validator = $this->validateRole($role, $request);

        if ($validator && $validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user = User::create([
            'name' => $role === "organization" ? $request->name : $request->first_name . " " . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!empty($user)) {
            $user->assignRole($role);
        }

        $this->createNewUserEntryRole($role, $user, $request);

        //Dispatch email verification
        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('verification.notice');

        //return redirect(route('dashboard', absolute: false));
    }

    protected function createNewUserEntryRole(string $role, $user, Request $request)
    {
        if ($user && $user->hasRole('organization') && strtolower($role) === "organization") {
            if (Organization::where([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email
            ])->exists()) {return redirect()->back()->withErrors(['The organization already exists.'])->withInput();}

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
                'is_active' => false 
            ]);

        } elseif ($user && $user->hasRole('researcher') && strtolower($role) === "researcher") {
            if (Researcher::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email
            ])->exists()) {return redirect()->back()->withErrors(['The researcher already exists.'])->withInput();}

            Researcher::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'designation' => $request->designation,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'is_active' => false
            ]);
        } elseif ($user && $user->hasRole('analyst') && strtolower($role) === "analyst") {
            if (Analyst::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email
            ])->exists()) {return redirect()->back()->withErrors(['The analyst already exists.'])->withInput();}

            Analyst::create([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'designation' => $request->designation,
                'address' => $request->address,
                'phone_number' => $request->phone_number,
                'is_active' => false
            ]);
        }
    }

    private function validateRole(string $role, Request $request)
    {
        $validator = null;

        if ($role && $role === "organization") {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'address' => 'required',
                'phone_number' => 'required',
                'website' => 'required',
                'address' => 'required',
                'description' => 'required',
                'country' => 'required',
                'state' => 'required'
            ]);

        } else if($role && $role === "researcher") {
            $validator = Validator::make($request->all(),[
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'first_name' => 'required|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'last_name' => 'required|string|max:255',
                'designation' => 'nullable',
                'address' => 'nullable',
                'phone_number' => 'nullable'
            ]);
        }

        return $validator;
    }
}
