<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReportResource\Pages;
use App\Models\Report;
use App\Models\Researcher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ReportResource extends Resource
{
    protected static ?string $model = Report::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('researcher_id')
                    ->label('Researcher')
                    ->options(Researcher::where('is_active', true)->pluck('full_name', 'id'))
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('program_id')
                    ->relationship('program', 'title')
                    ->required(),

                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Textarea::make('description')
                    ->nullable()
                    ->rows(3),

                Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'triaged' => 'Triaged',
                        'resolved' => 'Resolved',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),

                Forms\Components\Toggle::make('is_low')
                    ->label('Low Severity')
                    ->default(false),

                Forms\Components\Toggle::make('is_medium')
                    ->label('Medium Severity')
                    ->default(false),

                Forms\Components\Toggle::make('is_high')
                    ->label('High Severity')
                    ->default(false),

                Forms\Components\Toggle::make('is_critical')
                    ->label('Critical Severity')
                    ->default(false),

                Forms\Components\Toggle::make('is_informational')
                    ->label('Informational')
                    ->default(false),

                Forms\Components\Textarea::make('asset')
                    ->nullable()
                    ->rows(3)
                    ->required(),

                Forms\Components\Textarea::make('weakness')
                    ->nullable()
                    ->rows(3)
                    ->required(),

                Forms\Components\TextInput::make('severity')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\FileUpload::make('attch_name')
                    ->image()
                    ->disk('public')
                    ->directory('report_attachments')
                    ->nullable(),

                Forms\Components\Textarea::make('impact')
                    ->nullable()
                    ->rows(3)
                    ->required(),
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
                Tables\Columns\TextColumn::make('title')->limit(50),
                Tables\Columns\TextColumn::make('description')->limit(100),
                Tables\Columns\BooleanColumn::make('is_low')->label('Low Severity'),
                Tables\Columns\BooleanColumn::make('is_medium')->label('Medium Severity'),
                Tables\Columns\BooleanColumn::make('is_high')->label('High Severity'),
                Tables\Columns\BooleanColumn::make('is_critical')->label('Critical Severity'),
                Tables\Columns\BooleanColumn::make('is_informational')->label('Informational'),
                Tables\Columns\TextColumn::make('severity')->limit(50),
                Tables\Columns\TextColumn::make('attch_name')->limit(50),
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
            'index' => Pages\ListReports::route('/'),
            'create' => Pages\CreateReport::route('/create'),
            'edit' => Pages\EditReport::route('/{record}/edit'),
        ];
    }
}
