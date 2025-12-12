<?php

namespace Database\Seeders;

use App\Models\Analyst;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnalystSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $analystData = [
            'role' => 'analyst',
            'email' => 'analyst@bluestrike.com',
            'profile' => [
                'first_name' => 'Abdulmajeed',
                'middle_name' => 'Ademola',
                'last_name' => 'Durowade',
                'email' => 'durowadeabdulmajeed@gmail.com',
                'designation' => 'bluestrike-analyst',
                'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                'phone_number' => '07064706193',
            ],
        ];

        // find analyst user
        $user = User::where([
            'name' => "bluestrike-{$analystData['role']}",
            'email' => $analystData['email'],
        ])->first();

        if (! $user) {
            $this->command->warn('Analyst user does not exist.');

            return;
        }

        // check if analyst profile exists
        $exists = Analyst::where([
            'user_id' => $user->id,
            'is_active' => true,
        ])->exists();

        if ($exists) {
            $this->command->info('Analyst profile already exists.');

            return;
        }

        // create analyst profile
        Analyst::create(array_merge($analystData['profile'], [
            'user_id' => $user->id,
            'is_active' => true,
        ]));

        $this->command->info('Analyst profile created successfully.');
    }
}
