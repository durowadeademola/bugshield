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
        // Free plan
        if (Plan::where(['title' => 'Free Plan'])->count() == 0) {
            Plan::create([
                'title' => 'Free Plan',
                'description' => 'This plan offers a month of free trial.',
                'amount' => 0.00,
                'max_reports' => 30,
                'is_free' => true,
                'is_basic' => false,
                'is_pro' => false,
                'is_enterprise' => false,
                'is_life_time' => false,
                'is_daily' => false,
                'is_weekly' => false,
                'is_monthly' => true,
                'is_yearly' => false,
                'custom_period' => null,
            ]);
            $this->command->info('Free plan created successfully.');
        } else {
            $this->command->info('Free plan already exist.');
        }

        // Basic plan
        if (Plan::where(['title' => 'Basic Plan'])->count() == 0) {
            Plan::create([
                'title' => 'Basic Plan',
                'description' => 'This plan offers a max reports of 100 per month',
                'amount' => 20000,
                'max_reports' => 100,
                'is_free' => false,
                'is_basic' => true,
                'is_pro' => false,
                'is_enterprise' => false,
                'is_life_time' => false,
                'is_daily' => false,
                'is_weekly' => false,
                'is_monthly' => true,
                'is_yearly' => false,
                'custom_period' => null,
            ]);
            $this->command->info('Basic plan created successfully.');
        } else {
            $this->command->info('Basic plan already exist.');
        }

        // Pro plan
        if (Plan::where(['title' => 'Pro Plan'])->count() == 0) {
            Plan::create([
                'title' => 'Pro Plan',
                'description' => 'This plan offers a max reports of 500 per month',
                'amount' => 100000,
                'max_reports' => 500,
                'is_free' => false,
                'is_basic' => false,
                'is_pro' => true,
                'is_enterprise' => false,
                'is_life_time' => false,
                'is_daily' => false,
                'is_weekly' => false,
                'is_monthly' => true,
                'is_yearly' => false,
                'custom_period' => null,
            ]);
            $this->command->info('Pro plan created successfully.');
        } else {
            $this->command->info('Pro plan already exist.');
        }

        // Enterprise plan
        if (Plan::where(['title' => 'Enterprise Plan'])->count() == 0) {
            Plan::create([
                'title' => 'Enterprise Plan',
                'description' => 'This plan offers a max reports of 100000 per month',
                'amount' => 500000,
                'max_reports' => 100000,
                'is_free' => false,
                'is_basic' => false,
                'is_pro' => false,
                'is_enterprise' => true,
                'is_life_time' => false,
                'is_daily' => false,
                'is_weekly' => false,
                'is_monthly' => true,
                'is_yearly' => false,
                'custom_period' => null,
            ]);
            $this->command->info('Enterprise plan created successfully.');
        } else {
            $this->command->info('Enterprise plan already exist.');
        }

        // Life time plan
        if (Plan::where(['title' => 'Life Time Plan'])->count() == 0) {
            Plan::create([
                'title' => 'Life Time Plan',
                'description' => 'This plan offers an unlimited number of reports',
                'amount' => 1000000,
                'max_reports' => 0,
                'is_free' => false,
                'is_basic' => false,
                'is_pro' => false,
                'is_enterprise' => false,
                'is_life_time' => true,
                'is_daily' => false,
                'is_weekly' => false,
                'is_monthly' => false,
                'is_yearly' => false,
                'custom_period' => null,
            ]);
            $this->command->info('Life time plan created successfully.');
        } else {
            $this->command->info('Life time plan already exist.');
        }
    }
}
