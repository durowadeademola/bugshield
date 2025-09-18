<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Filament\Widgets\TableWidget;
use Filament\Tables;
use App\Models\Transaction;

use Illuminate\Database\Eloquent\Builder;

class RecentTransactions extends TableWidget
{
    //protected static string $view = 'filament.widgets.recent-transactions';

    protected static ?string $heading = 'Recent Transactions';

    protected static bool $isLazy = false;

    //protected int $recordsPerPage = 5;

    protected function getTableQuery(): Builder
    {
        return Transaction::query()->latest()->limit(10);
    }

    protected function isTablePaginationEnabled(): bool
    {
        return false; 
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('researcher.full_name')
                ->label('Researcher')
                ->getStateUsing(fn ($record) => $record->researcher->full_name ?? ''),

            Tables\Columns\TextColumn::make('amount')
                ->label('Amount')
                ->money('NGN'),

            Tables\Columns\TextColumn::make('status')
                ->label('Status')
                ->badge()
                ->color(fn ($record) => $record->status === 'paid' ? 'success' : 'danger'),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Date')
                ->dateTime(),
        ];
    }
}
