<?php

namespace Database\Seeders;

use App\Models\Organization;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bluestrike',
            'email' => 'bluestrike@gmail.com',
        ])->first();

        if (! $organization) {
            $this->command->info('Organization does not exist.');

            return;
        }

        $program = Program::firstOrCreate(
            [
                'organization_id' => $organization->id,
                'title' => 'Bluestrike',
            ],
            [
                'description' => 'Bluestrike bug bounty program.',
                'platform' => 'web',
                'is_public' => true,
                'is_private' => false,
                'is_active' => true,
                'is_vdp' => false,
                'is_managed' => true,
                'critical_bounty_range' => '80000 - 100000',
                'high_bounty_range' => '60000 - 70000',
                'medium_bounty_range' => '40000 - 55000',
                'low_bounty_range' => '10000 - 30000',
                'asset' => '*bluestrike.com',
                'in_scope' => '*bluestrike.com',
                'out_of_scope' => 'N/A',
            ]
        );

        $this->command->info($program->wasRecentlyCreated
            ? 'Program created successfully.'
            : 'Program already exists.');
    }
}
