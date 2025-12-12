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
        $currentTimestamp = \Carbon\Carbon::now();

        // Define all default users in one place
        $usersData = [
            [
                'name' => 'bluestrike-admin',
                'email' => 'admin@bluestrike.com',
                'role' => 'admin',
            ],
            [
                'name' => 'bluestrike-analyst',
                'email' => 'analyst@bluestrike.com',
                'role' => 'analyst',
            ],
            [
                'name' => 'bluestrike-researcher',
                'email' => 'researcher@bluestrike.com',
                'role' => 'researcher',
            ],
            [
                'name' => 'bluestrike-organization',
                'email' => 'organization@bluestrike.com',
                'role' => 'organization',
            ],
            [
                'name' => 'bluestrike-team',
                'email' => 'team@bluestrike.com',
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
