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
        Schema::create('plans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('logo_name')->nullable();
            $table->string('logo_path')->nullable();
            $table->decimal('amount', 10, 2);
            $table->integer('max_reports')->default(0);
            $table->boolean('is_free')->default(true);
            $table->boolean('is_basic')->default(false);
            $table->boolean('is_pro')->default(false);
            $table->boolean('is_enterprise')->default(false);
            $table->boolean('is_life_time')->default(false);
            $table->boolean('is_daily')->default(false);
            $table->boolean('is_weekly')->default(false);
            $table->boolean('is_monthly')->default(false);
            $table->boolean('is_yearly')->default(false);
            $table->string('custom_period')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
