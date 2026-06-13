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
        Schema::table('bounties', function (Blueprint $table) {
            $table->string('currency', 10)->default('NGN')->after('amount');
            $table->string('paystack_ref', 100)->nullable()->after('status');
            $table->string('paystack_transfer', 100)->nullable()->after('paystack_ref');
        });
    }

    public function down(): void
    {
        Schema::table('bounties', function (Blueprint $table) {
            $table->dropColumn(['currency', 'paystack_ref', 'paystack_transfer']);
        });
    }
};
