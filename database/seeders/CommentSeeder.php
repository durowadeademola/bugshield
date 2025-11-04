<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Program;
use App\Models\Report;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $program = Program::where(['title' => 'Bugshield'])->first();

        $report = Report::where(['title' => 'SQL Injection in Login Page'])->first();

        $analyst = User::where([
            'name' => 'bugshield-analyst',
            'email' => 'analyst@bugshield.com',
        ])->first();

        if ($program && $report && $analyst) {
            if (Comment::where(['user_id' => $analyst->id])->count() == 0) {
                Comment::create([
                    'program_id' => $program->id,
                    'report_id' => $report->id,
                    'user_id' => $analyst->id,
                    'message' => 'Thank you for your report, a bounty have been paid.',
                ]);
                $this->command->info('Analyst comment saved successfully.');
            } else {
                $this->command->info('Analyst Comment already exist.');
            }
        } else {
            $this->command->info('Program, Report or Analyst does not exist.');
        }

        $researcher = User::where([
            'name' => 'bugshield-researcher',
            'email' => 'researcher@bugshield.com',
        ])->first();

        if ($program && $report && $researcher) {
            if (Comment::where(['user_id' => $researcher->id])->count() == 0) {
                Comment::create([
                    'program_id' => $program->id,
                    'report_id' => $report->id,
                    'user_id' => $researcher->id,
                    'message' => 'Thank you for the bounty.',
                ]);
                $this->command->info('Researcher comment saved successfully.');
            } else {
                $this->command->info('Researcher Comment already exist.');
            }
        } else {
            $this->command->info('Program, Report or Researcher does not exist.');
        }
    }
}
