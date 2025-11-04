<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TransactionResource\Pages;
use App\Models\Researcher;
use App\Models\Transaction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('program_id')
                    ->relationship('program', 'title')
                    ->required(),

                Forms\Components\Select::make('bounty_id')
                    ->relationship('bounty', 'id')
                    ->required(),

                Forms\Components\Select::make('researcher_id')
                    ->label('Researcher')
                    ->options(Researcher::where('is_active', true)->pluck('full_name', 'id'))
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('organization_id')
                    ->relationship('organization', 'name')
                    ->required(),

                Forms\Components\TextInput::make('amount')
                    ->numeric()
                    ->required()
                    ->minValue(0),

                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                    ])
                    ->required(),

                Forms\Components\Select::make('payment_method')
                    ->options([
                        'bank_transfer' => 'Bank Transfer',
                        'paypal' => 'PayPal',
                        'credit_card' => 'Credit Card',
                        'other' => 'Other',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('transaction_reference')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('researcher.full_name')
                    ->label('Researcher')
                    ->getStateUsing(fn ($record) => $record->researcher->full_name ?? '')
                    ->searchable(),
                Tables\Columns\TextColumn::make('program.title')->label('Program'),
                Tables\Columns\TextColumn::make('organization.name')->label('Organization'),
                Tables\Columns\TextColumn::make('amount')->money('NGN')->sortable(),
                Tables\Columns\TextColumn::make('status')->sortable(),
                Tables\Columns\TextColumn::make('payment_method')->sortable(),
                Tables\Columns\TextColumn::make('transaction_reference')->limit(50),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTransactions::route('/'),
            'create' => Pages\CreateTransaction::route('/create'),
            'edit' => Pages\EditTransaction::route('/{record}/edit'),
        ];
    }
}
