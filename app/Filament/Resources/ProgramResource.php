<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgramResource\Pages;
use App\Filament\Resources\ProgramResource\RelationManagers;
use App\Models\Program;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProgramResource extends Resource
{
    protected static ?string $model = Program::class;

    protected static ?string $navigationIcon = 'heroicon-o-square-3-stack-3d';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('organization_id')
                    ->relationship('organization', 'name')
                    ->required(),

                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Textarea::make('description')
                    ->nullable()
                    ->rows(3),

                Forms\Components\Toggle::make('is_public')
                    ->label('Is Public')
                    ->default(false),

                Forms\Components\Toggle::make('is_private')
                    ->label('Is Private')
                    ->default(false),

                Forms\Components\Toggle::make('is_active')
                    ->label('Is Active')
                    ->default(true),

                Forms\Components\Toggle::make('is_vdp')
                    ->label('Is VDP')
                    ->default(false),

                Forms\Components\Toggle::make('is_managed')
                    ->label('Is Managed')
                    ->default(false),

                Forms\Components\TextInput::make('critical_bounty_range')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\TextInput::make('high_bounty_range')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\TextInput::make('medium_bounty_range')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\TextInput::make('low_bounty_range')
                    ->nullable()
                    ->maxLength(255),

                Forms\Components\Textarea::make('asset')
                    ->nullable()
                    ->rows(3),

                Forms\Components\Textarea::make('in_scope')
                    ->nullable()
                    ->rows(3),

                Forms\Components\Textarea::make('out_of_scope')
                    ->nullable()
                    ->rows(3),

                Forms\Components\FileUpload::make('logo_path')
                    ->image()
                    ->disk('public')
                    ->directory('program_logos')
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
                Tables\Columns\TextColumn::make('organization.name')->label('Organization'),
                Tables\Columns\TextColumn::make('title')->limit(50),
                Tables\Columns\TextColumn::make('description')->limit(100),
                Tables\Columns\BooleanColumn::make('is_public')->label('Public'),
                Tables\Columns\BooleanColumn::make('is_private')->label('Private'),
                Tables\Columns\BooleanColumn::make('is_active')->label('Active'),
                Tables\Columns\BooleanColumn::make('is_vdp')->label('VDP'),
                Tables\Columns\BooleanColumn::make('is_managed')->label('Managed'),
                Tables\Columns\TextColumn::make('critical_bounty_range')->limit(50),
                Tables\Columns\TextColumn::make('high_bounty_range')->limit(50),
                Tables\Columns\TextColumn::make('medium_bounty_range')->limit(50),
                Tables\Columns\TextColumn::make('low_bounty_range')->limit(50),
                Tables\Columns\TextColumn::make('logo_name')->limit(50),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListPrograms::route('/'),
            'create' => Pages\CreateProgram::route('/create'),
            'edit' => Pages\EditProgram::route('/{record}/edit'),
        ];
    }
}
