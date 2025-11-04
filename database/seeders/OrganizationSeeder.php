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
        $organization = User::where([
            'name' => 'bugshield-organization',
            'email' => 'organization@bugshield.com',
        ])->first();

        if ($organization) {
            if (Organization::where(['user_id' => $organization->id, 'is_active' => true])->count() == 0) {
                Organization::create([
                    'user_id' => $organization->id,
                    'name' => 'Bugshield',
                    'email' => 'bugshield@gmail.com',
                    'website' => 'https://www.bugshield.com',
                    'address' => 'Abuja',
                    'phone_number' => '07064706193',
                    'description' => 'Continuous penetration and bug bounty platform.',
                    'state' => 'FCT',
                    'country' => 'Nigeria',
                    'is_active' => true,
                ]);
                $this->command->info('Organization created successfully.');
            } else {
                $this->command->info('Organization user already exist.');
            }
        } else {
            $this->command->info('Organization user does not exist.');
        }
    }
}
