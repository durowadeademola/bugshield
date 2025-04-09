<?php
namespace App\Filament\Widgets;

use Filament\Widgets\TableWidget as Widget;
use Filament\Tables;
use App\Models\Report;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;

class RecentReports extends Widget
{
    protected static ?string $heading = 'Recent Reports';

    //protected int $recordsPerPage = 10;

    protected function getTableQuery(): Builder|Relation|null
    {
        return Report::query()->latest()->limit(10);
    }

    protected function isTablePaginationEnabled(): bool
    {
        return false; 
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('title')
                ->label('Title'),

            Tables\Columns\TextColumn::make('researcher.full_name')
                ->label('Researcher')
                ->getStateUsing(function ($record) {
                    return $record->researcher->getFullNameAttribute() ?? '';
                }),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Submitted On')
                ->dateTime(),
        ];
    }
}
