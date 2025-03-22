<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Analyst;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnalystSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $analyst = User::where([
            'name' => 'bugshield-analyst',
            'email' => 'analyst@bugshield.com'
        ])->first();

        if ($analyst) {
            if (Analyst::where(['user_id' => $analyst->id, 'is_active' => true])->count() == 0) {
                Analyst::create([
                    'user_id' => $analyst->id,
                    'first_name' => 'Abdulmajeed',
                    'middle_name' => 'Ademola',
                    'last_name' => 'Durowade',
                    'email' => 'durowadeabdulmajeed@gmail.com',
                    'designation' => 'bugshield-analyst',
                    'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                    'phone_number' => '07064706193',
                    'is_active' => true
                ]);
                $this->command->info('Analyst created successfully.');
            } else {
                $this->command->info('Analyst user already exist.');
            }
        } else {
            $this->command->info('Analyst user does not exist.');
        }
    }
}
