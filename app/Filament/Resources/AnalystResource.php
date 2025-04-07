<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AnalystResource\Pages;
use App\Filament\Resources\AnalystResource\RelationManagers;
use App\Models\Analyst;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AnalystResource extends Resource
{
    protected static ?string $model = Analyst::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required(),

                Forms\Components\TextInput::make('first_name')
                    ->required()
                    ->maxLength(50),

                Forms\Components\TextInput::make('middle_name')
                    ->maxLength(50),

                Forms\Components\TextInput::make('last_name')
                    ->required()
                    ->maxLength(50),

                Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('designation')
                    ->maxLength(100),

                Forms\Components\Textarea::make('address')
                    ->rows(2)
                    ->maxLength(255),

                Forms\Components\TextInput::make('phone_number')
                    ->tel()
                    ->maxLength(20),

                Forms\Components\FileUpload::make('image_path')
                    ->label('Profile Image')
                    ->image()
                    ->directory('admin-images'),

                Forms\Components\TextInput::make('image_name')
                    ->maxLength(100),

                Forms\Components\Toggle::make('is_active')
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
            'index' => Pages\ListAnalysts::route('/'),
            'create' => Pages\CreateAnalyst::route('/create'),
            'edit' => Pages\EditAnalyst::route('/{record}/edit'),
        ];
    }
}
