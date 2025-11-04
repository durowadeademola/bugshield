<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\AllStatsOverview;
use App\Filament\Widgets\BountyPaymentsChart;
use App\Filament\Widgets\RecentReports;
use App\Filament\Widgets\RecentTransactions;
use App\Filament\Widgets\ReportsChart;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected static ?string $navigationIcon = 'heroicon-o-home';

    public function getWidgets(): array
    {
        return [
            AllStatsOverview::class,
            RecentReports::class,
            RecentTransactions::class,
            ReportsChart::class,
            BountyPaymentsChart::class,
        ];
    }
}
