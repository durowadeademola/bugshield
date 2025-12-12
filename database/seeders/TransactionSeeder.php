<?php

namespace Database\Seeders;

use App\Models\Bounty;
use App\Models\Organization;
use App\Models\Program;
use App\Models\Report;
use App\Models\Researcher;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $report = Report::where(['title' => 'SQL Injection in Login Page'])->first();
        $program = Program::where(['title' => 'Bluestrike'])->first();
        $researcher = Researcher::where([
            'first_name' => 'Abdulmajeed',
            'last_name' => 'Durowade',
            'email' => 'durowadeabdulmajeed@gmail.com',
        ])->first();
        $organization = Organization::where([
            'name' => 'Bluestrike',
            'email' => 'bluestrike@gmail.com',
        ])->first();

        // ✅ Check dependencies before querying bounty
        if (! $program || ! $report || ! $researcher || ! $organization) {
            $this->command->info('Missing required data: Program, Report, Researcher, or Organization does not exist.');

            return;
        }

        $bounty = Bounty::where([
            'program_id' => $program->id,
            'report_id' => $report->id,
            'researcher_id' => $researcher->id,
            'organization_id' => $organization->id,
        ])->first();

        if (! $bounty) {
            $this->command->info('Bounty record not found. Create bounty before seeding transactions.');

            return;
        }

        // ✅ Check if transaction exists efficiently
        $exists = Transaction::where([
            'program_id' => $program->id,
            'researcher_id' => $researcher->id,
            'organization_id' => $organization->id,
            'bounty_id' => $bounty->id,
        ])->exists();

        if (! $exists) {
            Transaction::create([
                'txn_id' => 'fea228hhd829320uhhf3842e822e772c',
                'program_id' => $program->id,
                'researcher_id' => $researcher->id,
                'organization_id' => $organization->id,
                'bounty_id' => $bounty->id,
                'amount' => 90000,
                'status' => 'paid',
                'payment_method' => 'Stripe',
                'transaction_reference' => '77sss7873288uue27848y222',
            ]);

            $this->command->info('✅ Transaction created successfully.');
        } else {
            $this->command->info('ℹ️ Transaction already exists.');
        }
    }
}
