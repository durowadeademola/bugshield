<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    protected static ?string $password;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $currentTimestamp = Carbon::now();

        // Define all default users in one place
        $usersData = [
            [
                'name' => 'bugshield-admin',
                'email' => 'admin@bugshield.com',
                'role' => 'admin',
            ],
            [
                'name' => 'bugshield-analyst',
                'email' => 'analyst@bugshield.com',
                'role' => 'analyst',
            ],
            [
                'name' => 'bugshield-researcher',
                'email' => 'researcher@bugshield.com',
                'role' => 'researcher',
            ],
            [
                'name' => 'bugshield-organization',
                'email' => 'organization@bugshield.com',
                'role' => 'organization',
            ],
            [
                'name' => 'bugshield-team',
                'email' => 'team@bugshield.com',
                'role' => 'team',
            ],
        ];

        foreach ($usersData as $data) {
            $exists = User::where('email', $data['email'])->exists();

            if (! $exists) {
                $user = User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => static::$password ??= Hash::make('password'),
                    'email_verified_at' => $currentTimestamp,
                ]);

                $user->assignRole($data['role']);

                $this->command->info("✅ {$data['role']} user created successfully ({$data['email']}).");
            } else {
                $this->command->info("ℹ️ {$data['role']} user already exists ({$data['email']}).");
            }
        }
    }
}
