<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use Illuminate\Auth\Events\Registered;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

use App\Http\Models\User;
use App\Http\Models\Analyst;
use App\Http\Models\Researcher;
use App\Http\Models\Organization;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $role = strtolower($request->role);

        if (!in_array($role, ['organization', 'researcher', 'analyst'])) {
            return redirect()->back()->withErrors(['Invalid user type.'])->withInput();
        }
    
        // Check if user already exists
        if (User::where([
                'name' => $request->name,
                'email' => $request->email
            ])->exists()) {
            return redirect()->back()->withErrors(['The user already exists.'])->withInput();
        }
    
        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!empty($user)) {
            $user->assignRole($role);
        }
        
        $this->createNewUserEntryRole($role, $user, $request);
    
        // Dispatch email verification
        event(new Registered($user));
    
        Auth::login($user);
    
        return redirect()->route('verification.notice');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function createNewUserEntryRole(string $role, $user, Request $request)
    {
        if ($user && $user->hasRole('organization') && strtolower($role) === "organization") {
            if (Organization::where([
                'user_id' => $user->id,
                'name' => $request->name,
                'email' => $request->email
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
                'is_active' => false 
            ]);

        } elseif ($user && $user->hasRole('researcher') && strtolower($role) === "researcher") {
            if (Researcher::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email
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
                'is_active' => false
            ]);
        } elseif ($user && $user->hasRole('analyst') && strtolower($role) === "analyst") {
            if (Analyst::where([
                'user_id' => $user->id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email
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
                'is_active' => false
            ]);
        }
    }
}
