<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $seeders = [
            RolePermissionSeeder::class,
            UserSeeder::class,
            AccountSeeder::class,
            AdminSeeder::class,
            AnalystSeeder::class,
            OrganizationSeeder::class,
            ResearcherSeeder::class,
            ProgramSeeder::class,
            ReportSeeder::class,
            AttachmentSeeder::class,
            BountySeeder::class,
            CommentSeeder::class,
            NotificationSeeder::class,
            TransactionSeeder::class,
            PlanSeeder::class,
            TeamSeeder::class,
            SupportSeeder::class,
            SubscriptionSeeder::class
        ];
     
        foreach ($seeders as $seeder) 
        {
            $this->call($seeder);
            $this->command->info($seeder. ' seeded successfully.');
        }
    }
}
