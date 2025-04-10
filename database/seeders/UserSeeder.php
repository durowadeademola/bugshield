<?php

namespace Database\Seeders;

use Hash;
use App\Models\User;
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
        $current_timestamp = \Carbon\Carbon::now();

        // admin user
        if (User::where(['name'=>'bugshield-admin', 'email'=>'admin@bugshield.com'])->count() == 0) {
            User::create([
                'name' => 'bugshield-admin',
                'email' => 'admin@bugshield.com',
                'password' => static::$password ??= Hash::make('password'),
                'email_verified_at' => $current_timestamp
            ])->assignRole('admin');
        }

        //analyst user
        if (User::where(['name'=>'bugshield-analyst', 'email'=>'analyst@bugshield.com'])->count() == 0) {
            User::create([
                'name' => 'bugshield-analyst',
                'email' => 'analyst@bugshield.com',
                'password' => static::$password ??= Hash::make('password'),
                'email_verified_at' => $current_timestamp
            ])->assignRole('analyst');
        }

        //researcher user
        if (User::where(['name'=>'bugshield-researcher', 'email'=>'researcher@bugshield.com'])->count() == 0) {
            User::create([
                'name' => 'bugshield-researcher',
                'email' => 'researcher@bugshield.com',
                'password' => static::$password ??= Hash::make('password'),
                'email_verified_at' => $current_timestamp
            ])->assignRole('researcher');
        }

        //organization user
        if (User::where(['name'=>'bugshield-organization', 'email'=>'organization@bugshield.com'])->count() == 0) {
            User::create([
                'name' => 'bugshield-organization',
                'email' => 'organization@bugshield.com',
                'password' => static::$password ??= Hash::make('password'),
                'email_verified_at' => $current_timestamp
            ])->assignRole('organization');
        }
    }
}