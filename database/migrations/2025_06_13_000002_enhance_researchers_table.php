<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('researchers', function (Blueprint $table) {
            $table->integer('reputation_points')->default(0)->after('rank');
            $table->decimal('total_earnings', 12, 2)->default(0)->after('reputation_points');
            $table->integer('reports_submitted')->default(0)->after('total_earnings');
            $table->integer('reports_resolved')->default(0)->after('reports_submitted');
            $table->string('country')->nullable()->after('address');
            $table->string('bio')->nullable()->after('country');
        });
    }

    public function down(): void
    {
        Schema::table('researchers', function (Blueprint $table) {
            $table->dropColumn([
                'reputation_points', 'total_earnings',
                'reports_submitted', 'reports_resolved',
                'country', 'bio',
            ]);
        });
    }
};
