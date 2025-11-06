<?php

namespace App\Managers\AIProviders;

class LocalLLMProvider implements AIProviderInterface
{
    public function analyzeReport(string $text): array
    {
        // You could call your local API endpoint here
        $response = file_get_contents('http://localhost:11434/api/analyze?text='.urlencode($text));

        return ['result' => json_decode($response, true)];
    }

    public function summarize(string $text): string
    {
        return 'Local LLM summary placeholder.';
    }

    public function ask(string $prompt): string
    {
        return 'Local LLM response placeholder.';
    }

    public function generateInsights(): array
    {
        return ['insights' => 'Local model generated insights.'];
    }
}
