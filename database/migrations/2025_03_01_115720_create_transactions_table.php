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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('bounty_id')->references('id')->on('bounties');
            $table->foreignUuid('researcher_id')->references('id')->on('users');
            $table->foreignUuid('organization_id')->references('id')->on('organizations');
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('pending');
            $table->string('payment_method')->nullable();
            $table->string('transaction_reference')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
