<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::where([
            'name' => 'bugshield-admin',
            'email' => 'admin@bugshield.com'
        ])->first();

        if ($admin) {
            if (Admin::where(['user_id' => $admin->id, 'is_active' => true])->count() == 0) {
                Admin::create([
                    'user_id' => $admin->id,
                    'first_name' => 'Abdulmajeed',
                    'middle_name' => 'Ademola',
                    'last_name' => 'Durowade',
                    'email' => 'durowadeabdulmajeed@gmail.com',
                    'designation' => 'bugshield-admin',
                    'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                    'phone_number' => '07064706193',
                    'is_active' => true
                ]);
                $this->command->info('Admin created successfully.');
            } else {
                $this->command->info('Admin user already exist.');
            }
        } else {
            $this->command->info('Admin user does not exist.');
        }
    }
}
