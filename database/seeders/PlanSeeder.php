<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $plans = [
            [
                'title' => 'Free Plan',
                'description' => 'This plan offers a month of free trial.',
                'amount' => 0.00,
                'max_reports' => 30,
                'is_free' => true,
                'is_basic' => false,
                'is_pro' => false,
                'is_enterprise' => false,
                'is_life_time' => false,
                'is_monthly' => true,
            ],
            [
                'title' => 'Basic Plan',
                'description' => 'This plan offers a max reports of 100 per month',
                'amount' => 20000,
                'max_reports' => 100,
                'is_basic' => true,
                'is_monthly' => true,
            ],
            [
                'title' => 'Pro Plan',
                'description' => 'This plan offers a max reports of 500 per month',
                'amount' => 100000,
                'max_reports' => 500,
                'is_pro' => true,
                'is_monthly' => true,
            ],
            [
                'title' => 'Enterprise Plan',
                'description' => 'This plan offers a max reports of 100000 per month',
                'amount' => 500000,
                'max_reports' => 100000,
                'is_enterprise' => true,
                'is_monthly' => true,
            ],
            [
                'title' => 'Life Time Plan',
                'description' => 'This plan offers an unlimited number of reports',
                'amount' => 1000000,
                'max_reports' => 0,
                'is_life_time' => true,
            ],
        ];

        foreach ($plans as $planData) {
            $plan = Plan::firstOrCreate(['title' => $planData['title']], $planData);
            $this->command->info("{$plan->title} checked/created successfully.");
        }
    }
}
