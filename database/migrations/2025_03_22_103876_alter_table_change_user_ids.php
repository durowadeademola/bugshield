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
        //reports table
        Schema::table('reports', function (Blueprint $table) {
            if(Schema::hasColumn('reports', 'user_id')) {
                $table->dropForeign(['user_id']); 
                $table->dropColumn('user_id'); 
            }

            if (!Schema::hasColumn('reports', 'researcher_id')) {
                $table->foreignUuid('researcher_id')->after('id')->references('id')->on('researchers');
            }
        });

        //bounties table
        Schema::table('bounties', function (Blueprint $table) {
            if(Schema::hasColumn('bounties', 'researcher_id')) {
                $table->dropForeign(['researcher_id']); 
                $table->dropColumn('researcher_id'); 
            }

            if(!Schema::hasColumn('bounties', 'researcher_id')) {
                $table->foreignUuid('researcher_id')->after('report_id')->references('id')->on('researchers');
            }
        });

        //transactions table
        Schema::table('transactions', function (Blueprint $table) {
            if(Schema::hasColumn('transactions', 'researcher_id')) {
                $table->dropForeign(['researcher_id']); 
                $table->dropColumn('researcher_id'); 
            }

            if(!Schema::hasColumn('transactions', 'researcher_id')) {
                $table->foreignUuid('researcher_id')->after('bounty_id')->references('id')->on('researchers');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
