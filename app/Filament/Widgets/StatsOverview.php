<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

use App\Models\User;
use App\Models\Report;
use App\Models\Bounty;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->icon('heroicon-o-user-group')
                ->description('Total researchers & organizations'),

            Stat::make('Total Reports', Report::count())
                ->icon('heroicon-o-document-text')
                ->description('Security issues submitted'),

            Stat::make('Total Bounties', Bounty::count())
                ->icon('heroicon-o-currency-dollar')
                ->description('Active bounties on Bugshield'),
        ];
    }
}
