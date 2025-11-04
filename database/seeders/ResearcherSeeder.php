<?php

namespace Database\Seeders;

use App\Models\Researcher;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearcherSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $researcher = User::where([
            'name' => 'bugshield-researcher',
            'email' => 'researcher@bugshield.com',
        ])->first();

        if ($researcher) {
            if (Researcher::where(['user_id' => $researcher->id, 'is_active' => true])->count() == 0) {
                Researcher::create([
                    'user_id' => $researcher->id,
                    'first_name' => 'Abdulmajeed',
                    'middle_name' => 'Ademola',
                    'last_name' => 'Durowade',
                    'email' => 'durowadeabdulmajeed@gmail.com',
                    'designation' => 'bugshield-researcher',
                    'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                    'phone_number' => '07064706193',
                    'is_active' => true,
                ]);
                $this->command->info('Researcher created successfully.');
            } else {
                $this->command->info('Researcher user already exist.');
            }
        } else {
            $this->command->info('Researcher user does not exist.');
        }
    }
}
