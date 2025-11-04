<?php

namespace Database\Seeders;

use App\Models\Bounty;
use App\Models\Organization;
use App\Models\Program;
use App\Models\Report;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Researcher;
use Illuminate\Database\Seeder;

class BountySeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $program = Program::where(['title' => 'Bugshield'])->first();

        $report = Report::where(['title' => 'SQL Injection in Login page'])->first();

        $researcher = Researcher::where([
            'first_name' => 'Abdulmajeed',
            'last_name' => 'Durowade',
            'email' => 'durowadeabdulmajeed@gmail.com',
        ])->first();

        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com',
        ])->first();

        if ($program && $report && $researcher && $organization) {
            if (Bounty::where(['program_id' => $program->id, 'report_id' => $report->id, 'researcher_id' => $researcher->id, 'organization_id' => $organization->id])->count() == 0) {
                Bounty::create([
                    'program_id' => $program->id,
                    'report_id' => $report->id,
                    'researcher_id' => $researcher->id,
                    'organization_id' => $organization->id,
                    'amount' => 90000,
                    'status' => 'paid',
                    'is_low' => false,
                    'is_medium' => false,
                    'is_high' => false,
                    'is_critical' => true,
                    'is_informational' => false,
                ]);
                $this->command->info('Bounty created successfully.');
            } else {
                $this->command->info('Bounty already exist.');
            }
        } else {
            $this->command->info('Program, Report, Researcher or Organization does not exist.');
        }
    }
}
