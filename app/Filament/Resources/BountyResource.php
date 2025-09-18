<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BountyResource\Pages;
use App\Filament\Resources\BountyResource\RelationManagers;
use App\Models\Bounty;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use App\Models\Researcher;

class BountyResource extends Resource
{
    protected static ?string $model = Bounty::class;

    protected static ?string $navigationIcon = 'heroicon-o-currency-dollar';

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
                ->relationship('program', 'name')
                ->label('Program')
                ->required()
                ->searchable(),

            Forms\Components\Select::make('report_id')
                ->relationship('report', 'title') 
                ->label('Report')
                ->required()
                ->searchable(),

            Forms\Components\Select::make('organization_id')
                ->relationship('organization', 'name')
                ->label('Organization')
                ->required()
                ->searchable(),

            Forms\Components\TextInput::make('amount')
                ->numeric()
                ->label('Bounty Amount')
                ->required()
                ->prefix('₦'),

            Forms\Components\Select::make('status')
                ->label('Status')
                ->options([
                    'pending' => 'Pending',
                    'approved' => 'Approved',
                    'rejected' => 'Rejected',
                    'paid' => 'Paid',
                ])
                ->required()
                ->native(false),

            Forms\Components\Toggle::make('is_low')
                ->label('Low Severity'),

            Forms\Components\Toggle::make('is_medium')
                ->label('Medium Severity'),

            Forms\Components\Toggle::make('is_high')
                ->label('High Severity'),

            Forms\Components\Toggle::make('is_critical')
                ->label('Critical Severity'),

            Forms\Components\Toggle::make('is_informational')
                ->label('Informational'),
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

            Tables\Columns\TextColumn::make('program.title')
                ->label('Program')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('report.title')
                ->label('Report')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('organization.name')
                ->label('Organization')
                ->searchable()
                ->sortable(),

            Tables\Columns\TextColumn::make('amount')
                ->money('NGN')
                ->label('Amount')
                ->sortable(),

            Tables\Columns\BadgeColumn::make('status')
                ->label('Status')
                ->colors([
                    'secondary' => 'pending',
                    'success' => 'approved',
                    'danger' => 'rejected',
                    'primary' => 'paid',
                ])
                ->sortable(),

            Tables\Columns\IconColumn::make('is_low')
                ->boolean()
                ->label('Low'),

            Tables\Columns\IconColumn::make('is_medium')
                ->boolean()
                ->label('Medium'),

            Tables\Columns\IconColumn::make('is_high')
                ->boolean()
                ->label('High'),

            Tables\Columns\IconColumn::make('is_critical')
                ->boolean()
                ->label('Critical'),

            Tables\Columns\IconColumn::make('is_informational')
                ->boolean()
                ->label('Informational'),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Created')
                ->dateTime()
                ->sortable(),
        ])->defaultSort('created_at', 'desc')

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
            'index' => Pages\ListBounties::route('/'),
            'create' => Pages\CreateBounty::route('/create'),
            'edit' => Pages\EditBounty::route('/{record}/edit'),
        ];
    }
}
