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
        $program = Program::where('title', 'Bugshield')->first();
        $report = Report::where('title', 'SQL Injection in Login Page')->first();

        if (! $program || ! $report) {
            $this->command->warn('Program or Report does not exist.');

            return;
        }

        $comments = [
            [
                'user' => [
                    'name' => 'bugshield-analyst',
                    'email' => 'analyst@bugshield.com',
                ],
                'message' => 'Thank you for your report, a bounty has been paid.',
                'role' => 'Analyst',
            ],
            [
                'user' => [
                    'name' => 'bugshield-researcher',
                    'email' => 'researcher@bugshield.com',
                ],
                'message' => 'Thank you for the bounty.',
                'role' => 'Researcher',
            ],
        ];

        foreach ($comments as $data) {
            $user = User::where($data['user'])->first();

            if (! $user) {
                $this->command->warn("{$data['role']} user does not exist.");

                continue;
            }

            $exists = Comment::where([
                'user_id' => $user->id,
                'program_id' => $program->id,
                'report_id' => $report->id,
            ])->exists();

            if ($exists) {
                $this->command->info("{$data['role']} comment already exists.");

                continue;
            }

            Comment::create([
                'program_id' => $program->id,
                'report_id' => $report->id,
                'user_id' => $user->id,
                'message' => $data['message'],
            ]);

            $this->command->info("{$data['role']} comment saved successfully.");
        }
    }
}
