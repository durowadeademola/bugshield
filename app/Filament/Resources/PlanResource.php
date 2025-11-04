<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlanResource\Pages;
use App\Models\Plan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PlanResource extends Resource
{
    protected static ?string $model = Plan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Textarea::make('description')
                    ->nullable()
                    ->rows(3),

                Forms\Components\TextInput::make('amount')
                    ->required()
                    ->numeric()
                    ->maxLength(15),

                Forms\Components\TextInput::make('max_reports')
                    ->required()
                    ->numeric(),

                Forms\Components\Toggle::make('is_free')
                    ->label('Is Free')
                    ->default(false),

                Forms\Components\Toggle::make('is_basic')
                    ->label('Is Basic')
                    ->default(false),

                Forms\Components\Toggle::make('is_pro')
                    ->label('Is Pro')
                    ->default(false),

                Forms\Components\Toggle::make('is_enterprise')
                    ->label('Is Enterprise')
                    ->default(false),

                Forms\Components\Toggle::make('is_life_time')
                    ->label('Is Life Time')
                    ->default(false),

                Forms\Components\Toggle::make('is_daily')
                    ->label('Is Daily')
                    ->default(false),

                Forms\Components\Toggle::make('is_weekly')
                    ->label('Is Weekly')
                    ->default(false),

                Forms\Components\Toggle::make('is_monthly')
                    ->label('Is Monthly')
                    ->default(false),

                Forms\Components\Toggle::make('is_yearly')
                    ->label('Is Yearly')
                    ->default(false),

                Forms\Components\TextInput::make('custom_period')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\FileUpload::make('logo_path')
                    ->image()
                    ->disk('public')
                    ->directory('plan_logos')
                    ->nullable(),

                Forms\Components\TextInput::make('logo_name')
                    ->nullable()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->limit(50),
                Tables\Columns\TextColumn::make('description')->limit(100),
                Tables\Columns\TextColumn::make('amount')->limit(50),
                Tables\Columns\TextColumn::make('max_reports')->limit(50),
                Tables\Columns\BooleanColumn::make('is_free')->label('Free'),
                Tables\Columns\BooleanColumn::make('is_basic')->label('Basic'),
                Tables\Columns\BooleanColumn::make('is_pro')->label('Pro'),
                Tables\Columns\BooleanColumn::make('is_enterprise')->label('Enterprise'),
                Tables\Columns\BooleanColumn::make('is_life_time')->label('Life Time'),
                Tables\Columns\BooleanColumn::make('is_daily')->label('Daily'),
                Tables\Columns\BooleanColumn::make('is_weekly')->label('Weekly'),
                Tables\Columns\BooleanColumn::make('is_monthly')->label('Monthly'),
                Tables\Columns\BooleanColumn::make('is_yearly')->label('Yearly'),
                Tables\Columns\TextColumn::make('custom_period')->limit(50),
                Tables\Columns\TextColumn::make('logo_name')->limit(50),
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
            'index' => Pages\ListPlans::route('/'),
            'create' => Pages\CreatePlan::route('/create'),
            'edit' => Pages\EditPlan::route('/{record}/edit'),
        ];
    }
}
