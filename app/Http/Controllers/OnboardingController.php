<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $org  = $user->organization;

        // Already complete — redirect to dashboard
        if ($org && $org->name && $org->email) {
            return redirect()->route('organization.dashboard');
        }

        return Inertia::render('Organization/Onboarding', [
            'existingOrg' => $org,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'website'     => 'nullable|url|max:255',
            'phone_number'=> 'nullable|string|max:20',
            'country'     => 'required|string|max:100',
            'state'       => 'nullable|string|max:100',
            'address'     => 'nullable|string|max:500',
            'description' => 'nullable|string|max:2000',
            'logo'        => 'nullable|image|max:2048',
        ]);

        $logoName = null;
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $file     = $request->file('logo');
            $logoName = $file->getClientOriginalName();
            $logoPath = $file->store('org-logos', 'public');
        }

        $orgData = array_merge($validated, [
            'user_id'   => $user->id,
            'is_active' => true,
            'logo_name' => $logoName,
            'logo_path' => $logoPath,
        ]);

        unset($orgData['logo']);

        $org = $user->organization;
        if ($org) {
            if ($logoPath && $org->logo_path) {
                Storage::disk('public')->delete($org->logo_path);
            }
            $org->update($orgData);
        } else {
            Organization::create($orgData);
        }

        return redirect()->route('organization.dashboard')
            ->with('success', 'Organization profile set up successfully! You can now create your first program.');
    }
}
