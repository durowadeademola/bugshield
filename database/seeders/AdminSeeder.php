<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminData = [
            'role' => 'admin',
            'email' => 'admin@bugshield.com',
            'profile' => [
                'first_name' => 'Abdulmajeed',
                'middle_name' => 'Ademola',
                'last_name' => 'Durowade',
                'email' => 'durowadeabdulmajeed@gmail.com',
                'designation' => 'bugshield-admin',
                'address' => 'No 22, Citizens Avenue, Dawaki. Abuja',
                'phone_number' => '07064706193',
            ],
        ];

        // find admin user
        $adminUser = User::where([
            'name' => "bugshield-{$adminData['role']}",
            'email' => $adminData['email'],
        ])->first();

        if (! $adminUser) {
            $this->command->warn('Admin user does not exist.');

            return;
        }

        // check if admin profile exists
        $adminExists = Admin::where([
            'user_id' => $adminUser->id,
            'is_active' => true,
        ])->exists();

        if ($adminExists) {
            $this->command->info('Admin profile already exists.');

            return;
        }

        // create admin profile
        Admin::create(array_merge($adminData['profile'], [
            'user_id' => $adminUser->id,
            'is_active' => true,
        ]));

        $this->command->info('Admin profile created successfully.');
    }
}
