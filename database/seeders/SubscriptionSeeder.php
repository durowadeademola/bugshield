<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Organization;
use App\Models\Plan;
use App\Models\Subscription;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com'
        ])->first();

        $plan = Plan::where(['title' => 'Free Plan'])->first();

        if ($organization && $plan) {
            if (Subscription::where(['organization_id' => $organization->id, 'plan_id' => $plan->id])->count() == 0) {
                Subscription::create([
                    'organization_id' => $organization->id,
                    'plan_id' => $plan->id,
                    'status' => 'paid',
                    'is_active' => true
                ]);
                $this->command->info('Subscription created successfully.');
            } else {
                $this->command->info('Subscription already exist.');
            }
        } else {
            $this->command->info('Organization plan does not exist.');
        } 
    }
}
