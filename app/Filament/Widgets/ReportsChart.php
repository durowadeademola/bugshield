<?php

namespace App\Filament\Widgets;

use App\Models\Report;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class ReportsChart extends ChartWidget
{
    protected static ?string $heading = 'Monthly Reports';

    protected static bool $isLazy = false;

    protected function getData(): array
    {
        $reports = Report::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $months = [];
        $counts = [];

        foreach ($reports as $report) {
            $months[] = Carbon::create()->month($report->month)->format('F');
            $counts[] = $report->count;
        }

        return [
            'labels' => $months,
            'datasets' => [
                [
                    'label' => 'Reports',
                    'data' => $counts,
                    'backgroundColor' => '#4F46E5',
                ],
            ],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
