<?php

namespace Database\Seeders;

use App\Models\Attachment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Report;
use Illuminate\Database\Seeder;

class AttachmentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $reportTitle = 'SQL Injection in Login Page';

        // Find report by title
        $report = Report::where('title', $reportTitle)->first();

        if (! $report) {
            $this->command->warn("Report titled '{$reportTitle}' does not exist.");

            return;
        }

        // Check if attachment already exists
        $exists = Attachment::where('report_id', $report->id)->exists();

        if ($exists) {
            $this->command->info('Attachment already exists for this report.');

            return;
        }

        // Create attachment record
        Attachment::create([
            'report_id' => $report->id,
            'file_path' => storage_path('app/public/reports/attachment.jpg'),
        ]);

        $this->command->info('Attachment created successfully.');
    }
}
