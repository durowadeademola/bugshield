<?php

namespace App\Managers;

use App\Interfaces\AIProviderInterface;
use App\Interfaces\AutomationInterface;

class AutomationManager implements AutomationInterface
{
    public function get_report_triage(AIProviderInterface $provider, $report): array
    {
        $prompt = "You are an AI triage analyst. Analyze this vulnerability report and determine:
        - Is it valid or invalid?
        - A short reason why.

        Report:
        {$report->description}";

        $response = $provider->ask($prompt);

        return [
            'type' => 'triage_result',
            'output' => $response,
        ];
    }

    public function get_severity_prediction(AIProviderInterface $provider, $report): array
    {
        $prompt = "Rate the severity (Low, Medium, High, Critical) of this vulnerability:\n\n{$report->description}";

        $response = $provider->ask($prompt);

        return [
            'type' => 'severity_prediction',
            'output' => $response,
        ];
    }

    public function get_duplicate_detection(AIProviderInterface $provider, $report): array
    {
        $existingReports = Report::latest()->take(10)->pluck('description')->toArray();
        $joined = implode("\n\n---\n\n", $existingReports);

        $prompt = "Compare this new report with the existing ones below and say if it's possibly a duplicate (Yes/No):\n
        NEW REPORT:
        {$report->description}

        EXISTING REPORTS:
        {$joined}";

        $response = $provider->ask($prompt);

        return [
            'type' => 'duplicate_check',
            'output' => $response,
        ];
    }

    public function get_auto_comment(AIProviderInterface $provider, $report): array
    {
        $prompt = "Generate a professional triage comment for this vulnerability report that acknowledges receipt and gives a next step:\n\n{$report->description}";

        $response = $provider->ask($prompt);

        return [
            'type' => 'auto_comment',
            'output' => $response,
        ];
    }
}
