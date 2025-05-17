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
        Schema::create('reports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('researcher_id')->constrained('researchers');
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['pending', 'triaged', 'resolved', 'cancelled'])->default('pending');
            $table->boolean('is_low')->default(false);
            $table->boolean('is_medium')->default(false);
            $table->boolean('is_high')->default(false);
            $table->boolean('is_critical')->default(false);
            $table->boolean('is_informational')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
