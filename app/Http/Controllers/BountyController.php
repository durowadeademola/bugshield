<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Bounty;
use App\Models\Report;
use App\Models\Transaction;
use App\Notifications\BountyAwarded;
use App\Services\PaystackService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class BountyController extends Controller
{
    public function store(Request $request, string $reportId)
    {
        $report = Report::with(['program.organization', 'researcher.user'])->findOrFail($reportId);

        $org = Auth::user()->organization;
        if (!$org || $report->program->organization_id !== $org->id) {
            abort(403);
        }

        if ($report->bounty) {
            return back()->withErrors(['error' => 'A bounty has already been awarded for this report.']);
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'notes'  => 'nullable|string|max:1000',
        ]);

        $bounty = Bounty::create([
            'organization_id'  => $org->id,
            'researcher_id'    => $report->researcher_id,
            'report_id'        => $report->id,
            'program_id'       => $report->program_id,
            'amount'           => $validated['amount'],
            'currency'         => $report->program->currency ?? 'NGN',
            'status'           => 'pending',
            'is_critical'      => $report->is_critical,
            'is_high'          => $report->is_high,
            'is_medium'        => $report->is_medium,
            'is_low'           => $report->is_low,
            'is_informational' => $report->is_informational,
        ]);

        Transaction::create([
            'bounty_id'       => $bounty->id,
            'organization_id' => $org->id,
            'researcher_id'   => $report->researcher_id,
            'program_id'      => $report->program_id,
            'amount'          => $validated['amount'],
            'status'          => 'pending',
        ]);

        // Update researcher stats and reputation
        if ($report->researcher) {
            $report->researcher->increment('total_earnings', $validated['amount']);
            $pointsMap = ['critical' => 200, 'high' => 100, 'medium' => 50, 'low' => 20, 'informational' => 10];
            $points = $pointsMap[$report->severity] ?? 10;
            $report->researcher->increment('reputation_points', $points);

            // Send notification to researcher
            if ($report->researcher->user) {
                try {
                    $report->researcher->user->notify(new BountyAwarded($bounty));
                } catch (\Throwable $e) {
                    Log::warning('Failed to send BountyAwarded notification', ['error' => $e->getMessage()]);
                }
            }
        }

        // Update program total bounties paid
        $report->program->increment('total_bounties_paid', $validated['amount']);

        // Attempt Paystack transfer if researcher has bank account
        $this->attemptPaystackTransfer($bounty, $report, $validated['amount']);

        // Resolve report
        if ($report->status !== 'resolved') {
            $report->update(['status' => 'resolved', 'resolved_at' => now()]);
        }

        return back()->with('success', "Bounty of ₦" . number_format($validated['amount'], 2) . " awarded successfully.");
    }

    private function attemptPaystackTransfer(Bounty $bounty, Report $report, float $amount): void
    {
        if (!config('services.paystack.secret_key')) {
            return;
        }

        $researcher = $report->researcher;
        if (!$researcher) return;

        // Look up bank account via researcher's user_id
        $account = Account::where('user_id', $researcher->user_id)->latest()->first();

        if (!$account || !$account->account_number || !$account->bank_code) {
            return;
        }

        try {
            $paystack  = new PaystackService();
            $reference = 'blk_' . Str::uuid()->toString();

            $recipient = $paystack->createTransferRecipient(
                $researcher->full_name,
                $account->account_number,
                $account->bank_code,
            );

            $transfer = $paystack->initiateTransfer(
                (int) ($amount * 100),
                $recipient['recipient_code'],
                "Bluestrike bounty for: {$report->title}",
                $reference,
            );

            $bounty->update([
                'status'            => 'paid',
                'paystack_ref'      => $reference,
                'paystack_transfer' => $transfer['transfer_code'] ?? null,
            ]);
        } catch (\Throwable $e) {
            Log::warning('Paystack transfer skipped', ['error' => $e->getMessage(), 'bounty' => $bounty->id]);
        }
    }
}
