<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //for totp based 2FA
            $table->text('two_factor_secret')
                ->after('password')
                ->nullable();

            $table->text('two_factor_recovery_codes')
                ->after('two_factor_secret')
                ->nullable();

            $table->timestamp('two_factor_confirmed_at')
                ->after('two_factor_recovery_codes')
                ->nullable();

            $table->boolean('totp_two_factor_enabled')
                ->after('two_factor_confirmed_at')
                ->default(false);

            //for email based 2FA
            $table->text('two_factor_code')
                ->after('totp_two_factor_enabled')
                ->nullable();

            $table->dateTime('two_factor_expires_at')
                ->after('two_factor_code')
                ->nullable();

            //enable two factor
            $table->boolean('email_two_factor_enabled')
                ->after('two_factor_expires_at')
                ->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'two_factor_secret',
                'two_factor_recovery_codes',
                'two_factor_confirmed_at',
                'two_factor_code',
                'two_factor_expires_at',
                'email_two_factor_enabled'
            ]);
        });
    }
};
