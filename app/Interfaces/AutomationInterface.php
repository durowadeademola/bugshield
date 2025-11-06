<?php

namespace App\Interfaces;

interface AutomationInterface
{
    public function run(AIProviderInterface $provider, $data): array;
}
