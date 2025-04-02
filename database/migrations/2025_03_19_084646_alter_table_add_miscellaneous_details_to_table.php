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
        //Reports table
        Schema::table('reports', function (Blueprint $table) {
            $table->renameColumn('user_id', 'researcher_id');

            $table->foreignUUid('program_id')->after('researcher_id')->constrained('programs');
            $table->string('asset')->after('description');
            $table->string('weakness')->after('asset');
            $table->string('severity')->nullable()->after('weakness');
            $table->string('attch_name')->nullable()->after('severity');
            $table->text('impact')->after('attch_name');
        });

        //Bounties table
        Schema::table('bounties', function(Blueprint $table) {
            $table->foreignUuid('program_id')->after('researcher_id')->constrained('programs');
        });

        //Comments table
        Schema::table('comments', function(Blueprint $table) {
            $table->foreignUuid('program_id')->after('user_id')->constrained('programs');
        });

        //Transactions table
        Schema::table('transactions', function(Blueprint $table) {
            $table->foreignUuid('program_id')->after('researcher_id')->constrained('programs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('table', function (Blueprint $table) {
            //
        });
    }
};
