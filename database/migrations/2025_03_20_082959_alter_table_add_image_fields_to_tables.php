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
        //admins table
        Schema::table('admins', function (Blueprint $table) {
            $table->string('image_name')->nullable()->after('phone_number');
            $table->string('image_path')->nullable()->after('image_name');
        });

         //analysts table
         Schema::table('analysts', function (Blueprint $table) {
            $table->string('image_name')->nullable()->after('phone_number');
            $table->string('image_path')->nullable()->after('image_name');
        });

        //researchers table
        Schema::table('researchers', function (Blueprint $table) {
            $table->string('image_name')->nullable()->after('phone_number');
            $table->string('image_path')->nullable()->after('image_name');
        });

        //organizations table
        Schema::table('organizations', function (Blueprint $table) {
            $table->string('logo_name')->nullable()->after('website');
            $table->string('logo_path')->nullable()->after('logo_name');
        });

         //programs table
         Schema::table('programs', function (Blueprint $table) {
            $table->string('logo_name')->nullable()->after('asset');
            $table->string('logo_path')->nullable()->after('logo_name');
        });

        //plans table
        Schema::table('plans', function (Blueprint $table) {
            $table->string('logo_name')->nullable()->after('description');
            $table->string('logo_path')->nullable()->after('logo_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tables', function (Blueprint $table) {
            //
        });
    }
};
