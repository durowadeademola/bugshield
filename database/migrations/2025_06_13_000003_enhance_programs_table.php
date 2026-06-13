<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->string('type')->default('bug_bounty')->after('status'); // bug_bounty, vdp, pentest
            $table->string('informational_bounty_range')->nullable()->after('low_bounty_range');
            $table->text('policy')->nullable()->after('out_of_scope');
            $table->string('response_sla')->nullable()->after('policy'); // e.g. "3 business days"
            $table->integer('total_reports')->default(0)->after('response_sla');
            $table->integer('researchers_count')->default(0)->after('total_reports');
            $table->decimal('total_bounties_paid', 12, 2)->default(0)->after('researchers_count');
            $table->string('currency')->default('NGN')->after('total_bounties_paid');
        });
    }

    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn([
                'type', 'informational_bounty_range', 'policy',
                'response_sla', 'total_reports', 'researchers_count',
                'total_bounties_paid', 'currency',
            ]);
        });
    }
};
