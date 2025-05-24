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
        Schema::create('supports', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users');
            $table->string('ticket_id')->nullable();
            $table->string('title');
            $table->text('description');
            $table->string('status')->nullable();
            $table->text('message')->nullable();
            $table->boolean('is_pending')->default(true);
            $table->boolean('is_resolved')->default(false);
            $table->boolean('is_cancelled')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supports');
    }
};
