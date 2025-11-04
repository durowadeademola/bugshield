<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\Report;
use App\Models\Researcher;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $program = Program::where(['title' => 'Bugshield'])->first();

        $researcher = Researcher::where([
            'first_name' => 'Abdulmajeed',
            'last_name' => 'Durowade',
            'email' => 'durowadeabdulmajeed@gmail.com',
        ])->first();

        if ($program && $researcher) {
            if (Report::where(['program_id' => $program->id, 'researcher_id' => $researcher->id])->count() == 0) {
                Report::create([
                    'researcher_id' => $researcher->id,
                    'program_id' => $program->id,
                    'title' => 'SQL Injection in Login page',
                    'description' => 'There is an SQL Injection of the login page at www.bugshield.com',
                    'status' => 'pending',
                    'is_low' => false,
                    'is_medium' => false,
                    'is_high' => false,
                    'is_critical' => true,
                    'is_informational' => false,
                    'asset' => 'www.bugshield.com',
                    'weakness' => 'SQL Injection',
                    'severity' => '9.0',
                    'impact' => 'Threat actor compromises the whole data.',
                ]);
                $this->command->info('Report created successfully.');
            } else {
                $this->command->info('Report already exist.');
            }
        } else {
            $this->command->info('Program or Researcher does not exist.');
        }
    }
}
