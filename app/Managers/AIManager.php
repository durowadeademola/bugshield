<?php

namespace App\Managers;

use App\Interfaces\AIProviderInterface;
use App\Providers\AI\AnthropicProvider;
use App\Providers\AI\LocalLLMProvider;
use App\Providers\AI\OpenAIProvider;
use Illuminate\Support\Facades\Log;

class AIManager
{
    protected $providers = [];

    protected $defaultProvider;

    public function __construct()
    {

        $this->providers = [
            'openai' => new OpenAIProvider,
            // 'anthropic' => new AnthropicProvider(),
            // 'local' => new LocalLLMProvider(),
        ];

        $this->defaultProvider = config('ai.default', 'openai');
    }

    /**
     * Get the provider instance by name.
     */
    protected function get_provider(?string $name = null): AIProviderInterface
    {
        $name = $name ?? $this->defaultProvider;

        if (! isset($this->providers[$name])) {
            throw new \Exception("AI provider [{$name}] is not registered.");
        }

        return $this->providers[$name];
    }

    /**
     * Analyze a bug report using any AI backend.
     */
    public function analyzeReport(string $reportText, ?string $provider = null): array
    {
        try {
            $ai = $this->get_provider($provider);

            return $ai->analyzeReport($reportText);
        } catch (\Exception $e) {
            Log::error("AI Analysis Failed: {$e->getMessage()}");

            return ['error' => 'AI analysis failed'];
        }
    }

    /**
     * Generate a vulnerability summary.
     */
    public function summarize(string $text, ?string $provider = null): string
    {
        return $this->get_provider($provider)->summarize($text);
    }

    /**
     * Ask general AI question.
     */
    public function ask(string $prompt, ?string $provider = null): string
    {
        return $this->get_provider($provider)->ask($prompt);
    }

    /**
     * Generate insights for dashboard.
     */
    public function generateInsights(?string $provider = null): array
    {
        return $this->get_provider($provider)->generateInsights();
    }
}
