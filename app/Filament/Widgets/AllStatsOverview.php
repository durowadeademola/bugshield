<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

use App\Models\User;
use App\Models\Report;
use App\Models\Bounty;

class AllStatsOverview extends BaseWidget
{
    protected static bool $isLazy = false;
    
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->icon('heroicon-o-user-group')
                ->description('Total researchers & organizations')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),

            Stat::make('Total Reports', Report::count())
                ->icon('heroicon-o-document-text')
                ->description('Security issues submitted')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('primary'),

            Stat::make('Total Bounties', Bounty::count())
                ->icon('heroicon-o-currency-dollar')
                ->description('Active bounties on Bugshield')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('danger'),
        ];
    }
}
