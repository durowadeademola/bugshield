<?php

namespace Database\Seeders;

use App\Models\Report;
use App\Models\Program;
use App\Models\Bounty;
use App\Models\Researcher;
use App\Models\Organization;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $report = Report::where(['title' => 'SQL Injection in Login Page'])->first();

        $program = Program::where(['title' => 'Bugshield'])->first();

        $researcher = Researcher::where([
            'first_name' => 'Abdulmajeed',
            'last_name' => 'Durowade',
            'email' => 'durowadeabdulmajeed@gmail.com'
        ])->first();

        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com'
        ])->first();

        $bounty = Bounty::where([
            'program_id' => $program->id,
            'report_id' => $report->id,
            'researcher_id' => $researcher->id,
            'organization_id' => $organization->id
        ])->first();

        if ($program && $researcher && $organization && $bounty) {
            if (Transaction::where(['program_id' => $program->id, 'researcher_id' => $researcher->id, 'organization_id' => $organization->id, 'bounty_id' => $bounty->id])->count() == 0) {
                Transaction::create([
                    'txn_id' => 'fea228hhd829320uhhf3842e822e772c',
                    'program_id' => $program->id,
                    'researcher_id' => $researcher->id,
                    'organization_id' => $organization->id,
                    'bounty_id' => $bounty->id,
                    'amount' => 90000,
                    'status' => 'paid',
                    'payment_method' => 'Stripe',
                    'transaction_reference' => '77sss7873288uue27848y222'
                ]);
                $this->command->info('Transaction created successfully.');
            } else {
                $this->command->info('Transaction already exist.');
            }
        } else {
            $this->command->info('Program, Researcher, Organization or Bounty does not exist.');
        }
    }
}
