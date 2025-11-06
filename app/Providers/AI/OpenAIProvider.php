<?php

namespace App\Providers;

use OpenAI;

class OpenAIProvider implements AIProviderInterface
{
    protected $client;

    public function __construct()
    {
        $this->client = OpenAI::client(config('services.openai.key'));
    }

    public function analyzeReport(string $text): array
    {
        $prompt = "Analyze this vulnerability report and provide severity, summary, and fix:\n\n{$text}";

        $response = $this->client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a cybersecurity AI assistant.'],
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        return ['result' => $response['choices'][0]['message']['content']];
    }

    public function summarize(string $text): string
    {
        $response = $this->client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'Summarize the text in a concise form.'],
                ['role' => 'user', 'content' => $text],
            ],
        ]);

        return $response['choices'][0]['message']['content'];
    }

    public function ask(string $prompt): string
    {
        $response = $this->client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);

        return $response['choices'][0]['message']['content'];
    }

    public function generateInsights(): array
    {
        return ['insights' => 'OpenAI: Sample security insight generated.'];
    }
}
