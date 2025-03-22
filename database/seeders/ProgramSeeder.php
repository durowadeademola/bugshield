<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Organization;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $organization = Organization::where([
            'name' => 'Bugshield',
            'email' => 'bugshield@gmail.com'
        ])->first();

        if ($organization) {
            if (Program::where(['organization_id' => $organization->id, 'title' => 'Bugshield'])->count() == 0) {
                Program::create([
                    'organization_id' => $organization->id,
                    'title' => 'Bugshield',
                    'description' => 'Bugshield bug bounty program.',
                    'is_public' => true,
                    'is_private' => false,
                    'is_active' => true,
                    'is_vdp' => false,
                    'is_managed' => true,
                    'critical_bounty_range' => '80000 - 100000',
                    'high_bounty_range' => '60000 - 70000',
                    'medium_bounty_range' => '40000 - 55000',
                    'low_bounty_range' => '10000 - 30000',
                    'asset' => '*bugshield.com',
                    'in_scope' => '*bugshield.com',
                    'out_of_scope' => 'N/A'
                ]);
                $this->command->info('Program created successfully.');
            } else {
                $this->command->info('Program already exist.');
            }
        } else {
            $this->command->info('Organization does not exist.');
        }
    }
}
