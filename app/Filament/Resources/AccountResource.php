<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccountResource\Pages;
use App\Filament\Resources\AccountResource\RelationManagers;
use App\Models\Account;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AccountResource extends Resource
{
    protected static ?string $model = Account::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable(),

                Forms\Components\TextInput::make('account_number')
                    ->required()
                    ->maxLength(20),

                Forms\Components\TextInput::make('account_name')
                    ->required()
                    ->maxLength(100),

                Forms\Components\TextInput::make('bank_name')
                    ->required()
                    ->maxLength(100),

                Forms\Components\TextInput::make('bank_code')
                    ->required()
                    ->maxLength(10),

                Forms\Components\Select::make('account_type')
                    ->options([
                        'savings' => 'Savings',
                        'current' => 'Current',
                        'corporate' => 'Corporate',
                    ])->required(),

                Forms\Components\TextInput::make('currency')
                    ->default('NGN')
                    ->maxLength(10),

                Forms\Components\TextInput::make('balance')
                    ->numeric()
                    ->default(0),

                Forms\Components\Select::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                        'suspended' => 'Suspended',
                    ])->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('user.name')->label('User'),
            Tables\Columns\TextColumn::make('account_number'),
            Tables\Columns\TextColumn::make('account_name'),
            Tables\Columns\TextColumn::make('bank_name'),
            Tables\Columns\TextColumn::make('account_type'),
            Tables\Columns\TextColumn::make('currency'),
            Tables\Columns\TextColumn::make('balance')->money('NGN'),
            Tables\Columns\BadgeColumn::make('status')->colors([
                'success' => 'active',
                'danger' => 'inactive',
                'warning' => 'suspended',
            ]),
        ])->filters([
            //
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
            'index' => Pages\ListAccounts::route('/'),
            'create' => Pages\CreateAccount::route('/create'),
            'edit' => Pages\EditAccount::route('/{record}/edit'),
        ];
    }
}
