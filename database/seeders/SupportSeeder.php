<?php

namespace Database\Seeders;

use App\Models\Support;
use App\Models\User;
use Illuminate\Database\Seeder;

class SupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organization = User::where([
            'name' => 'bluestrike-organization',
            'email' => 'organization@bluestrike.com',
        ])->first();

        if (! $organization) {
            $this->command->info('Organization user does not exist.');

            return;
        }

        $supportExists = Support::where('user_id', $organization->id)->exists();

        if (! $supportExists) {
            Support::create([
                'user_id' => $organization->id,
                'ticket_id' => 'GGDJJEWOO2223',
                'title' => 'Pending Payment Approval',
                'description' => 'Payment was made but services are not available',
                'status' => 'active',
                'message' => null,
                'is_pending' => true,
                'is_resolved' => false,
                'is_cancelled' => false,
            ]);

            $this->command->info('Support ticket created successfully.');
        } else {
            $this->command->info('Support ticket already exists.');
        }
    }
}
