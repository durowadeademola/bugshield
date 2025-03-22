<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResearcherResource\Pages;
use App\Filament\Resources\ResearcherResource\RelationManagers;
use App\Models\Researcher;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ResearcherResource extends Resource
{
    protected static ?string $model = Researcher::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('first_name'),
                Tables\Columns\TextColumn::make('last_name'),
                Tables\Columns\TextColumn::make('email'),
                Tables\Columns\TextColumn::make('address'),
                Tables\Columns\TextColumn::make('phone_number'),
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
            'index' => Pages\ListResearchers::route('/'),
            'create' => Pages\CreateResearcher::route('/create'),
            'edit' => Pages\EditResearcher::route('/{record}/edit'),
        ];
    }
}
