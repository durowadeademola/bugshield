<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Transaction;
use Carbon\Carbon;

class BountyPaymentsChart extends ChartWidget
{
    protected static ?string $heading = 'Bounty Payments Overview';

    protected function getData(): array
    {
        $payments = Transaction::where('status', 'paid')
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $months = [];
        $totals = [];

        foreach ($payments as $payment) {
            $months[] = Carbon::create()->month($payment->month)->format('F');
            $totals[] = $payment->total;
        }

        return [
            'labels' => $months,
            'datasets' => [
                [
                    'label' => 'Total Paid (NGN)',
                    'data' => $totals,
                    'borderColor' => '#10B981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                    'borderWidth' => 2,
                    'fill' => true,
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}
