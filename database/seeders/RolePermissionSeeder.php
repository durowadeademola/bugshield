<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // available roles
        $roles = [
            'admin',
            'researcher',
            'organization',
            'analyst',
            'team'
        ];

        $permissions = [
            'manage users',
            'manage payments',
            'manage roles',
            'view analytics',
            'view bounties',
            'assign bounties',
            'approve reports',
            'create reports',
            'view reports',
            'manage organization'
        ];

        foreach ($roles as $role)
        {
            Role::firstOrCreate(['name' => $role]);
        }

        foreach ($permissions as $permission)
        {
            Permission::firstOrCreate(['name' => $permission]);
        }

        Role::findByName('admin')->givePermissionTo([
            'manage users', 'manage roles', 'approve reports', 'manage payments', 'view analytics', 'assign bounties',
        ]);

        Role::findByName('researcher')->givePermissionTo([
            'create reports', 'view bounties',
        ]);

        Role::findByName('organization')->givePermissionTo([
            'manage payments', 'view bounties', 'assign bounties',
        ]);

        Role::findByName('analyst')->givePermissionTo([
            'view analytics', 'approve reports',
        ]);

        Role::findByName('team')->givePermissionTo([
            'manage organization'
        ]);

        $this->command->info('Roles and permissions seeded successfully.');
    }
}
