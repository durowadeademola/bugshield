<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrganizationResource\Pages;
use App\Models\Organization;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class OrganizationResource extends Resource
{
    protected static ?string $model = Organization::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('email')
                    ->required()
                    ->email()
                    ->maxLength(255),

                Forms\Components\TextInput::make('website')
                    ->url()
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\TextInput::make('address')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('phone_number')
                    ->required()
                    ->maxLength(15),

                Forms\Components\Textarea::make('description')
                    ->nullable()
                    ->rows(3),

                Forms\Components\TextInput::make('country')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('state')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\FileUpload::make('logo_path')
                    ->image()
                    ->disk('public')
                    ->directory('logos')
                    ->nullable(),

                Forms\Components\TextInput::make('logo_name')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\Toggle::make('is_active')
                    ->required()
                    ->label('Is Active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label('User'),
                Tables\Columns\TextColumn::make('name')->limit(50),
                Tables\Columns\TextColumn::make('email')->limit(50),
                Tables\Columns\TextColumn::make('website')->limit(50),
                Tables\Columns\TextColumn::make('address')->limit(50),
                Tables\Columns\TextColumn::make('phone_number')->limit(50),
                Tables\Columns\TextColumn::make('country')->limit(50),
                Tables\Columns\TextColumn::make('state')->limit(50),
                Tables\Columns\BooleanColumn::make('is_active')->label('Active'),
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
            ])
            ->modifyQueryUsing(function (Builder $query) {
                $query->where('is_active', true);
            });
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
            'index' => Pages\ListOrganizations::route('/'),
            'create' => Pages\CreateOrganization::route('/create'),
            'edit' => Pages\EditOrganization::route('/{record}/edit'),
        ];
    }
}
