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
        $programTitle = 'Bluestrike';
        $reportTitle = 'SQL Injection in Login Page';

        $researcherData = [
            'first_name' => 'Abdulmajeed',
            'last_name' => 'Durowade',
            'email' => 'durowadeabdulmajeed@gmail.com',
        ];

        $organizationData = [
            'name' => 'Bluestrike',
            'email' => 'bluestrike@gmail.com',
        ];

        // Fetch related records
        $program = Program::where('title', $programTitle)->first();
        $report = Report::where('title', $reportTitle)->first();
        $researcher = Researcher::where($researcherData)->first();
        $organization = Organization::where($organizationData)->first();

        // Validate required data existence
        if (! $program || ! $report || ! $researcher || ! $organization) {
            $this->command->warn('One or more dependencies (Program, Report, Researcher, or Organization) do not exist.');

            return;
        }

        // Check if bounty already exists
        $exists = Bounty::where([
            'program_id' => $program->id,
            'report_id' => $report->id,
            'researcher_id' => $researcher->id,
            'organization_id' => $organization->id,
        ])->exists();

        if ($exists) {
            $this->command->info('Bounty already exists.');

            return;
        }

        // Create new bounty
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
    }
}
