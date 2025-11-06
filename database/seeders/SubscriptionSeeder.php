<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Plan;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com',
        ])->first();

        $plan = Plan::where('title', 'Free Plan')->first();

        if (! $organization || ! $plan) {
            $this->command->warn('Organization or Plan does not exist.');

            return;
        }

        $subscription = Subscription::firstOrCreate(
            [
                'organization_id' => $organization->id,
                'plan_id' => $plan->id,
            ],
            [
                'status' => 'paid',
                'is_active' => true,
            ]
        );

        $message = $subscription->wasRecentlyCreated
            ? '✅ Subscription created successfully.'
            : 'ℹ️ Subscription already exists.';

        $this->command->info($message);
    }
}
