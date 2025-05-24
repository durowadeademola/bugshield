<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Organization;
use App\Models\User;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com'
        ])->first();

        $team = User::where([
            'name' => 'bugshield-team',
            'email' => 'team@bugshield.com'
        ])->first();

        if ($team && $organization) {
            if (Team::where(['user_id' => $team->id, 'organization_id' => $organization->id])->count() == 0) {
                Team::create([
                    'user_id' => $team->id,
                    'organization_id' => $organization->id,
                    'first_name' => 'Abdulmajeed',
                    'middle_name' => 'Ademola',
                    'last_name' => 'Durowade',
                    'email' => 'durowadeabdulmajeed@gmail.com',
                    'designation' => 'bugshield-team',
                    'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                    'phone_number' => '07064706193',
                    'is_active' => true
                ]);
                $this->command->info('Team created successfully.');
            } else {
                $this->command->info('Team user already exist.');
            }
        } else {
            $this->command->info('Team user does not exist.');
        } 
    }
}
