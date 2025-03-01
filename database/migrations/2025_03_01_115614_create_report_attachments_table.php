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
        Schema::create('report_attachments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('bug_report_id')->references('id')->on('bug_reports');
            $table->string('file_path');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_attachments');
    }
};
