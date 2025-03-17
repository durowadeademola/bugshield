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
        Schema::create('programs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('organization_id')->references('id')->on('organizations');
            $table->string('title');
            $table->text('description');
            $table->text('asset');
            $table->text('in_scope');
            $table->text('out_of_scope');
            $table->boolean('is_public')->default(true);
            $table->boolean('is_private')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_vdp')->default(false);
            $table->boolean('is_managed')->default(false);
            $table->string('critical_bounty_range')->nullable();
            $table->string('high_bounty_range')->nullable();
            $table->string('medium_bounty_range')->nullable();
            $table->string('low_bounty_range')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
