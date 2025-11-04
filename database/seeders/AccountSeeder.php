<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Admin;
use App\Models\Analyst;
use App\Models\Researcher;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // analyst account
        $analyst = User::where([
            'name' => 'bugshield-analyst',
            'email' => 'analyst@bugshield.com',
        ])->first();

        if ($analyst) {
            if (Account::where(['user_id' => $analyst->id, 'status' => 'active'])->count() == 0) {
                Account::create([
                    'user_id' => $analyst->id,
                    'account_number' => '2216232901',
                    'account_name' => 'ABDULMAJEED ADEMOLA DUROWADE',
                    'bank_name' => 'Zenith Bank Plc',
                    'bank_code' => 'ZNTHNG',
                    'account_type' => 'savings',
                    'currency' => 'NGN',
                    'status' => 'active',
                    'balance' => '1000000',
                ]);
                $this->command->info('Analyst account created successfully.');
            } else {
                $this->command->info('Analyst account already exist.');
            }
        } else {
            $this->command->info('Analyst account does not exist.');
        }

        // admin account
        $admin = User::where([
            'name' => 'bugshield-admin',
            'email' => 'admin@bugshield.com',
        ])->first();

        if ($admin) {
            if (Account::where(['user_id' => $admin->id, 'status' => 'active'])->count() == 0) {
                Account::create([
                    'user_id' => $admin->id,
                    'account_number' => '7064706193',
                    'account_name' => 'ABDULMAJEED ADEMOLA DUROWADE',
                    'bank_name' => 'Opay Services',
                    'bank_code' => 'OPAYNG',
                    'account_type' => 'savings',
                    'currency' => 'NGN',
                    'status' => 'active',
                    'balance' => '3000000',
                ]);
                $this->command->info('Admin account created successfully.');
            } else {
                $this->command->info('Admin account already exist.');
            }
        } else {
            $this->command->info('Admin account does not exist.');
        }

        // researcher account
        $researcher = User::where([
            'name' => 'bugshield-researcher',
            'email' => 'researcher@bugshield.com',
        ])->first();

        if ($researcher) {
            if (Account::where(['user_id' => $researcher->id, 'status' => 'active'])->count() == 0) {
                Account::create([
                    'user_id' => $researcher->id,
                    'account_number' => '0409992852',
                    'account_name' => 'ABDULMAJEED ADEMOLA DUROWADE',
                    'bank_name' => 'Wema Bank Plc',
                    'bank_code' => 'WEMALG',
                    'account_type' => 'savings',
                    'currency' => 'NGN',
                    'status' => 'active',
                    'balance' => '5000000',
                ]);
                $this->command->info('Researcher account created successfully.');
            } else {
                $this->command->info('Researcher account already exist.');
            }
        } else {
            $this->command->info('Researcher account does not exist.');
        }
    }
}
