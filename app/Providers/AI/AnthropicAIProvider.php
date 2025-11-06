<?php

namespace App\Providers;

use Anthropic;

class AnthropicProvider implements AIProviderInterface
{
    protected $client;

    public function __construct()
    {
        $this->client = Anthropic::client(config('services.anthropic.key'));
    }

    public function analyzeReport(string $text): array
    {
        // Example structure (pseudo)
        $response = $this->client->messages()->create([
            'model' => 'claude-3-haiku',
            'messages' => [['role' => 'user', 'content' => $text]],
        ]);

        return ['result' => $response['content'][0]['text']];
    }

    public function summarize(string $text): string
    {
        return 'Anthropic summary placeholder.';
    }

    public function ask(string $prompt): string
    {
        return 'Anthropic answer placeholder.';
    }

    public function generateInsights(): array
    {
        return ['insights' => 'Anthropic AI insights placeholder.'];
    }
}
