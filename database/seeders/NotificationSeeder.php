<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Notification;

class NotificationSeeder extends Seeder
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
            if (Notification::where(['user_id' => $analyst->id])->count() == 0) {
                Notification::create([
                    'user_id' => $analyst->id,
                    'message' => 'New report submitted.',
                    'read_status' => true
                ]);
                $this->command->info('Analyst notification saved successfully.');
            } else {
                $this->command->info('Analyst notification already exist.');
            }
        } else {
            $this->command->info('Analyst does not exist.');
        }

        $researcher = User::where([
            'name' => 'bugshield-researcher',
            'email' => 'researcher@bugshield.com'
        ])->first();

        if ($researcher) {
            if (Notification::where(['user_id' => $researcher->id])->count() == 0) {
                Notification::create([
                    'user_id' => $researcher->id,
                    'message' => 'Your report have been submitted.',
                    'read_status' => true
                ]);
                $this->command->info('Researcher notification saved successfully.');
            } else {
                $this->command->info('Researcher notification already exist.');
            }
        } else {
            $this->command->info('Researcher does not exist.');
        }
    }
}
