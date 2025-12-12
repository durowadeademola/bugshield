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
        $researcherUser = User::where([
            'name' => 'bluestrike-researcher',
            'email' => 'researcher@bluestrike.com',
        ])->first();

        if (! $researcherUser) {
            $this->command->warn('Researcher user does not exist.');

            return;
        }

        $researcher = Researcher::firstOrCreate(
            [
                'user_id' => $researcherUser->id,
                'is_active' => true,
            ],
            [
                'first_name' => 'Abdulmajeed',
                'middle_name' => 'Ademola',
                'last_name' => 'Durowade',
                'email' => 'durowadeabdulmajeed@gmail.com',
                'designation' => 'bluestrike-researcher',
                'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                'phone_number' => '07064706193',
            ]
        );

        $message = $researcher->wasRecentlyCreated
            ? '✅ Researcher created successfully.'
            : 'ℹ️ Researcher already exists.';

        $this->command->info($message);
    }
}
