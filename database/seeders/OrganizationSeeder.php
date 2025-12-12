<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userData = [
            'name' => 'bluestrike-organization',
            'email' => 'organization@bluestrike.com',
        ];

        $organizationData = [
            'name' => 'Bluestrike',
            'email' => 'bluestrike@gmail.com',
            'website' => 'https://www.bluestrike.com',
            'address' => 'Abuja',
            'phone_number' => '07064706193',
            'description' => 'Continuous penetration and bug bounty platform.',
            'state' => 'FCT',
            'country' => 'Nigeria',
            'is_active' => true,
        ];

        // Find the linked user
        $user = User::where($userData)->first();

        if (! $user) {
            $this->command->warn('Organization user does not exist.');

            return;
        }

        // Check if organization profile exists
        $exists = Organization::where([
            'user_id' => $user->id,
            'is_active' => true,
        ])->exists();

        if ($exists) {
            $this->command->info('Organization profile already exists.');

            return;
        }

        // Create organization profile
        Organization::create(array_merge($organizationData, [
            'user_id' => $user->id,
        ]));

        $this->command->info('Organization profile created successfully.');
    }
}
