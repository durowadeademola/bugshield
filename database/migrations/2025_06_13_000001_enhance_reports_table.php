<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->text('steps_to_reproduce')->nullable()->after('description');
            $table->text('proof_of_concept')->nullable()->after('steps_to_reproduce');
            $table->string('url')->nullable()->after('proof_of_concept');
            $table->decimal('cvss_score', 4, 1)->nullable()->after('url');
            $table->string('cvss_vector')->nullable()->after('cvss_score');
            $table->text('triage_notes')->nullable()->after('cvss_vector');
            $table->uuid('triaged_by')->nullable()->after('triage_notes');
            $table->timestamp('triaged_at')->nullable()->after('triaged_by');
            $table->timestamp('resolved_at')->nullable()->after('triaged_at');
        });
    }

    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn([
                'steps_to_reproduce', 'proof_of_concept', 'url',
                'cvss_score', 'cvss_vector', 'triage_notes',
                'triaged_by', 'triaged_at', 'resolved_at',
            ]);
        });
    }
};
