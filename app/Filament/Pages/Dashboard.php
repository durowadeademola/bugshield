<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use App\Filament\Widgets\AStatsOverview;
use App\Filament\Widgets\RecentReports;
use App\Filament\Widgets\RecentTransactions;
use App\Filament\Widgets\ReportsChart;
use App\Filament\Widgets\BountyPaymentsChart;

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
