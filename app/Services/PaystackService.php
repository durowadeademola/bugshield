<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaystackService
{
    private PendingRequest $client;
    private string $baseUrl = 'https://api.paystack.co';

    public function __construct()
    {
        $this->client = Http::withToken(config('services.paystack.secret_key'))
            ->baseUrl($this->baseUrl)
            ->acceptJson();
    }

    public function createTransferRecipient(string $name, string $accountNumber, string $bankCode, string $currency = 'NGN'): array
    {
        $response = $this->client->post('/transferrecipient', [
            'type'           => 'nuban',
            'name'           => $name,
            'account_number' => $accountNumber,
            'bank_code'      => $bankCode,
            'currency'       => $currency,
        ]);

        if (!$response->successful()) {
            Log::error('Paystack create recipient failed', ['response' => $response->json()]);
            throw new \RuntimeException('Failed to create Paystack transfer recipient: ' . ($response->json()['message'] ?? 'Unknown error'));
        }

        return $response->json('data');
    }

    public function initiateTransfer(int $amountKobo, string $recipientCode, string $reason, string $reference): array
    {
        $response = $this->client->post('/transfer', [
            'source'    => 'balance',
            'amount'    => $amountKobo,
            'recipient' => $recipientCode,
            'reason'    => $reason,
            'reference' => $reference,
            'currency'  => 'NGN',
        ]);

        if (!$response->successful()) {
            Log::error('Paystack transfer failed', ['response' => $response->json()]);
            throw new \RuntimeException('Failed to initiate Paystack transfer: ' . ($response->json()['message'] ?? 'Unknown error'));
        }

        return $response->json('data');
    }

    public function verifyTransfer(string $reference): array
    {
        $response = $this->client->get("/transfer/verify/{$reference}");

        if (!$response->successful()) {
            throw new \RuntimeException('Failed to verify transfer: ' . ($response->json()['message'] ?? 'Unknown error'));
        }

        return $response->json('data');
    }

    public function listBanks(string $country = 'nigeria'): array
    {
        $response = $this->client->get('/bank', ['country' => $country, 'per_page' => 100]);

        if (!$response->successful()) {
            return [];
        }

        return $response->json('data') ?? [];
    }

    public function verifyAccountNumber(string $accountNumber, string $bankCode): array
    {
        $response = $this->client->get('/bank/resolve', [
            'account_number' => $accountNumber,
            'bank_code'      => $bankCode,
        ]);

        if (!$response->successful()) {
            throw new \RuntimeException('Account verification failed: ' . ($response->json()['message'] ?? 'Unknown error'));
        }

        return $response->json('data');
    }
}
