<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Filament\Tables;
use App\Models\Report;

class RecentReports extends Widget
{
    protected static string $view = 'filament.widgets.recent-reports';

    protected static bool $isLazy = false;

    protected static ?string $heading = 'Recent Reports';

    protected int $recordsPerPage = 5;

    protected function getTableQuery()
    {
        return Report::latest();
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('title')
                ->label('Report Title')
                ->searchable(),

            Tables\Columns\TextColumn::make('user.name')
                ->label('Researcher')
                ->searchable(),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Submitted On')
                ->dateTime(),
        ];
    }
}
