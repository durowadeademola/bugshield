<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com',
        ])->first();

        $teamUser = User::where([
            'name' => 'bugshield-team',
            'email' => 'team@bugshield.com',
        ])->first();

        if (! $organization) {
            $this->command->info('Organization does not exist.');

            return;
        }

        if (! $teamUser) {
            $this->command->info('Team user does not exist.');

            return;
        }

        $teamExists = Team::where([
            'user_id' => $teamUser->id,
            'organization_id' => $organization->id,
        ])->exists();

        if (! $teamExists) {
            Team::create([
                'user_id' => $teamUser->id,
                'organization_id' => $organization->id,
                'first_name' => 'Abdulmajeed',
                'middle_name' => 'Ademola',
                'last_name' => 'Durowade',
                'email' => 'durowadeabdulmajeed@gmail.com',
                'designation' => 'bugshield-team',
                'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                'phone_number' => '07064706193',
                'is_active' => true,
            ]);

            $this->command->info('Team created successfully.');
        } else {
            $this->command->info('Team already exists for this organization.');
        }
    }
}
