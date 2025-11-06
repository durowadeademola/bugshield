<?php

namespace App\Interfaces;

interface AIProviderInterface
{
    public function analyzeReport(string $text): array;

    public function summarize(string $text): string;

    public function ask(string $prompt): string;

    public function generateInsights(): array;
}
