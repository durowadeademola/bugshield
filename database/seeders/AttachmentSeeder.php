<?php

namespace Database\Seeders;

use App\Models\Report;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Attachment;

class AttachmentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $report = Report::where(['title' => 'SQL Injection in Login Page'])->first();

        if ($report) {
            if (Attachment::where(['report_id' => $report->id])->count() == 0) {
                Attachment::create([
                    'report_id' => $report->id,
                    'file_path' => storage_path('app/public/reports/attachment.jpg')
                ]);
            }
            $this->command->info('Attachment created successfully.');
        } else {
            $this->command->info('Report does not exist.');
        }
    }
}
