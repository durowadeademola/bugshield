<?php

namespace Database\Seeders;

use App\Models\Account;
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
        $accounts = [
            [
                'role' => 'analyst',
                'email' => 'analyst@bugshield.com',
                'account_number' => '2216232901',
                'bank_name' => 'Zenith Bank Plc',
                'bank_code' => 'ZNTHNG',
                'balance' => 1000000,
            ],
            [
                'role' => 'admin',
                'email' => 'admin@bugshield.com',
                'account_number' => '7064706193',
                'bank_name' => 'Opay Services',
                'bank_code' => 'OPAYNG',
                'balance' => 3000000,
            ],
            [
                'role' => 'researcher',
                'email' => 'researcher@bugshield.com',
                'account_number' => '0409992852',
                'bank_name' => 'Wema Bank Plc',
                'bank_code' => 'WEMALG',
                'balance' => 5000000,
            ],
        ];

        foreach ($accounts as $data) {
            $user = User::where([
                'name' => "bugshield-{$data['role']}",
                'email' => $data['email'],
            ])->first();

            if (! $user) {
                $this->command->warn(ucfirst($data['role']).' user does not exist.');

                continue;
            }

            $existingAccount = Account::where([
                'user_id' => $user->id,
                'status' => 'active',
            ])->exists();

            if ($existingAccount) {
                $this->command->info(ucfirst($data['role']).' account already exists.');

                continue;
            }

            Account::create([
                'user_id' => $user->id,
                'account_number' => $data['account_number'],
                'account_name' => 'ABDULMAJEED ADEMOLA DUROWADE',
                'bank_name' => $data['bank_name'],
                'bank_code' => $data['bank_code'],
                'account_type' => 'savings',
                'currency' => 'NGN',
                'status' => 'active',
                'balance' => $data['balance'],
            ]);

            $this->command->info(ucfirst($data['role']).' account created successfully.');
        }
    }
}
